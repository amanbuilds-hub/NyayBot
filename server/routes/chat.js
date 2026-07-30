const express = require('express');
const router = express.Router();
const client = require('../ai');
const { LEGALBOT_PROMPT } = require('../prompts/legalbot');

router.post('/', async (req, res) => {
  const { message, language = 'english', history = [] } = req.body;

  if (!process.env.OPENROUTER_API_KEY) {
    console.error('Chat API Error: missing OpenRouter API key');
    return res.status(500).json({
      reply: "The AI service is not configured correctly. Please contact the administrator."
    });
  }

  const systemPrompt = LEGALBOT_PROMPT.replace('{{LANGUAGE}}', language);
  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-10),
    { role: "user", content: message }
  ];

  try {
    const chatCompletion = await client.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages: messages,
      temperature: 0.3,
      max_tokens: 600,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";
    return res.json({ reply });
  } catch (error) {
    const errorMessage = error?.status === 401 || error?.code === 'invalid_api_key' || error?.message?.includes('Invalid API Key')
      ? "The OpenRouter API key is invalid or expired. Please update the server configuration."
      : "I apologize, the server is currently busy. Please call NALSA helpline at 15100.";

    console.error('Chat API Error:', error?.message || error);
    return res.status(error?.status || 500).json({ reply: errorMessage });
  }
});

module.exports = router;
