import { useEffect, useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('http://localhost:5000/api/sponsors')
      .then(res => res.json())
      .then(data => setSponsors(data))
      .catch(err => console.error(err));
  }, []);

  const totalPages = Math.ceil(sponsors.length / itemsPerPage);
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const currentSponsors = sponsors.slice(indexOfFirst, indexOfFirst + itemsPerPage);

  return (
    <div className="py-24 min-h-screen bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-rajasthan-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6">
            Our <span className="text-rajasthan-saffron">Bhamashah</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl font-royal text-amber-50/80">
            We extend our heartfelt gratitude to the guardians of our heritage who help us keep the traditions alive and thriving.
          </p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence>
            {currentSponsors.map((sponsor, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                key={sponsor._id} 
                className="group relative"
              >
                <div className="absolute inset-0 bg-rajasthan-gold rounded-2xl transform translate-x-2 translate-y-2 opacity-30 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
                
                <div className="dark-royal-glass rounded-2xl overflow-hidden relative shadow-2xl group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] transition-shadow duration-500 z-10 outline outline-1 outline-offset-[-4px] outline-rajasthan-gold/30 flex flex-col h-full bg-rajasthan-navy">
                  <div className="h-72 overflow-hidden relative bg-black/50">
                    <img 
                      src={sponsor.imageUrl} 
                      alt={sponsor.name} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-transparent to-transparent opacity-80"></div>
                  </div>
                  
                  <div className="p-6 text-center flex-grow flex flex-col justify-end bg-rajasthan-navy relative z-20 -mt-8 pt-8 border-t-2 border-rajasthan-gold/20">
                    <h3 className="text-2xl font-bold font-ethnic text-rajasthan-gold mb-4 truncate">{sponsor.name}</h3>
                    
                    <div className="flex justify-center space-x-6 mt-auto pb-2 border-t border-rajasthan-gold/10 pt-4">
                      {sponsor.socialLinks?.linkedin && (
                        <a href={sponsor.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-rajasthan-gold/70 hover:text-white transition-colors transform hover:scale-110">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {sponsor.socialLinks?.instagram && (
                        <a href={sponsor.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-rajasthan-gold/70 hover:text-white transition-colors transform hover:scale-110">
                          <Instagram size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sponsors.length === 0 && (
            <div className="col-span-full text-center text-amber-200/50 py-24 font-royal text-xl">
              No Bhamashah found yet. Be the first to support our legacy!
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16 pb-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 border border-rajasthan-gold/50 rounded-full text-rajasthan-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rajasthan-gold/10 transition-colors font-royal tracking-widest uppercase text-sm"
            >
              &larr; Prev
            </button>
            <span className="text-amber-50 font-royal tracking-widest text-sm bg-rajasthan-navy/50 px-4 py-2 rounded-full border border-rajasthan-gold/30 shadow-inner">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 border border-rajasthan-gold/50 rounded-full text-rajasthan-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rajasthan-gold/10 transition-colors font-royal tracking-widest uppercase text-sm"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Sponsors;
