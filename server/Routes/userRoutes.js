const express = require('express');
const router = express.Router();
const User = require('../models/user');
const protect = require('../Middlewares/authMiddlewares');
const {  getUserById, updateUser } = require('../Controllers/userController');


router.get('/:id', protect, getUserById );
router.put('/update/:id', protect, updateUser);  

module.exports = router;
