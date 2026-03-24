import express from 'express';
import Event from '../models/Event.js';
import Member from '../models/Member.js';
import Sponsor from '../models/Sponsor.js';
import Message from '../models/Message.js';
import Alumni from '../models/Alumni.js';
import Partner from '../models/Partner.js';
import Gallery from '../models/Gallery.js';
import Album from '../models/Album.js';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rca-uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB Limit
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === (process.env.ADMIN_PASSWORD || 'rca@admin123')) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.json({ success: false, error: 'Invalid password' });
  }
});

router.post('/upload', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File too large. Max 10MB allowed.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (req.file) {
      res.json({ imageUrl: req.file.path });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  });
});

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/events', authenticateToken, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/events/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/events/:id', authenticateToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/members', authenticateToken, async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/members/:id', authenticateToken, async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(member);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/members/:id', authenticateToken, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/alumni', async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ year: -1, name: 1 });
    res.json(alumni);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/alumni', authenticateToken, async (req, res) => {
  try {
    const alumni = new Alumni(req.body);
    await alumni.save();
    res.status(201).json(alumni);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/alumni/:id', authenticateToken, async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(alumni);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/alumni/:id', authenticateToken, async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/sponsors', async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.json(sponsors);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/sponsors', authenticateToken, async (req, res) => {
  try {
    const sponsor = new Sponsor(req.body);
    await sponsor.save();
    res.status(201).json(sponsor);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/sponsors/:id', authenticateToken, async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(sponsor);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/sponsors/:id', authenticateToken, async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/partners', async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/partners', authenticateToken, async (req, res) => {
  try {
    const partner = new Partner(req.body);
    await partner.save();
    res.status(201).json(partner);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/partners/:id', authenticateToken, async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(partner);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/partners/:id', authenticateToken, async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});



router.post('/messages', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // Use STARTTLS for port 587
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'rca.svnit@gmail.com',
          subject: `RCA Contact: New Message from ${req.body.name}`,
          text: `Name: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message}`
        });
      }
    } catch (mailErr) {
      console.error('Email failed to send:', mailErr);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Gallery Routes
router.get('/gallery', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ year: -1, createdAt: -1 });
    res.json(images);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/gallery', authenticateToken, async (req, res) => {
  try {
    const image = new Gallery(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/gallery/:id', authenticateToken, async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(image);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/gallery/:id', authenticateToken, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// Album (Event Album Links) Routes
router.get('/albums', async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/albums', authenticateToken, async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/albums/:id', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(album);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/albums/:id', authenticateToken, async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

export default router;
