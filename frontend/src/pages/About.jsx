const About = () => {
  return (
    <div className="py-16 pt-24 min-h-screen rajasthani-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-ethnic font-bold text-rajasthan-navy mb-6">Our Royal Journey</h1>
          <div className="w-24 h-1 bg-rajasthan-pink mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-ethnic font-bold text-gray-900">The Story of RCA</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded over a decade ago, the Rajputana Cultural Association (RCA) began with a simple yet profound vision: to create a home away from home for the vibrant youth of Rajasthan. What started as a small gathering of culturally enthusiastic students has now evolved into one of the most prominent cultural organizations on campus.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We stand as a testament to the enduring spirit of Rajputana, bringing alive the tales of valor, the colors of the desert, and the warmth of Rajasthani hospitality in every event we host.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-rajasthan-gold transform translate-x-4 translate-y-4 rounded-2xl"></div>
            <img 
              src="/RCA%20png.jpeg" 
              alt="RCA SVNIT Logo" 
              className="relative rounded-full shadow-2xl border-4 border-rajasthan-gold w-full max-w-md mx-auto aspect-square object-cover bg-rajasthan-navy p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-lg border-2 border-orange-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <h3 className="text-3xl font-ethnic font-bold text-rajasthan-orange mb-4 z-10">Our Mission</h3>
            <p className="text-gray-600 text-lg relative z-10">
              To cultivate an environment where the rich traditions, art, and values of Rajasthan are celebrated, preserved, and passed down. We aim to foster a strong sense of community, belonging, and pride among students while sharing our beautiful culture with the wider diverse campus.
            </p>
          </div>
          
          <div className="bg-white p-10 rounded-3xl shadow-lg border-2 border-pink-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <h3 className="text-3xl font-ethnic font-bold text-rajasthan-pink mb-4 z-10">Our Vision</h3>
            <p className="text-gray-600 text-lg relative z-10">
              To be the most vibrant and inclusive cultural platform that elegantly bridges the gap between historical heritage and modern student life, inspiring everyone to embody the values of courage, honor, and extraordinary hospitality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
