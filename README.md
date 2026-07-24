# Mental Illness Detection & Support Platform

A web-based **Mental Illness Detection & Support Platform** developed using the **MERN Stack** with **Machine Learning integration** to assist users in identifying potential mental health conditions through the **DASS-21 questionnaire**. Based on the assessment, the platform predicts the user's mental health status and provides appropriate support resources.

> **Academic Project**  
> This project was developed as part of a college group project.

---

## Project Overview

Mental health issues often go unnoticed due to a lack of awareness and timely assessment. This platform provides an accessible way for users to complete the **DASS-21 (Depression, Anxiety, and Stress Scale)** questionnaire online. The collected responses are analyzed using a trained Machine Learning model, and the predicted result is displayed along with relevant support information.

The application combines a modern MERN stack web application with a Flask-based Machine Learning service to deliver real-time predictions.

---

## Features

- User Registration & Login
- Secure JWT Authentication
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
3. Assessment responses are sent to the Node.js backend.
4. Backend communicates with the Flask Machine Learning service.
5. The XGBoost model predicts the user's mental health condition.
6. Prediction results are stored in MongoDB.
7. The user can view the prediction along with appropriate support resources.

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
- Mongoose
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

## Project Structure

```
Mental-Illness-Detection-Support-Platform/
│
├── client/          # React Frontend
├── server/          # Express.js Backend
├── model/           # Machine Learning Service
│   ├── app.py
│   ├── model.ipynb
│   ├── DASS.csv
│   ├── dass_xgb_pipeline.joblib
│   └── label_encoder.joblib
│
└── README.md
```

> **Note:** The `client` directory contains the React frontend application. The `server` directory contains the Express.js backend, and the `model` directory contains the Flask-based Machine Learning service, trained model, and dataset.

The prediction system is built using an **XGBoost Classifier** trained on the **DASS-21 dataset**.

The trained model is exported as a Joblib pipeline and served through a Flask API, which is integrated with the Node.js backend to provide real-time prediction results.

---

## Project Structure

```text
Mental-Illness-Detection-Support-Platform/
│
├── client/                 # React Frontend
│
├── server/                 # Express.js Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── model/                  # Machine Learning Service
│   ├── app.py
│   ├── model.ipynb
│   ├── DASS.csv
│   ├── dass_xgb_pipeline.joblib
│   └── label_encoder.joblib
│
└── README.md
```

> **Note:**  
> - **client** contains the React frontend application.
> - **server** contains the Express.js REST API and authentication system.
> - **model** contains the Flask Machine Learning API, trained XGBoost model, and dataset.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Pranayk09/Mental-illness-Detection-Support-Platform.git

cd Mental-illness-Detection-Support-Platform
```

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm start
```

### Machine Learning Service

```bash
cd model
pip install -r requirements.txt
python app.py
```


## Team Contribution

This project was developed as a **college group project**.

### My Contribution

I was responsible for the complete backend development, including:

- REST API Development
- JWT Authentication & Authorization
- MongoDB Database Integration
- CRUD Operations
- Backend Architecture Design
- Integration of Flask Machine Learning API
- Testing and Debugging Backend Services

The Machine Learning model was developed by another team member using the **DASS-21 dataset** and **XGBoost**.

---

## Future Enhancements

- Doctor Consultation Module
- Appointment Booking System
- Personalized Mental Health Recommendations
- Real-time Chat Support
- Enhanced Prediction Accuracy
- Email Notifications
- Admin Dashboard
- Progress Tracking & Analytics

---

## License

This project was developed for academic purposes as part of a college project.