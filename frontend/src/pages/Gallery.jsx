import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imgRes, albumRes] = await Promise.all([
          fetch('http://localhost:5000/api/gallery'),
          fetch('http://localhost:5000/api/albums')
        ]);
        const imgData = await imgRes.json();
        const albumData = await albumRes.json();
        setEvents(imgData);
        setAlbums(albumData);
      } catch (err) {
        console.error('Failed to fetch gallery data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // For Lightbox navigation - flatten all images across all events
  const allImages = events.flatMap(event => 
    (event.images || []).map(url => ({ 
      url, 
      eventName: event.eventName, 
      title: event.title,
      id: `${event._id}-${url}`
    }))
  );

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    }
  }, [selectedImageIndex, allImages.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  }, [selectedImageIndex, allImages.length]);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handleNext, handlePrev]);

  if (loading) {
    return (
      <div className="min-h-screen bg-immersive-dust flex items-center justify-center">
        <div className="text-rajasthan-gold font-royal animate-pulse text-2xl tracking-[0.3em] uppercase">Opening the Royal Archives...</div>
      </div>
    );
  }

  return (
    <div className="py-24 min-h-screen bg-immersive-dust outline-none relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rajasthan-gold/5 rounded-bl-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rajasthan-saffron/5 rounded-tr-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rajasthan-gold via-amber-200 to-rajasthan-saffron mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] pb-2 inline-block">
            Gallery of <span className="text-rajasthan-saffron">Memories</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-6"></div>
          <p className="font-royal text-amber-50/70 text-lg tracking-wide max-w-2xl mx-auto">
            A visual chronicle of our heritage, celebrations, and royal gatherings.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <div className="dark-royal-glass inline-block p-10 rounded-2xl border border-rajasthan-gold/30">
              <p className="text-rajasthan-gold font-royal text-xl">The archives are currently being curated.</p>
            </div>
          </div>
        ) : (
          events.map((event, eventIdx) => {
            const album = albums.find(a => a.eventName === event.eventName);
            
            return (
              <section key={event._id} className="mb-24">
                {/* Event Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-rajasthan-gold/20 pb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-ethnic font-bold text-rajasthan-gold mb-2">
                      {event.eventName} <span className="text-rajasthan-saffron/60 text-xl font-royal ml-4 tracking-tighter">({event.year})</span>
                    </h2>
                    <div className="h-1 w-20 bg-rajasthan-saffron rounded-full"></div>
                  </div>
                  
                  {album && (
                    <a 
                      href={album.googlePhotosLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-8 py-3 bg-rajasthan-navy/40 border border-rajasthan-gold/50 rounded-full text-rajasthan-gold font-royal font-bold tracking-widest uppercase text-sm hover:bg-rajasthan-gold/10 hover:border-rajasthan-gold transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    >
                      <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
                      View Full {event.eventName} Album
                    </a>
                  )}
                </div>

                {/* Images Layout: Grid (<=3) or Slider (>3) */}
                {event.images?.length > 3 ? (
                  <div className="relative group/slider">
                    <div 
                      id={`slider-${event._id}`}
                      className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-8 px-2"
                    >
                      {event.images.map((imgUrl, imgIdx) => {
                        const globalIndex = allImages.findIndex(i => i.url === imgUrl);
                        return (
                          <div 
                            key={`${event._id}-${imgIdx}`}
                            className="flex-none w-[85vw] sm:w-[45vw] lg:w-[30vw] snap-center"
                          >
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              className="relative group rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-rajasthan-gold/20 dark-royal-glass"
                            >
                              <div className="absolute inset-0 bg-rajasthan-navy/20 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                              <img 
                                src={imgUrl} 
                                alt={event.eventName} 
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-rajasthan-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]">
                                <button 
                                  onClick={() => setSelectedImageIndex(globalIndex)}
                                  className="w-14 h-14 bg-rajasthan-gold/90 backdrop-blur-md text-rajasthan-navy rounded-full flex items-center justify-center shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 border border-white/20"
                                >
                                  <Maximize2 size={24} />
                                </button>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Navigation Buttons for Slider */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                      <button 
                        onClick={() => document.getElementById(`slider-${event._id}`).scrollBy({ left: -400, behavior: 'smooth' })}
                        className="bg-rajasthan-navy/80 border border-rajasthan-gold/50 text-rajasthan-gold p-4 rounded-full backdrop-blur-md shadow-2xl hover:bg-rajasthan-gold hover:text-rajasthan-navy transition-all"
                      >
                        <ChevronLeft size={24} />
                      </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-30 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                      <button 
                        onClick={() => document.getElementById(`slider-${event._id}`).scrollBy({ left: 400, behavior: 'smooth' })}
                        className="bg-rajasthan-navy/80 border border-rajasthan-gold/50 text-rajasthan-gold p-4 rounded-full backdrop-blur-md shadow-2xl hover:bg-rajasthan-gold hover:text-rajasthan-navy transition-all"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    {/* Hint */}
                    <div className="flex justify-center mt-4">
                      <div className="flex gap-2">
                        {event.images.map((_, i) => (
                           <div key={i} className="w-1 h-1 rounded-full bg-rajasthan-gold/20" />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(event.images || []).map((imgUrl, imgIdx) => {
                      const globalIndex = allImages.findIndex(i => i.url === imgUrl);
                      return (
                        <motion.div 
                          key={`${event._id}-${imgIdx}`} 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          className="relative group rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-rajasthan-gold/20 dark-royal-glass"
                        >
                           <img 
                            src={imgUrl} 
                            alt={event.eventName} 
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-rajasthan-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center z-20 backdrop-blur-[2px]">
                            <button 
                              onClick={() => setSelectedImageIndex(globalIndex)}
                              className="w-14 h-14 bg-rajasthan-gold/90 backdrop-blur-md text-rajasthan-navy rounded-full flex items-center justify-center shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 border border-white/20"
                            >
                              <Maximize2 size={24} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Decorative Divider between events */}
                {eventIdx < events.length - 1 && (
                  <div className="flex items-center justify-center mt-20 gap-4 opacity-30">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-rajasthan-gold"></div>
                    <div className="w-3 h-3 border border-rajasthan-gold rotate-45 flex-shrink-0"></div>
                    <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-rajasthan-gold"></div>
                  </div>
                )}
              </section>
            );
          })
        )}
        
        {/* Fullscreen Lightbox Modal (Using Portal to beat stacking context issues) */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {selectedImageIndex !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImageIndex(null)}
                className="fixed inset-0 z-[999999] bg-rajasthan-navy/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
              >
                {/* Controls - Top priority */}
                <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-center z-[1000000] pointer-events-none">
                  <div className="text-rajasthan-gold font-royal tracking-[.2em] uppercase text-sm bg-black/60 px-6 py-2 rounded-full border border-rajasthan-gold/30 pointer-events-auto">
                    {selectedImageIndex + 1} / {allImages.length}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
                    className="text-white hover:text-rajasthan-gold bg-black/80 hover:bg-rajasthan-red/60 p-5 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10 pointer-events-auto cursor-pointer"
                    title="Close Archives"
                  >
                    <X size={36} />
                  </button>
                </div>

                {/* Navigation Buttons */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 md:left-8 z-[1000000] text-white/50 hover:text-rajasthan-gold transition-colors p-4"
                >
                  <ChevronLeft size={64} />
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 md:right-8 z-[1000000] text-white/50 hover:text-rajasthan-gold transition-colors p-4"
                >
                  <ChevronRight size={64} />
                </button>

                {/* Image Wrapper */}
                <div 
                  className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center cursor-default z-[1000000]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <img 
                      src={allImages[selectedImageIndex]?.url} 
                      alt={allImages[selectedImageIndex]?.eventName || "Royal Image"} 
                      className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-[0_0_100px_rgba(212,175,55,0.3)] border border-rajasthan-gold/40"
                    />
                    
                    <div className="mt-8 text-center bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 mx-4 max-w-lg">
                      <h3 className="text-rajasthan-gold font-ethnic text-2xl md:text-3xl drop-shadow-md mb-2">
                        {allImages[selectedImageIndex]?.eventName}
                      </h3>
                      <div className="flex items-center justify-center gap-4">
                        <span className="h-[1px] w-8 bg-rajasthan-gold/30"></span>
                        <p className="text-rajasthan-saffron font-royal tracking-widest uppercase text-sm">
                          Archived in {allImages[selectedImageIndex]?.year}
                        </p>
                        <span className="h-[1px] w-8 bg-rajasthan-gold/30"></span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </div>
  );
};

export default Gallery;
