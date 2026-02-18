import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Cpu, Network, TrendingUp, Database, Gauge, AlertCircle, Sparkles, BookOpen, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import TechGridBackground from "@/components/TechGridBackground";

const VoltCore = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "sdks">("overview");
  const containerRef = useRef<HTMLDivElement>(null);

  const architectureLayers = [
    {
      title: "Real-Time Data Ingestion",
      description: "Sub-second data streaming pipeline processing 2.5B data points/sec with live anomaly detection",
      features: ["Multi-protocol support (MQTT, APIs)", "Live anomaly detection", "99.9% uptime"],
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "GPU-Accelerated Analytics",
      description: "High-performance data processing and ML model training for predictive energy forecasting",
      features: ["100x faster data processing", "Advanced ML models", "Time-series forecasting"],
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Intelligent Insights",
      description: "Transform raw data into human-readable, actionable recommendations and reports",
      features: ["Automated report generation", "Contextual recommendations", "Natural language insights"],
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "Optimized Inference",
      description: "Production-ready model serving with ultra-low latency and high throughput",
      features: ["Real-time inference", "Multi-model orchestration", "Optimized performance"],
      gradient: "from-green-500/20 to-cyan-500/20"
    }
  ];

  const capabilities = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Sub-Second Response",
      value: "<1s",
      description: "Real-time energy event detection and alerting"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Throughput",
      value: "2.5B",
      description: "Data points per second ingestion capacity"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Cost Reduction",
      value: "40%",
      description: "Autonomous demand optimization savings"
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Processing Speed",
      value: "100x",
      description: "Faster analytics vs legacy systems"
    }
  ];

  const sdkFeatures = [
    {
      sdk: "NVIDIA Morpheus",
      role: "Real-Time Pipeline",
      highlights: ["Handles 2.5B data points/sec", "GPU-accelerated ingestion", "Anomaly detection engine"],
      color: "from-pink-500 to-rose-500"
    },
    {
      sdk: "NVIDIA RAPIDS",
      role: "Data Science Engine",
      highlights: ["cuML: GPU-accelerated ML models", "cuDF: Terabyte-scale data processing", "100x faster analytics"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      sdk: "NVIDIA NeMo",
      role: "Deep Learning & LLM",
      highlights: ["LSTM/Transformer training", "Fine-tuned LLM for insights", "Human-readable report generation"],
      color: "from-purple-500 to-violet-500"
    },
    {
      sdk: "Triton & TensorRT",
      role: "Inference Optimization",
      highlights: ["Unified model serving", "TensorRT optimizations", "Multi-model deployment"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <TechGridBackground />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative pt-32 pb-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-primary" />
              <span className="text-sm font-tech text-primary uppercase tracking-widest">AI Energy Intelligence</span>
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-primary" />
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                VoltCore
              </span>
              <br />
              <span className="text-lg md:text-2xl font-tech text-foreground/70 mt-2">
                GPU-Powered Energy Intelligence Platform
              </span>
            </h1>

            <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Enterprise-grade AI platform built on NVIDIA's GPU-accelerated SDKs, delivering real-time energy insights with 100x faster analytics and autonomous cost optimization.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://app.aipowersense.com/" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-accent rounded-full font-tech font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  Start Using VoltCore <ArrowRight className="w-4 h-4" />
                </motion.button>
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('.space-y-6')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border border-primary/30 rounded-full font-tech font-semibold hover:border-primary/60 hover:bg-primary/5 transition-all"
              >
                Learn How It Works
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Capabilities Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
          >
            Enterprise-Grade Performance
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="text-primary mb-4">{cap.icon}</div>
                  <div className="text-3xl font-display font-bold mb-2 text-primary">
                    {cap.value}
                  </div>
                  <h3 className="font-display font-semibold mb-2">{cap.title}</h3>
                  <p className="text-sm text-foreground/60">{cap.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Architecture Layers */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Four-Layer Intelligence Pipeline
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              From real-time data ingestion to actionable intelligence, every layer is optimized for enterprise performance
            </p>
          </motion.div>

          <div className="space-y-6">
            {architectureLayers.map((layer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard>
                  <div className={`p-8 rounded-xl bg-gradient-to-r ${layer.gradient} border border-white/5`}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 text-primary font-display font-bold">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-display font-bold mb-3">{layer.title}</h3>
                        <p className="text-foreground/80 mb-4">{layer.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {layer.features.map((feature, fidx) => (
                            <span
                              key={fidx}
                              className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-foreground/70"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Data Flow Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-16 border-t border-primary/20"
          >
            <h3 className="text-2xl font-display font-bold mb-8 text-center">The Energy Intelligence Loop</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {["Live Energy Data", "Morpheus Ingestion", "RAPIDS Analysis", "NeMo Insights", "Automated Actions"].map(
                (step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <GlassCard className="flex-1 p-4">
                      <p className="text-center text-sm font-tech text-primary">{step}</p>
                    </GlassCard>
                    {idx < 4 && (
                      <div className="hidden md:block">
                        <ArrowRight className="w-6 h-6 text-primary/40" />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* NVIDIA SDKs Deep Dive */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-24 px-6 mb-24"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Built on NVIDIA GPU Excellence
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Enterprise SDKs optimized for high-performance real-time analytics and deep learning inference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sdkFeatures.map((sdk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="p-8 h-full">
                  <div className={`h-1 w-16 bg-gradient-to-r ${sdk.color} rounded-full mb-4`} />
                  <h3 className="text-2xl font-display font-bold mb-1">{sdk.sdk}</h3>
                  <p className="text-sm font-tech text-primary/80 mb-6">{sdk.role}</p>

                  <ul className="space-y-3">
                    {sdk.highlights.map((highlight, hidx) => (
                      <li key={hidx} className="flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/80 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Use Case Workflow */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-24 px-6 bg-gradient-to-b from-primary/5 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Real-World Example: Substation Anomaly Detection
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              How VoltCore transforms raw sensor data into actionable intelligence
            </p>
          </motion.div>

          <div className="bg-gradient-to-b from-card/50 to-card/20 border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/30 text-primary font-display font-bold text-sm">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold mb-2">Data Ingestion</h4>
                  <p className="text-foreground/70">
                    Live MQTT feeds from substations are ingested in real-time. Forecast: Peak demand at 3 PM. Anomaly detected: Substation B shows 15% over-voltage.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent/30 text-accent font-display font-bold text-sm">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold mb-2">Analysis & Prediction</h4>
                  <p className="text-foreground/70">
                    Terabytes of historical data are processed to confirm anomaly patterns and forecast demand surge. ML models train in seconds and analyze time-series data 100x faster than traditional systems.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-500/30 text-purple-400 font-display font-bold text-sm">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold mb-2">Human-Readable Insights</h4>
                  <p className="text-foreground/70">
                    System generates: "NEXUS AI forecasts a peak demand spike at 3 PM. To optimize costs, recommend pre-cooling commercial buildings starting at 1 PM. Substation B anomaly: maintenance ticket auto-generated."
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/30 text-green-400 font-display font-bold text-sm">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold mb-2">Production Deployment</h4>
                  <p className="text-foreground/70">
                    All models are deployed on a unified inference platform optimized for lowest latency and highest throughput, enabling real-time automated actions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-24 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-8"
          >
            Ready to Transform Your Energy Operations?
          </motion.h2>

          <p className="text-lg text-foreground/70 mb-12">
            Join enterprises leveraging GPU-accelerated AI for real-time energy intelligence
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://app.aipowersense.com/" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full font-tech font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Launch Platform <ArrowRight className="w-4 h-4" />
              </motion.button>
            </a>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-primary/30 rounded-full font-tech font-semibold hover:border-primary/60 hover:bg-primary/5 transition-all"
              >
                Schedule Demo
              </motion.button>
            </Link>
            
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default VoltCore;
