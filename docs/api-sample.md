# ScholarSync – API Sample & Contract

This document demonstrates sample API responses to validate
data structure, trust scoring, pagination, and aggregation behavior.

The purpose of this document is to clearly show how backend data
is exposed in a predictable and scalable API format.

---

## 🔹 GET /opportunities

### Request
GET /opportunities?page=1&limit=5&trust=high

bash
Copy code

### Response
```json
[
  {
    "id": 1,
    "title": "Amazon ML Internship",
    "source": "Amazon Careers",
    "apply_url": "https://amazon.jobs",
    "trust_score": 88,
    "trust_label": "high",
    "company_name": "Amazon"
  },
  {
    "id": 2,
    "title": "OpenAI Research Residency",
    "source": "OpenAI",
    "apply_url": "https://openai.com/careers",
    "trust_score": 96,
    "trust_label": "high",
    "company_name": "OpenAI"
  }
]
Explanation:
Results are paginated using page and limit

Trust labels are normalized (high | medium | low)

Company data is joined from a relational table

Designed to support future ranking & filtering logic

🔹 GET /opportunities/stats
Request
bash
Copy code
GET /opportunities/stats
Response
json
Copy code
{
  "total_opportunities": 30,
  "high_trust": 14,
  "medium_trust": 9,
  "low_trust": 7,
  "top_companies": [
    { "company": "Google", "count": 6 },
    { "company": "Amazon", "count": 5 },
    { "company": "Microsoft", "count": 4 }
  ]
}
Explanation:
Enables dashboard-level insights

Helps users quickly assess platform credibility

Supports future analytics and ML-based ranking

yaml
Copy code
