# 🧠 Blog Generation System (LangChain + OpenRouter)

> **An intelligent agent-based system that researches and writes high-quality blogs automatically using AI and real-world data.**

---

## 📘 Overview

**Blog Generation System** is an AI-powered, agent-based Python application that automatically:
1. **Researches** a given topic using Wikipedia and DuckDuckGo search tools.
2. **Generates** a well-structured, factual, and human-like blog using the **OpenRouter API**.
3. **Saves** the final blog in clean Markdown format for easy publishing or documentation.

This project demonstrates the use of **LangChain Agents**, **tool orchestration**, and **LLM integration** to build intelligent systems that combine reasoning, research, and creativity.

---

## 🚀 Key Features

✅ Multi-tool research system (Wikipedia + DuckDuckGo)  
✅ Blog generation using **OpenRouter LLM (GPT-3.5 / LLaMA models)**  
✅ Two-stage process: **Research → Writing**  
✅ Structured blogs: Heading, Introduction, Content, Summary  
✅ Auto-save as `.md` with timestamps  
✅ Fully CLI-based (no UI required)  
✅ Modular code design (LLM, Tools, Agents separated)  

---

## 🧩 Architecture
```
User Input (Topic)
       │
       ▼
┌───────────────────┐
│  Research Agent   │
│ ├─ Wikipedia Tool│
│ └─ DuckDuckGo Tool│
└───────────────────┘
       │
       ▼
Combined Research Text
       │
       ▼
┌───────────────────┐
│   Writer Module   │
│ → Uses OpenRouter │
│ → Generates Blog  │
└───────────────────┘
       │
       ▼
Markdown Blog (.md File)

```

---

## 🛠️ Tech Stack

| Component | Technology |
|------------|-------------|
| **Programming Language** | Python 3.11 |
| **LLM Access** | OpenRouter API |
| **AI Framework** | LangChain 0.2.17 |
| **Knowledge Sources** | Wikipedia API, DuckDuckGo Search |
| **Output Format** | Markdown (.md) |
| **Environment Management** | Python `venv` |

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Ankit1923-mr/AI_Blog_Generator.git
cd AI_Blog_Generator
```

### 2️⃣ Create and Activate Virtual Environment

``` bash
py -3.11 -m venv venv311
venv311\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4️⃣ Add Your OpenRouter API Key
```
OPENROUTER_API_KEY=your_api_key_here
```

blog-agent-project/

│

├── agents/

│   ├── blog\_agent.py             # Original LangChain agent (research logic)

│   └── blog\_writer\_agent.py      # Final two-stage research + writer pipeline

│

├── tools/

│   ├── wikipedia\_tool.py         # Wikipedia research tool

│   └── duckduckgo\_tool.py        # DuckDuckGo research tool

│

├── llm/

│   └── openrouter\_llm.py         # Custom LangChain LLM wrapper for OpenRouter

│

├── outputs/                      # Auto-saved blog outputs

│   └── blog\_AI\_in\_Healthcare\_\*.md

│

├── main.py                       # CLI entrypoint

├── requirements.txt

├── .env.example

└── README.md



💻 Usage
--------

Run the system using:

`python main.py`

You'll see:

`🧠 Blog Generation System (OpenRouter + LangChain)

Enter your blog topic: Artificial Intelligence in Healthcare

🔍 Gathering research material...

📝 --- Generated Blog ---

# Artificial Intelligence in Healthcare

**Heading:**
The Future of Healthcare: Harnessing Artificial Intelligence for Better Patient Outcomes

**Introduction:**
Artificial Intelligence (AI) is revolutionizing various industries, and one of the areas where it is making a significant impact is healthcare...
...

💾 Saved to: outputs/blog_Artificial_Intelligence_in_Healthcare_20251104_200047.md`

* * * * *

🧠 Example Output
-----------------

Below is a snippet from an actual generated blog:

`# Artificial Intelligence in Healthcare

**Introduction:**
Artificial Intelligence (AI) is revolutionizing various industries, and one of the areas where it is making a significant impact is healthcare. By leveraging the power of AI, healthcare professionals are able to enhance patient care, improve diagnostics, optimize treatment plans, and streamline administrative tasks.

**Content:**
1. **Enhanced Diagnostics:** AI algorithms can analyze vast amounts of medical data with incredible speed and accuracy.
2. **Personalized Treatment Plans:** AI creates data-driven, individualized healthcare strategies.
3. **Predictive Analytics:** AI helps predict disease progression and identify potential risks.
4. **Administrative Efficiency:** Automates scheduling, documentation, and billing.
5. **Ethical Considerations:** Addresses privacy, bias, and transparency challenges.

**Summary:**
AI is reshaping healthcare by improving patient care, optimizing workflows, and driving better health outcomes.`

* * * * *

🧩 How It Works (Step-by-Step)
------------------------------

1.  **User enters a topic**

    -   Example: `"Artificial Intelligence in Healthcare"`

2.  **Research Phase**

    -   Wikipedia + DuckDuckGo tools fetch relevant information.

3.  **Synthesis Phase**

    -   OpenRouter LLM converts that research into a structured blog.

4.  **Output Phase**

    -   Blog is displayed on the console and saved in `/outputs/`.

* * * * *

🧠 Concept Highlights
---------------------

| Concept | Description |
| --- | --- |
| **Agent-Based AI** | Uses LangChain to simulate decision-making and reasoning. |
| **Tool Integration** | Wikipedia and DuckDuckGo tools act as the agent's "research assistants." |
| **LLM Orchestration** | OpenRouter model converts research into fluent, structured text. |
| **Composability** | The system separates concerns: research, writing, and saving. |

* * * * *

🧾 Sample Outputs Folder
------------------------

Each generated blog is automatically saved in the `/outputs` folder:

`outputs/
├── blog_Artificial_Intelligence_in_Healthcare_20251104_200047.md
├── blog_The_Future_of_Renewable_Energy_20251104_193854.md
└── blog_Climate_Change_and_Technology_20251105_102030.md`

* * * * *

🧰 Requirements
---------------

`langchain<0.3.0
python-dotenv>=1.0.0
wikipedia-api>=0.5.8
duckduckgo-search>=5.3.1
requests>=2.28.0
tqdm>=4.65.0
numpy==1.25.2`

* * * * *

🌟 Future Improvements
----------------------

🔹 Multi-Agent Collaboration (Researcher, Writer, Editor)\
🔹 Integration with **LlamaIndex** for knowledge retrieval\
🔹 Blog Summarization & SEO Keyword Optimization\
🔹 Add Image Integration via Unsplash API\
🔹 Web UI using Streamlit / FastAPI

* * * * *

👨‍💻 Author
------------

**Developed by:** [Ankit Kumar Mishra](https://github.com/Ankit1923-mr)\
**Goal:** Internship-ready demonstration of agent-based AI development using LangChain and OpenRouter.\
**Date:** November 2025

* * * * *

🏁 Summary
----------

This project showcases how **LLMs can act as intelligent agents** that reason, research, and write in structured formats.\
It's not just another text generator --- it's a **thinking, researching, and writing AI system** built using real tools and modern frameworks.

* * * * *

### ⭐ If you like this project, don't forget to star the repo!

`git add .
git commit -m "Final working version of Blog Generation System"
git push origin main`

* * * * *

 `---
✅ Once you paste this into your repository root as `README.md`,
your project will be **professional, submission-ready, and portfolio-grade**.

Would you like me to generate a **shorter GitHub description + tagline (for the repo header and README badges)** next --- so your repository looks polished at first glance?`