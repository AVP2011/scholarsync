from fastapi import APIRouter
from pydantic import BaseModel
from urllib.parse import urlparse

router = APIRouter(prefix="/trust", tags=["Trust"])

class TrustRequest(BaseModel):
    url: str

@router.post("/analyze")
def analyze_trust(data: TrustRequest):
    domain = urlparse(data.url).netloc.lower()

    # VERY SIMPLE reuse of logic
    if "google.com" in domain or "amazon.jobs" in domain or "microsoft.com" in domain:
        return {
            "trust_score": 90,
            "trust_label": "High",
            "reason": "Verified official company domain",
            "source": "User-submitted"
        }

    if "linkedin.com" in domain:
        return {
            "trust_score": 65,
            "trust_label": "Medium",
            "reason": "Third-party platform, requires verification",
            "source": "User-submitted"
        }

    return {
        "trust_score": 30,
        "trust_label": "Low",
        "reason": "Unknown or unverified source",
        "source": "User-submitted"
    }