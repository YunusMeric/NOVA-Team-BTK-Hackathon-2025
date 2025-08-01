from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=api_key)

template = """
Ürün açıklaması: {description}

Bu ürün için yaratıcı ve pazarlamaya uygun 3 öneri hazırla.
"""
prompt = PromptTemplate.from_template(template)

description_chain = prompt | llm
