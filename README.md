# 🤖 AI Blog Generator

[![Deploy Backend on Render](https://img.shields.io/badge/Deploy%20Backend-Render-0099ff?style=for-the-badge&logo=render)](https://render.com/)
[![View Frontend on GitHub Pages](https://img.shields.io/badge/View%20Frontend-GitHub%20Pages-181717?style=for-the-badge&logo=github)](https://ankit1923-mr.github.io/AI_Blog_Generator/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![LangChain](https://img.shields.io/badge/LangChain-AI_Framework-43B02A?style=for-the-badge)](https://www.langchain.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🧭 Overview

**AI Blog Generator** is a full-stack AI-powered web app that generates complete, well-researched, and publication-ready blog posts based on any topic you provide.  
It combines **LangChain**, **OpenRouter LLM**, and **web-based research (Wikipedia + DuckDuckGo)** to craft engaging, factual, and SEO-optimized blogs with a futuristic ChatGPT-like interface.

---

## 🌍 Live Demo

- 🌐 **Frontend (GitHub Pages):** [https://ankit1923-mr.github.io/AI_Blog_Generator/](https://ankit1923-mr.github.io/AI_Blog_Generator/)  
- ⚙️ **Backend (Render):** [https://ai-blog-generator-backend-h2mv.onrender.com](https://ai-blog-generator-backend-h2mv.onrender.com)

---

## 🧠 System Architecture

```mermaid
graph TD
    A[User Enters Topic] --> B[Frontend (HTML/CSS/JS)]
    B -->|POST /generate| C[Flask Backend (Render)]
    C --> D[Research Tools (Wikipedia + DuckDuckGo)]
    D --> E[OpenRouter LLM via LangChain]
    E --> F[Blog Writer Agent (Heading, Intro, Content, Summary)]
    F --> G[Blog Saved as Markdown (/outputs)]
    G --> H[Displayed on Frontend (ChatGPT-like Interface)]
```

🚀 Features
-----------

✅ **ChatGPT-style UI** --- Clean, glassy interface built with pure HTML/CSS/JS\
✅ **AI-generated blog posts** --- Structured (Heading, Intro, Content, Summary)\
✅ **Research-backed content** --- Combines Wikipedia + DuckDuckGo search results\
✅ **Markdown output** --- Automatically saved in `/outputs` folder\
✅ **Real-time AI feel** --- Smooth animations and futuristic visuals\
✅ **Fully hosted** --- Backend on Render, Frontend on GitHub Pages

* * * * *

🧩 Project Structure
--------------------

`AI_Blog_Generator/
├── agents/
│   └── blog_writer_agent.py       # Core logic: research + writing workflow
│
├── llm/
│   └── openrouter_llm.py          # Handles OpenRouter model communication
│
├── tools/
│   ├── wikipedia_tool.py          # Wikipedia research integration
│   └── duckduckgo_tool.py         # DuckDuckGo web scraping integration
│
├── outputs/                       # Stores generated .md blogs
│
├── frontend/
│   ├── index.html                 # Main webpage (ChatGPT-style UI)
│   ├── style.css                  # Futuristic dark glassy theme
│   └── script.js                  # Handles user input + backend calls
│
├── app.py                         # Flask backend entry point
├── main.py                        # Local CLI interface for testing
├── requirements.txt               # Python dependencies
├── .env                           # API keys (not committed)
├── .gitignore                     # Files to ignore
└── README.md                      # This documentation 🚀`

* * * * *

⚙️ Local Setup Guide
--------------------

### 1️⃣ Clone Repository

`git clone https://github.com/Ankit1923-mr/AI_Blog_Generator.git
cd AI_Blog_Generator`

### 2️⃣ Create Virtual Environment

`python -m venv venv
venv\Scripts\activate   # Windows
# or
source venv/bin/activate  # macOS/Linux`

### 3️⃣ Install Dependencies

`pip install -r requirements.txt`

### 4️⃣ Add API Key

Create a `.env` file in the root directory:

`OPENROUTER_API_KEY=your_openrouter_api_key_here`

### 5️⃣ Run Flask Server

`python app.py`

Backend available at:\
👉 `http://127.0.0.1:5000`

### 6️⃣ Run Frontend

Open `/frontend/index.html` directly in your browser.

* * * * *

🌐 Deployment
-------------

### 🚀 Backend on Render

1.  Push your repo to GitHub.

2.  Go to [Render.com](https://render.com/).

3.  Create a **New Web Service** → connect repo.

4.  Set:

    `Start Command: python app.py
    Environment: Python 3.11+`

5.  Add environment variable:

    `OPENROUTER_API_KEY = your_api_key`

6.  Deploy 🚀\
    Live at:\
    `https://ai-blog-generator-backend-h2mv.onrender.com`

* * * * *

### 🌎 Frontend on GitHub Pages

Since your frontend is already in `/frontend`:

`git subtree push --prefix frontend origin gh-pages`

Then:

1.  Go to **Settings → Pages**

2.  Under "Source", select:

    `Deploy from branch
    Branch: gh-pages
    Folder: /(root)`

3.  Click **Save** ✅

Your site will be live at:\
`https://ankit1923-mr.github.io/AI_Blog_Generator/`

* * * * *

🧾 API Reference
----------------

### Endpoint

`POST /generate`

### Request Example

`{
  "topic": "Artificial Intelligence in Healthcare"
}`

### Response Example

`{
  "blog": "# Artificial Intelligence in Healthcare\n\n**Heading:** ..."
}`

* * * * *

🎨 UI Preview
-------------

*A dark-glass ChatGPT-style layout with floating input bar, glowing buttons, and markdown-rendered results.*

* * * * *

🧩 Tech Stack
-------------

| Layer | Technology |
| --- | --- |
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Python (Flask) |
| **AI Model** | OpenRouter (GPT-based) |
| **Framework** | LangChain |
| **Data Sources** | Wikipedia, DuckDuckGo |
| **Hosting** | Render (Backend), GitHub Pages (Frontend) |

* * * * *

🧠 Environment Variables
------------------------

| Variable | Description |
| --- | --- |
| `OPENROUTER_API_KEY` | Your private API key from [OpenRouter.ai](https://openrouter.ai) |

* * * * *

🧑‍💻 Author
------------

**Ankit Kumar**\
💼 [GitHub Profile](https://github.com/Ankit1923-mr)

* * * * *

📜 License
----------

This project is licensed under the **MIT License**.\
You are free to use, modify, and distribute this software with proper credit.

* * * * *

💬 Feedback & Contributions
---------------------------

Pull requests are welcome!\
If you'd like to contribute (e.g., UI enhancements or AI prompt optimization), feel free to fork the repo and submit a PR.

* * * * *

**✨ The Future of Blogging is AI-Driven --- You Just Provide the Idea. ✨**

