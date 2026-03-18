import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const Gallery = () => {
  const images = [
    { id: 1, category: 'festivals', url: "https://images.unsplash.com/photo-1543330691-88849b28fb3c?auto=format&fit=crop&q=80&w=800" },
    { id: 2, category: 'culture', url: "https://images.unsplash.com/photo-1560076756-74fcce779673?auto=format&fit=crop&q=80&w=800" },
    { id: 3, category: 'food', url: "https://images.unsplash.com/photo-1599661559684-6997b830d1d2?auto=format&fit=crop&q=80&w=800" },
    { id: 4, category: 'events', url: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800" },
    { id: 5, category: 'festivals', url: "https://images.pexels.com/photos/10182604/pexels-photo-10182604.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 6, category: 'culture', url: "https://images.pexels.com/photos/10182585/pexels-photo-10182585.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ];

  const categories = ['all', 'festivals', 'culture', 'food', 'events'];
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <div className="py-24 min-h-screen bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-rajasthan-gold mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Gallery of Memories</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-10"></div>
          
          <div className="flex flex-wrap justify-center gap-4 py-6 max-w-4xl mx-auto border-y border-rajasthan-gold/30 bg-rajasthan-navy/50 shadow-inner backdrop-blur-md rounded-full px-4">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-8 py-2 rounded-full font-royal font-bold tracking-widest uppercase text-sm transition-all duration-300 ${
                  filter === c 
                  ? 'bg-gradient-to-r from-rajasthan-maroon to-rajasthan-red text-rajasthan-gold shadow-lg scale-105' 
                  : 'bg-transparent text-amber-50 hover:bg-rajasthan-navy hover:text-rajasthan-gold hover:shadow-md'
                }`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                key={img.id} 
                className="relative group rounded-[30px] overflow-hidden shadow-2xl aspect-square border-4 border-white outline outline-1 outline-offset-2 outline-rajasthan-gold/30"
              >
                <div className="absolute inset-0 bg-rajasthan-navy/10 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                <img 
                  src={img.url} 
                  alt={img.category} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Lightbox Trigger Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-rajasthan-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center z-20">
                  <button 
                    onClick={() => setSelectedImage(img.url)}
                    className="w-16 h-16 bg-rajasthan-gold/80 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 hover:scale-110 hover:bg-rajasthan-gold"
                  >
                    <Maximize2 size={24} />
                  </button>
                  <span className="absolute bottom-8 text-rajasthan-gold font-royal italic uppercase tracking-widest text-sm border-b border-rajasthan-gold/50 pb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-rajasthan-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 text-white hover:text-rajasthan-gold bg-black/50 p-4 rounded-full transition-colors z-50 shadow-2xl"
              >
                <X size={32} />
              </button>
              <motion.img 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage} 
                alt="Enlarged Royal Moment" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(212,175,55,0.3)] border-4 border-rajasthan-gold"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
export default Gallery;
