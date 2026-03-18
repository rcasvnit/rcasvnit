import mongoose from 'mongoose';

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tier: { type: String, enum: ['platinum', 'gold', 'silver'], required: true },
  logoUrl: { type: String, required: true },
  website: { type: String }
}, { timestamps: true });

export default mongoose.model('Sponsor', sponsorSchema);
