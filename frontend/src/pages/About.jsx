import { motion } from 'framer-motion';
import { Sparkles, Compass, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="py-24 min-h-screen bg-immersive-dust outline-none relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rajasthan-gold/10 rounded-bl-full mix-blend-overlay pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rajasthan-red/10 rounded-tr-full mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-ethnic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rajasthan-gold via-yellow-200 to-rajasthan-saffron drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6 pb-2">Our Royal Journey</h1>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 relative">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8 pr-0 lg:pr-10"
          >
            <div className="flex items-center gap-4 mb-2">
              <Sparkles className="text-rajasthan-gold" size={24} />
              <span className="font-royal text-rajasthan-saffron tracking-[0.3em] uppercase text-sm font-bold">The Renaissance</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-ethnic font-bold text-white leading-tight">The Story of <span className="text-rajasthan-gold italic">RCA</span></h2>
            
            <p className="text-xl font-royal text-amber-50/90 leading-relaxed border-l-2 border-rajasthan-gold pl-6">
              Founded over a decade ago, the Rajputana Cultural Association (RCA) began with a simple yet profound vision: to create a home away from home for the vibrant youth of Rajasthan. 
            </p>
            
            <p className="text-lg font-sans text-gray-300 leading-relaxed">
              What started as a small gathering of culturally enthusiastic students has now evolved into one of the most prominent cultural organizations on campus.
              We stand as a testament to the enduring spirit of Rajputana, bringing alive the tales of valor, the colors of the desert, and the warmth of Rajasthani hospitality in every event we host.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring" }}
            className="relative flex justify-center items-center py-10"
          >
            {/* Elegant glowing frame */}
            <div className="absolute w-[80%] aspect-square bg-gradient-to-br from-rajasthan-gold via-yellow-500 to-rajasthan-saffron rounded-full opacity-60 blur-3xl scale-110 animate-subtle-pulse z-0"></div>
            
            {/* Squared background mount */}
            <div className="absolute w-full max-w-sm aspect-square bg-rajasthan-navy rounded-tl-[60px] rounded-br-[60px] rotate-3 shadow-[0_0_40px_rgba(212,175,55,0.2)] z-10 border border-rajasthan-gold/60"></div>
            
            <div className="absolute w-full max-w-sm aspect-square bg-rajasthan-navy rounded-tl-[60px] rounded-br-[60px] -rotate-3 z-20 border border-rajasthan-gold"></div>

            <img 
              src="/RCA%20png.jpeg" 
              alt="RCA SVNIT Logo" 
              className="relative z-30 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-white w-3/4 max-w-xs aspect-square object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative p-12 rounded-3xl overflow-hidden group shadow-2xl dark-royal-glass border border-rajasthan-saffron/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rajasthan-navy to-black -z-10"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-rajasthan-saffron/20 rounded-full blur-2xl group-hover:bg-rajasthan-saffron/40 transition-colors duration-700"></div>
            
            <div className="w-16 h-16 bg-gradient-to-br from-rajasthan-saffron to-rajasthan-red rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:rotate-12 transition-transform duration-500 border border-rajasthan-gold/30">
              <Compass size={32} />
            </div>
            
            <h3 className="text-4xl font-ethnic font-bold text-rajasthan-saffron mb-6">Our Mission</h3>
            <p className="text-amber-50/90 font-royal text-xl leading-relaxed">
              To cultivate an environment where the rich traditions, art, and values of Rajasthan are celebrated, preserved, and passed down. We aim to foster a strong sense of community, belonging, and pride among students while sharing our beautiful culture with the wider diverse campus.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-12 rounded-3xl overflow-hidden group shadow-2xl dark-royal-glass border border-rajasthan-pink/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rajasthan-navy to-black -z-10"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-rajasthan-pink/20 rounded-full blur-2xl group-hover:bg-rajasthan-pink/40 transition-colors duration-700"></div>
            
            <div className="w-16 h-16 bg-gradient-to-br from-rajasthan-pink to-rajasthan-maroon rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:rotate-12 transition-transform duration-500 border border-rajasthan-gold/30">
              <Shield size={32} />
            </div>
            
            <h3 className="text-4xl font-ethnic font-bold text-rajasthan-pink mb-6">Our Vision</h3>
            <p className="text-amber-50/90 font-royal text-xl leading-relaxed">
              To be the most vibrant and inclusive cultural platform that elegantly bridges the gap between historical heritage and modern student life, inspiring everyone to embody the values of courage, honor, and extraordinary hospitality.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default About;
