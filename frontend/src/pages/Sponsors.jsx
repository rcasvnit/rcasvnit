import { useEffect, useState } from 'react';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sponsors')
      .then(res => res.json())
      .then(data => setSponsors(data))
      .catch(err => console.error(err));
  }, []);

  const getTiers = () => ['platinum', 'gold', 'silver'];

  return (
    <div className="py-16 pt-24 min-h-screen rajasthani-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-ethnic font-bold text-rajasthan-navy mb-6">Our Royal Patrons</h1>
          <div className="w-24 h-1 bg-rajasthan-pink mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">We extend our heartfelt gratitude to the sponsors who help us keep the traditions alive and thriving.</p>
        </div>

        <div className="space-y-16">
          {getTiers().map((tier) => (
            <div key={tier} className="bg-white p-10 rounded-3xl shadow-xl border border-pink-100 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rajasthan-pink to-transparent"></div>
              <h2 className="text-3xl font-bold font-ethnic uppercase text-center mb-10 text-rajasthan-navy tracking-widest flex items-center justify-center gap-4">
                <span className="w-10 h-[1px] bg-gray-300"></span>
                {tier} Sponsors
                <span className="w-10 h-[1px] bg-gray-300"></span>
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {sponsors.filter(s => s.tier === tier).map((sponsor) => (
                  <div key={sponsor._id} className="w-48 h-32 flex items-center justify-center p-4 bg-gray-50 rounded-xl hover:shadow-xl transition-shadow border border-gray-100 group">
                    <img 
                      src={sponsor.logoUrl} 
                      alt={sponsor.name} 
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sponsors;
