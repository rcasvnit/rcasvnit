import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Award, Play } from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: <Users size={32} className="text-rajasthan-saffron" />, count: "500+", label: "Royal Members" },
    { icon: <Calendar size={32} className="text-rajasthan-gold" />, count: "50+", label: "Cultural Utsavs" },
    { icon: <Award size={32} className="text-rajasthan-red" />, count: "10+", label: "Years of Legacy" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-rajasthan-navy min-h-screen text-white overflow-hidden bg-immersive-dust">
      {/* Immersive Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32 pt-24">
        {/* Parallax Background */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599661559684-6997b830d1d2?auto=format&fit=crop&q=80')" }}
        />
        
        {/* Sunset Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-rajasthan-navy via-rajasthan-maroon/60 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-black/30"></div>

        <div className="relative z-20 text-center px-4 mt-24">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer} 
            className="flex flex-col items-center"
          >
            <motion.img 
              variants={fadeIn}
              src="/RCA%20png.jpeg" 
              alt="RCA SVNIT Logo" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-rajasthan-gold shadow-[0_0_30px_rgba(212,175,55,0.8)] mb-8"
            />
            
            <motion.p variants={fadeIn} className="font-royal text-rajasthan-gold tracking-[0.3em] font-bold text-sm md:text-lg mb-4 uppercase drop-shadow-lg">
              Welcome to the Heritage
            </motion.p>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-ethnic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rajasthan-gold to-yellow-500 mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-tight">
              Experience the<br/>Royal Essence
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-2xl font-royal text-amber-50 max-w-3xl mx-auto mb-12 drop-shadow-md">
              Celebrating the royal heritage, vibrant traditions, and unparalleled hospitality of Rajasthan at SVNIT Surat.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/events" className="btn-royal">
                Explore Events <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/about" className="btn-royal-solid">
                <Play className="mr-2 fill-current" size={20} /> Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="relative z-30 -mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: '#D4AF37' }}
              className="dark-royal-glass rounded-2xl p-8 flex items-center shadow-2xl transition-all duration-300 relative overflow-hidden group border border-amber-900/40"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rajasthan-gold/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="bg-gradient-to-br from-rajasthan-navy to-black p-4 rounded-full border border-rajasthan-gold/30 mr-6 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <div className="text-4xl font-ethnic font-bold text-white mb-1 group-hover:text-rajasthan-gold transition-colors">{stat.count}</div>
                <div className="text-amber-200/80 font-royal tracking-wider font-semibold uppercase text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Decorative Divider */}
      <div className="w-full flex items-center justify-center my-20 px-4">
        <div className="h-[2px] w-48 md:w-96 lg:w-[400px] bg-gradient-to-r from-transparent to-rajasthan-gold/80"></div>
        <div className="w-4 h-4 bg-rajasthan-navy rotate-45 mx-6 border-2 border-rajasthan-gold rounded-sm shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        <div className="h-[2px] w-48 md:w-96 lg:w-[400px] bg-gradient-to-l from-transparent to-rajasthan-gold/80"></div>
      </div>

      {/* About Section Snippet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32 relative bg-mandala-overlay">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-rajasthan-saffron font-royal tracking-[0.2em] font-bold uppercase mb-2">The Legacy</p>
              <h2 className="text-5xl font-ethnic font-bold text-rajasthan-gold mb-6 leading-tight">Glimpse of <br/><span className="text-white">Royalty</span></h2>
            </div>
            
            <p className="text-xl text-amber-50/90 font-royal leading-relaxed border-l-4 border-rajasthan-red pl-6">
              RCA is more than just an association; it's a family that brings the majestic and deeply rooted cultural ethos of Rajputana to the heart of our vibrant campus.
            </p>
            
            <p className="text-base text-gray-400 font-sans leading-relaxed">
              We orchestrate grandeur—from the thunderous beats of Dhol during festive nights to the mesmerizing twirls of Ghoomar. We are the guardians of sand dune memories in an urban oasis.
            </p>

            <Link to="/about" className="inline-block border-b-2 border-rajasthan-saffron text-rajasthan-saffron hover:text-white hover:border-white font-royal font-bold tracking-widest uppercase transition-all pb-1 mt-4">
              Discover the full story &rarr;
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full rounded-tl-[100px] rounded-br-[100px] overflow-hidden border-8 border-rajasthan-navy shadow-[0_0_50px_rgba(212,175,55,0.2)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 group-hover:bg-black/10 transition-all duration-700"></div>
            <img 
              src="/rajasthaniArchitecture.jpg" 
              alt="Royal Rajasthani Architecture" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
