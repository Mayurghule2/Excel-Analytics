const express = require('express');
const { getAllUsers, getAllUploads,getUserById } = require('../Controllers/adminController');
const adminController = require('../Controllers/adminController');

const protect = require('../Middlewares/authMiddlewares');
const adminOnly = require('../Middlewares/adminMiddleware')
const router = express.Router();
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/uploads', protect, adminOnly, getAllUploads);


router.get('/users',  protect, adminOnly, adminController.getAllUsers);
router.put('/users/:id/toggle', protect, adminOnly, adminController.toggleUserStatus);

router.get('/uploads', protect, adminOnly, adminController.getAllUploads);
router.put('/uploads/:id/status', protect, adminOnly, adminController.updateFileStatus);
router.get('/uploads/:id/download', protect, adminOnly, adminController.downloadFile);
router.delete('/uploads/:id', protect, adminOnly, adminController.deleteFile);

router.get('/uploads/:id/analytics', protect, adminOnly, adminController.getAnalytics);
router.get('/uploads/:id/export/csv', protect, adminOnly, adminController.exportCSV);
router.get('/uploads/:id/export/pdf', protect, adminOnly, adminController.exportPDF);



router.get('/stats',protect, adminOnly,  adminController.getDashboardStats);
router.get('/uploads/graph/:type', protect, adminOnly, adminController.getUploadStats);
router.get('/uploads/insights', protect, adminOnly, adminController.getUploadInsights);

router.get('/contact', protect, adminOnly, adminController.getAllContactMessages);
module.exports = router;
