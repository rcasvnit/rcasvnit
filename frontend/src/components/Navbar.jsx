import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-rajasthan-navy/95 backdrop-blur-md shadow-2xl py-2 border-b-2 border-rajasthan-gold' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }} className="relative">
              <div className="absolute inset-0 bg-rajasthan-gold rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity"></div>
              <img src="/RCA%20png.jpeg" alt="RCA Logo" className="w-14 h-14 rounded-full border-2 border-rajasthan-gold shadow-lg relative z-10" />
            </motion.div>
            <div className="flex flex-col">
              <span className={`text-2xl font-ethnic font-extrabold tracking-wider transition-colors duration-300 ${scrolled ? 'text-rajasthan-gold' : 'text-white drop-shadow-md'}`}>RCA</span>
              <span className={`text-xs font-royal tracking-[0.2em] font-bold uppercase transition-colors duration-300 ${scrolled ? 'text-amber-100' : 'text-white drop-shadow-sm'}`}>SVNIT Surat</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`relative px-4 py-2 font-royal font-bold tracking-widest uppercase text-sm transition-all duration-300 group ${
                    isActive ? 'text-rajasthan-gold' : (scrolled ? 'text-amber-50 hover:text-rajasthan-gold' : 'text-white hover:text-rajasthan-gold drop-shadow-md')
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-rajasthan-gold transition-all duration-300 ${isActive ? 'w-3/4' : 'w-0 group-hover:w-1/2'}`}></span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 transition-colors duration-300 ${scrolled ? 'text-rajasthan-gold' : 'text-white drop-shadow-md'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-rajasthan-navy/95 backdrop-blur-xl border-b border-rajasthan-gold overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`block w-full text-center px-4 py-3 font-ethnic text-lg uppercase tracking-widest border-b border-white/5 ${
                    location.pathname === link.path ? 'text-rajasthan-gold bg-white/5' : 'text-amber-100 hover:text-rajasthan-gold hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
