from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=os.getenv("GOOGLE_API_KEY"))

# Türkçe promptlar
PROMPT_MAP_TR = {
    "Teknoloji": """
Ürün açıklaması: {description}

Bu teknoloji ürünü için ilgi çekici, yenilikçi 3 pazarlama cümlesi yaz.
""",
    "Moda": """
Ürün açıklaması: {description}

Bu moda ürünü için şık, dikkat çekici 3 pazarlama önerisi yaz.
""",
    "Hediyelik": """
Ürün açıklaması: {description}

Bu hediyelik eşya için duygusal ve hediye odaklı 3 pazarlama önerisi yaz.
""",
    "Diğer": """
Ürün açıklaması: {description}

Bu ürün için genel geçer ama etkileyici 3 pazarlama önerisi oluştur.
"""
}

# İngilizce promptlar
PROMPT_MAP_EN = {
    "Teknoloji": """
Product description: {description}

Write 3 innovative and catchy marketing lines for this tech product.
""",
    "Moda": """
Product description: {description}

Write 3 stylish and attention-grabbing marketing suggestions for this fashion product.
""",
    "Hediyelik": """
Product description: {description}

Write 3 emotional and gift-focused marketing suggestions for this gift item.
""",
    "Diğer": """
Product description: {description}

Write 3 general but effective marketing ideas for this product.
"""
}


def get_chain_for_category(category: str, language: str):
    category = category.strip()

    if language.lower() == "tr":
        prompt_map = PROMPT_MAP_TR
    else:
        prompt_map = PROMPT_MAP_EN

    prompt_text = prompt_map.get(category, prompt_map["Diğer"])
    prompt = PromptTemplate.from_template(prompt_text)
    return prompt | llm
