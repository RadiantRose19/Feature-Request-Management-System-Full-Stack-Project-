const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// User submits feature
router.post('/', protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Mongoose will throw error if title already exists (because unique: true)
    const feature = new Feature({
      title,
      description,
      createdBy: req.user.id
    });

    await feature.save();
    res.status(201).json(feature);
  } catch (err) {
  console.error("FEATURE ROUTE ERROR:", err);           // ← this will show us the real problem
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  console.error("Error code:", err.code);

  if (err.code === 11000) {
    return res.status(400).json({ message: "Feature title already exists" });
  }

  res.status(500).json({ 
    message: "Server error", 
    error: err.message 
  });
}
});

// User sees own requests
router.get('/my', protect, async (req, res) => {
  const features = await Feature.find({ createdBy: req.user.id });
  res.json(features);
});

// Admin sees all
router.get('/', protect, adminOnly, async (req, res) => {
  const features = await Feature.find().populate('createdBy', 'name email');
  res.json(features);
});

// Admin can update status (example)
router.put('/:id', protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  const feature = await Feature.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!feature) return res.status(404).json({ message: 'Not found' });
  res.json(feature);
});

module.exports = router;