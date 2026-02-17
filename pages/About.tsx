import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Cpu, Globe, Zap, Database, ArrowRight, ShieldCheck, Milestone, Sparkles } from "lucide-react";
import TechGridBackground from "@/components/TechGridBackground";

const timeline = [
  { year: "2023", title: "GENESIS", desc: "Digital intelligence for industrial heat." },
  { year: "2024", title: "SENTIENT", desc: "First 24-hour predictive energy model." },
  { year: "2025", title: "GLOBAL", desc: "5,000 nodes crossing 12 countries." },
];

const stats = [
  { value: "5000+", label: "ACTIVE NODES" },
  { value: "40%", label: "AVG. EFFICIENCY" },
  { value: "99.9%", label: "UPTIME SLA" },
  { value: "2.5B", label: "DATAPOINTS" },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section - High Fidelity */}
      <section className="relative min-h-[50vh] sm:min-h-[70vh] flex items-center px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/5">
        {/* Background Layer (no black overlay) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hh.jpg" 
            alt="Background" 
            className="w-full h-full object-cover scale-105 opacity-80"
          />
          <TechGridBackground />
        </div>

        {/* Scanner Line Animation */}
        <motion.div 
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-0"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="relative border-x border-white/5 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black/20 backdrop-blur-[1px]">
            {/* Corner Details */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="absolute top-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-t border-l border-purple-500/50" />
              <div className="absolute top-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-t border-r border-purple-500/50" />
              <div className="absolute bottom-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-b border-l border-purple-500/50" />
              <div className="absolute bottom-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-b border-r border-purple-500/50" />
            </motion.div>

            {/* Meta Headers */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 sm:mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start"
              >
                <div className="w-8 h-[1px] bg-gradient-to-r from-purple-500 to-transparent" />
                <span className="font-tech text-[10px] tracking-[0.4em] sm:tracking-[0.6em] text-purple-400 uppercase">Mission Protocol 4.0</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6 sm:gap-10 w-full md:w-auto justify-center md:justify-end"
              >
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-[8px] sm:text-[9px] font-tech tracking-widest text-white/20 uppercase whitespace-nowrap">Core Frequency</span>
                  <span className="text-[10px] sm:text-[11px] font-tech text-purple-500/60">88.42 THz</span>
                </div>
                <div className="px-3 py-1 bg-purple-500/5 border border-purple-500/20 rounded-sm overflow-hidden relative group">
                  <div className="absolute inset-0 bg-purple-500/10 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-500" />
                  <span className="relative font-tech text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] text-purple-200">CORE.VERSION_2.0</span>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center">
              {/* Text wrapper with black overlay specifically for the heading + quote */}
              <div className="relative inline-block px-4 py-8 sm:px-8 sm:py-10 md:py-12 rounded-lg">
                <div className="absolute inset-0 bg-black/60 rounded-lg -z-10" />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter mb-6 sm:mb-8 text-center flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-6 md:gap-x-8">
                    <span className="text-white">THE</span>
                    <span className="relative">
                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-300 via-purple-600 to-purple-900">CULTURE.</span>
                      <motion.div 
                        className="absolute -inset-2 bg-purple-500/5 blur-2xl rounded-full z-[-1]"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </span>
                  </h1>
                </motion.div>

                <div className="max-w-2xl text-center relative mt-6 sm:mt-8">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1.5 }}
                    className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed italic px-2 sm:px-6 md:px-8 font-light tracking-wide"
                  >
                    "We don't manage energy; we decode the physics of consumption. Using GPU-accelerated intelligence to redefine industrial survival."
                  </motion.p>
                </div>
              </div>

              {/* Visual Anchors (kept outside the overlay) */}
              <div className="mt-8 sm:mt-16 flex items-center justify-center gap-4 opacity-20">
                <div className="h-[1px] w-8 sm:w-12 bg-white" />
                <div className="w-1 h-1 rounded-full bg-purple-500" />
                <div className="h-[1px] w-20 sm:w-40 bg-gradient-to-r from-white to-transparent" />
                <div className="w-1 h-1 rounded-full bg-purple-500" />
                <div className="h-[1px] w-8 sm:w-12 bg-white" />
              </div>
            </div>

            {/* Floating Info Elements */}
            <motion.div 
              className="absolute left-12 bottom-12 hidden lg:flex flex-col gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-8 h-px bg-purple-500/30" />
              <span className="text-[8px] font-tech text-white/20 tracking-widest uppercase rotate-90 origin-left mt-8">Decentralized Intelligence</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats - Horizontal Flow */}
      <section className="relative py-10 sm:py-20 md:py-32 px-6 border-b border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2 items-center md:items-start text-center md:text-left"
            >
              <div className="text-[11px] font-tech text-purple-400 tracking-[0.3em] uppercase">{stat.label}</div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Split - Purple Focus */}
      <section className="py-12 sm:py-24 md:py-32 lg:py-48 px-4 sm:px-6 md:px-12 lg:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative aspect-square">
            <img src="/42.svg" alt="Energy Intelligence" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-none">
              Energy is <br /> <span className="text-purple-400">Pure Intelligence.</span>
            </h2>
            <p className="font-body text-sm sm:text-base md:text-lg text-white/50 leading-relaxed max-w-lg">
              Legacy management is static. Our neural fabrics are dynamic. We enable systems to think, react, and optimize before the first electron is even moved.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-px bg-purple-500 self-center" />
              <div className="font-tech text-xs tracking-widest text-purple-400 uppercase">The Autonomous Grid</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Minimalist Dots */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-24 items-center">
          <div className="space-y-16 sm:space-y-20">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                className="relative pl-12 sm:pl-20 md:pl-32 border-l border-purple-500/30"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                <div className="text-sm font-tech text-purple-400 uppercase tracking-[0.3em] mb-2">
                  {item.year}
                </div>
                <h4 className="text-2xl font-display font-black mb-4 uppercase">{item.title}</h4>
                <p className="font-body text-white/40 max-w-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Animated Tech Visualization */}
          <div className="relative h-full min-h-[300px] sm:min-h-[450px] md:min-h-[600px]">
            {/* Central Core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-purple-500 flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 20px rgba(168,85,247,0.5)",
                  "0 0 40px rgba(168,85,247,0.8)",
                  "0 0 20px rgba(168,85,247,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
            </motion.div>

            {/* Orbiting Nodes */}
            {[0, 1, 2].map((i) => {
              const angle = (i / 3) * Math.PI * 2;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={`node-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    x: [x, x * 1.15, x],
                    y: [y, y * 1.15, y],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-purple-400 border border-purple-300"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-purple-400"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Connecting Lines to Core */}
            {[0, 1, 2].map((i) => {
              const angle = (i / 3) * Math.PI * 2;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <svg
                  key={`line-${i}`}
                  className="absolute inset-0 w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  viewBox="-150 -150 300 300"
                >
                  <motion.line
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(168,85,247,0.5)" />
                      <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
                    </linearGradient>
                  </defs>
                </svg>
              );
            })}

            {/* Floating Tech Elements */}
            {[0, 1, 2, 3].map((i) => {
              const randomX = Math.sin(i * 1.5) * 100;
              const randomY = Math.cos(i * 1.2) * 80;

              return (
                <motion.div
                  key={`element-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    x: randomX + Math.sin(Date.now() / 1000 + i) * 20,
                    y: randomY + Math.cos(Date.now() / 1000 + i) * 20,
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className={`w-2 h-2 rounded-full ${["bg-blue-400", "bg-cyan-400", "bg-purple-300", "bg-pink-400"][i]}`} />
                </motion.div>
              );
            })}

            {/* Background Grid Effect */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Team Selection - High Fidelity */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 sm:mb-20 md:mb-24 gap-8 sm:gap-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase">THE MINDS.</h2>
            <div className="text-purple-400 font-tech uppercase tracking-[0.4em] text-xs">Architects of Energy Intelligence</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {[
              { name: "Dr. Elias Thorne", role: "Chief Neural Architect", img: "/43.svg" },
              { name: "Sloane Verity", role: "Lead Platform Engineer", img: "/44.svg" },
              { name: "Chrisha Thomas", role: "Systems Expert", img: "/45.svg" },
              { name: "Aria Vance", role: "Operations Protocol", img: "/46.svg" },
            ].map((member, i) => (
              <motion.div 
                key={i}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-4 sm:mb-6 md:mb-8 border border-white/10 relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent opacity-60" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-tech uppercase tracking-[0.3em] text-purple-400">ID: 00{i+1} // {member.role}</div>
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-purple-400 transition-colors">{member.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-32 md:py-40 lg:py-64 px-4 sm:px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-9xl font-display font-black tracking-tighter mb-8 sm:mb-12 md:mb-16 uppercase">JOIN THE <br /> SYNC.</h2>
          <button 
            onClick={() => navigate("/contact")}
            className="relative group px-6 py-4 sm:px-8 sm:py-5 md:px-12 md:py-6 lg:px-16 lg:py-8 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-purple-600 transition-transform duration-500 group-hover:scale-110" />
            <div className="relative font-display font-black text-xs tracking-[0.5em] uppercase text-white">
              Initialize Connection
            </div>
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

