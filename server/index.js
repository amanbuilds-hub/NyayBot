const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const bailRoutes = require('./routes/bail');
const lawyerRoutes = require('./routes/lawyers');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
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
