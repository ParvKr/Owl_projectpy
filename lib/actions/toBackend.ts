import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState(''); 
  const [response, setResponse] = useState('');

  const sendPrompt = async () => {
    try {
      const backendURL = 'http://127.0.0.1:5000/api/prompt';
      const res = await axios.post(backendURL, { prompt: prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error sending prompt:', error);
    }
  }
}

export default App;
