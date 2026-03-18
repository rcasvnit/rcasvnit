import express from 'express';
import Event from '../models/Event.js';
import Member from '../models/Member.js';
import Sponsor from '../models/Sponsor.js';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/sponsors', async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ tier: 1 });
    res.json(sponsors);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/messages', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
