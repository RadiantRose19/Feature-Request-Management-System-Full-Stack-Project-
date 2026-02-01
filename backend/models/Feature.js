const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    unique: true,           // ← this prevents duplicates
    trim: true 
  },
  description: { type: String, required: true },
  status: { type: String, default: 'pending' },   // pending, approved, rejected, etc.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feature', featureSchema);