const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const bailRoutes = require('./routes/bail');
const lawyerRoutes = require('./routes/lawyers');

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174').split(',');
app.use(cors({
  origin: (origin, callback) => {
    // Check if origin is allowed by config, or is any localhost/127.0.0.1 port (local development)
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https?:\/\/localhost:\d+$/.test(origin) ||
      /^https?:\/\/127\.0\.0\.1:\d+$/.test(origin)
    ) {
      callback(null, true);
    } else {
      console.error('CORS Rejected Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/chat', chatRoutes);
app.use('/api/bail-check', bailRoutes);
app.use('/api/lawyers', lawyerRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`NyayBot server running on port ${PORT}`);
});
