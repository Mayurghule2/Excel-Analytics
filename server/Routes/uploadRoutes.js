const express = require('express');
const multer = require('multer');
const { uploadFile, getChartData,getAllUploads,deleteUploadById, getUploadById} = require('../Controllers/uploadController');
const protect = require('../Middlewares/authMiddlewares');
const { getUserDashboardData } = require('../Controllers/userController');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('file'), uploadFile);
router.get('/:id/chart-data', protect, getChartData);
router.get('/file',protect, getAllUploads);
router.delete('/:id',protect, deleteUploadById);
router.get('/dashboard/user', protect, getUserDashboardData)
router.get('/user/uploads', protect, getUploadById);

module.exports = router;
