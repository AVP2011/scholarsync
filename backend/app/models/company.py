from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from backend.app.db.database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    reputation_score = Column(Integer)
    reputation_label = Column(String)

    # ✅ STRING, not import
    opportunities = relationship(
        "Opportunity",
        back_populates="company",
        cascade="all, delete-orphan"
    )
