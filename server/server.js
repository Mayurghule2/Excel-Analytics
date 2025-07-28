  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const authRoutes = require('./Routes/authRoutes');
  const uploadRoutes = require('./Routes/uploadRoutes');
  const analysisRoutes = require('./Routes/analysisRoutes');
  const adminRoutes = require('./Routes/adminRoutes')
  const contactRoutes = require('./Routes/contactRoute')
  const aiRoutes = require('./Routes/aiRoutes');
const userRoutes = require('./Routes/userRoutes')

  require('dotenv').config();

  const app = express();
  const port = 5000;

  app.use(cors());
  app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

  app.use('/api/auth', authRoutes);
  app.use('/api/uploads', uploadRoutes);
  app.use('/api/analyses', analysisRoutes);
  app.use('/api/admin',adminRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/users', userRoutes);

  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });