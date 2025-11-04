from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from agents.blog_agent import generate_blog

app = Flask(__name__)
CORS(app)  # allow frontend requests (e.g. from Vercel or Netlify)

@app.route("/")
def home():
    return jsonify({"message": "AI Blog Studio Backend is running!"})

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    topic = data.get("topic", "").strip()

    if not topic:
        return jsonify({"error": "No topic provided"}), 400

    try:
        print(f"🧩 Generating blog for topic: {topic}")
        blog_content = generate_blog(topic)

        # Save output as markdown file
        output_dir = os.path.join(os.path.dirname(__file__), "outputs")
        os.makedirs(output_dir, exist_ok=True)
        filename = os.path.join(output_dir, f"{topic.replace(' ', '_')}.md")

        with open(filename, "w", encoding="utf-8") as f:
            f.write(blog_content)

        return jsonify({"topic": topic, "blog": blog_content})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
