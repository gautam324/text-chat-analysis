from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Hugging Face API details for sentiment analysis
SENTIMENT_API_URL = "https://api-inference.huggingface.co/models/avichr/heBERT_sentiment_analysis"
SENTIMENT_API_KEY = "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"
sentiment_headers = {"Authorization": f"Bearer {SENTIMENT_API_KEY}"}

# Hugging Face API details for keyword extraction
KEYWORD_API_URL = "https://api-inference.huggingface.co/models/transformer3/H2-keywordextractor"
KEYWORD_API_KEY = "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"
keyword_headers = {"Authorization": f"Bearer {KEYWORD_API_KEY}"}

def query_sentiment(payload):
    response = requests.post(SENTIMENT_API_URL, headers=sentiment_headers, json=payload)
    return response.json()

def query_keywords(payload):
    response = requests.post(KEYWORD_API_URL, headers=keyword_headers, json=payload)
    return response.json()

@app.route('/')
def index():
    return "Welcome to the Text Analysis API!"

@app.route('/analyze', methods=['POST'])
def analyze_text():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Sentiment analysis
    sentiment_result = query_sentiment({"inputs": text})
    sentiment = sentiment_result[0] if sentiment_result else "Error: Unable to analyze sentiment."

    # Keyword extraction
    keywords_result = query_keywords({"inputs": text})
    keywords = keywords_result if keywords_result else "Error: Unable to extract keywords."

    return jsonify({'text': text, 'sentiment': sentiment, 'keywords': keywords})

if __name__ == '__main__':
    app.run(debug=True)