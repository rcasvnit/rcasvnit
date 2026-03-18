import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import Member from './models/Member.js';
import Sponsor from './models/Sponsor.js';

dotenv.config();

const dummyEvents = [
  { title: "Diwali Mela", description: "Grand celebration of lights, dance and ethnic food.", date: new Date("2026-11-05"), location: "Main Campus Auditorium", imageUrl: "https://images.unsplash.com/photo-1543330691-88849b28fb3c?auto=format&fit=crop&q=80&w=800", type: "upcoming" },
  { title: "Rajputana Fest", description: "Cultural performances, folk dances like Ghoomar, and royal feasts.", date: new Date("2025-05-10"), location: "Open Air Theatre", imageUrl: "https://images.unsplash.com/photo-1599661559684-6997b830d1d2?auto=format&fit=crop&q=80&w=800", type: "past" },
  { title: "Holi Milan", description: "Festival of colors and unity.", date: new Date("2026-03-20"), location: "University Ground", imageUrl: "https://images.unsplash.com/photo-1560076756-74fcce779673?auto=format&fit=crop&q=80&w=800", type: "past" }
];

const dummyMembers = [
  { name: "Rahul Singh Rajput", role: "President", department: "management", imageUrl: "https://i.pravatar.cc/150?img=11", socialLinks: { linkedin: "#", instagram: "#" } },
  { name: "Priya Rathore", role: "Design Head", department: "design", imageUrl: "https://i.pravatar.cc/150?img=5", socialLinks: { linkedin: "#", instagram: "#" } },
  { name: "Amit Sharma", role: "Tech Lead", department: "tech", imageUrl: "https://i.pravatar.cc/150?img=12", socialLinks: { linkedin: "#" } },
  { name: "Sneha Shekhawat", role: "Core Member", department: "core", imageUrl: "https://i.pravatar.cc/150?img=9", socialLinks: { instagram: "#" } }
];

const dummySponsors = [
  { name: "Royal Tech", tier: "platinum", logoUrl: "https://placehold.co/150x80/FFC107/FFF?text=Royal+Tech" },
  { name: "Desert Foods", tier: "gold", logoUrl: "https://placehold.co/150x80/FF9800/FFF?text=Desert+Foods" },
  { name: "Jaipur Jewels", tier: "silver", logoUrl: "https://placehold.co/150x80/9E9E9E/FFF?text=Jaipur+Jewels" }
];

async function seedData() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rca';
    await mongoose.connect(MONGO_URI);
    await Event.deleteMany({});
    await Member.deleteMany({});
    await Sponsor.deleteMany({});
    
    await Event.insertMany(dummyEvents);
    await Member.insertMany(dummyMembers);
    await Sponsor.insertMany(dummySponsors);
    console.log('Dummy data seeded into ' + MONGO_URI);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedData();
