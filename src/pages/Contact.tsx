import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Send, Terminal, Mail, MapPin, Phone, Sparkles, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xvzbkljz");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (state.succeeded) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Background Image - Full Width */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/5.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <section className="relative pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-12 lg:px-24 z-10">
        <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8"
            >
              <Sparkles size={12} className="text-purple-400" />
              <span className="font-tech text-xs tracking-[0.3em] text-purple-400 uppercase">Transmission Portal</span>
            </motion.div>

            <motion.h1 
              className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black leading-[0.8] tracking-tighter mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              GET IN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-800">SYNC.</span>
            </motion.h1>
            
            <motion.p 
              className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-white/40 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Initialize a direct connection with our neural engineering team for bespoke integration deployment.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-start">
          {/* Information Column */}
          <div className="lg:col-span-4 space-y-8 md:space-y-10 lg:space-y-16">
            <div className="space-y-8">
              {[
                { icon: Mail, label: "Neural Mail", val: "team@aipowersense.com" },
                { icon: MapPin, label: "HQ Node", val: " 3120 Los Feliz Blvd, Los Angeles, CA 90039, United States" },
                { icon: Phone, label: "Direct Sync", val: "+1 323-662-8601" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="group flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-[10px] font-tech text-purple-400 tracking-[0.4em] uppercase">{item.label}</div>
                  <div className="flex items-center gap-4">
                    <item.icon size={16} className="text-white/20 group-hover:text-purple-500 transition-colors" />
                    <span className="font-display text-lg font-black tracking-tight">{item.val}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 border border-white/10 bg-white/[0.02]">
              <div className="text-[10px] font-tech text-white/30 tracking-widest uppercase mb-4">Uptime Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-display font-black text-xs uppercase uppercase">All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <motion.div 
            className="lg:col-span-8 border border-white/5 bg-white/[0.01] p-4 sm:p-6 md:p-10 lg:p-12 xl:p-16 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Animated Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-purple-500/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-purple-500/50" />

            {state.succeeded && (
              <motion.div 
                className="mb-8 p-6 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={24} className="text-green-400" />
                <div>
                  <div className="font-display font-black text-green-400">Message Sent Successfully!</div>
                  <div className="text-sm text-green-400/60">We've received your message and will get back to you soon.</div>
                </div>
              </motion.div>
            )}

            <form className="space-y-12" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="font-tech text-[10px] tracking-[0.5em] text-white/30 uppercase">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 font-display font-black text-base sm:text-lg md:text-xl focus:border-purple-500 outline-none transition-colors placeholder:text-white/5"
                    placeholder="IDENTIFY YOURSELF"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div className="space-y-4">
                  <label className="font-tech text-[10px] tracking-[0.5em] text-white/30 uppercase">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 font-display font-black text-base sm:text-lg md:text-xl focus:border-purple-500 outline-none transition-colors placeholder:text-white/5"
                    placeholder="COMM_CHANNEL@NODE.COM"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div className="space-y-4">
                <label className="font-tech text-[10px] tracking-[0.5em] text-white/30 uppercase">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-white/[0.02] border border-white/10 p-3 sm:p-4 md:p-6 font-body text-base sm:text-lg focus:border-purple-500 outline-none transition-colors placeholder:text-white/5 resize-none"
                  placeholder="Describe your inquiry protocol..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button 
                type="submit" 
                disabled={state.submitting}
                className="relative group px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-12 lg:py-6 overflow-hidden w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white transition-transform duration-500 translate-y-full group-hover:translate-y-0" />
                <div className="absolute inset-0 border border-white/20 transition-all group-hover:border-white" />
                <div className="relative font-display font-black text-xs tracking-[0.5em] uppercase text-white group-hover:text-black flex items-center justify-center gap-4">
                  {state.submitting ? "Sending..." : "Transmit Payload"}
                  <Send size={14} />
                </div>
              </button>
            </form>
          </motion.div>
        </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
