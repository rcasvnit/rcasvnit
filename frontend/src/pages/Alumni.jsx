import { useEffect, useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Alumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [filterYear, setFilterYear] = useState('All Time');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('http://localhost:5000/api/alumni')
      .then(res => res.json())
      .then(data => setAlumni(data))
      .catch(err => console.error(err));
  }, []);

  // Get unique years
  const availableYears = [...new Set(alumni.map(a => a.year))].sort((a, b) => b - a);

  // Filter based on selected year
  const filteredAlumni = filterYear === 'All Time' ? alumni : alumni.filter(a => a.year === filterYear);

  // Pagination logic
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  
  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterYear]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="py-24 min-h-screen bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-rajasthan-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6">Our Royal Alumni</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-10"></div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 max-w-3xl mx-auto px-6">
            <label className="text-amber-50 font-royal tracking-widest uppercase text-lg">Select Era:</label>
            <div className="relative">
               <select 
                 className="appearance-none bg-rajasthan-navy/80 border-2 border-rajasthan-gold/50 text-rajasthan-gold font-royal font-bold tracking-widest text-lg px-8 py-3 rounded-full hover:border-rajasthan-gold transition-colors focus:outline-none focus:border-rajasthan-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer min-w-[200px]"
                 value={filterYear} 
                 onChange={(e) => setFilterYear(e.target.value)}
               >
                 <option value="All Time">All Time</option>
                 {availableYears.map(year => (
                   <option key={year} value={year}>{year}</option>
                 ))}
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-rajasthan-gold">
                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
               </div>
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence>
            {currentAlumni.map((member, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: (i % itemsPerPage) * 0.05 }}
                key={member._id} 
                className="group relative"
              >
                {/* Decorative Frame Behind */}
                <div className="absolute inset-0 bg-rajasthan-gold rounded-2xl transform translate-x-2 translate-y-2 opacity-30 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
                
                <div className="dark-royal-glass rounded-2xl overflow-hidden relative shadow-2xl group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] transition-shadow duration-500 z-10 outline outline-1 outline-offset-[-4px] outline-rajasthan-gold/30 flex flex-col h-full bg-rajasthan-navy">
                  <div className="h-72 overflow-hidden relative bg-black/50">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-transparent to-transparent opacity-80"></div>
                  </div>
                  
                  <div className="p-6 text-center transform flex-grow flex flex-col justify-end bg-rajasthan-navy relative z-20 -mt-8 pt-8 border-t-2 border-rajasthan-gold/20">
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rajasthan-navy text-rajasthan-gold border border-rajasthan-gold/40 px-4 py-1 rounded-full text-xs font-royal font-bold tracking-widest uppercase shadow-md">{member.year}</span>
                    <h3 className="text-2xl font-bold font-ethnic text-rajasthan-gold mb-4 truncate">{member.name}</h3>
                    
                    <div className="flex justify-center space-x-6 mt-auto pb-2 border-t border-rajasthan-gold/10 pt-4">
                      {member.socialLinks?.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-rajasthan-gold/70 hover:text-white transition-colors transform hover:scale-110">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.socialLinks?.instagram && (
                        <a href={member.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-rajasthan-gold/70 hover:text-white transition-colors transform hover:scale-110">
                          <Instagram size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredAlumni.length === 0 && (
            <div className="col-span-full text-center text-rajasthan-navy/50 py-24 font-royal text-xl">
              No alumni found for this era.
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center flex-wrap items-center gap-4 mt-16 pb-8">
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
export default Alumni;
