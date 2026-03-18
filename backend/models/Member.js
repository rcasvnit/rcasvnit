import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, enum: ['core', 'design', 'tech', 'management'], required: true },
  imageUrl: { type: String, required: true },
  socialLinks: {
    linkedin: { type: String },
    instagram: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
