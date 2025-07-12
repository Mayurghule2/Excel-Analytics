  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const authRoutes = require('./Routes/authRoutes');
  const uploadRoutes = require('./Routes/uploadRoutes');
  const analysisRoutes = require('./Routes/analysisRoutes');
  const adminRoutes = require('./Routes/adminRoutes')
  const contactRoutes = require('./Routes/contactRoute')
  const aiRoutes = require('./Routes/aiRoutes');
  require('dotenv').config();

  const app = express();
  const port = 5000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // MongoDB Connection
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/uploads', uploadRoutes);
  app.use('/api/analyses', analysisRoutes);
  app.use('/api/admin',adminRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/ai', aiRoutes);

  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });