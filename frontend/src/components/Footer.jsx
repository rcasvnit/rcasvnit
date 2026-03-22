import { Heart, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-rajasthan-navy bg-texture-mandala bg-blend-multiply relative text-white py-14 border-t-8 border-rajasthan-gold mt-12">
      <div className="absolute inset-0 bg-rajasthan-navy/90 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-ethnic font-bold tracking-wider mb-4 text-rajasthan-gold uppercase flex items-center justify-center md:justify-start gap-3">
              <img src="/RCA%20png.jpeg" alt="RCA Logo" className="w-10 h-10 rounded-full border border-rajasthan-gold shadow-md object-cover" />
              RCA SVNIT
            </h3>
            <p className="text-amber-50 max-w-sm mx-auto md:mx-0 leading-relaxed text-sm">
              Celebrating and preserving the rich heritage, traditions, and vibrant culture of Rajasthan right here at SVNIT Surat.
            </p>
            <div className="mt-6 flex items-center justify-center md:justify-start space-x-2 text-amber-200 text-sm font-medium bg-black/20 px-3 py-1.5 rounded-full w-max mx-auto md:mx-0">
              <span>Made with</span>
              <Heart size={14} className="text-rajasthan-pink fill-current" />
              <span>by RCA Tech Team</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold font-ethnic text-rajasthan-pink mb-4 uppercase tracking-[0.2em] border-b border-white/10 pb-2">Quick Links</h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs md:text-sm">
              <Link to="/" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; Home</Link>
              <Link to="/about" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; About Us</Link>
              <Link to="/events" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; Utsav (Events)</Link>
              <Link to="/team" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; Royal Council</Link>
              <Link to="/alumni" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; Alumni</Link>
              <Link to="/gallery" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; Gallery</Link>
              <Link to="/bhamashah" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; Bhamashah</Link>
              <Link to="/partners" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block">&rsaquo; Partners</Link>
              <Link to="/contact" className="text-amber-100/70 hover:text-rajasthan-gold hover:translate-x-1 transition-all inline-block col-span-2">&rsaquo; Contact Us</Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold font-ethnic text-rajasthan-pink mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Reach Out</h4>
            <ul className="space-y-4 text-sm text-amber-50">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-rajasthan-gold flex-shrink-0 mt-0.5" />
                <span>SVNIT Surat</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-rajasthan-gold flex-shrink-0" />
                <a href="mailto:rca.svnit@gmail.com" className="hover:text-white transition-colors">rca.svnit@gmail.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm">
                <Phone size={18} className="text-rajasthan-gold flex-shrink-0" />
                <a href="tel:+919664333251" className="hover:text-rajasthan-gold transition-colors font-sans">+91 96643 33251</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-amber-200/70">
          <p>&copy; {new Date().getFullYear()} Rajasthan Cultural Association, SVNIT. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link to="/admin" className="hover:text-amber-400 transition-colors uppercase tracking-wider font-bold">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
