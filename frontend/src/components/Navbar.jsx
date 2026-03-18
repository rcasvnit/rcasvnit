import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/RCA%20png.jpeg" 
              alt="RCA Logo" 
              className="w-12 h-12 rounded-full bg-rajasthan-navy border-2 border-rajasthan-gold shadow-md object-cover"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-ethnic font-bold text-rajasthan-navy tracking-wide leading-tight">
                Rajasthan Culture Association
              </span>
              <span className="text-xs font-bold text-rajasthan-orange tracking-widest uppercase">
                SVNIT Surat
              </span>
            </div>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-rajasthan-navy hover:text-rajasthan-pink font-bold transition-colors uppercase text-sm tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="text-rajasthan-maroon" /> : <Menu className="text-rajasthan-maroon" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-rajasthan-red hover:bg-amber-50 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
