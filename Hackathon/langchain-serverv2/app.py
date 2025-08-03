from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # <-- bunu ekle
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from chains import description_chain  

load_dotenv()
app = FastAPI()

origins = [
    "http://localhost:3000",    
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],       
    allow_headers=["*"],       
)

class DescriptionRequest(BaseModel):
    description: str

@app.post("/generate-marketing")
def generate_marketing(req: DescriptionRequest):
    try:
        result = description_chain.invoke({"description": req.description})
        return {"marketing_ideas": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
