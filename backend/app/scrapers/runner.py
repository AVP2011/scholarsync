from backend.app.scrapers.google_careers import GoogleCareersScraper
from backend.app.services.trust import calculate_trust_score
from backend.app.db.database import SessionLocal
from backend.app.models.opportunity import Opportunity
from backend.app.models.company import Company


def run_scrapers():
    db = SessionLocal()
    scraper = GoogleCareersScraper()

    results = scraper.fetch()

    for item in results:
        score, label = calculate_trust_score(item["source"], item["company"])

        # 1️⃣ Get or create company
        company = db.query(Company).filter_by(name=item["company"]).first()
        if not company:
            company = Company(
                name=item["company"],
                reputation_score=score,
                reputation_label=label
            )
            db.add(company)
            db.commit()
            db.refresh(company)

        # 2️⃣ Check for duplicate opportunity
        existing = (
            db.query(Opportunity)
            .filter(
                Opportunity.title == item["title"],
                Opportunity.company_id == company.id
            )
            .first()
        )

        # 3️⃣ Insert only if not duplicate
        if not existing:
            opp = Opportunity(
                title=item["title"],
                company_id=company.id,
                source=item["source"],
                apply_url=item["apply_url"],
                trust_score=score,
                trust_label=label,
            )
            db.add(opp)

    # 4️⃣ Commit once at the end
    db.commit()
    db.close()
