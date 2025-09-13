# Assistant – Occams Advisory Scraper & Chatbot

## . Running App

The project runs as a Flask-based web app (local or hosted). It scrapes data from [occamsadvisory.com](https://occamsadvisory.com), stores it in a local JSON file, and allows users to query that data through a simple chatbot interface.

---

## . Architecture Diagram

```
        +----------------+
        |  User (Chat)   |
        +-------+--------+
                |
                v
        +-------+--------+      +-----------------+
        |  Flask Backend | <--> |  scraped.json   |
        +-------+--------+      +-----------------+
                |
                v
        +-------+--------+
        |  Scraper (BS4) |
        +----------------+
```

---

## . Key Design Choices & Trade-offs

* Lightweight stack: Used Flask + JSON instead of a heavy DB for simplicity. Trade-off: scalability is limited, but setup is easy.
* Scraping-based knowledge: Ensures no hallucinations (all answers come from scraped data). Trade-off: knowledge goes stale unless scraper is re-run.
* Minimal dependencies:*Avoided large ML models for performance and reliability. Trade-off: limited conversational flexibility.

---

## . Threat Model (Brief)

* PII handling: The app does not collect or store sensitive user data beyond chat inputs.
* Input sanitization: User queries are sanitized to prevent injection attacks.
* Risk mitigation: Runs in a sandboxed environment with no external write permissions beyond `scraped.json`.

---

## . Scraping Approach

* Tools used: Python, BeautifulSoup4, Requests.
* Process:

  1. Fetches HTML from target pages.
  2. Extracts structured text (services, categories, etc.).
  3. Stores results in `scraped.json`.
* Output: A structured JSON knowledge file for querying.

---

## . Failure Modes

* Site structure changes: Scraper may fail → handled with try/except and logs.
* Stale knowledge: JSON needs manual refresh → can be automated with cron.
* Unknown question: Returns safe fallback message instead of breaking.

---


---


##  Getting Started

### Installation

```bash
git clone https://github.com/Adityagarg009/Assistant.git
cd Assistant
pip install -r requirements.txt
```

### Run App

```bash
python app.py
```


---

## 11. Future Improvements

* Automate scraping with scheduler.
* Add fuzzy search (Whoosh/SQLite FTS).
* Improve frontend UX with typing indicators & source links.




