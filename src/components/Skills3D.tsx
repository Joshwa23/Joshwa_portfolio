import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Code2, Globe, Database, Compass, Activity, ShieldCheck } from "lucide-react";
import { skillsData } from "../data";

// Helper component for tilted panels
interface SkillCardProps {
  category: typeof skillsData[0];
  index: number;
  key?: string;
}

function SkillCard({ category, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const [activeSkillIdx, setActiveSkillIdx] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
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
    setActiveSkillIdx(null);
  };

  // Determine category icon using elegant luxury indicators
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "programming":
        return <Code2 className="w-5 h-5 text-yellow-500" />;
      case "web development":
        return <Globe className="w-5 h-5 text-amber-500" />;
      default:
        return <Database className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getThemeGlow = (color: string) => {
    if (color === "cyan") return "rgba(212, 175, 55, 0.12)";
    if (color === "blue") return "rgba(245, 158, 11, 0.12)";
    return "rgba(180, 83, 9, 0.12)";
  };

  // Maps technical labels to Swiss watch counterparts
  const getChronometerLabel = (title: string) => {
    if (title.toLowerCase().includes("prog")) return "THE BALANCE ASSEMBLAGE";
    if (title.toLowerCase().includes("web")) return "THE ESCAPEMENT CROWN";
    return "THE CHASSIS MAINSPRING";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="relative rounded-3xl p-6 glass-panel transform-style-3d transition-all duration-500 hover:shadow-2xl hover:shadow-black/70 group cursor-pointer border border-yellow-500/10 hover:border-yellow-500/35 bg-stone-950/70"
      id={`skill-card-${index}`}
    >
      {/* Dynamic backdrop gold accent shine */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [x, y],
            (vals) => {
              const vx = (vals as number[])[0];
              const vy = (vals as number[])[1];
              return `radial-gradient(circle 220px at ${(vx + 0.5) * 100}% ${(vy + 0.5) * 100}%, ${getThemeGlow(
                category.color
              )}, transparent)`;
            }
          )
        }}
      />

      {/* Top Header Row representing actual clock gears components */}
      <div className="flex justify-between items-center mb-6 relative z-10 transform-style-3d" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-stone-900 border border-yellow-500/15">
            {getIcon(category.title)}
          </div>
          <div>
            <span className="text-[8px] font-mono text-yellow-500/60 uppercase tracking-widest block font-bold">
              {getChronometerLabel(category.title)}
            </span>
            <h3 className="text-lg md:text-xl font-bold font-sans text-white tracking-tight pt-0.5">{category.title}</h3>
          </div>
        </div>
        <span className="text-[9px] font-mono text-stone-500 bg-stone-950/60 px-2 py-0.5 rounded border border-white/5 uppercase font-bold tracking-widest">
          CAL_NODE_0{index + 1}
        </span>
      </div>

      {/* Skills loop */}
      <div className="space-y-4 relative z-10 transform-style-3d" style={{ transform: "translateZ(10px)" }}>
        {category.skills.map((skill, sIdx) => {
          const isOpened = activeSkillIdx === sIdx;
          return (
            <div
              key={skill.name}
              onMouseEnter={() => setActiveSkillIdx(sIdx)}
              className="flex flex-col space-y-1.5 p-2 rounded-lg hover:bg-stone-900/40 border border-transparent hover:border-yellow-500/10 transition-all duration-200"
              id={`skill-item-${index}-${sIdx}`}
            >
              <div className="flex justify-between items-center text-sm font-sans">
                <span className="font-bold text-gray-250 group-hover:text-white transition-colors">{skill.name}</span>
              </div>
              
              {/* Progress track in luxurious yellow-gold-amber */}
              <div className="w-full h-1 bg-stone-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: sIdx * 0.08 }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-yellow-450 shadow-md"
                />
              </div>

              {/* Collapsible usage commentary */}
              {isOpened && skill.info && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-[10px] text-stone-400 font-mono pt-1 pl-1 flex items-start gap-1"
                >
                  <span className="text-yellow-500">&gt;&gt;</span>
                  <span>{skill.info}</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive instruction line */}
      <div className="mt-5 text-center text-[9px] font-mono text-stone-500 tracking-widest uppercase border-t border-[#ffffff05] pt-3 font-bold">
        HOVER CORE COMPONENTS TO VIEW SYSTEM OVERLAYS
      </div>
    </motion.div>
  );
}

export default function Skills3D() {
  return (
    <section id="skills" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Decorative side matrix text */}
      <div className="absolute right-4 top-1/4 writing-mode-vertical hidden xl:block text-[9px] font-mono text-stone-700 tracking-widest select-none pointer-events-none uppercase">
        0X_SYSTEM_INVENTORY_ARRAY_DATA // JOSHWA_STACK
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 relative z-10">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded bg-stone-900 border border-yellow-500/20 text-yellow-500 text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
          <ShieldCheck className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
          <span>TECHNICAL TELEMETRY</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
          THE CALIBRE MATRIX<span className="text-yellow-500 font-mono font-light text-2xl lg:text-3xl ml-2">_STACK</span>
        </h1>
        <p className="text-xs md:text-sm text-stone-400 max-w-lg mx-auto">
          Structuring powerful machine learning engines on high-speed computational backends and styling micro-engineered, sensory web nodes.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {skillsData.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
