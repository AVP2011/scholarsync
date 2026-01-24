def label_from_score(score: int) -> str:
    """
    Converts trust score into label.
    Centralized logic so thresholds are consistent everywhere.
    """
    if score >= 80:
        return "high"
    elif score >= 50:
        return "medium"
    else:
        return "low"