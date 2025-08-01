from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from chains import description_chain  

load_dotenv()
app = FastAPI()

class DescriptionRequest(BaseModel):
    description: str

@app.post("/generate-marketing")
def generate_marketing(req: DescriptionRequest):
    try:
        result = description_chain.invoke({"description": req.description})
        return {"marketing_ideas": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
