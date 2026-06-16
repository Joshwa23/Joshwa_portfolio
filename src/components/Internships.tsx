import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Settings2, 
  Compass, 
  Workflow, 
  Award, 
  Calendar, 
  Cpu, 
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";
import { experiencesData } from "../data";

export default function Internships() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = experiencesData[activeIdx];

  return (
    <section id="internships" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Decorative Watch Gear Ring */}
      <div className="absolute right-0 top-10 opacity-5 w-[440px] h-[440px] border-8 border-dashed border-yellow-500 rounded-full animate-gear-slow pointer-events-none" />
      <div className="absolute right-12 top-24 opacity-5 w-[300px] h-[300px] border-4 border-yellow-500 rounded-full animate-gear-reverse pointer-events-none" />

      {/* Title Segment styled like watch model markers */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 mb-16 text-center lg:text-left relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded bg-stone-900 border border-yellow-500/20 text-yellow-500 text-[10px] font-mono font-bold tracking-widest uppercase">
          <Settings2 className="w-3.5 h-3.5 animate-pulse" />
          <span>CHRONOLOGY MODULE 01</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans">
          THE INTERNSHIP<span className="text-yellow-500 font-mono font-light text-2xl lg:text-3xl ml-2">_FORGE</span>
        </h2>
        <p className="text-stone-400 text-xs md:text-sm font-sans max-w-xl">
          Deep-dive telemetry log tracking structural engineering engagements across machine learning, enterprise web architectures, and advanced analytics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left dial: Mechanical Selector Buttons */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-4 justify-start"
        >
          {experiencesData.map((exp, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div 
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left group ${
                  isActive 
                    ? "bg-gradient-to-br from-stone-900 to-[#120f0c] border-yellow-500/40 shadow-xl" 
                    : "bg-[#070708]/85 border-stone-900 hover:border-yellow-500/20 hover:bg-stone-900/40"
                }`}
                id={`exp-card-selector-${idx}`}
              >
                {/* Active Indicator Light */}
                <div className={`absolute top-5 left-4 w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-yellow-500 animate-ping" : "bg-stone-700"
                }`} />
                <div className={`absolute top-5 left-4 w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-yellow-500" : "bg-stone-700"
                }`} />

                <div className="pl-6 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-mono text-stone-500 tracking-wider">
                      PHASE 0{idx + 1} // {exp.period.split(" ")[0]}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-950 text-white font-mono text-[9px] border border-white/5 uppercase">
                      {exp.company.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className={`text-base md:text-lg font-bold transition-colors leading-snug ${
                    isActive ? "text-yellow-500" : "text-gray-300 group-hover:text-white"
                  }`}>
                    {exp.role}
                  </h3>
                  
                  <p className="text-xs font-mono text-stone-400 font-semibold uppercase">{exp.company}</p>
                </div>

                {/* Aesthetic Gear teeth decoration inside active card border */}
                {isActive && (
                  <div className="absolute right-0 inset-y-0 h-full w-2 flex flex-col justify-around py-2 pointer-events-none opacity-40">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-yellow-500/40 rotate-45 transform" />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Right HUD Viewport: Highly Animated Specs Details readout */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4 }}
              className="h-full flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0c0a08] to-[#040405] border border-yellow-500/10 shadow-2xl relative overflow-hidden"
              id="exp-reader-panel"
            >
              
              {/* Corner Telemetry brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500/15" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/15" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/15" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500/15" />

              <div className="space-y-6">
                
                {/* Header detail node */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pb-5 border-b border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-yellow-550 animate-spin" />
                      <span className="text-[10px] font-mono text-yellow-550 uppercase tracking-widest font-bold">SYSTEM ASSEMBLY CORE</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight pt-1">
                      {activeExp.role}
                    </h3>
                    <p className="text-sm font-semibold text-yellow-500/80">{activeExp.company}</p>
                  </div>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-900/90 border border-white/5 text-[10px] font-mono text-yellow-500 self-start sm:self-auto font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeExp.period}
                  </span>
                </div>

                {/* Sub narrative copy */}
                <p className="text-xs md:text-sm text-stone-400 font-sans italic leading-relaxed">
                  &quot;{activeExp.description}&quot;
                </p>

                {/* Specific bullets specifications breakdown */}
                <div className="space-y-3.5">
                  <span className="text-[10px] font-mono text-stone-500 tracking-widest uppercase block">ENGINEERING ASSIGNMENTS:</span>
                  {activeExp.bullets.map((bullet, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-xs md:text-sm text-gray-300 font-sans leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/75 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </motion.div>
                  ))}
                </div>

              </div>

              {/* Skill telemetry nodes acquired */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <span className="text-[10px] font-mono text-stone-500 tracking-widest uppercase block mb-3">TELEMETRY Competencies:</span>
                <div className="flex flex-wrap gap-2">
                  {activeExp.skillsGained.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-2.5 py-1 rounded bg-stone-950/70 border border-stone-850 hover:border-yellow-500/20 text-[10px] font-mono text-stone-300 transition-colors uppercase tracking-wider font-semibold"
                    >
                      +{skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
