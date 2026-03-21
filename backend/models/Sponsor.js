import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  socialLinks: {
    linkedin: { type: String },
    instagram: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Sponsor', sponsorSchema);
