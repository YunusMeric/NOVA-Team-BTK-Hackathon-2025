from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=os.getenv("GOOGLE_API_KEY"))

category_template = """
Aşağıdaki ürün açıklamasına göre ürünün hangi kategoriye ait olduğunu tahmin et:

- Teknoloji
- Moda
- Ev Dekorasyonu
- Oyuncak
- Hediyelik
- Spor & Outdoor
- Kitap ve Kırtasiye
- Diğer


Ürün açıklaması:
{description}
"""

category_prompt = PromptTemplate.from_template(category_template)
category_chain = category_prompt | llm
