# tools/duckduckgo_tool.py
try:
    from langchain_core.tools import Tool  # ✅ newer versions (v0.3+)
except ImportError:
    from langchain.tools import Tool  # ✅ fallback for older versions

from duckduckgo_search import DDGS

def ddg_search(query: str, max_results: int = 3) -> str:
    """Performs a DuckDuckGo search and returns summarized results."""
    with DDGS() as ddgs:
        results = ddgs.text(query, max_results=max_results)
        if not results:
            return f"No search results found for '{query}'."
        combined = "\n".join([f"- {r['title']}: {r['body']}" for r in results])
        return combined

duckduckgo_tool = Tool(
    name="DuckDuckGo Search Tool",
    description="Fetches recent web results for a topic using DuckDuckGo search.",
    func=ddg_search
)
