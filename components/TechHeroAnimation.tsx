import { motion } from "framer-motion";
import { Cpu, Database, Network, Zap, Shield, Activity, Globe, Box } from "lucide-react";

const icons = [
  { Icon: Cpu, color: "text-purple-500", delay: 0 },
  { Icon: Database, color: "text-blue-500", delay: 0.2 },
  { Icon: Network, color: "text-purple-400", delay: 0.4 },
  { Icon: Zap, color: "text-yellow-500", delay: 0.6 },
  { Icon: Shield, color: "text-green-500", delay: 0.8 },
  { Icon: Activity, color: "text-red-500", delay: 1.0 },
  { Icon: Globe, color: "text-cyan-500", delay: 1.2 },
  { Icon: Box, color: "text-indigo-500", delay: 1.4 },
];

const TechHeroAnimation = () => {
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center pointer-events-none">
      {/* Central Hub */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="w-24 h-24 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm z-10"
      >
        <Cpu className="text-purple-400 w-10 h-10" />
      </motion.div>

      {/* Orbiting Icons */}
      {icons.map((item, index) => {
        const radius = 120;
        const angle = (index / icons.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              x: [x, x * 1.1, x],
              y: [y, y * 0.9, y],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
            className={`absolute ${item.color} filter drop-shadow-(0_0_8px_currentColor)`}
          >
            <item.Icon size={24} />
          </motion.div>
        );
      })}

      {/* Connecting Lines (Decorative) */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 300">
        <motion.circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-purple-500/30"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="150"
          cy="150"
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-purple-500/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent blur-3xl rounded-full" />
    </div>
  );
};

export default TechHeroAnimation;
