import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  eventName: { type: String, required: true, unique: true },
  year: { type: Number, required: true }, // For sorting purposes
  images: [{ type: String }] // Array of Cloudinary image URLs
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
