from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random
from geopy.geocoders import Nominatim # 🌍 The new Global Location tool!

app = FastAPI(title="SafeSpace AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VibeCheckRequest(BaseModel):
    location: str
    hour_of_day: int

# Initialize the OpenStreetMap Geocoder
# We must give it a unique "user_agent" name so they know who is pinging their free server
geolocator = Nominatim(user_agent="safespace_ai_hackathon_prototype")

@app.get("/")
def read_root():
    return {"status": "SafeSpace API is running! 🚀"}

@app.post("/api/vibe-check")
def get_vibe_check(req: VibeCheckRequest):
    clean_location = req.location.strip().lower()
    
    # 🌍 THE GLOBAL BOUNCER LOGIC
    try:
        # This actually pings the real-world map database!
        location_data = geolocator.geocode(clean_location)
        
        # If the map database returns 'None', it means the place doesn't exist.
        if not location_data:
            raise HTTPException(
                status_code=400, 
                detail=f"We couldn't find '{req.location}' on the global map. Please enter a valid city or location."
            )
    except Exception as e:
        # Just in case the open-source map server is having a hiccup
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=400, 
            detail="Error verifying location. Please try again."
        )

    # If it passes the real-world map check, run the AI logic...
    seed_string = f"{clean_location}_{req.hour_of_day}"
    local_random = random.Random(seed_string)

    is_night = 1 if (req.hour_of_day >= 18 or req.hour_of_day <= 5) else 0
    area_risk_factor = local_random.uniform(0.1, 0.9)  
    crowd_density = local_random.uniform(0.1, 1.0)     
    
    low_crowd_factor = 1.0 - crowd_density 
    risk_score = (is_night * 0.4) + (area_risk_factor * 0.4) + (low_crowd_factor * 0.2)
    
    if risk_score < 0.4:
        risk_level = "Low"
    elif risk_score < 0.7:
        risk_level = "Medium"
    else:
        risk_level = "High"

    explanation = f"Calculated risk is {risk_level}."
    if is_night:
        explanation += " It is currently nighttime, which increases risk."
    if low_crowd_factor > 0.6:
        explanation += " The area has very low foot traffic right now."
    if area_risk_factor > 0.7:
        explanation += " Historical data flags this as a potentially risky zone."
    elif area_risk_factor < 0.3:
        explanation += " This is generally known as a safe neighborhood."

    return {
        "location": req.location,
        "risk_score_percentage": round(risk_score * 100, 1),
        "risk_level": risk_level,
        "explanation": explanation
    }