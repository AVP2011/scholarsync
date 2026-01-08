import requests
from bs4 import BeautifulSoup
from backend.app.scrapers.base import BaseScraper

class GoogleCareersScraper(BaseScraper):
    source_name = "Google Careers"

    def fetch(self) -> list[dict]:
        url = "https://careers.google.com/jobs/results/"
        res = requests.get(url, timeout=10)
        soup = BeautifulSoup(res.text, "html.parser")

        jobs = []

        for card in soup.select("li")[:5]:  # limit for demo
            title = card.get_text(strip=True)
            if not title:
                continue

            jobs.append({
                "title": title,
                "company": "Google",
                "source": self.source_name,
                "apply_url": url,
                "type": "job"
            })

        return jobs
