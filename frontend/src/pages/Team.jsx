import { useEffect, useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';

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
    <div className="py-16 pt-24 min-h-screen rajasthani-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-ethnic font-bold text-rajasthan-navy mb-6">Our Royal Council</h1>
          <div className="w-24 h-1 bg-rajasthan-pink mx-auto mb-10"></div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-6 py-2 rounded-full font-medium tracking-wide uppercase text-sm transition-all shadow-md ${filter === r ? 'bg-rajasthan-pink text-white scale-105' : 'bg-white text-gray-700 hover:bg-orange-50'}`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map(member => (
            <div key={member._id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-amber-100 group">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-rajasthan-gold opacity-0 group-hover:opacity-20 transition-opacity z-10"></div>
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold font-ethnic text-rajasthan-navy mb-1">{member.name}</h3>
                <p className="text-rajasthan-pink font-medium uppercase text-sm tracking-widest mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a href={member.socialLinks.instagram} className="text-gray-400 hover:text-pink-600 transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredMembers.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12 text-lg">
              No members found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Team;
