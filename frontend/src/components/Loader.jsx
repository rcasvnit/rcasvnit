import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-12">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4">
        {/* Simple Golden Ring */}
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           className="w-full h-full border-2 border-rajasthan-gold/10 border-t-rajasthan-gold rounded-full"
        />
        {/* Subtle Glow */}
        <div className="absolute inset-0 border-2 border-rajasthan-gold opacity-10 blur-[4px] rounded-full"></div>
      </div>
      
      <p className="font-royal text-rajasthan-gold/60 text-xs md:text-sm tracking-[0.3em] uppercase">
        Please wait...
      </p>
    </div>
  );
};

export default Loader;
