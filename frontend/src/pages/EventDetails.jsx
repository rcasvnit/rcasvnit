import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Image as ImageIcon } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-immersive-dust flex items-center justify-center">
        <div className="p-8 royal-glass rounded-2xl flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-rajasthan-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-rajasthan-gold font-royal tracking-widest text-xl animate-pulse">Consulting the Royal Archives...</p>
        </div>
      </div>
    );
  }

  if (!event || event.error) {
    return (
      <div className="min-h-screen bg-immersive-dust flex items-center justify-center">
        <div className="p-10 royal-glass rounded-2xl text-center">
          <p className="text-3xl text-rajasthan-navy font-ethnic mb-4">Event Not Found</p>
          <Link to="/events" className="btn-royal">Return to Festivities</Link>
        </div>
      </div>
    );
  }



  const images = event.additionalImages && event.additionalImages.length > 0 
    ? [event.imageUrl, ...event.additionalImages] 
    : [event.imageUrl];

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  return (
    <div className="min-h-screen bg-immersive-dust pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/events" className="inline-flex items-center text-rajasthan-gold hover:text-amber-200 uppercase tracking-widest text-sm font-bold font-royal mb-8 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Events
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="dark-royal-glass rounded-[2rem] p-8 md:p-12 shadow-2xl border-t-4 border-rajasthan-gold relative overflow-hidden"
        >
          {/* Hero Content */}
          <div className="text-center mb-12">
            <span className={`inline-block px-6 py-2 mb-6 text-xs font-royal font-bold uppercase tracking-[0.2em] rounded-md text-white shadow-lg backdrop-blur-md border border-white/20 ${event.type === 'upcoming' ? 'bg-rajasthan-saffron/90' : 'bg-rajasthan-navy/80'}`}>
              {event.type}
            </span>
            <h1 className="text-5xl md:text-7xl font-ethnic font-bold text-rajasthan-gold drop-shadow-md mb-6">{event.title}</h1>
            
            <div className="flex flex-wrap justify-center gap-6 font-royal tracking-wide text-white">
              <div className="flex items-center gap-3 bg-rajasthan-navy/60 px-6 py-3 rounded-xl border border-rajasthan-gold/30">
                <Calendar size={20} className="text-rajasthan-saffron" />
                <span className="font-semibold text-lg text-amber-50">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 bg-rajasthan-navy/60 px-6 py-3 rounded-xl border border-rajasthan-gold/30">
                <MapPin size={20} className="text-rajasthan-red" />
                <span className="font-semibold text-lg text-amber-50">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 border-2 border-rajasthan-gold/30">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          </div>

          {/* Description & Purpose Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-ethnic text-rajasthan-gold mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-rajasthan-gold inline-block"></span> 
                  The Legend
                </h2>
                <div className="text-amber-50/90 font-royal text-lg leading-relaxed whitespace-pre-wrap">
                  {event.fullDescription || event.description}
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {event.purpose ? (
                <div className="bg-rajasthan-navy/40 p-8 rounded-3xl border border-rajasthan-gold/20 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><ImageIcon size={64} /></div>
                  <h3 className="text-xl font-ethnic text-rajasthan-saffron mb-4">Royal Purpose</h3>
                  <p className="text-amber-200/80 font-royal leading-relaxed">{event.purpose}</p>
                </div>
              ) : (
                <div className="bg-rajasthan-navy/40 p-8 rounded-3xl border border-rajasthan-gold/20 relative">
                  <h3 className="text-xl font-ethnic text-rajasthan-saffron mb-4">Royal Purpose</h3>
                  <p className="text-amber-200/80 font-royal leading-relaxed">Celebrating and propagating the timeless cultural heritage and traditions of Rajasthan.</p>
                </div>
              )}
              <div className="bg-gradient-to-br from-rajasthan-navy to-black p-8 rounded-3xl border-l-4 border-rajasthan-gold relative overflow-hidden flex flex-col items-center text-center">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-rajasthan-gold/10 rounded-bl-full -z-10"></div>
                 <h3 className="text-xl font-ethnic text-rajasthan-gold mb-4">Join the Royal Legacy</h3>
                 <p className="text-amber-50/70 font-royal text-sm mb-6">Experience Rajputana glory by being a part of our spectacular festivities.</p>
                 <Link to="/contact" className="btn-royal-solid text-sm px-6 py-2">Contact Us</Link>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {images.length > 1 && (
            <div>
              <h2 className="text-3xl font-ethnic text-rajasthan-gold mb-8 text-center flex justify-center items-center gap-4">
                <span className="w-12 h-[2px] bg-rajasthan-gold inline-block"></span>
                Glimpses of Glory
                <span className="w-12 h-[2px] bg-rajasthan-gold inline-block"></span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {currentImages.map((img, idx) => (
                  <motion.div 
                    key={indexOfFirstImage + idx}
                    whileHover={{ scale: 1.05 }}
                    className="h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-rajasthan-gold/20 border-opacity-50"
                  >
                    <img src={img} alt={`Event glimpse ${indexOfFirstImage + idx + 1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-2 border border-rajasthan-gold/50 rounded-full text-rajasthan-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rajasthan-gold/10 transition-colors font-royal tracking-widest uppercase text-sm"
                  >
                    &larr; Prev
                  </button>
                  <span className="text-amber-50 font-royal tracking-widest text-sm bg-rajasthan-navy/50 px-4 py-2 rounded-full border border-rajasthan-gold/30">
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
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
