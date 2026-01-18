from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.app.db.database import get_db
from backend.app.models.opportunity import Opportunity
from backend.app.models.company import Company
from backend.app.schemas.opportunity import OpportunityOut
from backend.app.schemas.stats import OpportunityStats

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])


# =========================================================
# LIST OPPORTUNITIES (FILTER + PAGINATION)
# =========================================================
@router.get("/", response_model=list[OpportunityOut])
def list_opportunities(
    trust: str | None = Query(None, description="high | medium | low"),
    company: str | None = Query(None, description="Company name"),
    min_trust_score: int | None = Query(None, ge=0, le=100),
    type: str | None = Query(None, description="internship | fellowship | job"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
):
    """
    Fetch opportunities with optional filters.
    Supports pagination and sorting by trust score.
    """

    query = (
        db.query(Opportunity)
        .join(Company, Opportunity.company_id == Company.id)
    )

    # ------------------
    # Filters
    # ------------------
    if trust:
        query = query.filter(
            func.lower(Opportunity.trust_label) == trust.lower()
        )

    if company:
        query = query.filter(
            Company.name.ilike(f"%{company}%")
        )

    if min_trust_score is not None:
        query = query.filter(
            Opportunity.trust_score >= min_trust_score
        )

    if type:
        query = query.filter(
            func.lower(Opportunity.type) == type.lower()
        )

    # ------------------
    # Pagination + Order
    # ------------------
    offset = (page - 1) * limit

    opportunities = (
        query
        .order_by(Opportunity.trust_score.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    # ------------------
    # Response Mapping
    # ------------------
    return [
        OpportunityOut(
            id=o.id,
            title=o.title,
            source=o.source,
            apply_url=o.apply_url,
            trust_score=o.trust_score,
            trust_label=o.trust_label,
            company_name=o.company.name if o.company else "Unknown",
        )
        for o in opportunities
    ]


# =========================================================
# OPPORTUNITY STATS (DASHBOARD)
# =========================================================
@router.get("/stats", response_model=OpportunityStats)
def opportunity_stats(db: Session = Depends(get_db)):
    """
    Aggregated stats for dashboard usage.
    """

    total = db.query(func.count(Opportunity.id)).scalar()

    high = db.query(Opportunity).filter(
        func.lower(Opportunity.trust_label) == "high"
    ).count()

    medium = db.query(Opportunity).filter(
        func.lower(Opportunity.trust_label) == "medium"
    ).count()

    low = db.query(Opportunity).filter(
        func.lower(Opportunity.trust_label) == "low"
    ).count()

    top_companies = (
        db.query(
            Company.name,
            func.count(Opportunity.id).label("count")
        )
        .join(Opportunity)
        .group_by(Company.name)
        .order_by(func.count(Opportunity.id).desc())
        .limit(5)
        .all()
    )

    return {
        "total_opportunities": total,
        "high_trust": high,
        "medium_trust": medium,
        "low_trust": low,
        "top_companies": [
            {"company": name, "count": count}
            for name, count in top_companies
        ],
    }