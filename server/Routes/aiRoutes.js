const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate-insights', async (req, res) => {
  const { tableData } = req.body;

  if (!tableData || !Array.isArray(tableData.headers) || !Array.isArray(tableData.rows)) {
    return res.status(400).json({ error: "Invalid tableData format. Expecting { headers: [], rows: [[]] }" });
  }

  const { headers, rows } = tableData;

  try {
    
    const formattedData = rows.map(row =>
      headers.reduce((obj, header, idx) => {
        obj[header] = row[idx];
        return obj;
      }, {})
    );

    const prompt = `
Analyze the following tabular data and provide:
- Key insights
- Trends or anomalies
- Recommendations (if applicable)

Data:
${JSON.stringify(formattedData, null, 2)}
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
          'Content-Type': 'application/json',
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
