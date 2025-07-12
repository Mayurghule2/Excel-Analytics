const express = require('express');
const { saveAnalysis, saveAIInsight } = require('../Controllers/analysisController');
const protect = require('../Middlewares/authMiddlewares');

const router = express.Router();
router.post('/save', protect, saveAnalysis);
router.post('/ai-insight', protect, saveAIInsight);

module.exports = router;
