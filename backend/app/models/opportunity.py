from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.db.database import Base

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    source = Column(String)
    apply_url = Column(String)

    trust_score = Column(Integer)
    trust_label = Column(String)

    company_id = Column(Integer, ForeignKey("companies.id"))

    # ✅ STRING, not import
    company = relationship(
        "Company",
        back_populates="opportunities"
    )
