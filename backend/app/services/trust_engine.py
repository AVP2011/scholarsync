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
    "linkedin.com": 75,
    "indeed.com": 70,
    "scholarships.com": 70,
    "internshala.com": 65,
    "chegg.com": 60,
    "coursera.org": 75,
    "edx.org": 75,
    "udemy.com": 70,
    "khanacademy.org": 80,
    "unstop.com": 65,
}

# ---------------------------
# Step 1: Base Trust
# ---------------------------
def base_trust(source_type: str) -> int:
    """
    User-submitted links start with low trust.
    Official / known sources get higher base.
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
    No aggressive scraping.
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
    Simulated historical trust.
    Replace with DB stats later.
    """
    if domain in VERIFIED_DOMAINS:
        return 10
    return 0


# ---------------------------
# USER-FACING RECOMMENDATIONS
# ---------------------------
def generate_recommendations(score: int, analysis: dict) -> list[str]:
    recs = []

    if score < 40:
        recs.append("Avoid sharing personal information.")
        recs.append("Do not pay any registration or application fees.")
        recs.append("Verify the organization on official websites.")
    elif score < 70:
        recs.append("Cross-check this opportunity on the company’s official website.")
        recs.append("Confirm recruiter details before applying.")
    else:
        recs.append("Safe to explore further.")
        recs.append("Apply using official channels only.")

    if analysis["content"] < 0:
        recs.append("Content contains suspicious or risky language.")

    if analysis["domain_signal"] < 0:
        recs.append("Website lacks strong security or reputation signals.")

    return recs


# ---------------------------
# RISK FLAGS (Warnings)
# ---------------------------
def generate_risk_flags(analysis: dict) -> list[str]:
    flags = []

    if analysis["domain_signal"] < 0:
        flags.append("Unverified or insecure domain")

    if analysis["content"] < 0:
        flags.append("Suspicious language detected")

    if analysis["base"] <= 25:
        flags.append("User-submitted link")

    return flags


# ---------------------------
# FINAL TRUST ANALYSIS
# ---------------------------
def analyze_trust(url: str, source_type: str = "user") -> dict:
    parsed = urlparse(url)
    domain = parsed.netloc.replace("www.", "")

    # --- Step-wise scores ---
    base = base_trust(source_type)
    domain_sig = domain_signal(url)
    content_sig = content_heuristics(url)
    historical = historical_adjustment(domain)

    # --- Final score ---
    score = base + domain_sig + content_sig + historical
    score = max(0, min(score, 100))

    # ✅ Build analysis dict FIRST
    analysis = {
        "base": base,
        "domain_signal": domain_sig,
        "content": content_sig,
        "historical": historical,
    }

    # ✅ Now safely use analysis
    recommendations = generate_recommendations(score, analysis)
    risk_flags = generate_risk_flags(analysis)

    return {
        "url": url,
        "domain": domain,
        "trust_score": score,
        "trust_label": label_from_score(score),
        "source": "User Submitted",
        "analysis": analysis,
        "recommendations": recommendations,
        "risk_flags": risk_flags,
    }