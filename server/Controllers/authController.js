const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    pincode,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password_hash,
      firstName,
      lastName,
      country,
      state,
      city,
      pincode,
    });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User registered",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        state: state,
        city: user.city,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password_hash");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user._id; 

  const {
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    pincode
  } = req.body;

  const allowedUpdates = {
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    pincode
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).select("-password_hash");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

let otpStore = {};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mayur.ghule05@gmail.com',
      pass: 'aocl tcgb rfju rpuw', 
    },
  });

  const mailOptions = {
    from: 'mayur.ghule05@gmail.com',
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};


exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "No OTP found" });
  if (Date.now() > record.expiresAt) return res.status(400).json({ message: "OTP expired" });

  if (parseInt(otp) === record.otp) {
    delete otpStore[email]; 
    res.status(200).json({ message: "OTP verified" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password_hash = hashed;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};