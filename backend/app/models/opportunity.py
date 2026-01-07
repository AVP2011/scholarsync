from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from backend.app.db.base import Base

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    type = Column(String)  # internship / hackathon / scholarship
    deadline = Column(DateTime)
    company_id = Column(Integer, ForeignKey("companies.id"))
    source = Column(String)
    apply_url = Column(String)
    trust_score = Column(Integer)
    trust_label = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
