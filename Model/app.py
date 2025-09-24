from flask import Flask, request, jsonify
import pandas as pd
import joblib

# Load model and label encoder
model = joblib.load("dass_xgb_pipeline.joblib")
le = joblib.load("label_encoder.joblib")

# DASS severity cutoffs
DEPRESSION_CUTOFFS = [(0,4,'Normal'), (5,6,'Mild'), (7,10,'Moderate'), (11,13,'Severe'), (14,21,'Extremely Severe')]
ANXIETY_CUTOFFS    = [(0,3,'Normal'), (4,5,'Mild'), (6,7,'Moderate'), (8,9,'Severe'), (10,21,'Extremely Severe')]
STRESS_CUTOFFS     = [(0,7,'Normal'), (8,9,'Mild'), (10,12,'Moderate'), (13,16,'Severe'), (17,21,'Extremely Severe')]

def map_severity(score, cutoffs):
    for lo, hi, label in cutoffs:
        if lo <= score <= hi:
            return label
    return 'Unknown'

# Order of features corresponding to answers array
features_order = [
    'Q1_1','Q3_1_S1','Q3_2_S2','Q3_3_S3','Q3_4_S4','Q3_5_S5','Q3_6_S6','Q3_7_S7',
    'Q3_8_A1','Q3_9_A2','Q3_10_A3','Q3_11_A4','Q3_12_A5','Q3_13_A6','Q3_14_A7',
    'Q3_15_D1','Q3_16_D2','Q3_17_D3','Q3_18_D4','Q3_19_D5','Q3_20_D6','Q3_21_D7',
    'Gender','Marital_Status','Education','Occupation','Sleep_Problem'
]

# Flask app
app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    user_id = data.get("userId")
    answers = data.get("answers")
    
    if not answers or len(answers) != len(features_order):
        return jsonify({"error": f"Answers must have {len(features_order)} elements"}), 400
    
    # Create single-row DataFrame
    row = pd.DataFrame([answers], columns=features_order)
    
    # Add Age_Normalized
    row['Age_Normalized'] = (row['Q1_1'] - row['Q1_1'].min()) / (row['Q1_1'].max() - row['Q1_1'].min())
    
    # Predict
    pred_encoded = model.predict(row)[0]
    pred_status = le.inverse_transform([pred_encoded])[0]
    
    # Get severity
    severity = None
    if pred_status == 'Depressed':
        severity = map_severity(int(row['Q3_14_A7']), DEPRESSION_CUTOFFS)  # Assuming Q3_14_A7 = Depression_Score
    elif pred_status == 'Anxious':
        severity = map_severity(int(row['Q3_15_D1']), ANXIETY_CUTOFFS)      # Assuming Q3_15_D1 = Anxiety_Score
    elif pred_status == 'Stressed':
        severity = map_severity(int(row['Q3_16_D2']), STRESS_CUTOFFS)      # Assuming Q3_16_D2 = Stress_Score
    
    return jsonify({
        "userId": user_id,
        "Mental_Health_Status": pred_status,
        "Severity": severity
    })

if __name__ == "__main__":
    app.run(debug=True)
