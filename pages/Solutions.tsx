import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Zap, Gauge, Cpu, BarChart3, AlertCircle, CheckCircle, Github, Linkedin, Mail, Lock, ZapOff, Globe, Layers, Code2, Lightbulb, Hexagon, Network, ShieldCheck, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Solutions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pricingGridRef = useRef<HTMLDivElement>(null);
  const paypalSubRef = useRef<HTMLDivElement>(null);
  const paypalCardRef = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price?: string; desc?: string } | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const buttonsRendered = useRef(false);

  useEffect(() => {
    if (!selectedPlan) return;

    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AW8LwOyHYamK0tA4exHDNjZWcDzSp2Oazkp5k63SxyBqApaUlf4e3wYBk-uH_CvEOQtKDF8eFTDeM1OO';

    if ((window as any).paypal) {
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    const disableFunding = 'paylater,venmo';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&components=buttons&disable-funding=${disableFunding}&intent=capture`;
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    script.onerror = () => console.error('PayPal SDK failed to load');
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [selectedPlan]);

  useEffect(() => {
    // Reset buttons rendered flag when plan selection changes
    buttonsRendered.current = false;
  }, [selectedPlan]);

  useEffect(() => {
    if (!sdkLoaded || !selectedPlan) {
      buttonsRendered.current = false;
      return;
    }

    if (buttonsRendered.current) return; // Skip if already rendered

    const parseAmount = (price?: string) => {
      if (!price || price.toLowerCase() === 'free' || price.toLowerCase() === 'custom') return '0';
      const digits = price.replace(/[^0-9.]/g, '');
      return digits || '0';
    };

    // Clear previous renders
    if (paypalSubRef.current) {
      paypalSubRef.current.innerHTML = '';
    }
    if (paypalCardRef.current) {
      paypalCardRef.current.innerHTML = '';
    }

    // Render PayPal subscription button
    if (paypalSubRef.current) {
      (window as any).paypal.Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: parseAmount(selectedPlan.price)
              }
            }]
          });
        },
        onApprove: function(data: any, actions: any) {
          return actions.order.capture().then(function(details: any) {
            console.log('PayPal payment successful:', details);
            alert('Payment successful! Thank you for subscribing.');
            // Here you would send the payment details to your backend
          });
        },
        onError: function(err: any) {
          console.error('PayPal error:', err);
          alert('Payment failed. Please try again.');
        },
        style: {
          layout: 'horizontal',
          color: 'white',
          shape: 'pill',
          label: 'subscribe',
          tagline: false
        }
      }).render(paypalSubRef.current);
    }

    // Render PayPal card button (alternative payment method)
    if (paypalCardRef.current) {
      (window as any).paypal.Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: parseAmount(selectedPlan.price)
              }
            }]
          });
        },
        onApprove: function(data: any, actions: any) {
          return actions.order.capture().then(function(details: any) {
            console.log('Payment approved:', details);
            alert('Payment successful! Thank you for your purchase.');
          });
        },
        onError: function(err: any) {
          console.error('PayPal error:', err);
          alert('Payment failed. Please try again.');
        },
        style: {
          layout: 'horizontal',
          color: 'white',
          shape: 'pill',
          label: 'pay',
          tagline: false
        }
      }).render(paypalCardRef.current);
    }

    buttonsRendered.current = true;
  }, [sdkLoaded, selectedPlan]);

  const handleCardPayment = async () => {
    if (!cardData.number || !cardData.expiry || !cardData.cvv) {
      alert('Please fill in all card details');
      return;
    }

    setPaymentProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Payment of ${selectedPlan?.price} successful! Thank you for your purchase.`);
      setSelectedPlan(null);
      setCardData({ number: '', expiry: '', cvv: '' });
    } catch (error) {
      console.error('Card payment error:', error);
      alert('Card payment failed. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const solutions = [
    {
      id: "01",
      iconSrc: "/39.svg",
      title: "Real-Time Monitoring",
      tagline: "Sub-Second Ingestion",
      desc: "Granular energy footprint tracking with 99.9% uptime. Ingesting millions of data points per second for real-time visibility.",
      features: ["Live data ingestion", "Multi-building support"],
      metric: "99.9% Uptime"
    },
    {
      id: "02",
      iconSrc: "/40.svg",
      title: "Cost Optimization",
      tagline: "Autonomous Savings",
      desc: "Predict demand peaks and optimize consumption patterns to maximize operational efficiency and reduce overhead by 40%.",
      features: ["Pattern learning", "Demand forecasting"],
      metric: "40% Savings"
    },
    {
      id: "03",
      iconSrc: "/41.svg",
      title: "GPU Intelligence",
      tagline: "Accelerated Compute",
      desc: "NVIDIA-accelerated neural networks delivering technical insights 100x faster than legacy management systems.",
      features: ["Real-time processing", "Advanced analytics"],
      metric: "100x Faster"
    }
  ];

  const metrics = [
    { label: "Processing Speed", value: "<1s" },
    { label: "Data Throughput", value: "2.5B" },
    { label: "Uptime", value: "99.9%" },
    { label: "Cost Reduction", value: "40%" }
  ];

  const integrations = [
    { name: "MQTT Streams", protocol: "ISO/IEC 20922" },
    { name: "REST API", protocol: "JSON-RPC" },
    { name: "GraphQL", protocol: "Query Language" },
    { name: "Cloud Sync", protocol: "S3/Azure" }
  ];

  const pricing = [
    {
      name: "Alpha",
      tier: "Pilot Program",
      price: "$99",
      period: "/month",
      desc: "For small scale testing and initial integration validation.",
      features: ["Up to 2 Nodes", "Standard Latency", "Community Support", "Basic Dashboard"],
      cta: "Start Pilot"
    },
    {
      name: "Sigma",
      tier: "Enterprise",
      price: "$299",
      period: "/month",
      desc: "Full-scale deployment with advanced neural optimization.",
      features: ["Unlimited Nodes", "Sub-second Latency", "24/7 Priority Support", "Full API Access"],
      cta: "Deploy Now",
      featured: true
    },
    {
      name: "Omega",
      tier: "Bespoke",
      price: "$599",
      period: "/month",
      desc: "Tailored infrastructure for heavy industrial applications.",
      features: ["Custom Neural Models", "Dedicated Hardware", "On-site Integration", "L3 Support"],
      cta: "Contact Sales"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Editorial Hero Section */}
      <section className="relative flex items-center px-4 sm:px-6 md:px-12 lg:px-24 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 overflow-hidden border-b border-white/5">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('/38.svg')` }}
            aria-hidden
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="font-tech text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">Systems Ready</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
                INTELLIGENT <br />
                <span className="text-white opacity-40">SYSTEMS.</span>
              </h1>

              <p className="font-body text-sm sm:text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-8">
                Mathematical foundations for global energy efficiency. Leveraging neural computing to optimize multi-vector infrastructure.
              </p>

              <div className="flex gap-4">
                <Link to="/contact" className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black font-display font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">
                  Request Access
                </Link>
                <div className="w-8 h-px bg-white/20 self-center" />
                <span className="font-tech text-[10px] uppercase tracking-widest text-white/40 self-center">v4.0 Enterprise</span>
              </div>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
            </div>
          </div>
        </div>
      </section>

      {/* Numerical Impact Bar */}
      <div className="border-b border-white/5 bg-white/[0.02] py-6 sm:py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] font-tech text-white/40 uppercase tracking-widest mb-1">{m.label}</span>
              <span className="text-2xl font-display font-black text-white">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions Grid - Compact */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {solutions.map((solution, i) => (
              <motion.div
                key={solution.id}
                className="group border border-white/10 p-4 sm:p-6 md:p-8 hover:bg-white/[0.02] transition-colors relative h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 group-hover:border-purple-500 transition-all duration-500">
                  <img src={solution.iconSrc} alt="" className="w-12 h-12" />
                </div>
                <div className="font-tech text-[10px] text-purple-400 uppercase tracking-[0.3em] mb-2">{solution.tagline}</div>
                <h3 className="font-display text-2xl font-black mb-4 uppercase leading-none">{solution.title}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-8 flex-grow">
                  {solution.desc}
                </p>
                <div className="space-y-2 mb-8">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-purple-500/60" />
                      <span className="font-tech text-[9px] uppercase tracking-widest text-white/30">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="font-tech text-[10px] text-white/20 uppercase tracking-widest leading-none">Rating: A+++</span>
                  <span className="font-display text-lg font-black">{solution.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Ecosystem - Digital Blueprint */}
      <section className="relative py-32 px-6 border-t border-white/5 overflow-hidden">
        {/* Animated background gradients */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block border border-purple-500/50 px-4 py-2 text-[10px] font-tech uppercase tracking-[0.6em] text-purple-300 mb-6 rounded-lg bg-purple-500/5">
                ◆ Interoperability
              </div>
              <h2 className="font-display text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 leading-tight">
                DATA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">PIPELINES</span>
              </h2>
              <p className="font-body text-base text-white/50 max-w-md leading-relaxed">Universal connectivity across all industrial and cloud protocols for seamless synchronization and real-time data flow.</p>
            </motion.div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {integrations.map((item, i) => {
                  const colors = [
                    { gradient: "from-blue-500 to-cyan-500", border: "border-blue-500/30", bg: "bg-blue-500/5", accent: "text-blue-300" },
                    { gradient: "from-purple-500 to-pink-500", border: "border-purple-500/30", bg: "bg-purple-500/5", accent: "text-purple-300" },
                    { gradient: "from-cyan-500 to-blue-500", border: "border-cyan-500/30", bg: "bg-cyan-500/5", accent: "text-cyan-300" },
                    { gradient: "from-pink-500 to-purple-500", border: "border-pink-500/30", bg: "bg-pink-500/5", accent: "text-pink-300" }
                  ];
                  const color = colors[i % colors.length];

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="group relative"
                    >
                      {/* Animated glow background */}
                      <motion.div
                        className={`absolute -inset-px rounded-xl blur-lg ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      />

                      {/* Card container */}
                      <div className={`relative p-8 rounded-xl border ${color.border} ${color.bg} backdrop-blur-sm overflow-hidden`}>
                        {/* Gradient border effect */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                        {/* Animated corner accent */}
                        <motion.div
                          className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${color.gradient} rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color.gradient}`} />
                            <span className="font-tech text-[9px] uppercase tracking-widest text-white/40">Protocol</span>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className={`font-display text-2xl font-black uppercase tracking-tight mb-2 ${color.accent}`}>
                              {item.name}
                            </h3>
                            <p className="font-tech text-[11px] uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors">
                              {item.protocol}
                            </p>
                          </div>

                          {/* Animated connection line */}
                          <motion.div
                            className={`h-px w-0 bg-gradient-to-r ${color.gradient} group-hover:w-full transition-all duration-500`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section - High-Fidelity */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-tech text-xs text-purple-400 uppercase tracking-[0.4em] mb-4">Investment Structures</div>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">PRICING.</h2>
          </div>
          
          <div ref={pricingGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {pricing.map((plan, i) => (
              <motion.div
                key={i}
                className={`bg-black p-10 md:p-14 flex flex-col relative group ${plan.featured ? 'z-10 ring-1 ring-purple-500/50' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-[10px] font-tech text-white/30 uppercase tracking-widest mb-6">{plan.tier}</div>
                <h3 className="font-display text-3xl font-black mb-2 uppercase">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-display font-black tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="text-white/30 font-tech uppercase text-xs tracking-widest">{plan.period}</span>}
                </div>
                <p className="font-body text-sm text-white/50 mb-10 leading-relaxed min-h-[48px]">
                  {plan.desc}
                </p>
                
                <div className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1 h-[1px] bg-purple-500" />
                      <span className="font-tech text-[10px] uppercase tracking-widest text-white/40">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-4 border border-white/20 hover:border-purple-500 transition-all font-display font-black text-[10px] uppercase tracking-widest ${plan.featured ? 'bg-purple-500 text-black' : ''}`}
                >
                  {plan.cta || 'Select'}
                </button>
              </motion.div>
            ))}
          </div>


          {/* Payment Section - Appears below pricing when plan selected */}
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-16 p-8 md:p-12 bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl relative"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors z-20"
              >
                <span className="text-white/60 text-lg">×</span>
              </button>

              <div className="text-center mb-12">
                <h3 className="font-display text-2xl font-black mb-2 uppercase">{selectedPlan.name} — {selectedPlan.price}</h3>
                <p className="font-body text-sm text-white/60">{selectedPlan.desc}</p>
              </div>

              <div className="max-w-xl mx-auto">
                {/* PAY WITH PAYPAL Section */}
                <div className="mb-8">
                  <h4 className="font-tech text-[10px] text-white/50 uppercase tracking-[0.2em] mb-6 text-center">PAY WITH PAYPAL</h4>
                  
                  <div className="space-y-3">
                    {/* PayPal Subscribe Button */}
                    <div 
                      ref={paypalSubRef} 
                      className="paypal-subscription-button [&>div]:flex [&>div]:justify-center"
                    ></div>
                    
                    {/* Debit or Credit Card Option */}
                    <button className="w-full py-3 px-4 bg-white/[0.05] border border-white/10 hover:border-purple-500 hover:bg-white/[0.08] transition-all rounded font-tech text-sm uppercase tracking-widest text-white/70 hover:text-white flex items-center justify-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m4 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      Debit or Credit Card
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-10">
                  <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
                  <div className="font-tech text-[10px] text-white/30 uppercase tracking-widest">OR</div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/0 via-white/10 to-white/0"></div>
                </div>

                {/* PAY WITH CARD Section */}
                <div>
                  <h4 className="font-tech text-[10px] text-white/50 uppercase tracking-[0.2em] mb-6 text-center">PAY WITH CARD</h4>
                  
                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="font-tech text-[9px] text-white/40 uppercase tracking-wider block mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all"
                      />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-tech text-[9px] text-white/40 uppercase tracking-wider block mb-2">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-tech text-[9px] text-white/40 uppercase tracking-wider block mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button
                      onClick={handleCardPayment}
                      disabled={paymentProcessing}
                      className="w-full py-3 mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-black text-[10px] uppercase tracking-widest rounded transition-all"
                    >
                      {paymentProcessing ? 'Processing...' : `Pay ${selectedPlan?.price}`}
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedPlan(null)}
                      className="w-full py-3 bg-white/[0.05] border border-white/10 hover:border-white/20 text-white font-tech text-[10px] uppercase tracking-widest rounded transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;
