from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.db.database import engine
from backend.app.db.base import Base
import backend.app.models  # noqa

from backend.app.api.auth import router as auth_router
from backend.app.api.users import router as users_router
from backend.app.api.scrape import router as scrape_router
from backend.app.api.opportunities import router as opportunities_router
from backend.app.api.trust import router as trust_router

app = FastAPI(title="ScholarSync API")

# 🔥 CORS FIX (THIS IS THE KEY)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created / verified")

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(scrape_router)
app.include_router(opportunities_router)
app.include_router(trust_router)

@app.get("/")
def root():
    return {"message": "ScholarSync backend running 🚀"}