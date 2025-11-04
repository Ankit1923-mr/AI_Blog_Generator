try:
    from langchain_core.tools import Tool
except ImportError:
    from langchain.tools import Tool

import wikipediaapi

def wiki_search(query: str, sentences: int = 3) -> str:
    """Search Wikipedia and return a brief summary."""
    user_agent = "BlogAgent/1.0 (https://github.com/ankit-blog-generator)"
    wiki_wiki = wikipediaapi.Wikipedia(
        user_agent=user_agent,
        language="en"
    )

    page = wiki_wiki.page(query)

    if not page.exists():
        return f"No Wikipedia page found for '{query}'."

    summary = page.summary
    sentences_list = summary.split(". ")
    return ". ".join(sentences_list[:sentences]) + "."

wikipedia_tool = Tool(
    name="Wikipedia Search Tool",
    description="Searches Wikipedia for factual information about a given topic.",
    func=wiki_search
)
