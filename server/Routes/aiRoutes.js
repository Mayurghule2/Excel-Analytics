const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate-insights', async (req, res) => {
  const { tableData } = req.body;

  try {
    const prompt = `
      Analyze the following Excel data and provide key insights, trends, and recommendations in a concise summary:
      ${JSON.stringify(tableData)}
    `;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    res.json({ summary: response.data.choices[0].message.content });
  } catch (error) {
    console.error('ChatGPT error:', error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate insights." });
  }
});

module.exports = router;
