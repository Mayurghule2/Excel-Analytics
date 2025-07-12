const express = require("express");
const router = express.Router();
const { register, getUser, login,updateUser, sendOtp,verifyOtp, resetPassword} = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddlewares");

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, getUser);
router.put("/update", authMiddleware, updateUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
