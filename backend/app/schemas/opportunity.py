from pydantic import BaseModel
from typing import Optional


class OpportunityOut(BaseModel):
    id: int
    title: str
    source: Optional[str]
    apply_url: Optional[str]
    trust_score: Optional[int]
    trust_label: Optional[str]
    company_name: str

    class Config:
        from_attributes = True
