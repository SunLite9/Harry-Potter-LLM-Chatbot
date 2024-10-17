import React, { useState } from 'react';
import './App.css';
import { Client } from "@gradio/client";

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const askQuestion = async () => {
    setSubmitted(true);
    setLoading(true);
    setResponse('');

    if (!query) {
      setResponse("⚠️ Please enter a question.");
      setLoading(false);
      return;
    }

    try {
      // initialize the Gradio client and make the API request
      const client = await Client.connect("https://fa64eccda7eadb8247.gradio.live/"); // new API URL
      const result = await client.predict("/predict", { query });


      console.log('API Result:', result.data);

      setResponse(`Question: ${query}\n\nAnswer: ${result.data}`);
    } catch (error) {
      setResponse("An error occurred while fetching the answer.");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="container">
      <h1>Harry Potter Q&amp;A Chatbot</h1>

      <input
        type="text"
        id="question-input"
        placeholder="Ask your Harry Potter question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <button onClick={askQuestion}>Accio Answers</button>

      {loading && (
        <div id="loading">⚡ Your question is being processed... 🧙‍♂️</div>
      )}

      {submitted && !loading && (
        <div id="submitted-message">✨ Question submitted successfully! ✨</div>
      )}

      {response && (
        <div id="answer">
          <div className="answer-text">{response}</div>
        </div>
      )}
    </div>
  );
}

export default App;
