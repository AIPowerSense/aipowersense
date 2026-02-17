import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Zap, Mail, Menu, X, ArrowRight, Cpu } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/about", icon: User, label: "About" },
  { to: "/voltcore", icon: Cpu, label: "VoltCore" },
  { to: "/solutions", icon: Zap, label: "Solutions" },
  { to: "/contact", icon: Mail, label: "Contact" },
];

const VerticalNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop vertical nav */}
      <motion.nav
        className="hidden md:flex fixed left-0 top-0 h-full z-50 flex-col items-center gap-1 py-4 w-[72px]"
        style={{ background: "linear-gradient(180deg, hsl(270 40% 5% / 0.98), hsl(270 60% 3% / 0.98))" }}
      >
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        
        {/* Logo */}
        <div className="pt-1 px-1 w-full flex justify-center">
          <motion.img
            src="/2.svg"
            alt="logo"
            className="object-contain w-16 h-16"
          />
        </div>

        <div className="flex flex-col gap-0.5 w-full px-1 items-center">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            
            const NavComponent = (
              <motion.div
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative overflow-hidden w-14 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ backgroundColor: "hsl(270 40% 15% / 0.5)" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg neon-border bg-primary/5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10 shrink-0" />
                <span className="relative z-10 font-tech text-[9px] font-medium tracking-wide uppercase mt-1">
                  {label}
                </span>
              </motion.div>
            );

            return (
              <NavLink key={to} to={to}>
                {NavComponent}
              </NavLink>
            );
          })}

          {/* Get Started Button */}
          <motion.a
            href="https://app.aipowersense.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-2 overflow-hidden group w-14"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-purple-900 rounded-lg opacity-100 group-hover:opacity-90 transition-opacity" />
            <motion.div
              className="relative flex flex-col items-center justify-center p-2 rounded-lg"
            >
              <ArrowRight size={18} className="text-white" />
              <span className="font-tech text-[8px] font-bold tracking-wide uppercase text-white mt-0.5">
                Start
              </span>
            </motion.div>
          </motion.a>
        </div>

        <div className="mt-auto pb-4">
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse-neon mx-auto" />
        </div>
      </motion.nav>

      {/* Mobile bottom navbar - Floating bar in center */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 w-full flex justify-center z-50 pointer-events-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))"
        }}
      >
        {/* Main Navigation Bar */}
        <div className="bg-black/90 backdrop-blur-2xl border border-white/20 rounded-full px-5 py-2.5 shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-auto mx-auto mb-4">
          <div className="flex items-center justify-center gap-1">
            {/* Navigation Items */}
            {navItems.map(({ to, icon: Icon, label }, i) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={`flex items-center justify-center p-2.5 rounded-full transition-all ${
                    isActive
                      ? "bg-primary text-black shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                  }`}
                  title={label}
                >
                  <Icon size={20} />
                </NavLink>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-white/20 mx-1.5" />

            {/* Get Started Button */}
            <motion.a
              href="https://app.aipowersense.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-1 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 text-white text-[10px] font-tech font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              Start
            </motion.a>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default VerticalNav;
