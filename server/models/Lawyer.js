const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['nalsa', 'probono', 'telelaw'], required: true },
  specialization: [String],
  languages: [String],
  state: { type: String, required: true },
  district: { type: String, required: true },
  phone: String,
  available: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lawyer', lawyerSchema);
