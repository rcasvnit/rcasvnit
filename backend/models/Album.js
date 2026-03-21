import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  eventName: { type: String, required: true, unique: true },
  googlePhotosLink: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Album', albumSchema);
