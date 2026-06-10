const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { LEGALBOT_PROMPT } = require('../prompts/legalbot');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || process.env.GROK_API_KEY,
});

router.post('/', async (req, res) => {
  const { message, language = 'english', history = [] } = req.body;
  
  const systemPrompt = LEGALBOT_PROMPT.replace('{{LANGUAGE}}', language);
  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-10),
    { role: "user", content: message }
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: process.env.GROQ_MODEL || process.env.GROK_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 600,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";
    res.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error.message);
    res.status(500).json({ reply: "I apologize, the server is currently busy. Please call NALSA helpline at 15100." });
  }
});

module.exports = router;
