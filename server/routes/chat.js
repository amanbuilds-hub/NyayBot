const express = require('express');
const axios = require('axios');
const router = express.Router();
const { LEGALBOT_PROMPT } = require('../prompts/legalbot');

router.post('/', async (req, res) => {
  const { message, language = 'english', history = [] } = req.body;
  
  const systemPrompt = LEGALBOT_PROMPT.replace('{{LANGUAGE}}', language);
  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-10),
    { role: "user", content: message }
  ];

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openrouter/free",
        messages,
        max_tokens: 600,
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:5173',
          'X-Title': 'NyayBot'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error.response?.data || error.message);
    res.status(500).json({ reply: "I apologize, the server is currently busy. Please call NALSA helpline at 15100." });
  }
});

module.exports = router;
