# Text-Chat-Analysis

I have mentioned how to run backend and frontend inside the backend README.md and frontend README.md

## Approach:
This project integrates a Flask backend with a React frontend to perform text analysis, including sentiment analysis and keyword extraction using Hugging Face API models. 

### Flask Backend (`app.py`):

1. **Setup and Dependencies**:
   - Imports necessary libraries including Flask, Flask-CORS for cross-origin requests, and requests for HTTP interactions.

2. **Hugging Face API Integration**:
   - Defines endpoints and API details for:
     - Sentiment analysis (`avichr/heBERT_sentiment_analysis`)
     - Keyword extraction (`transformer3/H2-keywordextractor`)

3. **Utility Functions**:
   - `query_sentiment(payload)`: Sends text data to the sentiment analysis API endpoint.
   - `query_keywords(payload)`: Sends text data to the keyword extraction API endpoint.

4. **Routes**:
   - `/`: Displays a welcome message.
   - `/analyze` (POST): Accepts text input, performs sentiment analysis and keyword extraction, and returns results in JSON format.

### React Frontend (`TextInput.js`):

1. **Components and State Management**:
   - Manages text input, analysis results (summary, sentiment, keywords) using React's state management hooks (`useState`).

2. **Event Handlers**:
   - `handleTextChange`: Updates state with text input changes.
   - `handleSubmit`: Sends text to the Flask backend (`/analyze` endpoint) via Axios on button click, updates state with analysis results.

3. **UI Design**:
   - Utilizes Material-UI components for structured UI layout.
   - Displays text input area, analyze button, and results sections for summary, sentiment analysis, and extracted keywords.

4. **Formatting Functions**:
   - `formatSentiment(sentiment)`: Formats sentiment analysis results for display.

### Summary:

This application enables users to input text, which is then analyzed for sentiment and keywords using Hugging Face's pre-trained models. The Flask backend manages API interactions and data processing, while the React frontend provides an intuitive interface for users to input text, initiate analysis, and view the analyzed results in real-time.
