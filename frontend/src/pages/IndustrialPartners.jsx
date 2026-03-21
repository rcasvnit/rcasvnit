import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Building2 } from 'lucide-react';

const IndustrialPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('http://localhost:5000/api/partners')
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error(err));
  }, []);

  const categories = ['All', ...new Set(partners.map(p => p.category).filter(Boolean))];

  const filtered = filter === 'All' ? partners : partners.filter(p => p.category === filter);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentPartners = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when filter changes
  const handleFilter = (cat) => { setFilter(cat); setCurrentPage(1); };

  return (
    <div className="py-24 min-h-screen bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-rajasthan-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6">
            Industrial <span className="text-rajasthan-saffron">Partners</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl font-royal text-amber-50/80">
            Organisations that stand with us in preserving the legacy of Rajasthan and empowering our community.
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-6 py-2 rounded-full font-royal font-bold tracking-widest uppercase text-sm transition-all duration-300 border ${
                  filter === cat
                    ? 'bg-gradient-to-r from-rajasthan-gold to-yellow-500 text-rajasthan-navy border-transparent shadow-lg scale-105'
                    : 'bg-rajasthan-navy/60 text-amber-50 border-rajasthan-gold/30 hover:border-rajasthan-gold hover:text-rajasthan-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {currentPartners.map((partner, i) => (
              <motion.div
                layout
                key={partner._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative"
              >
                {/* Gold shadow offset */}
                <div className="absolute inset-0 bg-rajasthan-gold rounded-2xl transform translate-x-2 translate-y-2 opacity-20 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>

                <div className="dark-royal-glass rounded-2xl overflow-hidden relative shadow-2xl group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.35)] transition-shadow duration-500 z-10 flex flex-col h-full bg-rajasthan-navy border border-rajasthan-gold/20">

                  {/* Image */}
                  <div className="h-52 overflow-hidden relative bg-black/40">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-transparent to-transparent opacity-70"></div>

                    {/* Category Badge */}
                    {partner.category && (
                      <span className="absolute top-4 right-4 bg-rajasthan-navy/80 backdrop-blur-sm text-rajasthan-gold border border-rajasthan-gold/40 px-3 py-1 rounded-full text-xs font-royal font-bold tracking-widest uppercase shadow">
                        {partner.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start gap-3 mb-3">
                      <Building2 size={20} className="text-rajasthan-saffron flex-shrink-0 mt-1" />
                      <h3 className="text-xl font-bold font-ethnic text-rajasthan-gold leading-tight">{partner.name}</h3>
                    </div>

                    <p className="text-amber-100/70 font-royal text-sm leading-relaxed flex-grow mb-6">
                      {partner.description}
                    </p>

                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 border border-rajasthan-gold/50 rounded-full text-rajasthan-gold text-sm font-royal font-bold tracking-widest uppercase hover:bg-rajasthan-gold/10 transition-colors"
                      >
                        <ExternalLink size={15} /> Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-amber-200/50 py-24 font-royal text-xl">
              No partners found in this category yet.
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16 pb-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 border border-rajasthan-gold/50 rounded-full text-rajasthan-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rajasthan-gold/10 transition-colors font-royal tracking-widest uppercase text-sm"
            >
              &larr; Prev
            </button>
            <span className="text-amber-50 font-royal tracking-widest text-sm bg-rajasthan-navy/50 px-4 py-2 rounded-full border border-rajasthan-gold/30 shadow-inner">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
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
export default IndustrialPartners;
