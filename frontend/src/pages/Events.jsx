import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="py-16 pt-24 min-h-screen rajasthani-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-ethnic font-bold text-rajasthan-navy mb-6">Utsav & Festivals</h1>
          <div className="w-24 h-1 bg-rajasthan-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">Explore the vibrant celebrations and gatherings that bring the colors of Rajasthan to life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group border-2 border-orange-50">
              <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full text-white ${event.type === 'upcoming' ? 'bg-rajasthan-gold text-rajasthan-navy' : 'bg-gray-800'}`}>
                    {event.type}
                  </span>
                </div>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center bg-white relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-50 rounded-full blur-3xl opacity-50 z-0"></div>
                <h3 className="text-3xl font-bold font-ethnic text-rajasthan-navy mb-3 relative z-10">{event.title}</h3>
                <p className="text-gray-600 mb-6 italic relative z-10">{event.description}</p>
                <div className="space-y-3 mb-6 font-medium text-sm text-gray-700 relative z-10">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-rajasthan-orange" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-rajasthan-red" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button className="self-start relative z-10 text-rajasthan-red font-bold uppercase tracking-wider text-sm border-b-2 border-transparent hover:border-rajasthan-red transition-all">
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Events;
