from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.app.db.database import get_db
from backend.app.models.opportunity import Opportunity
from backend.app.core.deps import get_current_user

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])

@router.get("/")
def list_opportunities(
    trust: str | None = Query(None),
    company: str | None = Query(None),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    query = db.query(Opportunity)

    if trust:
        query = query.filter(Opportunity.trust_label == trust)

    if company:
        query = query.join(Opportunity.company).filter_by(name=company)

    return query.all()
