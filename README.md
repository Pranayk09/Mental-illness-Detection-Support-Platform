# Mental Illness Detection & Support Platform

A web-based Mental Illness Detection & Support Platform developed using the **MERN Stack** with **Machine Learning integration** to assist users in identifying potential mental health conditions through the **DASS-21 questionnaire**. Based on the assessment, the platform predicts the user's mental health status and provides appropriate support resources.

> **Academic Project**  
> This project was developed as part of a college group project.

---

## Project Overview

Mental health issues often go unnoticed due to the lack of awareness and timely assessment. This platform provides an accessible way for users to complete the DASS-21 (Depression, Anxiety, and Stress Scale) questionnaire online. The collected responses are analyzed using a trained Machine Learning model, and the predicted result is displayed along with relevant support information.

The application combines a modern MERN stack web application with a Flask-based Machine Learning service to deliver real-time predictions.

---

## Features

- User Registration & Login
- Secure Authentication
- DASS-21 Mental Health Assessment
- Machine Learning-based Prediction
- Assessment History
- User Dashboard
- Responsive User Interface
- Mental Health Support Resources

---

## System Workflow

1. User registers or logs into the platform.
2. User completes the DASS-21 questionnaire.
3. Responses are sent to the backend.
4. Backend communicates with the Flask Machine Learning service.
5. The XGBoost model predicts the mental health category.
6. Prediction results are stored in MongoDB.
7. Results and support resources are displayed to the user.

---

## Technology Stack

### Frontend
- React.js
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Machine Learning
- Python
- Flask
- XGBoost
- Pandas
- Scikit-learn

### Dataset
- DASS-21 Questionnaire Dataset

---

## Machine Learning Model

The prediction system is built using an **XGBoost Classifier** trained on the **DASS-21 dataset**.

The trained model is exported as a Joblib pipeline and served through a Flask API, which is integrated with the Node.js backend to provide prediction results.

---

## Project Structure

```
Mental-Illness-Detection-Support-Platform/
│
├── backend/          # Express.js Backend
├── frontend2/        # Main React Frontend
├── frontend/         # Initial frontend (Not used in final project)
├── model/            # Machine Learning Model
│   ├── app.py
│   ├── model.ipynb
│   ├── DASS.csv
│   ├── dass_xgb_pipeline.joblib
│   └── label_encoder.joblib
│
└── README.md
```

> **Note:** The `frontend2` directory contains the final frontend implementation. The `frontend` directory is an earlier implementation and is not part of the final project.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Pranayk09/Mental-illness-Detection-Support-Platform.git
cd Mental-illness-Detection-Support-Platform
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend2
npm install
npm start
```

### Machine Learning Service

```bash
cd model
pip install -r requirements.txt
python app.py
```

---

## Team Contribution

This project was developed as a group project.

### My Contribution

I was responsible for the backend development, including:

- Designing and developing REST APIs
- User Authentication using JWT
- MongoDB Database Integration
- CRUD Operations
- Backend Architecture
- Integrating the Flask Machine Learning API with the MERN application
- Testing and debugging backend services

The Machine Learning model was developed by another team member using the DASS-21 dataset and XGBoost.

---

## Future Enhancements

- Doctor Consultation Module
- Appointment Booking
- Personalized Mental Health Recommendations
- Real-time Chat Support
- Improved Prediction Accuracy
- Email Notifications

---

## License

This project was developed for academic purposes as part of a college project.
