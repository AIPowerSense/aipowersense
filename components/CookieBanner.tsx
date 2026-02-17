import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[999] p-3 sm:p-4 md:p-6"
        >
          {/* Scientific background with high-tech glass effect */}
          <div className="max-w-7xl mx-auto relative group">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl border-t border-purple-500/30 rounded-2xl md:rounded-full shadow-[0_-10px_40px_rgba(168,85,247,0.1)]" />
            
            {/* Main Content Container */}
            <div className="relative px-6 py-5 md:py-4 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden rounded-2xl md:rounded-full">
              {/* Left Section: Icon & Text */}
              <div className="flex items-center gap-4 flex-grow">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Cookie size={20} className="text-purple-400" />
                  </div>
                  <motion.div 
                    className="absolute -inset-1 rounded-full bg-purple-500/20 blur-sm"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                <div className="text-center md:text-left">
                  <p className="font-tech text-xs text-purple-400 uppercase tracking-widest mb-1 opacity-70">Privacy Protocol 0xAF</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed max-w-2xl">
                    This platform uses advanced telemetry and essential cookies to optimize your intelligence workflows and ensure sub-second performance.
                  </p>
                </div>
              </div>

              {/* Right Section: Button */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <motion.button
                  onClick={handleAccept}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-purple-600 hover:bg-purple-500 text-white font-display font-black text-[10px] uppercase tracking-[0.3em] rounded-full transition-all duration-300 relative overflow-hidden group/btn shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <span className="relative z-10">Accept Intelligence Protocol</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </motion.button>
              </div>
            </div>

            {/* Scanning line decorative element */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
