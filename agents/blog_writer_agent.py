# agents/blog_writer_agent.py
from llm.openrouter_llm import OpenRouterLLM
from tools.wikipedia_tool import wiki_search
from tools.duckduckgo_tool import ddg_search


def gather_research(topic: str) -> str:
    """Collects combined research data from Wikipedia and DuckDuckGo."""
    print("🔍 Gathering research material...\n")
    wiki_data = wiki_search(topic, sentences=5)
    web_data = ddg_search(f"{topic} latest updates", max_results=3)
    combined = f"WIKIPEDIA SUMMARY:\n{wiki_data}\n\nWEB INSIGHTS:\n{web_data}"
    return combined


def write_blog(topic: str, research: str) -> str:
    """Uses the OpenRouter LLM to write the actual blog content."""
    llm = OpenRouterLLM(model="gpt-3.5-turbo", temperature=0.7)

    prompt = f"""
    You are a professional blog writer.

    Topic: "{topic}"

    Use the following research material to write a well-structured blog post:
    {research}

    Write the blog with the following sections:
    1. **Heading** (title of the blog)
    2. **Introduction** (engaging intro to the topic)
    3. **Content** (rich, factual, informative, well-organized body)
    4. **Summary** (clear and concise wrap-up)

    Make it insightful, human-like, and plagiarism-free.
    """

    response = llm.invoke(prompt)
    return response


def generate_researched_blog(topic: str) -> str:
    """Pipeline: research → synthesis → blog writing."""
    research = gather_research(topic)
    blog = write_blog(topic, research)
    return blog
