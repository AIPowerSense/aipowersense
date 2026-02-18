import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { type ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98, filter: "hue-rotate(-10deg)" }}
        animate={{ opacity: 1, scale: 1, filter: "hue-rotate(0deg)" }}
        exit={{ opacity: 0, scale: 0.98, filter: "hue-rotate(10deg)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
