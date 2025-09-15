# Lead Scoring Service

A backend service to score leads using **rule-based logic** and **AI scoring**.  
It provides APIs to evaluate leads based on predefined rules and AI analysis for accurate scoring.

---

## Project Structure


- **lead_scoring_service/**
  - **src/**
    - **routes/** – API route definitions
    - **services/** – Business logic (AI & rule scoring)
    - **controllers/** – Optional controllers
  - **uploads/** – File uploads (if any)
  - **server.js** – Entry point
  - **package.json**
  - **.env** – API keys and config (not in repo)
  - **README.md**



---

## Setup Instructions

Clone the repository and navigate into it:

```bash
git clone https://github.com/ShantanuShukla19/Lead-Scoring-Service
cd lead_scoring_service
```

Install dependencies:

```npm install```

Create a .env file at the root with your OpenAI API key:

```OPENAI_API_KEY=your_openai_api_key_here```


Start the server:

npm start

API Usage
Rule-Based Scoring

Endpoint: POST /api/score/rule

Request Body Example:
```
{
  "lead": {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Example Inc",
    "annualRevenue": 500000
  }
}
```
```
Response Example:

{
  "score": 75,
  "rulesApplied": ["Revenue > 100k", "Email verified"]
}
```
AI-Based Scoring

Endpoint: POST /api/score/ai

Request Body Example:
```
{
  "lead": {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Example Inc",
    "annualRevenue": 500000
  }
}

```
Response Example:
```
{
  "score": 82,
  "analysis": "Lead seems highly promising based on AI scoring"
}
```
Scoring Logic

Rule-Based Scoring:

Revenue > 100k → +20 points

Valid email → +10 points

Company size > 50 employees → +15 points

AI-Based Scoring:

Uses OpenAI API to analyze lead data for additional insights.

All functions include inline comments in services/ruleScoring.js and services/aiScoring.js.

