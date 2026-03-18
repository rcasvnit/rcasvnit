import { useEffect, useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5000/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error(err));
  }, []);

  const filteredMembers = filter === 'all' ? members : members.filter(m => m.department === filter);
  const roles = ['all', 'core', 'design', 'tech', 'management'];

  return (
    <div className="py-24 min-h-screen bg-immersive-dust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-ethnic font-bold text-rajasthan-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-6">Our Royal Council</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto mb-10"></div>
          
          <div className="flex flex-wrap justify-center gap-4 border-y border-rajasthan-gold/30 py-6 max-w-3xl mx-auto bg-rajasthan-navy/50 backdrop-blur-md rounded-full px-6 shadow-inner">
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-8 py-2 rounded-full font-royal font-bold tracking-widest uppercase text-sm transition-all duration-300 ${
                  filter === r 
                  ? 'bg-gradient-to-r from-rajasthan-maroon to-rajasthan-red text-rajasthan-gold shadow-lg scale-105' 
                  : 'bg-transparent text-amber-50 hover:bg-rajasthan-navy hover:text-rajasthan-gold hover:shadow-md'
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence>
            {filteredMembers.map((member, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={member._id} 
                className="group relative"
              >
                {/* Decorative Frame Behind */}
                <div className="absolute inset-0 bg-rajasthan-gold rounded-t-full rounded-b-lg transform translate-x-2 translate-y-2 opacity-30 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
                
                <div className="dark-royal-glass rounded-t-full rounded-b-lg overflow-hidden relative shadow-2xl group-hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] transition-shadow duration-500 z-10 outline outline-1 outline-offset-[-4px] outline-rajasthan-gold/30">
                  <div className="h-80 overflow-hidden relative bg-black/50">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy via-transparent to-transparent opacity-90"></div>
                  </div>
                  
                  <div className="absolute bottom-0 w-full p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-rajasthan-navy via-rajasthan-navy/90 to-transparent pt-12">
                    <h3 className="text-2xl font-bold font-ethnic text-rajasthan-gold mb-1">{member.name}</h3>
                    <p className="text-amber-100 font-royal italic uppercase text-xs tracking-widest mb-4">{member.role}</p>
                    
                    <div className="flex justify-center space-x-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.socialLinks?.linkedin && (
                        <a href={member.socialLinks.linkedin} className="text-rajasthan-gold hover:text-white transition-colors transform hover:scale-110">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {member.socialLinks?.instagram && (
                        <a href={member.socialLinks.instagram} className="text-rajasthan-gold hover:text-white transition-colors transform hover:scale-110">
                          <Instagram size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredMembers.length === 0 && (
            <div className="col-span-full text-center text-rajasthan-navy/50 py-24 font-royal text-xl">
              No council members found for this decree.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Team;
