from fastapi import FastAPI
from backend.app.db.database import engine
from backend.app.db.base import Base
import backend.app.models  # noqa

app = FastAPI(title="ScholarSync API")

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created / verified")

@app.get("/")
def root():
    return {"message": "ScholarSync backend running 🚀"}
