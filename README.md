# 🛡️ SafeSpace AI 

**Context-Aware Predictive Safety System** *A VibeHack Hackathon Submission*

SafeSpace AI shifts personal safety from reactive to preventive. Instead of relying on SOS buttons after danger occurs, SafeSpace AI uses contextual intelligence (time of day, location data, and simulated historical risk) to predict the safety of a route before the user steps outside.

## ✨ Features
* **📍 Global Location Validation:** Integrates with OpenStreetMap to verify real-world locations.
* **🧠 Dynamic Risk Engine:** Calculates a personalized safety score based on time and environmental context.
* **💬 Explainable AI (XAI):** Provides transparent, human-readable insights explaining *why* an area is flagged as risky.
* **🛣️ Safe Route Simulation:** Visually compares default direct routes against secure, well-lit alternatives.

## 💻 Technology Stack
* **Frontend:** React, Tailwind CSS, Vite
* **Backend:** Python, FastAPI, Uvicorn
* **Data/Logic:** Geopy (Nominatim), Custom Predictive Algorithm

## 🚀 Setup Instructions

### 1. Run the Backend (Python)
Navigate to the `backend` directory, activate your virtual environment, and install dependencies:
\`\`\`bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate
pip install fastapi uvicorn pydantic geopy
uvicorn main:app --reload
\`\`\`
*The backend will run on http://127.0.0.1:8000*

### 2. Run the Frontend (React)
Open a new terminal, navigate to the `frontend` directory, install packages, and start the development server:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
*The frontend will run on http://localhost:5173*

## 🤖 Mandatory AI Disclosure
In accordance with VibeHack rules, AI tools (Gemini) were used during the sprint to accelerate development. 
* **How it was used:** AI acted as a pair-programmer to generate React/Tailwind boilerplate UI code, debug FastAPI routing errors, and brainstorm the overarching architectural structure.
* **Human Contribution:** The core mathematical logic for the Risk Engine, the integration strategy, and the presentation storyline were designed and managed by the human developer.

## 👥 Team
* **Deepak Yadav**
* **Divyanshu Shrivastava** 
* **Soumya Gupta**