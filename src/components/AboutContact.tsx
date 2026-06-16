import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Sparkles,
  Award,
  BookOpen
} from "lucide-react";
import { educationData } from "../data";

export default function AboutContact() {
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("astrojoshwa@gmail.com");
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section id="about" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Absolute Decorative Watermark */}
      <div className="absolute left-10 bottom-6 opacity-5 w-[360px] h-[360px] border-8 border-stone-800 rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* Left Side: Academic Timeline (Simplified/Cleaned to be modular & spectacular) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded bg-stone-900 border border-yellow-500/20 text-yellow-500 text-[10px] font-mono font-bold tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CHRONOLOGY MODULE 02</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
              ACADEMIC HISTORY<span className="text-yellow-500 font-mono font-light text-2xl lg:text-3xl ml-2">_CHASSIS</span>
            </h2>
            <p className="text-stone-400 text-xs md:text-sm font-sans max-w-lg">
              Mapping foundational qualifications in software design, algorithmic development, and computer architecture.
            </p>
          </div>

          <div className="border-l border-stone-800 ml-4 pl-8 space-y-10 relative">
            {educationData.map((edu, idx) => (
              <div key={idx} className="relative group" id={`edu-node-${idx}`}>
                
                {/* Glowing gold chronometer node marker */}
                <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full bg-stone-950 border border-yellow-500/50 group-hover:bg-yellow-500 group-hover:scale-110 shadow-lg shadow-yellow-500/10 transition-all duration-350" />

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-500 transition-colors leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-yellow-500/70 font-mono uppercase tracking-widest font-bold pt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 self-start sm:self-auto">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-900 text-[10px] font-mono text-stone-400 uppercase font-bold tracking-wider">
                        {edu.period}
                      </span>
                      <span className="text-[10px] font-mono text-yellow-500 font-black bg-stone-900 border border-yellow-500/20 px-2 py-0.5 rounded">
                        {edu.perf}
                      </span>
                    </div>
                  </div>
                  {edu.details && (
                    <p className="text-xs md:text-sm text-stone-400 font-sans leading-relaxed pt-1">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Professional Gateway / Cockpit Connect Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0c0a08]/90 to-[#040405] border border-yellow-505/15 shadow-2xl relative overflow-hidden">
            
            {/* Overlay grid web mesh */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded bg-stone-900 border border-yellow-550/10 text-[9px] font-mono text-yellow-500 tracking-widest font-extrabold uppercase">
                <Sparkles className="w-3 h-3 text-yellow-550" />
                <span>SECURED GATEWAY ROUTER</span>
              </div>
              <h2 className="text-2xl font-black text-white font-sans tracking-tight pt-1">
                HIRING CONNECTIONS
              </h2>
              <p className="text-stone-400 leading-relaxed text-xs md:text-sm pt-2 font-sans">
                Currently exploring internships or engineering positions starting immediately. Reach out to coordinate scheduling, schedule deep-dives, or query system telemetry logs.
              </p>
            </div>

            {/* Quick direct gateway contacts */}
            <div className="space-y-4 relative z-10 pt-6">
              
              {/* Copy Address Block */}
              <div 
                onClick={handleCopyEmail}
                className="flex items-center justify-between p-4 rounded-2xl bg-stone-900/40 hover:bg-stone-900/80 border border-white/5 hover:border-yellow-500/30 cursor-pointer group/item transition-all duration-350"
                id="copy-email-card"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-white/5 group-hover/item:border-yellow-500/20 transition-all">
                    <Mail className="w-5 h-5 text-stone-500 group-hover/item:text-yellow-550" />
                  </div>
                  <div>
                    <h3 className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-bold">DIRECT MAILBOX</h3>
                    <p className="text-xs sm:text-sm font-bold text-stone-300 group-hover/item:text-white select-all">astrojoshwa@gmail.com</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-stone-950 group-hover/item:bg-stone-850 transition-colors">
                  <AnimatePresence mode="wait">
                    {copiedText ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                      >
                        <Copy className="w-4 h-4 text-stone-500 group-hover/item:text-yellow-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Tel call number */}
              <a 
                href="tel:+919360492446"
                className="flex items-center justify-between p-4 rounded-2xl bg-stone-900/40 hover:bg-stone-900/80 border border-white/5 hover:border-yellow-550/30 group/item transition-all duration-350 block"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-white/5 group-hover/item:border-yellow-500/20 transition-all">
                    <Phone className="w-5 h-5 text-stone-500 group-hover/item:text-yellow-550" />
                  </div>
                  <div>
                    <h3 className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-bold">GSM TRANSCEIVER</h3>
                    <p className="text-xs sm:text-sm font-bold text-stone-300 group-hover/item:text-white select-all">+91 9360492446</p>
                  </div>
                </div>
                <span className="p-2 rounded-lg bg-stone-950 group-hover/item:bg-stone-850 transition-all text-stone-500 group-hover/item:text-yellow-500">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>

              {/* Chennai Base Location */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-900/40 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-white/5">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-[9px] font-mono text-stone-500 uppercase tracking-widest font-bold">BASE LOCATION</h3>
                    <p className="text-xs sm:text-sm font-bold text-stone-300">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-stone-600 uppercase">GMT+5.5</span>
              </div>

            </div>

            {/* Resume button copy */}
            <div className="relative z-10 pt-6 border-t border-white/5 text-center text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              LET&apos;S MANIFEST FUTURE ASSEMBLIEs TOGETHER.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
