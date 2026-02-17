import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Shield, Globe, Code, Layers, Cpu, Sparkles, Rocket, Box, Gauge, Users, Star, TrendingDown, Target } from "lucide-react";
import { Link } from "react-router-dom";
import TechHeroAnimation from "@/components/TechHeroAnimation";
import TechGridBackground from "@/components/TechGridBackground";
import ParticleField from "@/components/ParticleField";

const glitchText = "AIPOWERSENSE";

const features = [
  {
    iconSrc: "/11.svg",
    title: "Data Integration",
    desc: "Connect sensors, meters and industrial controllers with secure, low-latency ingestion pipelines.",
  },
  {
    iconSrc: "/12.svg",
    title: "GPU-Accelerated Processing",
    desc: "High-throughput GPU compute for training and inferencing large-scale energy models in minutes.",
  },
  {
    iconSrc: "/13.svg",
    title: "Real-Time Monitoring",
    desc: "Sub-second telemetry ingestion and analytics for immediate visibility and anomaly detection.",
  },
  {
    iconSrc: "/14.svg",
    title: "Cost Optimization",
    desc: "Automated control recommendations and demand-shaping to reduce energy spend and peak charges.",
  },
];

const TypeWriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <>{displayed}<span className="animate-pulse text-primary">|</span></>;
};

const StatCounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const increment = end / 30;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isVisible, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="font-bold mb-2">
        {count}
        {suffix}
      </div>
      {label && <p className="text-foreground/60 font-body text-sm">{label}</p>}
    </motion.div>
  );
};

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelinePaused = useRef(false);
  const [isTimelinePaused, setIsTimelinePaused] = useState(false);

  const setPausedState = (paused: boolean) => { timelinePaused.current = paused; setIsTimelinePaused(paused); };

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let lastTime: number | null = null;
    const speed = 0.18; // px per ms (~3px per frame)

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!timelinePaused.current && el) {
        // advance
        el.scrollLeft += speed * delta;
        // loop back smoothly
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    const handleEnter = () => { timelinePaused.current = true; };
    const handleLeave = () => { timelinePaused.current = false; };


    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('touchstart', handleEnter, { passive: true });
    el.addEventListener('touchend', handleLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('touchstart', handleEnter as EventListener);
      el.removeEventListener('touchend', handleLeave as EventListener);
    };
  }, []);

  const testimonialsList = [
    {
      name: "Troy Steve",
      role: "Director of Operations, Manufacturing Enterprise",
      quote: "Implementing the Smart Energy Intelligence Platform fundamentally transformed how we manage energy across our facilities. Real-time analytics and predictive optimization reduced our operational energy costs by 28% within the first year. Beyond cost savings, the platform gave us executive-level visibility into consumption patterns, enabling smarter capital allocation and long-term sustainability planning.",
      color: "from-green-500",
      rgbColor: "34, 197, 94",
      avatar: "/43.svg",
    },
    {
      name: "Edward Jonathan",
      role: "Chief Financial Officer, Commercial Real Estate Group",
      quote: "Energy used to be a fixed overhead. With this platform, it became a controllable financial variable. The AI-driven forecasting tools improved our budgeting accuracy and allowed us to identify inefficiencies that were previously invisible. The ROI was measurable within six months, and the risk mitigation benefits alone justified the investment.",
      color: "from-blue-500",
      rgbColor: "59, 130, 246",
      avatar: "/44.svg",
    },
    {
      name: "James Parker",
      role: "Head of Sustainability, Energy & Infrastructure Company",
      quote: "Our ESG commitments required precise data, not assumptions. The Smart Energy Intelligence Platform provided auditable, real-time carbon tracking aligned with international reporting standards. It strengthened our sustainability reporting, improved compliance, and positioned us as a responsible industry leader in energy optimization.",
      color: "from-purple-500",
      rgbColor: "168, 85, 247",
      avatar: "/45.svg",
    },
    {
      name: "Steve Paul",
      role: "CTO, Smart Infrastructure Solutions Firm",
      quote: "What differentiates this platform is its intelligent automation layer. The system doesn't just monitor energy, it actively recommends optimization strategies using predictive AI models. Integration with our IoT ecosystem was seamless, and the data-driven insights have become central to our digital transformation strategy.",
      color: "from-pink-500",
      rgbColor: "236, 72, 153",
      avatar: "/46.svg",
    },
  ];



  return (
    <div 
      ref={containerRef} 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/5.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero Section with Circuit Board Design */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />

        {/* Animated Circuit Board Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                width: "200%",
                top: `${20 + i * 15}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}

          {[...Array(12)].map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            return (
              <motion.div
                key={`node-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: "2px",
                  height: "2px",
                  background: "hsl(270 100% 70%)",
                  boxShadow: "0 0 15px hsl(270 100% 70%)",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            );
          })}

          <motion.div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/30" 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/30"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 text-center max-w-6xl">
          {/* Top Badge */}
          <motion.div
            className="inline-block px-6 py-2 rounded-full border border-primary/40 mb-8 bg-black/40 backdrop-blur-md hover:border-primary/80 transition-all duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-tech text-xs tracking-[0.3em] text-primary/90 uppercase flex items-center gap-2 justify-center">
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                ◆
              </motion.span>
              Advanced Energy Intelligence Platform
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                ◆
              </motion.span>
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-10 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-cyan-300 drop-shadow-lg">
              <TypeWriter text={glitchText} delay={800} />
            </span>
            <motion.div
              className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            />
          </motion.h1>

          {/* Subtitle Box */}
          <motion.div
            className="relative mb-6 sm:mb-8 md:mb-12 py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/8 to-blue-600/8 backdrop-blur-xl hover:border-primary/40 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute left-0 top-1/2 w-1 h-10 bg-gradient-to-b from-transparent via-primary to-transparent rounded-full -translate-y-1/2 opacity-60" />
            <div className="absolute right-0 top-1/2 w-1 h-10 bg-gradient-to-b from-transparent via-primary to-transparent rounded-full -translate-y-1/2 opacity-60" />

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 leading-relaxed font-body mb-4">
              Harness the power of GPU-accelerated machine learning to optimize your energy consumption, reduce costs, and unlock tomorrow's sustainability today.
            </p>

            <motion.div
              className="text-primary/70 font-tech text-xs tracking-[0.2em] flex items-center justify-center gap-3"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-primary/60" />
              REAL-TIME • PREDICTIVE • AUTONOMOUS
              <span className="w-2 h-2 rounded-full bg-primary/60" />
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Primary Button */}
            <Link to="/solutions">
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-400 to-cyan-300 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-300"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 lg:px-12 lg:py-4 bg-black rounded-xl font-tech text-xs sm:text-sm tracking-widest uppercase flex items-center gap-3 cursor-pointer border border-primary group-hover:border-cyan-300 transition-all duration-300 shadow-2xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300 group-hover:from-cyan-300 group-hover:to-primary transition-all">
                    Explore Solutions
                  </span>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ArrowRight size={16} className="text-cyan-300" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>

            {/* Secondary Button */}
            <a href="https://app.aipowersense.com/" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 lg:px-12 lg:py-4 font-tech text-xs sm:text-sm tracking-widest uppercase cursor-pointer border-2 border-primary/60 rounded-xl group hover:border-primary transition-all duration-300 bg-gradient-to-r from-primary/10 to-blue-600/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary/20 hover:to-blue-600/20 shadow-lg">
                  <span className="text-white/80 group-hover:text-white transition-colors">Get Started Today</span>
                </div>
              </motion.div>
            </a>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-black/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-green-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-tech text-xs text-white/70">Platform Status: <span className="text-green-400 font-bold">OPERATIONAL</span></span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-center">
            <p className="font-tech text-xs text-primary/60 mb-4 uppercase tracking-wide">Scroll to Explore</p>
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center relative hover:border-primary transition-colors">
              <motion.div
                className="w-1 h-2 bg-primary rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Scrollable content */}
      <div className="relative">
          {/* Vision Section */}
          {/* AI-Powered Energy - Two Column Layout */}
          <section className="relative py-40 px-8 md:px-16 overflow-hidden">
            {/* Ambient glow background */}
            <motion.div
              className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl bg-primary/15"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl bg-purple-500/15"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* LEFT SIDE - Content */}
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                >
                  {/* Main heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight"
                  >
                    AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-200">Energy</span> Intelligence
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="font-body text-lg text-foreground/70 mb-12 leading-relaxed"
                  >
                    Smart algorithms that learn your patterns, predict demand peaks, and optimize energy consumption automatically.
                  </motion.p>

                  {/* Key metrics - vertical stack */}
                  <div className="space-y-4 mb-12">
                    {[
                      { label: "Uptime Guarantee", value: "99.9%", iconSrc: "/7.svg" },
                      { label: "Real-Time Processing", value: "<1s", iconSrc: "/8.svg" },
                      { label: "Cost Reduction", value: "40%", iconSrc: "/9.svg" }
                    ].map((metric, i) => {
                      return (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                          className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-purple-500/40 transition-colors"
                        >
                          <img src={metric.iconSrc} alt={metric.label} className="w-16 h-16 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-tech text-xs text-white/40 uppercase tracking-wider mb-1">{metric.label}</p>
                            <p className="font-display text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{metric.value}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* RIGHT SIDE - Image with Design */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 60 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative h-96 md:h-[500px] flex items-center justify-center"
                >
                  {/* Animated outer glow rings */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-primary to-purple-500 bg-clip-border"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <motion.div
                    className="absolute inset-3 rounded-3xl border border-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-border opacity-50"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Inner frame with shadow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="absolute inset-6 rounded-3xl shadow-2xl overflow-hidden group"
                  >
                    {/* Animated background glow on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/40 via-purple-500/40 to-primary/40 blur-2xl transition-all duration-300"
                    />

                    {/* Image Container */}
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src="/6.svg"
                        alt="AI-Powered Energy"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Top-left corner accent */}
                      <motion.div
                        className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-lg"
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Bottom-right corner accent */}
                      <motion.div
                        className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-lg"
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-primary/10" />
                    </motion.div>
                  </motion.div>

                  {/* Floating accent dots around image */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-400 shadow-neon"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      style={{
                        left: `calc(50% + ${Math.cos((i / 6) * Math.PI * 2) * 180}px)`,
                        top: `calc(50% + ${Math.sin((i / 6) * Math.PI * 2) * 180}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}

                  {/* Side glowing lines */}
                  <motion.div
                    className="absolute left-0 top-1/3 w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      x: [-20, 0, -20]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute right-0 bottom-1/3 w-12 h-1 bg-gradient-to-l from-primary to-transparent rounded-full"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      x: [20, 0, 20]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Tech Stack - Constellation Layout */}
          <section className="relative py-12 sm:py-20 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-void via-void/95 to-void">
            {/* Animated background gradients */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-primary/20 to-transparent blur-3xl rounded-full opacity-40" />
              <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-transparent blur-3xl rounded-full opacity-30" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-cyan-400/15 to-transparent blur-3xl rounded-full opacity-25" />
            </motion.div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: "linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }} />
            
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24 relative z-10"
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute -inset-40 rounded-full blur-3xl bg-gradient-to-r from-primary/20 via-purple-500/10 to-transparent opacity-0"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Top accent line with glow */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-lg shadow-primary/50" />
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-tech text-xs tracking-[0.5em] bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent uppercase block mb-4 font-bold relative inline-block w-full"
              >
                ✦ Powered By ✦
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-400 leading-tight mb-4"
              >
                TECHNOLOGY
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text"
              >
                STACK
              </motion.h2>

              {/* Bottom accent line with glow */}
              <motion.div
                className="flex justify-center mt-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-lg shadow-cyan-400/50" />
              </motion.div>
            </motion.div>

            <div className="relative z-10 w-full">
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-primary/60 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}



                    
                    animate={{
                      y: [0, -300, 0],
                      x: [0, Math.random() * 200 - 100, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative w-full mx-auto" style={{ minHeight: "900px" }}>
                {/* Background constellation lines with animation */}
                <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 50px hsl(270 100% 70% / 0.4))" }}>
                  {/* Animated line groups */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                    const angle1 = (i / 12) * 360;
                    const angle2 = ((i + 3) / 12) * 360;
                    const r = 40;
                    const x1 = 50 + Math.cos((angle1 * Math.PI) / 180) * r;
                    const y1 = 50 + Math.sin((angle1 * Math.PI) / 180) * r;
                    const x2 = 50 + Math.cos((angle2 * Math.PI) / 180) * r;
                    const y2 = 50 + Math.sin((angle2 * Math.PI) / 180) * r;
                    return (
                      <g key={i}>
                        {/* Glowing background line */}
                        <line 
                          x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} 
                          stroke="hsl(270 100% 70% / 0.4)" 
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          opacity="0.8"
                        />
                        {/* Main animated line */}
                        <motion.line 
                          x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                          stroke="hsl(270 100% 70%)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ opacity: 0.3 }}
                          animate={{ 
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{ 
                            duration: 3 + i * 0.2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        {/* Energy pulse effect */}
                        <motion.line 
                          x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                          stroke="hsl(280 100% 80%)"
                          strokeWidth="1"
                          strokeLinecap="round"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeOut"
                          }}
                        />
                      </g>
                    );
                  })}
                  
                  {/* Center connection lines - radial */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                    const angle = (i / 12) * 360;
                    const r = 40;
                    const x = 50 + Math.cos((angle * Math.PI) / 180) * r;
                    const y = 50 + Math.sin((angle * Math.PI) / 180) * r;
                    return (
                      <g key={`radial-${i}`}>
                        <line 
                          x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`}
                          stroke="hsl(270 100% 70% / 0.2)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          opacity="0.5"
                        />
                        <motion.line 
                          x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`}
                          stroke="hsl(260 100% 75%)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={{ opacity: 0.2 }}
                          animate={{ 
                            opacity: [0.2, 0.6, 0.2],
                          }}
                          transition={{ 
                            duration: 2.5 + i * 0.1, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {[
                  { name: "NVIDIA CUDA", color: "from-green-500/20", borderColor: "green", glowColor: "rgba(34, 197, 94, 0.5)" },
                  { name: "TensorFlow", color: "from-orange-500/20", borderColor: "orange", glowColor: "rgba(234, 88, 12, 0.5)" },
                  { name: "PyTorch", color: "from-red-500/20", borderColor: "red", glowColor: "rgba(239, 68, 68, 0.5)" },
                  { name: "Apache Spark", color: "from-yellow-500/20", borderColor: "yellow", glowColor: "rgba(234, 179, 8, 0.5)" },
                  { name: "Kubernetes", color: "from-blue-600/20", borderColor: "blue", glowColor: "rgba(37, 99, 235, 0.5)" },
                  { name: "PostgreSQL", color: "from-blue-500/20", borderColor: "cyan", glowColor: "rgba(6, 182, 212, 0.5)" },
                  { name: "Redis", color: "from-red-600/20", borderColor: "red", glowColor: "rgba(220, 38, 38, 0.5)" },
                  { name: "Kafka", color: "from-gray-500/20", borderColor: "slate", glowColor: "rgba(100, 116, 139, 0.5)" },
                  { name: "GraphQL", color: "from-pink-500/20", borderColor: "pink", glowColor: "rgba(236, 72, 153, 0.5)" },
                  { name: "Docker", color: "from-blue-400/20", borderColor: "cyan", glowColor: "rgba(34, 211, 238, 0.5)" },
                  { name: "AWS", color: "from-orange-600/20", borderColor: "orange", glowColor: "rgba(217, 119, 6, 0.5)" },
                  { name: "IoT Sensors", color: "from-purple-500/20", borderColor: "purple", glowColor: "rgba(168, 85, 247, 0.5)" },
                ].map((tech, i) => {
                  const angle = (i / 12) * 360 * (Math.PI / 180);
                  const radius = 40;
                  const xPercent = 50 + Math.cos(angle) * radius;
                  const yPercent = 50 + Math.sin(angle) * radius;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.6, type: "spring" }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${xPercent}%`,
                        top: `${yPercent}%`,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.35, zIndex: 50 }}
                        animate={{ 
                          y: [0, -15, 0],
                        }}
                        transition={{
                          duration: 4 + i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-28 relative"
                      >
                        {/* Outer glow ring */}
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          animate={{
                            boxShadow: [
                              `0 0 10px ${tech.glowColor}`,
                              `0 0 25px ${tech.glowColor}`,
                              `0 0 10px ${tech.glowColor}`
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />

                        {/* Tech card */}
                        <GlassCard className={`p-5 text-center bg-gradient-to-br ${tech.color} to-transparent border-2 border-${tech.borderColor}-400/40 hover:border-${tech.borderColor}-400/80 transition-all relative backdrop-blur-xl hover:bg-${tech.borderColor}-950/20 group`}>
                          {/* Top accent */}
                          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="mb-3"
                          >
                            <Code size={22} className="mx-auto text-primary/80 group-hover:text-primary transition-colors" />
                          </motion.div>

                          <span className="font-tech text-[11px] font-bold text-primary text-center block leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-400 group-hover:bg-clip-text transition-all">{tech.name}</span>
                          
                          {/* Bottom accent */}
                          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </GlassCard>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Enhanced center circle with multiple layers */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-20">
                  {/* Center icon container - rounded image only */}
                  <motion.div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 50px rgba(168, 85, 247, 0.8), 0 0 100px rgba(6, 182, 212, 0.5)",
                        "0 0 80px rgba(168, 85, 247, 1), 0 0 150px rgba(6, 182, 212, 0.8)",
                        "0 0 50px rgba(168, 85, 247, 0.8), 0 0 100px rgba(6, 182, 212, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="relative rounded-full overflow-hidden"
                    >
                      <img src="/10.svg" alt="Technology Stack" className="w-96 h-96 drop-shadow-2xl rounded-full" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Capabilities - Static Grid Layout */}
          <section className="relative py-40 px-8 md:px-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            
            {/* Subtle animated background elements */}
            <motion.div
              className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl bg-primary/10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl bg-purple-500/10"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <motion.span
                  className="font-tech text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Core Features
                </motion.span>
                <motion.h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  WHAT WE DELIVER
                </motion.h2>
              </div>

              <div className="relative w-full max-w-6xl mx-auto">
                {/* Vertical connecting line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden lg:block" />

                <div className="space-y-12 lg:space-y-16">
                  {features.map((f, i) => {
                    const isEven = i % 2 === 0;
                    const colorGradients = [
                      "from-blue-500/20",
                      "from-purple-500/20",
                      "from-pink-500/20",
                      "from-green-500/20",
                    ];
                    return (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.7 }}
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                          !isEven ? "lg:grid-flow-dense" : ""
                        }`}
                      >
                        {/* Content side */}
                        <div className={`relative ${isEven ? "lg:col-start-1" : "lg:col-start-2"}`}>
                          <motion.div
                            className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/5 border border-primary/20 group"
                            whileHover={{ borderColor: "hsl(270 100% 70%)", shadow: "0 0 40px hsl(270 100% 70% / 0.3)" }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* number badge removed to avoid duplication with visual side */}

                            {/* Icon area */}
                            <motion.div
                              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorGradients[i]} to-transparent border border-primary/30 flex items-center justify-center mb-6 group-hover:shadow-neon transition-all`}
                              whileHover={{ rotate: 360, scale: 1.15 }}
                              transition={{ duration: 0.8 }}
                            >
                              <img src={f.iconSrc} alt={f.title} className="w-12 h-12" />
                            </motion.div>

                            {/* Content */}
                            <h3 className="font-display text-2xl font-bold mb-4 text-foreground group-hover:text-glow transition-all">
                              {f.title}
                            </h3>
                            <p className="text-foreground/70 font-body text-base leading-relaxed mb-6">
                              {f.desc}
                            </p>

                            {/* Decorative corner */}
                            <motion.div
                              className="absolute -bottom-2 -right-2 w-20 h-20 border border-primary/10 rounded-tl-3xl"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            />
                          </motion.div>
                        </div>

                        {/* Visual highlight side */}
                        <motion.div
                          className={`relative h-64 lg:h-80 rounded-2xl overflow-hidden ${
                            isEven ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-1 lg:row-start-1"
                          }`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 0.7 }}
                        >
                          {/* Gradient background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${colorGradients[i]} to-transparent opacity-40`} />

                          {/* Border */}
                          <div className="absolute inset-0 border border-primary/20 rounded-2xl" />

                          {/* Animated inner elements */}
                          <motion.div
                            className="absolute inset-6 rounded-xl border-2 border-primary/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          />

                          {/* Decorative center: single graphic (no duplicate text) */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <motion.div
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="mb-4"
                            >
                              <img src={f.iconSrc} alt={f.title} className="w-28 h-28 drop-shadow-xl" />
                            </motion.div>
                            <div className="font-tech font-black text-6xl opacity-8 select-none pointer-events-none">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                          </div>

                          {/* Floating elements */}
                          {[...Array(3)].map((_, j) => (
                            <motion.div
                              key={j}
                              className="absolute w-2 h-2 rounded-full bg-primary/40"
                              animate={{
                                x: [0, 30 * Math.cos((j / 3) * Math.PI), 0],
                                y: [0, 30 * Math.sin((j / 3) * Math.PI), 0],
                                opacity: [0.3, 0.8, 0.3],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: j * 0.3,
                              }}
                              style={{
                                left: "50%",
                                top: "50%",
                              }}
                            />
                          ))}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Performance Metrics - Premium Elegant Design */}
          <section className="relative py-12 sm:py-24 md:py-36 lg:py-48 px-4 sm:px-6 md:px-12 lg:px-16 bg-black overflow-hidden">
            {/* Background Texture & Glow */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
              <div className="absolute inset-0 opacity-20 brightness-50 contrast-150" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
              />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Side: Header & Context */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="font-tech text-xs tracking-[0.6em] text-purple-400 font-bold uppercase mb-6 block">Performance Metrics</span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
                      Energy <br />
                      <span className="text-purple-400/80">Intelligence</span> <br />
                      Impact
                    </h2>
                    <p className="text-foreground/50 text-lg leading-relaxed max-w-sm border-l border-white/10 pl-8">
                      Precision data analytics meeting institutional energy management standards.
                    </p>
                  </motion.div>
                </div>

                {/* Right Side: Unique Metric Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Cost Reduction", value: 40, suffix: "%", iconSrc: "/15.svg", delay: 0 },
                    { label: "Data Points/min", value: 1000, suffix: "+", iconSrc: "/16.svg", delay: 0.1 },
                    { label: "Accuracy Rate", value: 92, suffix: "%", iconSrc: "/17.svg", delay: 0.2 },
                    { label: "Active Customers", value: 5000, suffix: "+", iconSrc: "/18.svg", delay: 0.3 }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: stat.delay }}
                      whileHover={{ y: -10 }}
                      className="group relative"
                    >
                      <div className="relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/10 p-10 backdrop-blur-3xl transition-all duration-500 group-hover:bg-purple-900/10 group-hover:border-purple-500/30">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                          <img src={stat.iconSrc} alt={stat.label} className="w-40 h-40 text-white" />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <img src={stat.iconSrc} alt={stat.label} className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                            <span className="font-tech text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-purple-300">Metric 0{i+1}</span>
                          </div>
                          
                          <div className="mb-2">
                            <span className="text-5xl lg:text-6xl font-display font-light text-white group-hover:text-purple-100 transition-colors">
                              <StatCounter end={stat.value} label="" suffix={stat.suffix} />
                            </span>
                          </div>
                          
                          <p className="font-tech text-xs tracking-widest uppercase text-foreground/40 mt-4 group-hover:text-white/60">
                            {stat.label}
                          </p>
                        </div>

                        {/* Animated bottom bar */}
                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700 ease-out group-hover:w-full" />
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* Process Section - Premium Animated Timeline */}
          <section className="relative py-12 sm:py-20 md:py-32 lg:py-44 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24 relative z-10"
            >
              <div className="inline-block relative">
                <span className="font-tech text-xs tracking-[0.5em] text-primary mb-4 block uppercase opacity-80">Implementation</span>
                <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-glow tracking-tighter">OUR WORKFLOW</h2>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="absolute -bottom-4 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
              {/* Horizontal Desktop Timeline */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Horizontal connecting path behind cards */}
                  <svg className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-48 pointer-events-none" viewBox="0 0 1200 200" fill="none">
                    <defs>
                      <linearGradient id="workflow-grad-h" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                        <stop offset="40%" stopColor="rgb(168, 85, 247)" />
                        <stop offset="70%" stopColor="rgb(34, 197, 94)" />
                        <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 40 100 C 220 20, 420 180, 600 100 C 780 20, 980 180, 1160 100"
                      stroke="url(#workflow-grad-h)"
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: 'easeInOut' }}
                    />
                    {/* Node circles placed along the path */}
                    {[120, 360, 600, 840].map((cx, idx) => (
                      <circle key={idx} cx={cx} cy={100} r={8} fill={`rgb(${['59,130,246','168,85,247','34,197,94','236,72,153'][idx]})`} opacity={0.95} />
                    ))}
                  </svg>

                  {/* Horizontal scroll container with cards */}
                  <div
                    ref={timelineRef}
                    data-hide-scroll
                    className="relative overflow-x-auto py-16"
                    aria-label="workflow-timeline"
                    style={{ scrollbarWidth: 'none' as any, msOverflowStyle: 'none' as any }}
                  >
                    <style>{`[data-hide-scroll]::-webkit-scrollbar{display:none}`}</style>

                    <div className="flex items-center gap-8 px-8">
                      {[
                        { phase: '01', title: 'Data Integration', desc: 'Connect your energy sources and IoT devices securely with our proprietary bridge technology.', rgb: '59, 130, 246', icon: '/19.svg' },
                        { phase: '02', title: 'AI Training', desc: 'Our neural networks process your historical data to create a custom optimization model.', rgb: '168, 85, 247', icon: '/20.svg' },
                        { phase: '03', title: 'Real-Time Monitoring', desc: 'Visualize every watt with microsecond precision through our edge-computing dashboard.', rgb: '34, 197, 94', icon: '/21.svg' },
                        { phase: '04', title: 'Cost Optimization', desc: 'Automated executive decisions that reduce waste and carbon footprint instantly.', rgb: '236, 72, 153', icon: '/22.svg' },
                      ].map((item, i) => (
                        <motion.div
                          key={item.phase}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12, duration: 0.5 }}
                          className="min-w-[360px] w-[360px] flex-shrink-0 group"
                        >
                          <div className="relative p-6 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-black/35 backdrop-blur-md border border-white/10 rounded-2xl" />
                            <div className="relative z-10 flex flex-col gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ background: `linear-gradient(135deg, rgba(${item.rgb},0.12), rgba(${item.rgb},0.04))`, border: `2px solid rgba(${item.rgb},0.25)`, boxShadow: `0 6px 30px rgba(${item.rgb},0.08)` }}>
                                  <img src={item.icon} alt={item.title} className="w-10 h-10" />
                                </div>
                                <div>
                                  <div className="text-xs font-tech text-primary/70 uppercase">STEP {item.phase}</div>
                                  <h3 className="font-display text-xl font-bold mt-1">{item.title}</h3>
                                </div>
                              </div>
                              <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                              <div className="mt-4 flex items-center gap-3">
                                <div className="h-1 w-12 rounded-full" style={{ background: `linear-gradient(90deg, rgba(${item.rgb},0.9), rgba(${item.rgb},0.4))` }} />
                                <button className="ml-auto px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/8">Learn more</button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    </div>

                    {/* Pause/Play control - outside scroll area so it stays fixed */}
                    <div className="absolute right-6 top-6 z-20">
                      <button
                        onClick={() => setPausedState(!isTimelinePaused)}
                        aria-pressed={isTimelinePaused}
                        title={isTimelinePaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                        className="flex items-center gap-2 px-3 py-2 bg-white/6 hover:bg-white/9 rounded-md backdrop-blur-md border border-white/10 text-sm"
                      >
                        {isTimelinePaused ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5V7z"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                        )}
                        <span className="hidden sm:inline">{isTimelinePaused ? 'Resume' : 'Pause'}</span>
                      </button>
                    </div>
                </div>
              </div>

              {/* Mobile/Tablet Layout (Modern Staggered Cards) */}
              <div className="lg:hidden space-y-8">
                {[
                  { title: "Data Integration", phase: "01", rgb: "59, 130, 246", icon: "/19.svg" },
                  { title: "AI Training", phase: "02", rgb: "168, 85, 247", icon: "/20.svg" },
                  { title: "Real-Time Monitoring", phase: "03", rgb: "34, 197, 94", icon: "/21.svg" },
                  { title: "Cost Optimization", phase: "04", rgb: "236, 72, 153", icon: "/22.svg" },
                ].map((item, i) => (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center border flex-shrink-0"
                        style={{ borderColor: `rgba(${item.rgb}, 0.5)`, background: `rgba(${item.rgb}, 0.1)` }}
                      >
                        <img src={item.icon} alt="" className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-tech text-xs opacity-50 block" style={{ color: `rgb(${item.rgb})` }}>PHASE {item.phase}</span>
                        <h3 className="font-display text-lg font-bold">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* What Sets Us Apart - Premium 3D Cards */}
          <section className="relative py-44 px-8 md:px-16 overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-32 relative z-10"
            >
              <span className="font-tech text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4">Advantages</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-glow">WHY CHOOSE AIPOWERSENSE</h2>
            </motion.div>

            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                {[
                  {
                    iconSrc: "/35.svg",
                    title: "Predictive Modeling",
                    desc: "We train high-throughput GPU models that anticipate demand, detect anomalies and recommend corrective actions.",
                    color: "from-blue-500 to-cyan-500",
                    lightColor: "blue",
                    rgbColor: "59, 130, 246",
                    delay: 0,
                    offsetClass: "",
                  },
                  {
                    iconSrc: "/36.svg",
                    title: "Real-Time Optimization",
                    desc: "Automated control loops and sub-second analytics reduce peak consumption and improve system efficiency.",
                    color: "from-purple-500 to-pink-500",
                    lightColor: "purple",
                    rgbColor: "168, 85, 247",
                    delay: 0.15,
                    offsetClass: "md:mt-8",
                  },
                  {
                    iconSrc: "/37.svg",
                    title: "Proven Results",
                    desc: "Validated deployments show measurable savings — lower energy spend and higher operational resilience.",
                    color: "from-pink-500 to-rose-500",
                    lightColor: "pink",
                    rgbColor: "236, 72, 153",
                    delay: 0.3,
                    offsetClass: "",
                  },
                ].map((value) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.3, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: value.delay, duration: 0.6 }}
                    className={value.offsetClass}
                  >
                    <motion.div
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="group relative h-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Large rotating background element */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(45deg, rgb(${value.rgbColor}), transparent)`,
                          filter: "blur(30px)"
                        }}
                      />

                      {/* Glow orb behind card */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -inset-6 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{
                          background: `radial-gradient(circle, rgb(${value.rgbColor}) 0%, transparent 70%)`
                        }}
                      />

                      {/* Main card */}
                      <div
                        className="relative backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/10 rounded-3xl p-10 md:p-12 shadow-2xl overflow-hidden h-full flex flex-col"
                        style={{
                          boxShadow: `0 0 50px rgba(${value.rgbColor}, 0.2), inset 0 0 30px rgba(${value.rgbColor}, 0.08)`
                        }}
                      >
                        {/* Top animated accent */}
                        <motion.div
                          animate={{ x: [0, 20, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${value.color}`}
                          style={{ width: "50%" }}
                        />

                        {/* Corner accent lines */}
                        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />

                        {/* Icon section with rotating ring */}
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                          className="absolute top-8 right-8 w-24 h-24 rounded-full opacity-20"
                          style={{
                            background: `conic-gradient(from 0deg, rgb(${value.rgbColor}), transparent)`,
                          }}
                        />

                        {/* Icon container */}
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 180 }}
                          transition={{ duration: 0.6 }}
                          className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center mb-8 group-hover:shadow-neon transition-all"
                          style={{
                            boxShadow: `0 0 30px rgba(${value.rgbColor}, 0.4)`,
                          }}
                        >
                          <img src={value.iconSrc} alt={value.title} className="w-16 h-16" style={{ color: `rgb(${value.rgbColor})` }} />
                        </motion.div>

                        {/* Content */}
                        <h3 className={`font-display text-2xl md:text-3xl font-bold bg-gradient-to-r ${value.color} bg-clip-text text-transparent mb-4 leading-tight`}>
                          {value.title}
                        </h3>
                        
                        <p className="text-foreground/75 font-body text-base leading-relaxed mb-8 flex-grow">
                          {value.desc}
                        </p>

                        {/* Bottom accent bar */}
                        <motion.div
                          animate={{ scaleX: [0, 1, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.color}`}
                          style={{ width: "40%", transformOrigin: "left" }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Success Stories - Beautiful Modern Design */}
          <section className="relative py-32 px-8 md:px-16 overflow-hidden">
            {/* Subtle animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl"
                animate={{ y: [0, 80, 0], x: [0, 40, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl"
                animate={{ y: [0, -60, 0], x: [0, -50, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>

            {/* Minimalist Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-6 mb-32 max-w-6xl mx-auto"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-xl">
                  <motion.span 
                    className="font-tech text-xs tracking-[0.6em] text-primary mb-6 block uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    // Case Studies
                  </motion.span>
                  <h2 className="font-display text-5xl md:text-7xl font-light text-white leading-tight">
                    Success <span>Stories</span>
                  </h2>
                </div>
                <div className="max-w-xs transition-opacity duration-700 opacity-60 hover:opacity-100">
                  <p className="text-sm text-foreground/70 leading-relaxed font-light border-l border-primary/30 pl-6">
                    Real results from our energy optimization solutions across diverse industries.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Simple & Elegant Minimalist Grid */}
            <div className="relative max-w-6xl mx-auto z-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                {[
                  { 
                    id: "01",
                    metric: "35%",
                    metricLabel: "Cost Reduction",
                    title: "Manufacturing Complex", 
                    subtitle: "Industrial Automation Suite",
                    details: "Integrated 1000+ IoT sensors across facility to monitor energy consumption patterns in real-time.",
                    iconSrc: "/47.svg",
                    accent: "#10b981", // Emerald
                    index: 0
                  },
                  { 
                    id: "02",
                    metric: "28%",
                    metricLabel: "Power Savings",
                    title: "Data Center Optimization", 
                    subtitle: "Computing Infrastructure",
                    details: "Optimized GPU workloads and implemented AI-driven cooling systems for maximum efficiency.",
                    iconSrc: "/48.svg",
                    accent: "#3b82f6", // Blue
                    index: 1
                  },
                  { 
                    id: "03",
                    metric: "42%",
                    metricLabel: "Peak Reduction",
                    title: "Enterprise Campus", 
                    subtitle: "Building Management System",
                    details: "Connected multiple buildings with intelligent load balancing and predictive demand forecasting.",
                    iconSrc: "/49.svg",
                    accent: "#f43f5e", // Rose
                    index: 2
                  },
                  { 
                    id: "04",
                    metric: "100%",
                    metricLabel: "Real-Time Trading",
                    title: "Smart Grid Integration", 
                    subtitle: "Energy Trading Platform",
                    details: "Enabled demand response capabilities with advanced AI algorithms for energy market participation.",
                    iconSrc: "/50.svg",
                    accent: "#8b5cf6", // Violet
                    index: 3
                  }
                ].map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: project.index * 0.1 }}
                    className={`relative group ${idx % 2 === 1 ? "md:mt-32" : ""}`}
                  >
                    {/* The "Unique" element: A vertical progress/accent line */}
                    <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-white/10 overflow-hidden hidden md:block">
                      <motion.div 
                        className="w-full h-full"
                        style={{ backgroundColor: project.accent }}
                        initial={{ y: "-100%" }}
                        whileInView={{ y: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    {/* Minimalist Card Design */}
                    <div className="relative">
                      {/* Numeric Badge & Category */}
                      <div className="flex items-center gap-4 mb-8">
                        <span className="font-tech text-sm tracking-widest text-foreground/30">{project.id}</span>
                        <div className="h-[1px] w-8 bg-white/10" />
                        <span className="font-tech text-[10px] tracking-[0.3em] uppercase text-foreground/50">{project.subtitle}</span>
                      </div>

                      {/* Main Metric Focus */}
                      <div className="mb-10 group-hover:translate-x-3 transition-transform duration-500 ease-out">
                        <div className="flex items-baseline gap-4">
                          <h3 className="text-7xl md:text-8xl font-display font-light text-white tracking-tighter">
                            {project.metric}
                          </h3>
                          <img
                            src={project.iconSrc}
                            alt={project.title}
                            style={{ color: project.accent }}
                            className="opacity-70 group-hover:opacity-100 transition-opacity duration-500 w-16 h-16"
                          />
                        </div>
                        <p className="font-tech text-xs tracking-widest uppercase text-foreground/40 mt-3 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: project.accent }} />
                          {project.metricLabel}
                        </p>
                      </div>

                      {/* Title & Details */}
                      <div className="space-y-4 max-w-sm">
                        <h4 className="text-2xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                          {project.title}
                        </h4>
                        <p className="text-sm text-foreground/50 leading-relaxed font-light group-hover:text-foreground/70 transition-colors duration-500">
                          {project.details}
                        </p>
                      </div>

                      {/* Unique subtle "View" Link */}
                      <div className="mt-12 pt-8 border-t border-white/5 relative overflow-hidden">
                        <motion.button
                          className="flex items-center gap-4 text-[10px] font-tech tracking-[0.4em] uppercase text-foreground/40 hover:text-white transition-all duration-300 group/link"
                        >
                          <span className="relative z-10"></span>
                          {/* <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform duration-300 relative z-10" /> */}
                          <motion.div 
                            className="absolute bottom-0 left-0 h-[1px] w-0 group-hover/link:w-full transition-all duration-500 ease-in-out"
                            style={{ backgroundColor: project.accent }}
                          />
                        </motion.button>
                      </div>
                    </div>

                    {/* Floating background decorative element */}
                    <div 
                      className="absolute -right-10 -top-10 w-40 h-40 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials - Auto-Scrolling Carousel */}
          <section className="relative py-40 px-8 md:px-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24 relative z-10"
            >
              <span className="font-tech text-xs tracking-[0.4em] text-primary/60 uppercase block mb-4">Feedback</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-glow">CUSTOMER SUCCESS</h2>
            </motion.div>

            <div className="relative z-10 overflow-hidden">
              {/* Left fade gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-void to-transparent z-20 pointer-events-none" />
              {/* Right fade gradient */}
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-void to-transparent z-20 pointer-events-none" />

              {/* Scrolling container */}
              <motion.div
                animate={{ x: [0, -2000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 w-fit"
              >
                {/* Original testimonials + duplicate for seamless loop */}
                {testimonialsList.concat(testimonialsList).map((testimonial, i) => (
                  <motion.div
                    key={`${testimonial.name}-${i}`}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group flex-shrink-0 w-96"
                  >
                    {/* Card container with glow */}
                    <div className="relative h-full">
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle, rgba(${testimonial.rgbColor}, 0.5) 0%, transparent 70%)`
                        }}
                      />

                      {/* Main card */}
                      <div
                        className="relative backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/10 rounded-2xl p-10 shadow-2xl overflow-hidden h-full flex flex-col group-hover:border-white/30 transition-all"
                        style={{
                          boxShadow: `0 0 40px rgba(${testimonial.rgbColor}, 0.2), inset 0 0 20px rgba(${testimonial.rgbColor}, 0.05)`
                        }}
                      >
                        {/* Top accent line */}
                        <motion.div
                          animate={{ x: [0, 15, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${testimonial.color}`}
                          style={{ width: "50%" }}
                        />

                        {/* Quote icon and rating */}
                        <div className="flex items-start justify-between mb-6">
                          <span className="text-5xl text-primary/30 font-display leading-none">"</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: j * 0.1 }}
                              >
                                <Star key={j} size={18} className="fill-yellow-400 text-yellow-400" />
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Quote text */}
                        <p className="text-foreground/85 font-body text-base leading-relaxed mb-8 flex-grow italic">
                          "{testimonial.quote}"
                        </p>

                        {/* Author section */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div>
                            <p className={`font-display font-bold bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent`}>
                              {testimonial.name}
                            </p>
                            <p className="text-foreground/60 font-tech text-xs mt-1">{testimonial.role}</p>
                          </div>
                          <motion.div
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:shadow-neon transition-all border border-white/10"
                            whileHover={{ scale: 1.2, rotate: -90 }}
                          >
                            →
                          </motion.div>
                        </div>

                        {/* Corner decorations */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                          className="absolute top-4 right-4 w-5 h-5 border border-white/15 rounded-full opacity-30"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center mt-12 text-primary/40 font-tech text-xs tracking-widest"
            >
              ← SCROLL TO EXPLORE MORE →
            </motion.div>
          </section>



          {/* CTA Portal */}
          <section className="relative py-32 px-8 md:px-16 flex items-center justify-center">
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-neon" />
              <div className="absolute inset-4 rounded-full border border-primary/15" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />
              <div className="absolute inset-0 rounded-full" style={{
                background: "radial-gradient(circle, hsl(270 100% 70% / 0.15), hsl(270 60% 3% / 0.5), transparent)"
              }} />

              {/* Orbiting dot */}
              <div className="absolute inset-0">
                <div className="w-full h-full animate-orbit">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-neon" />
                </div>
              </div>

              <Link to="/contact" className="relative z-10 text-center">
                <motion.div
                  whileHover={{ textShadow: "0 0 30px hsl(270 100% 70% / 0.8)" }}
                >
                  <span className="font-tech text-xs tracking-[0.4em] text-primary/60 uppercase block mb-2">Get Started</span>
                  <span className="font-display text-2xl md:text-3xl font-bold text-glow block mb-3">START SAVING</span>
                  <ArrowRight className="mx-auto text-primary" size={20} />
                </motion.div>
              </Link>
            </motion.div>
          </section>

          <Footer />
        </div>
    </div>
  );
};

export default Home;
