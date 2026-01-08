from pydantic import BaseModel


class OpportunityStats(BaseModel):
    total_opportunities: int
    high_trust: int
    medium_trust: int
    low_trust: int
    top_companies: list[dict]
