import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rajasthan-navy text-white py-12 border-t-4 border-rajasthan-gold mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-ethnic font-bold tracking-wider mb-2 text-rajasthan-gold">Rajasthan Culture Association</h3>
            <p className="text-amber-50 max-w-sm">Celebrating and preserving the rich heritage, traditions, and vibrant culture of Rajasthan at SVNIT Surat.</p>
          </div>
          <div className="flex items-center space-x-2 text-amber-200 font-medium bg-black/20 px-4 py-2 rounded-full">
            <span>Made with</span>
            <Heart size={16} className="text-rajasthan-red fill-current" />
            <span>by RCA Tech Team</span>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-amber-200">
          &copy; {new Date().getFullYear()} Rajasthan Culture Association, SVNIT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
