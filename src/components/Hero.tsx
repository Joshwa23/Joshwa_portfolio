import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Cpu, 
  Workflow, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Activity, 
  RotateCw, 
  Award, 
  Settings2 
} from "lucide-react";
import { experiencesData } from "../data";

interface HeroProps {
  onOpenChat: () => void;
}

// Interactive states representing watch design phases or different resume segments
const CHRONO_MODES = [
  {
    id: "atelier",
    title: "THE CORE",
    subtitle: "AI/ML Core Escapement",
    phase: "01",
    description: "Architecting high-dimensional models and real-time streaming feature pipelines at VCodez and Indium Software.",
    intel: "SYS_RPM: 28,800 VPH | ACTIVE LOGS"
  },
  {
    id: "blueprints",
    title: "CRAFTSMANSHIP",
    subtitle: "Web Lab Frameworks",
    phase: "02",
    description: "Engineering premium, interactive React interfaces and RESTful Flask engines optimized for performance.",
    intel: "CALIBRE: J_DECK_V15 | LIVE SPECS"
  },
  {
    id: "specs",
    title: "SPECIFICATIONS",
    subtitle: "Engine Telemetry & Stats",
    phase: "03",
    description: "A highly-parameterized stack including Python deep learning, React modular interfaces, and SQL cloud models.",
    intel: "RESERVE: 72 HOUR BENCHMARK"
  }
];

export default function Hero({ onOpenChat }: HeroProps) {
  const [activeModeIdx, setActiveModeIdx] = useState(0);
  const activeMode = CHRONO_MODES[activeModeIdx];

  // Auto tick through watch configurations to showcase fluid movement, unless hovered
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveModeIdx((prev) => (prev + 1) % CHRONO_MODES.length);
    }, 8500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // CSS 3D Tilting Effect state managers using motion/react springs for the entire watch previewer group
  const watchRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = watchRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    
    const mouseX = e.clientX - rect.left - halfWidth;
    const mouseY = e.clientY - rect.top - halfHeight;

    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-20 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10">
        
        {/* Left Side: Elite Mechanical Typography & Story Nodes */}
        <div className="lg:col-span-6 flex flex-col space-y-8 text-center lg:text-left order-2 lg:order-1 pt-4 lg:pt-0">
          
          <div className="space-y-4">
            
            {/* Minimalist Subtitle HUD ribbon */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center self-center lg:self-start gap-1 px-3 py-1 rounded bg-stone-900/60 border border-yellow-500/20 text-yellow-500 text-[10px] font-mono font-bold uppercase tracking-widest leading-none"
            >
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" />
              <span>THE CHRONOGRAPH ASSEMBLY</span>
            </motion.div>

            {/* Swiss Brand Style Main Title (Extreme Tracking, Beautiful negative space) */}
            <div className="space-y-2">
              <motion.h4 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-[11px] font-mono text-yellow-500 font-extrabold tracking-widest uppercase transition-all"
              >
                SWISS-GRADE TECH PORTFOLIO
              </motion.h4>
              
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[0.95] font-sans"
              >
                JOSHWA<span className="text-stone-500 font-light font-mono text-xl block sm:inline sm:ml-4 tracking-[0.25em]">_DECK</span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-[1px] bg-gradient-to-r from-yellow-500/40 via-yellow-500/10 to-transparent my-4"
              />
            </div>

            {/* Immersive interactive description card */}
            <div className="relative min-h-[140px] flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-stone-900/80 to-[#0c0a08]/90 border border-yellow-500/10 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-7xl font-mono text-stone-900 font-black leading-none select-none pointer-events-none">
                {activeMode.phase}
              </div>
              
              <div className="space-y-2 relative z-10 text-left">
                <span className="text-[10px] font-mono text-yellow-500/60 uppercase tracking-widest block">{activeMode.title}</span>
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{activeMode.subtitle}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-lg font-sans">
                  {activeMode.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5 relative z-10 text-[9px] font-mono text-stone-500">
                <span>{activeMode.intel}</span>
                <span className="text-yellow-500/70 border border-yellow-500/20 px-1 rounded">CAL_MODE: AUTOROTATE</span>
              </div>
            </div>

          </div>

          {/* Configuration Selector buttons resembling mechanical sub-dials/buttons */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {CHRONO_MODES.map((mode, idx) => (
              <button
                key={mode.id}
                onClick={() => {
                  setActiveModeIdx(idx);
                  setIsHovered(true);
                }}
                className={`relative px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeModeIdx === idx 
                    ? "bg-yellow-500 text-black border-yellow-500 font-extrabold shadow-md shadow-yellow-500/20" 
                    : "bg-transparent text-gray-400 border-stone-800 hover:text-white hover:border-yellow-500/30"
                }`}
              >
                <span>{mode.title}</span>
                {activeModeIdx === idx && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-black border border-yellow-400" />
                )}
              </button>
            ))}
          </div>

          {/* Connect & Action hub buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            
            <button
              onClick={onOpenChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-mono text-xs uppercase tracking-widest font-black transition-all shadow-lg shadow-yellow-500/10 pointer-events-auto cursor-pointer"
              id="talk-ai-btn"
            >
              <Cpu className="w-4 h-4 text-black animate-spin" />
              <span>SUMMON COGNITIVE CO-PILOT</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>

            <a
              href="#internships"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-950/80 border border-stone-850 hover:border-yellow-500/20 text-gray-300 hover:text-white text-xs font-mono tracking-widest uppercase transition-all duration-300"
            >
              <span>ENGINE SPEC CORES</span>
            </a>

          </div>

          {/* Social connections */}
          <div className="flex gap-3 justify-center lg:justify-start pt-2">
            <a 
              href="https://github.com/Joshwa23" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-lg bg-stone-950 border border-stone-850 hover:border-yellow-500/35 hover:text-yellow-400 transition-all text-stone-500"
              title="Github Portfolio"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/jobs/view/4287085242/" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-lg bg-stone-950 border border-stone-850 hover:border-yellow-500/35 hover:text-yellow-400 transition-all text-stone-500"
              title="LinkedIn Hub"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="mailto:astrojoshwa@gmail.com" 
              className="p-2.5 rounded-lg bg-stone-950 border border-stone-850 hover:border-yellow-500/35 hover:text-yellow-400 transition-all text-stone-500"
              title="Direct Mail"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Right Side: Ultimate Swiss-Mechanical Luxury Chronograph 3D SVG Viewer */}
        <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 min-h-[440px]">
          <div 
            ref={watchRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="md:relative w-full max-w-[420px] h-[440px] flex items-center justify-center perspective-2000 select-none pb-4"
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-[360px] h-[360px] md:w-[380px] md:h-[380px] rounded-full border border-yellow-500/20 bg-gradient-to-br from-stone-950 to-[#070605] transform-style-3d shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-shadow duration-300 flex items-center justify-center p-4 relative"
            >
              
              {/* Outer Golden Speedometer Chronograph Ring */}
              <div className="absolute inset-0 rounded-full border border-yellow-500/10 pointer-events-none" />
              <div className="absolute inset-[3px] rounded-full border-2 border-stone-900 pointer-events-none" />
              <div className="absolute inset-[10px] rounded-full border border-yellow-500/5 pointer-events-none" />
              
              {/* Tachy-scale indices markers */}
              <div className="absolute inset-0 rounded-full pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1 h-3 bg-yellow-500/30 left-1/2 top-1 origin-[50%_180px] md:origin-[50%_190px]"
                    style={{ transform: `rotate(${i * 30}deg) translateX(-50%)` }}
                  />
                ))}
              </div>

              {/* Glowing Laser scanning radial arm when active mode changes */}
              <motion.div 
                className="absolute w-[180px] h-[2px] bg-gradient-to-r from-yellow-500/50 to-transparent left-1/2 top-1/2 origin-left pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />

              {/* Core Skeleton Clock Machine Assembly */}
              <div className="absolute inset-[18px] rounded-full bg-[#030202] border border-yellow-500/10 shadow-inner flex items-center justify-center overflow-hidden">
                
                {/* 3D background grids matching luxury watch look */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                {/* Main escapement center ring */}
                <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-yellow-500/15 animate-[spin_40s_linear_infinite]" />
                
                {/* Sub-Dial: 1 (ML Engine Sync RPM speed indicator) */}
                <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border border-stone-800 bg-[#070606] flex flex-col items-center justify-center">
                  <div className="text-[7px] font-mono text-yellow-500/60 uppercase">ML_VPH</div>
                  <div className="text-[10px] font-mono text-white font-bold">28,800</div>
                  {/* Rotating pointer */}
                  <motion.div 
                    className="absolute w-0.5 h-6 bg-yellow-550 top-[10%] origin-bottom"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  />
                  <div className="absolute inset-1 rounded-full border border-dashed border-yellow-500/5" />
                </div>

                {/* Sub-Dial: 2 (Full Stack Node compiler indicator) */}
                <div className="absolute right-[20%] top-[45%] w-14 h-14 rounded-full border border-stone-800 bg-[#070606] flex flex-col items-center justify-center">
                  <div className="text-[6px] font-mono text-stone-500">CALIBRE</div>
                  <div className="text-[8px] font-mono text-yellow-500">J_V1.5</div>
                  <motion.div 
                    className="absolute w-0.5 h-5 bg-stone-500 top-[12%] origin-bottom"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  />
                </div>

                {/* Interlocking gear vector illustrations rendering realistic watch movement */}
                <svg viewBox="0 0 100 100" className="absolute w-5/6 h-5/6 opacity-40 select-none pointer-events-none">
                  {/* Central Large Brass cog wheel */}
                  <g className="origin-center animate-[spin_90s_linear_infinite]">
                    <circle cx="50" cy="50" r="16" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2, 1" />
                    {[...Array(24)].map((_, idx) => (
                      <line 
                        key={idx}
                        x1="50" y1="30" x2="50" y2="34" 
                        stroke="#ca8a04" strokeWidth="1.5"
                        transform={`rotate(${idx * 15} 50 50)`}
                      />
                    ))}
                  </g>

                  {/* Escapement system gear wheel bottom-left */}
                  <g transform="translate(18, 55)" className="origin-center animate-[spin_11s_linear_infinite_reverse]">
                    <circle cx="10" cy="10" r="14" fill="none" stroke="#78350f" strokeWidth="0.8" />
                    {[...Array(16)].map((_, idx) => (
                      <path 
                        key={idx}
                        d="M10,-2 L12,1 L8,1 Z" 
                        fill="#78350f"
                        transform={`rotate(${idx * 22.5} 10 10)`}
                      />
                    ))}
                  </g>

                  {/* Balancing bridge spring vector line overlay */}
                  <path 
                    d="M 22,22 C 28,12 50,8 72,18 C 84,24 90,44 78,58" 
                    fill="none" 
                    stroke="#ca8a04" 
                    strokeWidth="0.5" 
                    strokeDasharray="1, 1"
                  />
                </svg>

                {/* Golden hands aligning in live mechanical orbit */}
                <motion.div 
                  className="absolute w-1 h-[75px] bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full left-1/2 top-1/2 origin-top -translate-x-1/2 z-10"
                  animate={{ rotate: 180 + activeModeIdx * 120 }}
                  transition={{ type: "spring", damping: 15, stiffness: 60 }}
                />
                
                <motion.div 
                  className="absolute w-1.5 h-[50px] bg-yellow-400 rounded-full left-1/2 top-1/2 origin-top -translate-x-1/2 z-10"
                  animate={{ rotate: 90 + activeModeIdx * 90 }}
                  transition={{ type: "spring", damping: 20, stiffness: 80 }}
                />

                {/* Extremely thin fast ticking red second hand */}
                <motion.div 
                  className="absolute w-[1px] h-[95px] bg-red-600 left-1/2 top-[10%] origin-[50%_152px] -translate-x-1/2 z-20"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                />

                {/* Center Core Cap / Screw Jewel */}
                <div className="absolute w-4 h-4 rounded-full bg-stone-900 border-2 border-yellow-500/80 flex items-center justify-center z-30 shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {/* Synth-ruby pivot jewel */}
                </div>

                {/* Live parameters dynamic telemetry in absolute layouts */}
                <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 font-mono text-[8px] text-yellow-500/40 text-center select-none">
                  <p className="mt-1 font-bold">STATE: COMPILING</p>
                </div>

              </div>

              {/* Side controls casing (Watch Crown and chronometer pushers) */}
              <div className="absolute left-[99%] top-[38%] w-2.5 h-6 rounded bg-[#2a251e] border-y border-r border-yellow-500/20" />
              
              {/* Spinning crown wind controller */}
              <motion.div 
                className="absolute left-[99%] top-[46%] w-4 h-7 rounded-r-md bg-stone-950 border border-yellow-500/25 flex flex-col justify-between py-1 shadow-md cursor-pointer group-hover:scale-105 transition-all"
                whileTap={{ x: -1 }}
              >
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="h-[2px] w-full bg-yellow-500/20" />
                ))}
              </motion.div>

              <div className="absolute left-[99%] top-[56%] w-2.5 h-6 rounded bg-[#2a251e] border-y border-r border-yellow-500/20" />

            </motion.div>

            {/* Radiant glowing halo surrounding the watch */}
            <div className="absolute -z-10 w-[390px] h-[390px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
