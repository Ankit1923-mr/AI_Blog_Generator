# main.py
import os
from datetime import datetime
from agents.blog_writer_agent import generate_researched_blog as generate_blog

# --- Optional: Color formatting for terminal output ---
try:
    from colorama import init, Fore, Style
    init(autoreset=True)
except ImportError:
    class Fore:
        CYAN = ""
        GREEN = ""
        YELLOW = ""
        RED = ""
        MAGENTA = ""
        RESET = ""
    class Style:
        BRIGHT = ""
        RESET_ALL = ""


def save_blog(topic: str, content: str) -> str:
    """Save generated blog to /outputs/ folder with timestamp."""
    os.makedirs("outputs", exist_ok=True)
    safe_topic = "_".join(topic.split())
    filename = f"outputs/blog_{safe_topic}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    return filename


def pretty_print_blog(blog: str):
    """Prints the blog in a clean, readable format on the terminal."""
    print(f"\n{Fore.CYAN + Style.BRIGHT}📝 --- Generated Blog ---{Style.RESET_ALL}\n")
    
    lines = blog.strip().splitlines()
    for line in lines:
        if line.startswith("# "):
            print(f"{Fore.MAGENTA + Style.BRIGHT}{line}{Style.RESET_ALL}\n")
        elif line.startswith("**Heading**") or line.startswith("**Introduction**"):
            print(f"{Fore.YELLOW + Style.BRIGHT}{line}{Style.RESET_ALL}\n")
        elif line.startswith("**Content**"):
            print(f"{Fore.GREEN + Style.BRIGHT}{line}{Style.RESET_ALL}\n")
        elif line.startswith("**Summary**"):
            print(f"{Fore.CYAN + Style.BRIGHT}{line}{Style.RESET_ALL}\n")
        else:
            print(f"{Fore.RESET}{line}{Style.RESET_ALL}")
    print()


def main():
    print(f"{Fore.MAGENTA + Style.BRIGHT}🧠 Blog Generation System (OpenRouter + LangChain){Style.RESET_ALL}")
    topic = input(f"\n{Fore.CYAN}Enter your blog topic:{Style.RESET_ALL} ").strip()
    if not topic:
        print(f"{Fore.RED}⚠️ No topic entered. Exiting.{Style.RESET_ALL}")
        return

    print(f"\n{Fore.YELLOW}🔍 Generating blog for: {topic}{Style.RESET_ALL}\n")

    # Generate blog
    blog = generate_blog(topic)

    # Print nicely formatted output
    pretty_print_blog(blog)

    # Save blog to markdown
    filepath = save_blog(topic, blog)
    print(f"{Fore.GREEN}💾 Saved to: {filepath}{Style.RESET_ALL}\n")


if __name__ == "__main__":
    main()
