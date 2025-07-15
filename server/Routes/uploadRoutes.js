const express = require('express');
const multer = require('multer');
const { uploadFile, getChartData } = require('../Controllers/uploadController');
const protect = require('../Middlewares/authMiddlewares');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('file'), uploadFile);
router.get('/:id/chart-data', protect, getChartData);

module.exports = router;
