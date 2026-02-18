import { motion } from "framer-motion";

const TechGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 50%, black, transparent 80%)"
        }}
      />

      {/* Moving Data Streams */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
            style={{
              width: "300px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() > 0.5 ? 0 : 90,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, 200],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Binary/Tech Symbols */}
      <div className="absolute inset-0 opacity-[0.05] font-tech text-[10px] text-purple-400 overflow-hidden select-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          >
            {Math.random() > 0.5 ? "01101011" : "0x7F4E"} <br />
            {Math.random() > 0.5 ? "SYSTEM_ACTIVE" : "UPLINK_SYNC"}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechGridBackground;
