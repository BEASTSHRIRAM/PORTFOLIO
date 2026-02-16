import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const BeastApp = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start py-4 sm:py-6 px-3 sm:px-4">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-5 sm:mb-8 w-full"
      >
        {/* Profile photo */}
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 sm:border-4 border-primary shadow-lg mb-3 sm:mb-4 flex-shrink-0">
          <img
            src="/yo.jpeg"
            alt="Sriram Kulkarni"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        <h1 className="text-xl sm:text-3xl font-bold mb-1">
          <span
            style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            I am Sriram Kulkarni
          </span>
        </h1>
        <p className="text-sm sm:text-lg opacity-80 mb-2 sm:mb-3">Full Stack Developer &amp; AI Enthusiast</p>
        <p className="max-w-lg text-xs sm:text-sm opacity-70 leading-relaxed px-2">
          I build scalable, AI driven applications using Modern Technologies. Currently pursuing B.E. in Information Science at JSSATE, Bengaluru. Passionate
          about turning ideas into polished products from backend APIs to pixel perfect UIs.
        </p>
      </motion.div>

      {/* Launchpad hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full border border-primary/40 bg-primary/10 backdrop-blur"
      >
        
        <span className="text-xs sm:text-sm font-medium">
          Click on{' '}
          <span className="text-primary font-bold underline underline-offset-2">Launchpad</span>{' '}
          in the dock for more details
        </span>
      </motion.div>
    </div>
  );
};

export default BeastApp;
