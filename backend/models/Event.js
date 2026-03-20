import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  purpose: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  additionalImages: [{ type: String }],
  type: { type: String, enum: ['past', 'upcoming'], default: 'upcoming' }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
