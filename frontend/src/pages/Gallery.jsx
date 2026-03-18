import { useState } from 'react';

const Gallery = () => {
  const images = [
    { id: 1, category: 'festivals', url: "https://images.unsplash.com/photo-1543330691-88849b28fb3c?auto=format&fit=crop&q=80&w=600" },
    { id: 2, category: 'culture', url: "https://images.unsplash.com/photo-1560076756-74fcce779673?auto=format&fit=crop&q=80&w=600" },
    { id: 3, category: 'food', url: "https://images.unsplash.com/photo-1599661559684-6997b830d1d2?auto=format&fit=crop&q=80&w=600" },
    { id: 4, category: 'events', url: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600" },
    { id: 5, category: 'festivals', url: "https://images.pexels.com/photos/10182604/pexels-photo-10182604.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, category: 'culture', url: "https://images.pexels.com/photos/10182585/pexels-photo-10182585.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ];

  const categories = ['all', 'festivals', 'culture', 'food', 'events'];
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <div className="py-16 pt-24 min-h-screen rajasthani-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-ethnic font-bold text-rajasthan-navy mb-6">Gallery of Memories</h1>
          <div className="w-24 h-1 bg-rajasthan-pink mx-auto mb-10"></div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-6 py-2 rounded-full font-medium tracking-wide uppercase text-sm transition-all shadow-md ${filter === c ? 'bg-rajasthan-navy text-rajasthan-gold scale-105 font-bold' : 'bg-white text-gray-700 hover:bg-orange-50'}`}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="relative group overflow-hidden rounded-2xl shadow-xl aspect-square">
              <img 
                src={img.url} 
                alt={img.category} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xl font-ethnic font-bold uppercase tracking-widest border-2 border-white px-6 py-2">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Gallery;
