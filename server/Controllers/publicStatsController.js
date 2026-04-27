// controllers/publicStatsController.js
const User = require("../models/user");
const UploadHistory = require("../models/UploadHistory");

exports.getPublicStats = async (req, res) => {
  try {
    const users = await User.find();
    const files = await UploadHistory.find();

    res.json({
      usersCount: users.length,
      filesCount: files.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
};