// routes/subscriber.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    // prevent duplicates
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    // save to DB
    const newSubscriber = await Subscriber.create({ email });

    // mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send email
    await transporter.sendMail({
      from: `"Excel Analytics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Subscription Confirmed",
      html: `<h2>Thanks for subscribing</h2><p>You’ll receive updates.</p>`,
    });

    res.json({ success: true, data: newSubscriber });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate email" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;