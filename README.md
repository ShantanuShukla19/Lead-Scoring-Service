# Lead Scoring Service

A backend service to score leads using **rule-based logic** and **AI scoring**.  
It allows you to:

- Upload leads via CSV  
- Save offer details for scoring context  
- Score leads using **rule-based logic**  
- Score leads using **AI-based scoring** with OpenAI API  
- Export scored results as CSV  

---

## Project Structure

- lead_scoring_service/
  - src/
    - routes/ – API route definitions
      - leadRoutes.js – CSV upload
      - offerRoutes.js – Manage offer details
      - scoreRoutes.js – Scoring and CSV export
    - controllers/ – Lead, Offer, and Score controllers
      - leadController.js – Handles CSV upload and retrieval
      - offerController.js – Handles offer creation and retrieval
      - scoreController.js – Handles scoring and CSV export
    - services/ – Business logic
      - ruleScoring.js – Rule-based scoring
      - aiScoring.js – AI-based scoring
  - uploads/ – Temporary storage for CSV uploads
  - server.js – Express server entry point
  - package.json
  - .env – API keys and config (not in repo)
  - README.md

---

## Setup Instructions

- Clone the repository:
  git clone https://github.com/ShantanuShukla19/Lead-Scoring-Service
  cd lead_scoring_service

- Install dependencies:
  npm install

- Create a .env file at the root with your OpenAI API key:
  OPENAI_API_KEY=your_openai_api_key_here

- Start the server:
  npm start

---

## API Endpoints

- Lead Upload
  - POST /leads/upload
  - Upload a CSV file containing leads
  - Request: Multipart form-data (file)
  - Response Example:
   ``` {
      "message": "Leads uploaded successfully.",
      "leadsCount": 10
    }
   ```

- Offer Management
  - POST /offer
  - Save offer details used in scoring
  - Request Body Example:
```
     {
      "title": "Special Offer",
      "discount": 20,
      "ideal_use_cases": ["B2B SaaS", "Healthcare"]
    }
```
  - Response Example:
    ```
    {
      "message": "Offer details saved."
    }
    ```
- Scoring Leads
  - POST /score
  - Score all uploaded leads using rule-based and AI-based scoring
  - Response Example:
  - ```
    {
      "message": "Scoring completed.",
      "results": [
        {
          "name": "John Doe",
          "role": "Manager",
          "company": "Example Inc",
          "intent": "High",
          "score": 85,
          "reasoning": "Rule + AI combined scoring details"
        }
      ]
    }
    ```
- Get Scored Results (JSON)
  - GET /score
  - Retrieve scored leads as JSON

- Export Scored Results (CSV)
  - GET /score/export
  - Export scored leads as a CSV file (scored_results.csv)

---

## Scoring Logic

- Rule-Based Scoring
  - Role relevance:
    - Head/Chief/Director → +20 points
    - Manager/Lead → +10 points
  - Industry match with offer’s ideal use cases:
    - Exact match → +20 points
    - Partial match → +10 points
  - Data completeness:
    - +10 points if all important fields are present

- AI-Based Scoring
  - Uses OpenAI API to classify buying intent:
    - High → 50 points
    - Medium → 30 points
    - Low → 10 points
  - Returns reasoning text along with intent and points

- Total Score
  - ruleScore + aiPoints
 

## Backend Deployed
https://lead-scoring-service.onrender.com

