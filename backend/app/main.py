from fastapi import FastAPI

app = FastAPI(title="ScholarSync API")

@app.get("/")
def root():
    return {"message": "ScholarSync backend is running 🚀"}
