from urllib.parse import urlparse
import requests
from backend.app.services.test import label_from_score

# ---------------------------
# Known high-trust domains
# ---------------------------
VERIFIED_DOMAINS = {
    "google.com": 90,
    "amazon.jobs": 85,
    "openai.com": 90,
    "microsoft.com": 85,
    "meta.com": 80,
    "apple.com": 80,
}

# ---------------------------
# Step 1: Base Trust
# ---------------------------
def base_trust(source_type: str) -> int:
    """
    User-submitted links start with low trust.
    Scraped / known sources get higher base.
    """
    if source_type == "official":
        return 60
    return 25  # user-submitted by default


# ---------------------------
# Step 2: Domain & URL Signals
# ---------------------------
def domain_signal(url: str) -> int:
    parsed = urlparse(url)
    domain = parsed.netloc.replace("www.", "")

    for known_domain, score in VERIFIED_DOMAINS.items():
        if known_domain in domain:
            return score

    if parsed.scheme != "https":
        return -10

    return 0


# ---------------------------
# Step 3: Content Heuristics
# ---------------------------
def content_heuristics(url: str) -> int:
    """
    Lightweight content check.
    No scraping abuse.
    """
    try:
        res = requests.get(url, timeout=5)
        text = res.text.lower()

        positive = ["apply", "career", "internship", "scholarship"]
        negative = ["pay", "registration fee", "guaranteed", "limited seats"]

        score = 0
        for p in positive:
            if p in text:
                score += 5
        for n in negative:
            if n in text:
                score -= 10

        return score
    except Exception:
        return -5


# ---------------------------
# Step 4: Historical Adjustment (Demo)
# ---------------------------
def historical_adjustment(domain: str) -> int:
    """
    Simulated historical data.
    Can be replaced by DB stats later.
    """
    if domain in VERIFIED_DOMAINS:
        return 10
    return 0


# ---------------------------
# FINAL TRUST ANALYSIS
# ---------------------------
def analyze_trust(url: str, source_type: str = "user") -> dict:
    parsed = urlparse(url)
    domain = parsed.netloc.replace("www.", "")

    score = 0

    score += base_trust(source_type)
    score += domain_signal(url)
    score += content_heuristics(url)
    score += historical_adjustment(domain)

    score = max(0, min(score, 100))

    return {
        "url": url,
        "domain": domain,
        "trust_score": score,
        "trust_label": label_from_score(score),
        "source": "User Submitted",
        "analysis": {
            "base": base_trust(source_type),
            "domain_signal": domain_signal(url),
            "content": content_heuristics(url),
            "historical": historical_adjustment(domain),
        }
    }