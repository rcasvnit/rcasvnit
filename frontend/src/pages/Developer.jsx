import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Code2 } from 'lucide-react';

const Developer = () => {
    return (
        <div className="py-24 min-h-screen bg-immersive-dust relative overflow-hidden flex items-center justify-center">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rajasthan-gold/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rajasthan-red/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full font-sans">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-7xl font-ethnic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rajasthan-gold via-amber-200 to-rajasthan-saffron mb-6 tracking-wide drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] pb-2 inline-block">
                        Meet the <span className="text-rajasthan-saffron">Architect</span>
                    </h1>
                    <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-rajasthan-gold to-transparent mx-auto"></div>
                </motion.div>

                <div className="flex justify-center">
                    {/* Developer Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-lg"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-rajasthan-gold rounded-[40px] rotate-2 opacity-20 group-hover:rotate-4 transition-transform duration-500"></div>
                            <div className="dark-royal-glass p-8 md:p-12 rounded-[40px] border border-rajasthan-gold/30 shadow-2xl relative z-10 overflow-hidden text-center">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Code2 size={160} className="text-rajasthan-gold" />
                                </div>
                                
                                <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-rajasthan-gold mb-10 shadow-2xl mx-auto relative group-hover:scale-105 transition-transform duration-700">
                                    <img 
                                        src="/developer.jpg" 
                                        alt="Mohit Singh" 
                                        className="w-full h-full object-cover bg-rajasthan-navy"
                                        onError={(e) => {
                                            e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohit";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-rajasthan-navy/40 to-transparent"></div>
                                </div>

                                <div className="relative z-20">
                                    <h2 className="text-3xl md:text-5xl font-ethnic font-bold text-rajasthan-gold mb-10 uppercase tracking-widest border-b border-rajasthan-gold/20 pb-4">
                                        Mohit Singh
                                    </h2>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <a href="https://github.com/mohitsingh45983" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-rajasthan-gold hover:text-rajasthan-navy rounded-2xl transition-all duration-300 border border-white/10">
                                            <Github size={28} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest font-royal">GitHub</span>
                                        </a>
                                        <a href="https://www.linkedin.com/in/mohit-singh-9317b4290/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-rajasthan-gold hover:text-rajasthan-navy rounded-2xl transition-all duration-300 border border-white/10">
                                            <Linkedin size={28} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest font-royal">LinkedIn</span>
                                        </a>
                                        <a href="https://www.instagram.com/mohitsingh45983" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-rajasthan-gold hover:text-rajasthan-navy rounded-2xl transition-all duration-300 border border-white/10">
                                            <Instagram size={28} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest font-royal">Instagram</span>
                                        </a>
                                        <a href="mailto:singhmohit86935@gmail.com" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-rajasthan-gold hover:text-rajasthan-navy rounded-2xl transition-all duration-300 border border-white/10">
                                            <Mail size={28} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest font-royal">Email</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Developer;
