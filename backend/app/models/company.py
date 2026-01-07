from sqlalchemy import Column, Integer, String, Float
from backend.app.db.base import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    website = Column(String)
    linkedin_url = Column(String)
    google_rating = Column(Float)
    reputation_score = Column(Integer)
    reputation_label = Column(String)
