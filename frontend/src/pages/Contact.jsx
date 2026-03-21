import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Royal Decree sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else setStatus('Error sending message.');
    } catch (err) { console.error(err); setStatus('Server error.'); }
  };

  return (
    <div className="py-24 min-h-screen bg-immersive-dust outline-none relative overflow-hidden">
      
      {/* Decorative Jharokha framing */}
      <div className="absolute top-0 left-0 w-64 h-64 border-t-8 border-l-8 border-rajasthan-gold/30 rounded-tl-full opacity-50 transform -translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 border-b-8 border-r-8 border-rajasthan-gold/30 rounded-br-full opacity-50 transform translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rajasthan-gold via-amber-200 to-rajasthan-saffron mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] pb-2 inline-block">
            Reach Out <span className="text-rajasthan-saffron">to Us</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl font-royal text-amber-50/90 tracking-wide">Got a question or want to collaborate? Send us a royal decree (or just an email), and we'll get right back to you!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="dark-royal-glass p-12 rounded-[40px] border-t-4 border-rajasthan-saffron shadow-2xl relative"
          >
            <div className="absolute top-0 right-10 w-24 h-24 bg-texture-mandala opacity-10 pt-4 -pr-4 pointer-events-none mix-blend-screen"></div>
            <h3 className="text-4xl font-bold font-ethnic text-rajasthan-gold mb-8">Send a Message</h3>
            
            {status && <div className="mb-8 p-4 bg-rajasthan-navy/80 text-rajasthan-gold border border-rajasthan-gold rounded-xl font-royal tracking-widest text-center shadow-inner">{status}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-royal font-bold text-rajasthan-saffron mb-2 uppercase tracking-[0.2em]">Your Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-rajasthan-gold/30 focus:border-rajasthan-gold focus:ring-1 focus:ring-rajasthan-gold focus:outline-none transition-all bg-rajasthan-navy/50 backdrop-blur-sm font-sans text-white placeholder-gray-400" />
                </div>
                <div>
                  <label className="block text-xs font-royal font-bold text-rajasthan-saffron mb-2 uppercase tracking-[0.2em]">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-rajasthan-gold/30 focus:border-rajasthan-gold focus:ring-1 focus:ring-rajasthan-gold focus:outline-none transition-all bg-rajasthan-navy/50 backdrop-blur-sm font-sans text-white placeholder-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-royal font-bold text-rajasthan-saffron mb-2 uppercase tracking-[0.2em]">Subject</label>
                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border border-rajasthan-gold/30 focus:border-rajasthan-gold focus:ring-1 focus:ring-rajasthan-gold focus:outline-none transition-all bg-rajasthan-navy/50 backdrop-blur-sm font-sans text-white placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-xs font-royal font-bold text-rajasthan-saffron mb-2 uppercase tracking-[0.2em]">Your Decree</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} rows="5" className="w-full px-5 py-4 rounded-xl border border-rajasthan-gold/30 focus:border-rajasthan-gold focus:ring-1 focus:ring-rajasthan-gold focus:outline-none transition-all bg-rajasthan-navy/50 backdrop-blur-sm font-sans text-white placeholder-gray-400 resize-none"></textarea>
              </div>
              <button type="submit" className="w-full btn-royal-solid mt-4">Dispatch Letter</button>
            </form>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="dark-royal-glass p-8 rounded-3xl flex items-center gap-6 border-l-4 border-rajasthan-gold group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-rajasthan-gold/10 text-rajasthan-gold rounded-full flex items-center justify-center border border-rajasthan-gold/20 group-hover:bg-rajasthan-gold group-hover:text-rajasthan-navy transition-colors duration-500">
                <MapPin size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-[0.2em] font-royal uppercase text-amber-100/70 mb-1">Address</h4>
                <p className="text-white text-2xl font-ethnic font-bold">SVNIT Surat</p>
              </div>
            </div>
            
            <div className="dark-royal-glass p-8 rounded-3xl flex items-center gap-6 border-l-4 border-rajasthan-saffron group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-rajasthan-saffron/10 text-rajasthan-saffron rounded-full flex items-center justify-center border border-rajasthan-saffron/20 group-hover:bg-rajasthan-saffron group-hover:text-white transition-colors duration-500">
                <Mail size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-[0.2em] font-royal uppercase text-amber-100/70 mb-1">Email Queries</h4>
                <a href="mailto:rca.svnit@gmail.com" className="text-white text-2xl font-ethnic font-bold hover:text-rajasthan-saffron transition-colors line-clamp-1 block">rca.svnit@gmail.com</a>
              </div>
            </div>
            
            <div className="dark-royal-glass p-8 rounded-3xl flex items-center gap-6 border-l-4 border-rajasthan-red group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 bg-rajasthan-red/10 text-rajasthan-red rounded-full flex items-center justify-center border border-rajasthan-red/20 group-hover:bg-rajasthan-red group-hover:text-white transition-colors duration-500">
                <Phone size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-[0.2em] font-royal uppercase text-amber-100/70 mb-1">Ring Us</h4>
                <a href="tel:+919876543210" className="text-white text-2xl font-ethnic font-bold hover:text-rajasthan-saffron transition-colors">+91 98765 43210</a>
              </div>
            </div>
            
            <div className="h-64 rounded-[40px] overflow-hidden shadow-2xl border-4 border-rajasthan-gold/50 relative">
              <div className="absolute inset-0 bg-rajasthan-navy/5 pointer-events-none z-10 mix-blend-multiply"></div>
              <iframe 
                title="SVNIT Surat Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1627063363364!2d72.78310931533152!3d21.163914885923927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423bbc25e3d74da0!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology%20(SVNIT)!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
