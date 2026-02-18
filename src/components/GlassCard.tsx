import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

const GlassCard = ({ children, className = "", tilt = true }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouse = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -12);
    setRotateY((x - 0.5) * 12);
    setGlowX(x * 100);
    setGlowY(y * 100);
  };

  const handleLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`glass rounded-xl overflow-hidden relative ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      whileHover={{ boxShadow: "0 0 30px hsl(270 100% 70% / 0.25)" }}
    >
      {tilt && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${glowX}% ${glowY}%, hsl(270 100% 70% / 0.12), transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default GlassCard;
