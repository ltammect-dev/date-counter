import express from 'express';
import { Counter } from '../models/Counter.js';

const router = express.Router();

// Lấy tất cả counters
router.get('/', async (req, res) => {
  try {
    const counters = await Counter.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(counters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tạo counter mới
router.post('/', async (req, res) => {
  try {
    const { name, targetDate, description } = req.body;
    
    if (!name || !targetDate) {
      return res.status(400).json({ error: 'Name and target date are required' });
    }

    const counter = new Counter({
      name,
      targetDate: new Date(targetDate),
      description
    });

    await counter.save();
    res.status(201).json(counter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cập nhật counter
router.put('/:id', async (req, res) => {
  try {
    const { name, targetDate, description } = req.body;
    const counter = await Counter.findByIdAndUpdate(
      req.params.id,
      { name, targetDate: new Date(targetDate), description },
      { new: true, runValidators: true }
    );

    if (!counter) {
      return res.status(404).json({ error: 'Counter not found' });
    }

    res.json(counter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Xóa counter (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!counter) {
      return res.status(404).json({ error: 'Counter not found' });
    }

    res.json({ message: 'Counter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;