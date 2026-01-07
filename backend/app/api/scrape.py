from fastapi import APIRouter, Depends
from backend.app.scrapers.runner import run_scrapers
from backend.app.core.deps import get_current_user

router = APIRouter(prefix="/scrape", tags=["Scraper"])

@router.post("/run")
def run_scraper(current_user=Depends(get_current_user)):
    run_scrapers()
    return {"message": "Scraping completed"}
