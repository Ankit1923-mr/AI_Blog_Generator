# llm/openrouter_llm.py
try:
    from langchain_core.language_models.llms import LLM  # newer versions
except ImportError:
    from langchain.llms.base import LLM  # fallback for older ones

from typing import Any, List, Optional
import requests, os
from dotenv import load_dotenv

class OpenRouterLLM(LLM):
    """Custom LangChain LLM wrapper for OpenRouter API"""

    model: str = "gpt-3.5-turbo"
    temperature: float = 0.7

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        load_dotenv()
        API_KEY = os.getenv("OPENROUTER_API_KEY")

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            # "HTTP-Referer": "https://github.com/ankit-blog-generator",
            "X-Title": "BlogGenerator",
        }

        data = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": "You are a helpful writing assistant."},
                {"role": "user", "content": prompt},
            ],
            "temperature": self.temperature,
        }

        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        if response.status_code != 200:
            raise Exception(f"OpenRouter API Error: {response.text}")

        return response.json()["choices"][0]["message"]["content"].strip()

    @property
    def _identifying_params(self) -> dict:
        return {"model": self.model, "temperature": self.temperature}

    @property
    def _llm_type(self) -> str:
        return "openrouter"
