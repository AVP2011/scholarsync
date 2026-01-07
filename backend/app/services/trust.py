def calculate_trust_score(source: str, company: str) -> tuple[int, str]:
    score = 0

    if source in ["Google Careers", "Microsoft Careers"]:
        score += 70

    if company.lower() in ["google", "microsoft", "amazon"]:
        score += 20

    label = "High" if score >= 80 else "Medium" if score >= 50 else "Low"
    return score, label
