import { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="py-24 min-h-screen bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h1 className="text-4xl md:text-7xl font-ethnic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rajasthan-gold via-amber-200 to-rajasthan-saffron drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6 pb-2 inline-block">
            Utsav <span className="text-rajasthan-saffron">&</span> Festivals
          </h1>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-amber-50/90 font-royal px-4">Explore the vibrant celebrations, magnificent gatherings, and historic re-enactments that bring the colors of Rajasthan to life.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
        >
          {events.map((event) => (
            <motion.div key={event._id} variants={cardVariants} className="palace-card flex flex-col group">
              <Link to={`/events/${event._id}`} className="h-56 sm:h-72 w-full relative overflow-hidden bg-rajasthan-navy block">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                  <span className={`px-4 py-1.5 md:px-6 md:py-2 text-[10px] md:text-xs font-royal font-bold uppercase tracking-[0.2em] rounded-sm text-white shadow-lg backdrop-blur-md border border-white/20 ${event.type === 'upcoming' ? 'bg-rajasthan-saffron/90' : 'bg-rajasthan-navy/80'}`}>
                    {event.type}
                  </span>
                </div>
              </Link>
              <div className="p-6 md:p-10 flex-grow flex flex-col justify-between dark-royal-glass relative border-t-2 border-rajasthan-gold/30">
                {/* Mandalic watermark */}
                <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-texture-mandala opacity-[0.05] pointer-events-none mix-blend-screen"></div>
                
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold font-ethnic text-rajasthan-gold mb-3 md:mb-4 drop-shadow-sm">{event.title}</h3>
                  <p className="text-base md:text-lg text-amber-50/80 mb-6 md:mb-8 font-royal leading-relaxed line-clamp-3">{event.description}</p>
                </div>
                
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 font-royal tracking-wide text-white">
                  <div className="flex items-center gap-3 md:gap-4 bg-rajasthan-navy/60 p-2 md:p-3 rounded-lg border border-rajasthan-gold/20">
                    <Calendar size={18} md:size={22} className="text-rajasthan-saffron" />
                    <span className="font-semibold text-base md:text-lg text-amber-50">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 bg-rajasthan-navy/60 p-2 md:p-3 rounded-lg border border-rajasthan-gold/20">
                    <MapPin size={18} md:size={22} className="text-rajasthan-red" />
                    <span className="font-semibold text-base md:text-lg text-amber-50">{event.location}</span>
                  </div>
                </div>
                
                <Link to={`/events/${event._id}`} className="self-end text-rajasthan-saffron font-royal font-bold uppercase tracking-widest text-sm border-b-2 border-rajasthan-gold/30 hover:border-rajasthan-gold hover:text-white transition-all pb-1 flex items-center gap-2">
                  Discover Details <span className="text-xl">&rsaquo;</span>
                </Link>
              </div>
            </motion.div>
          ))}
          
          {events.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-block p-10 dark-royal-glass rounded-2xl border border-rajasthan-gold/30">
                <p className="text-2xl font-ethnic text-rajasthan-gold mb-2">The Royal Calendar is being planned.</p>
                <p className="text-rajasthan-saffron tracking-widest uppercase text-sm font-royal">Check back soon for upcoming grand festivities.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Events;
