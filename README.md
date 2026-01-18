# ScholarSync 🚀

ScholarSync is a backend-first platform that aggregates trusted
career and academic opportunities, enriches them with credibility
signals, and exposes them via clean, scalable APIs.

The goal is to help users discover opportunities while reducing
noise, scams, and low-quality sources.

---

## 🔧 Tech Stack

**Backend**
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication

**Data Layer**
- Relational schema (Companies ↔ Opportunities)
- Trust scoring & labeling
- Aggregation & analytics endpoints

---

## 📌 Core Features

- Paginated opportunity listings
- Trust-based filtering (`high | medium | low`)
- Company-level aggregation
- Analytics-ready stats API
- Clean API contracts for frontend consumption

---

## 🔗 API Documentation

Sample API requests and responses can be found here:

📘 **API Contract** → [docs/api-sample.md](docs/api-sample.md)

---

## ▶️ Running the Backend

# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run the server
uvicorn backend.app.main:app --reload
Backend will be available at:

 
http://127.0.0.1:8000
🧠 Design Philosophy
ScholarSync is designed as a data-first system:

APIs are stable and predictable

Business logic is separated from presentation

Ready for future ML-based ranking and recommendations

 