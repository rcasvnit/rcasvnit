import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sponsors')
      .then(res => res.json())
      .then(data => setSponsors(data))
      .catch(err => console.error(err));
  }, []);

  const getTiers = () => ['platinum', 'gold', 'silver'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="py-24 min-h-screen bg-immersive-dust relative overflow-hidden">
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-full h-[60vh] bg-rajasthan-gold/5 bg-texture-mandala mix-blend-overlay pointer-events-none rounded-bl-[100%]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-rajasthan-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6">Our Royal <span className="text-rajasthan-saffron">Patrons</span></h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl font-royal text-amber-50/90">We extend our heartfelt gratitude to the guardians of our heritage who help us keep the traditions alive and thriving.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20 relative"
        >
          {getTiers().map((tier) => {
            const tierSponsors = sponsors.filter(s => s.tier === tier);
            if (tierSponsors.length === 0) return null;

            return (
              <motion.div key={tier} variants={itemVariants} className="relative z-10 w-full mb-12">
                <div className="flex items-center justify-center mb-12">
                  <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-rajasthan-gold/50"></div>
                  <motion.h2 
                    whileHover={{ scale: 1.05 }}
                    className={`text-4xl font-bold font-ethnic uppercase text-center tracking-[0.2em] px-8 py-2 border-y-2 border-rajasthan-gold/40 shadow-inner bg-rajasthan-navy/80 backdrop-blur-md rounded-full ${
                      tier === 'platinum' ? 'text-amber-50' : tier === 'gold' ? 'text-rajasthan-gold' : 'text-gray-300'
                    }`}
                  >
                    {tier} 
                  </motion.h2>
                  <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-rajasthan-gold/50"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-10">
                  {tierSponsors.map((sponsor, index) => (
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -10, boxShadow: '0 25px 50px -12px rgba(212,175,55,0.4)' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      key={sponsor._id} 
                      className="w-64 h-40 flex items-center justify-center p-6 dark-royal-glass rounded-[30px] border-2 border-rajasthan-gold/30 shadow-2xl group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-rajasthan-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img 
                        src={sponsor.logoUrl} 
                        alt={sponsor.name} 
                        className="max-h-full max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out z-10 filter drop-shadow-md"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {sponsors.length === 0 && (
          <div className="text-center royal-glass p-16 rounded-[40px] max-w-2xl mx-auto mt-16">
            <h3 className="text-3xl font-ethnic font-bold text-rajasthan-navy mb-4">Become a Patron</h3>
            <p className="text-gray-600 font-royal text-lg">Partner with us to protect and celebrate the legacy of Rajputana.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Sponsors;
