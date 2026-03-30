import { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Loader from '../components/Loader';
import { Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`${API_URL}/members`)
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredMembers = members;

  return (
    <div className="py-24 min-h-screen bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-7xl font-ethnic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rajasthan-gold via-amber-200 to-rajasthan-saffron drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6 pb-2">
            Our Royal <span className="text-rajasthan-saffron">Council</span>
          </h1>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-10"></div>
          

        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <motion.div layout className="flex flex-col gap-12 md:gap-16 items-center max-w-5xl mx-auto">
            <AnimatePresence>
              {filteredMembers.map((member, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  key={member._id} 
                  className="group relative w-full sm:max-w-md md:max-w-4xl"
                >
                  <div className="absolute inset-0 bg-rajasthan-gold rounded-2xl transform translate-x-1 md:translate-x-3 translate-y-1 md:translate-y-3 opacity-30 group-hover:translate-x-2 md:group-hover:translate-x-4 group-hover:translate-y-2 md:group-hover:translate-y-4 transition-transform duration-500"></div>
                  
                  <div className="dark-royal-glass rounded-2xl overflow-hidden relative shadow-2xl group-hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.5)] transition-shadow duration-500 z-10 outline outline-1 outline-offset-[-4px] outline-rajasthan-gold/30 flex flex-col md:flex-row bg-rajasthan-navy h-auto md:h-[360px]">
                    <div className="h-72 md:h-full md:w-2/5 overflow-hidden relative bg-black/50 shrink-0">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-transparent to-transparent opacity-80 md:bg-gradient-to-r md:from-transparent md:to-rajasthan-navy"></div>
                    </div>
                    
                    <div className="p-6 md:p-10 text-center md:text-left flex-grow flex flex-col justify-center bg-rajasthan-navy relative z-20 overflow-hidden">
                      <div className="mb-auto hidden md:block border-b border-rajasthan-gold/20 pb-4">
                         <h3 className="text-2xl lg:text-3xl font-bold font-royal text-rajasthan-gold mb-2 truncate">{member.name}</h3>
                         <p className="text-sm lg:text-base text-amber-100/90 font-royal italic uppercase tracking-widest">{member.role}</p>
                      </div>

                      <div className="md:hidden">
                        <h3 className="text-xl font-bold font-royal text-rajasthan-gold mb-1 truncate -mt-6">{member.name}</h3>
                        <p className="text-xs text-amber-100/80 font-royal italic uppercase tracking-widest mb-4 truncate">{member.role}</p>
                      </div>
                      
                      <div className="flex justify-center md:justify-start space-x-6 mt-6 md:mt-8 pt-4 md:border-t-0 border-t border-rajasthan-gold/10">
                        {member.socialLinks?.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-rajasthan-gold/70 hover:text-rajasthan-gold transition-colors transform hover:scale-110">
                            <Linkedin size={28} />
                          </a>
                        )}
                        {member.socialLinks?.instagram && (
                          <a href={member.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-rajasthan-gold/70 hover:text-rajasthan-gold transition-colors transform hover:scale-110">
                            <Instagram size={28} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredMembers.length === 0 && (
              <div className="w-full text-center text-rajasthan-navy/50 py-24 font-royal text-xl">
                No council members found for this decree.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default Team;
