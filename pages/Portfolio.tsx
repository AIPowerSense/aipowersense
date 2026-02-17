import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import { X, ExternalLink } from "lucide-react";

const categories = ["All", "Web", "Branding", "3D", "Motion"];

const projects = [
  { id: 1, title: "Void Protocol", category: "Web", desc: "Decentralized platform with real-time neural rendering. Built for a blockchain-native creative collective.", tech: "React · Three.js · Solidity" },
  { id: 2, title: "Phantom UI", category: "Branding", desc: "Complete brand identity system for a luxury cybersecurity firm. Minimal, sharp, unforgettable.", tech: "Figma · Motion · Print" },
  { id: 3, title: "Stellar Engine", category: "3D", desc: "Interactive 3D product configurator for a premium hardware manufacturer. WebGL at its finest.", tech: "Three.js · GLSL · WebXR" },
  { id: 4, title: "Echo Chamber", category: "Motion", desc: "Generative audio-visual installation exhibited at 4 international digital art festivals.", tech: "TouchDesigner · Processing" },
  { id: 5, title: "Neon District", category: "Web", desc: "E-commerce platform handling 50K+ concurrent users with sub-200ms response times globally.", tech: "Next.js · Edge · Stripe" },
  { id: 6, title: "Dark Matter", category: "3D", desc: "VR experience exploring quantum physics concepts. Selected for Sundance New Frontier.", tech: "Unity · C# · Haptics" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen md:pl-14">
      <section className="relative py-32 md:py-40 px-8 md:px-16 max-w-6xl mx-auto">
        <motion.span
          className="font-tech text-xs tracking-[0.4em] text-primary/60 uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
          // Selected Work
        </motion.span>
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold mt-4 mb-12 text-glow-intense"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          PORTFOLIO
        </motion.h1>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-tech text-xs tracking-widest uppercase transition-all ${
                filter === cat
                  ? "bg-primary/20 text-primary neon-border shadow-neon-sm"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Isometric card grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <GlassCard className="group" tilt>
                  <button
                    className="w-full text-left p-8"
                    onClick={() => setSelected(project)}
                  >
                    {/* Simulated project image area */}
                    <div className="h-40 rounded-lg mb-6 overflow-hidden relative" style={{
                      background: `linear-gradient(${135 + i * 30}deg, hsl(270 60% 12%), hsl(${260 + i * 15} 50% 8%))`,
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-xl text-primary/30 text-glow tracking-widest">{project.title.split(" ")[0].toUpperCase()}</span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    
                    <span className="font-tech text-[10px] tracking-[0.3em] text-primary/50 uppercase">{project.category}</span>
                    <h3 className="font-display text-xl font-semibold mt-1 mb-2 group-hover:text-glow transition-all">{project.title}</h3>
                    <p className="text-foreground/40 text-sm line-clamp-2">{project.desc}</p>
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setSelected(null)} />
            <motion.div
              className="relative glass-intense neon-border rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-neon-intense"
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>

              <span className="font-tech text-[10px] tracking-[0.3em] text-primary/60 uppercase">{selected.category}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-4 text-glow">{selected.title}</h2>
              <p className="text-foreground/60 leading-relaxed mb-6">{selected.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-tech text-xs text-muted-foreground tracking-wider">{selected.tech}</span>
                <motion.button
                  className="glass neon-border px-4 py-2 font-tech text-xs tracking-widest text-primary uppercase flex items-center gap-2"
                  whileHover={{ boxShadow: "0 0 20px hsl(270 100% 70% / 0.3)" }}
                >
                  View <ExternalLink size={12} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Portfolio;
