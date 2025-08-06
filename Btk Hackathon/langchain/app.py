from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from category_classifier import category_chain
from chains import get_chain_for_category, seo_chain

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DescriptionRequest(BaseModel):
    description: str
    language: str  

class MarketingRequest(BaseModel):
    description: str
    language: str

class SeoRequest(BaseModel):
    marketing_text: str
    language: str

@app.post("/generate-marketing")
def generate_marketing(req: MarketingRequest):
    try:
        # Kategori tahmini
        category_output = category_chain.invoke({"description": req.description})
        category = category_output.content.strip()

        # Kategoriye özel pazarlama zincirini al
        description_chain = get_chain_for_category(category, req.language)

        # Pazarlama metni oluştur
        marketing_output = description_chain.invoke({"description": req.description})
        marketing_text = marketing_output.content if hasattr(marketing_output, "content") else str(marketing_output)

        return {
            "category": category,
            "marketing_ideas": marketing_text,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate-seo")
def generate_seo(req: SeoRequest):
    try:
        # Dil bilgisini prompta ekle
        prompt_text = f"Lütfen SEO başlığı ve hashtagleri {req.language} dilinde oluştur. Metin: {req.marketing_text}"

        # seo_chain.invoke fonksiyonuna prompt_text gönderiyoruz
        seo_output = seo_chain.invoke({"description": prompt_text})
        seo_text = seo_output.content if hasattr(seo_output, "content") else str(seo_output)

        lines = seo_text.strip().split("\n")
        title = ""
        hashtags = []

        for line in lines:
            if "Başlık:" in line:
                title = line.replace("Başlık:", "").strip()
            elif "Hashtagler:" in line and "#" in line:
                hashtags = [tag.strip() for tag in line.replace("Hashtagler:", "").split(",") if tag.strip()]

        return {
            "title": title,
            "hashtags": hashtags,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
