import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CaseStudy {
  id: number;
  number: string;
  icon: string;
  title: string;
  metric: string;
  metricLabel: string;
  subtitle: string;
  description: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    number: "01",
    icon: "/47.svg",
    title: "Industrial Automation Suite",
    metric: "35%",
    metricLabel: "Cost Reduction",
    subtitle: "Manufacturing Complex",
    description:
      "Integrated 1000+ IoT sensors across facility to monitor energy consumption patterns in real-time.",
  },
  {
    id: 2,
    number: "02",
    icon: "/48.svg",
    title: "Computing Infrastructure",
    metric: "28%",
    metricLabel: "Power Savings",
    subtitle: "Data Center Optimization",
    description:
      "Optimized GPU workloads and implemented AI-driven cooling systems for maximum efficiency.",
  },
  {
    id: 3,
    number: "03",
    icon: "/49.svg",
    title: "Building Management System",
    metric: "42%",
    metricLabel: "Peak Reduction",
    subtitle: "Enterprise Campus",
    description:
      "Connected multiple buildings with intelligent load balancing and predictive demand forecasting.",
  },
  {
    id: 4,
    number: "04",
    icon: "/50.svg",
    title: "Energy Trading Platform",
    metric: "100%",
    metricLabel: "Real-Time Trading",
    subtitle: "Smart Grid Integration",
    description:
      "Enabled demand response capabilities with advanced AI algorithms for energy market participation.",
  },
];

function Card({ study }: { study: CaseStudy }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 50 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl p-8 transition-all hover:border-primary/40 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} 
      />

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, hsl(var(--primary) / 0.15), transparent 80%)`
          ),
        }}
      />

      <div className="relative flex flex-col h-full z-10">
        <div className="flex items-start justify-between mb-10">
          <div className="space-y-1">
            <span className="text-4xl font-display font-black text-white/10 group-hover:text-primary/20 transition-colors">
              {study.number}
            </span>
            <div className="h-1 w-8 bg-primary/30 rounded-full group-hover:w-12 transition-all duration-500" />
          </div>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
            <img
              src={study.icon}
              alt={study.title}
              className="w-8 h-8 filter brightness-200 group-hover:scale-110 transition-transform"
            />
          </div>
        </div>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-tech font-bold tracking-[0.2em] uppercase bg-primary/10 text-primary border border-primary/20 mb-4">
            {study.subtitle}
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight group-hover:translate-x-1 transition-transform">
            {study.title}
          </h3>
        </div>

        <div className="mt-auto space-y-6">
          <div className="relative">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-primary/50 group-hover:from-primary group-hover:to-accent transition-all duration-500">
                {study.metric}
              </span>
            </div>
            <p className="text-sm font-tech font-semibold text-gray-400 group-hover:text-primary/80 transition-colors tracking-wider uppercase">
              {study.metricLabel}
            </p>
          </div>

          <p className="text-gray-400 font-body leading-relaxed text-sm md:text-base">
            {study.description}
          </p>

          <div className="pt-4 flex items-center justify-between">
            <button className="flex items-center gap-2 text-xs font-tech font-bold tracking-widest text-primary hover:text-white transition-colors">
              EXPLORE CASE STUDY 
              <div className="w-8 h-[1px] bg-primary/30 group-hover:w-12 transition-all" />
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-tech tracking-[0.3em] text-xs font-black uppercase">
                Proven Excellence
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-white leading-[0.9]"
            >
              SUCCESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                STORIES
              </span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md lg:text-right"
          >
            <p className="text-gray-400 text-lg font-body leading-relaxed">
              Real results from our energy optimization solutions across diverse industries. We transform data into measurable efficiency.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {caseStudies.map((study) => (
            <Card key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}

