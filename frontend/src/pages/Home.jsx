import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1599661559684-6997b830d1d2?auto=format&fit=crop&q=80&w=2000")' }}
        ></div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
          <h1 className="text-6xl md:text-8xl font-ethnic font-bold text-white mb-6 drop-shadow-xl tracking-wider">
            Padharo <span className="text-rajasthan-yellow">Mhare</span> Desh
          </h1>
          <p className="text-xl md:text-3xl text-amber-50 mb-10 font-light tracking-wide drop-shadow-md">
            Celebrating the Royal Heritage & Vibrant Traditions of Rajasthan
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/events" className="bg-rajasthan-navy text-rajasthan-gold font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl font-ethnic tracking-wider border-2 border-rajasthan-gold flex items-center justify-center gap-2 text-lg">
              Explore Events <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="bg-gradient-to-r from-rajasthan-pink to-rajasthan-orange text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-xl font-ethnic tracking-wider flex items-center justify-center gap-2 text-lg">
              Join the Legacy
            </Link>
          </div>
        </div>
        
        {/* Decorative Bottom */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent z-20"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#FDFBF7] rajasthani-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl text-center transform transition duration-500 hover:scale-105 border-b-4 border-rajasthan-red">
              <Users className="w-16 h-16 mx-auto text-rajasthan-pink mb-4" />
              <h3 className="text-4xl font-bold text-rajasthan-navy font-ethnic mb-2">500+</h3>
              <p className="text-gray-600 font-medium text-lg uppercase tracking-wider">Active Members</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl text-center transform transition duration-500 hover:scale-105 border-b-4 border-rajasthan-gold">
              <Calendar className="w-16 h-16 mx-auto text-rajasthan-red mb-4" />
              <h3 className="text-4xl font-bold text-rajasthan-navy font-ethnic mb-2">50+</h3>
              <p className="text-gray-600 font-medium text-lg uppercase tracking-wider">Cultural Events</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl text-center transform transition duration-500 hover:scale-105 border-b-4 border-rajasthan-pink">
              <Award className="w-16 h-16 mx-auto text-rajasthan-orange mb-4" />
              <h3 className="text-4xl font-bold text-rajasthan-navy font-ethnic mb-2">10+</h3>
              <p className="text-gray-600 font-medium text-lg uppercase tracking-wider">Years of Legacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-ethnic font-bold text-rajasthan-navy mb-4">Glimpse of Royalty</h2>
            <div className="w-24 h-1 bg-rajasthan-pink mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Experience the rich culture, art, and traditions that make Rajasthan truly incredible through our curated events and galleries.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
              <img src="https://images.unsplash.com/photo-1543330691-88849b28fb3c?auto=format&fit=crop&w=800&q=80" alt="Culture" className="w-full h-[400px] object-cover transform group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <h3 className="text-3xl text-white font-ethnic font-bold">Vibrant Festivals</h3>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-xl border-l-4 border-rajasthan-red">
                <h4 className="text-2xl font-bold text-gray-900 font-ethnic mb-2">Our Mission</h4>
                <p className="text-gray-600">To preserve, promote, and pass down the rich cultural heritage of Rajasthan to the next generation.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border-l-4 border-rajasthan-gold">
                <h4 className="text-2xl font-bold text-gray-900 font-ethnic mb-2">What We Do</h4>
                <p className="text-gray-600">From grand cultural festivals and traditional art exhibitions to folk dance performances and literary meets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
