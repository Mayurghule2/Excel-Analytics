const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../Controllers/uploadController');
const protect = require('../Middlewares/authMiddlewares');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('file'), uploadFile);

module.exports = router;
