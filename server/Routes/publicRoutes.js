// routes/publicStats.js
const express = require("express");
const router = express.Router();
const { getPublicStats } = require("../controllers/publicStatsController");

router.get("/stats/public", getPublicStats);

module.exports = router;