import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Partner', partnerSchema);
