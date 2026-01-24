from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.services.trust_engine import analyze_trust

router = APIRouter(prefix="/trust", tags=["Trust"])

class TrustRequest(BaseModel):
    url: str

@router.post("/analyze")
def analyze_url(data: TrustRequest):
    return analyze_trust(data.url)