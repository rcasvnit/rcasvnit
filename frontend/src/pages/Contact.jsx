import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Error sending message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error.');
    }
  };

  return (
    <div className="py-16 pt-24 min-h-screen rajasthani-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-ethnic font-bold text-rajasthan-navy mb-6">Reach Out to Us</h1>
          <div className="w-24 h-1 bg-rajasthan-pink mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">Got a question or want to collaborate? Send us a royal decree (or just an email), and we'll get right back to you!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white p-10 rounded-3xl shadow-xl border-l-4 border-rajasthan-pink">
            <h3 className="text-3xl font-bold font-ethnic text-rajasthan-navy mb-8">Send Us a Message</h3>
            {status && <div className="mb-6 p-4 bg-pink-50 text-rajasthan-pink rounded-xl font-medium border border-pink-200">{status}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Your Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border-2 border-amber-50 focus:border-rajasthan-orange focus:ring-rajasthan-orange focus:outline-none transition-colors bg-amber-50/30 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border-2 border-amber-50 focus:border-rajasthan-orange focus:ring-rajasthan-orange focus:outline-none transition-colors bg-amber-50/30 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Subject</label>
                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border-2 border-amber-50 focus:border-rajasthan-orange focus:ring-rajasthan-orange focus:outline-none transition-colors bg-amber-50/30 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Your Message</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} rows="4" className="w-full px-5 py-3 rounded-xl border-2 border-amber-50 focus:border-rajasthan-orange focus:ring-rajasthan-orange focus:outline-none transition-colors bg-amber-50/30 font-medium resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-rajasthan-navy text-rajasthan-gold font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl font-ethnic tracking-wider border-2 border-rajasthan-gold">Send Royal Message</button>
            </form>
          </div>
          
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-xl flex items-center gap-6 border-l-4 border-rajasthan-navy group hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-blue-50 text-rajasthan-navy rounded-full flex items-center justify-center group-hover:bg-rajasthan-navy group-hover:text-white transition-colors">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-rajasthan-navy mb-1 font-ethnic">Our Palace (Office)</h4>
                <p className="text-gray-600 font-medium tracking-wide">Student Activity Center, Main Campus</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl flex items-center gap-6 border-l-4 border-rajasthan-gold group hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-yellow-50 text-rajasthan-gold rounded-full flex items-center justify-center group-hover:bg-rajasthan-gold group-hover:text-white transition-colors">
                <Mail size={28} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-rajasthan-navy mb-1 font-ethnic">Email Queries</h4>
                <p className="text-gray-600 font-medium tracking-wide">hello@rca-association.com</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl flex items-center gap-6 border-l-4 border-rajasthan-pink group hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-pink-50 text-rajasthan-pink rounded-full flex items-center justify-center group-hover:bg-rajasthan-pink group-hover:text-white transition-colors">
                <Phone size={28} />
              </div>
              <div>
                <h4 className="font-bold text-xl text-rajasthan-navy mb-1 font-ethnic">Ring Us</h4>
                <p className="text-gray-600 font-medium tracking-wide">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <iframe 
                title="RCA Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.621456908588!2d75.8119!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDgnNDIuOCJF!5e0!3m2!1sen!2sin!4v1633512345678!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
