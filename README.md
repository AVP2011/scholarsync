# ScholarSync 🚀
### Trust-Aware Opportunity Discovery Platform

**ScholarSync** is an AI-powered platform that helps students discover **scholarships, internships, and career opportunities with credibility insights**.

The system analyzes opportunity links using **machine learning and structured trust signals** to generate a **trust score, risk indicators, and actionable recommendations**, helping users avoid scams and unreliable sources.

ScholarSync combines **data aggregation, trust analysis, and analytics APIs** to create a reliable opportunity discovery ecosystem.

---

# 🧠 Key Highlights

- 🔍 **AI-powered Trust Analyzer** for verifying opportunity links  
- 🌳 **Machine Learning trust scoring using Random Forest**  
- 📊 **Explainable analysis** with risk factors and positive signals  
- 📚 **Aggregated opportunity listings** with trust filtering  
- 📈 **Analytics APIs** for trust distribution and trends  
- ⚡ **FastAPI backend with scalable architecture**

---

# 🔧 Tech Stack

## Backend
- **FastAPI**
- **SQLAlchemy**
- **PostgreSQL**
- **JWT Authentication**

## Machine Learning
- **Scikit-learn**
- **Random Forest Classifier**
- Custom **URL + content feature extraction**

## Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**

## Data & APIs
- REST APIs with clean contracts
- Opportunity aggregation pipeline
- Trust scoring endpoints
- Analytics-ready data services

---

# 📌 Core Features

## 🔍 Trust Analyzer

Users can paste any opportunity link and receive:

- **Trust Score (0-100)**
- **Risk Level (Low / Medium / High / Critical)**
- **Model Confidence**
- **Risk Factors**
- **Positive Signals**
- **Actionable Recommendations**

The analysis is powered by a **machine learning model trained on URL structure and textual signals**.

---

## 📚 Opportunity Discovery

- Paginated opportunity listings
- Trust-based filtering (`high | medium | low`)
- Company-level opportunity aggregation
- Structured APIs for frontend integration

---

## 📊 Analytics & Insights

- Trust score distribution
- Opportunity statistics
- Data endpoints ready for dashboards and charts

---

# 🧠 Machine Learning Pipeline

ScholarSync uses a **Random Forest classifier** to detect potentially fraudulent opportunity links.

## Feature Extraction

The model evaluates multiple signals including:

- URL structure patterns
- Domain characteristics
- HTTPS security
- Keyword analysis
- Content heuristics
- Text formatting anomalies

## Prediction Output

The ML engine produces:

- **Trust Score (0-100)**
- **Risk Classification**
- **Model Confidence**
- **Explainable signals influencing the prediction**

This makes the system both **predictive and transparent**.

---

# 🔗 API Documentation

Example API requests and responses are available here:

📘 **API Contract**
docs/api-sample.md
Copy code

### Core Endpoints
POST /predict-trust GET  /ml-status GET  /opportunities GET  /statistics
Copy code

---

# ▶️ Running the Project

## 1️⃣ Activate Virtual Environment

Linux / Mac
source venv/bin/activate
Windows
venv\Scripts\activate

2️⃣ Run Backend

uvicorn backend.app.main:app --reload

Backend runs at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

3️⃣ Run Frontend
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:3000


🏗️ System Architecture
Copy code

Next.js Frontend
        │
        ▼
FastAPI Backend
        │
        ▼
Trust Analyzer API
        │
        ▼
ML Model (Random Forest)
        │
        ▼
PostgreSQL Database

🧠 Design Philosophy

ScholarSync follows a data-first architecture:
APIs are stable and predictable
Trust scoring logic is isolated in the ML layer
Backend services are modular and scalable
Frontend consumes structured API contracts
Ready for future AI-driven recommendations

🚀 Future Improvements

ML model improvements with larger datasets
Browser extension for real-time trust checks
User feedback loop for model retraining
Advanced NLP models for deeper content analysis
AI-driven opportunity recommendation engine

👨‍💻 Author

Aryan Pandey
ScholarSync explores how machine learning can improve trust and transparency in opportunity discovery platforms.
