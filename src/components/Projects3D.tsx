import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  ShieldAlert, 
  Music, 
  Flame, 
  Github, 
  ExternalLink, 
  Cpu, 
  Settings, 
  CheckCircle2,
  TableProperties,
  Layers,
  ChevronRight
} from "lucide-react";
import { projectsData } from "../data";

interface ProjectCardProps {
  project: typeof projectsData[0];
  index: number;
  key?: string;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 140, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");

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
  };

  // Get project icon based on descriptor with luxury golden outlines
  const getProjectIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "shieldalert":
        return <ShieldAlert className="w-6 h-6 text-yellow-400" />;
      case "music":
        return <Music className="w-6 h-6 text-amber-500" />;
      default:
        return <Flame className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative rounded-3xl p-6 glass-panel transform-style-3d border border-yellow-500/10 bg-stone-950/70 hover:shadow-2xl hover:border-yellow-505/30 transition-all duration-500 cursor-pointer group flex flex-col justify-between h-[440px]"
      id={`project-card-${project.id}`}
    >
      {/* Dynamic atmospheric cursor golden ray glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [x, y],
            (vals) => {
              const vx = (vals as number[])[0];
              const vy = (vals as number[])[1];
              return `radial-gradient(circle 320px at ${(vx + 0.5) * 100}% ${(vy + 0.5) * 100}%, rgba(212, 175, 55, 0.08), transparent)`;
            }
          )
        }}
      />

      {/* Cyber bracket decoration in corners */}
      <div className="absolute top-3 left-6 text-[9px] font-mono text-stone-500 select-none uppercase tracking-widest">
        BLUEPRINT INDEX: 0{index + 1}
      </div>

      <div>
        {/* Top Header Row */}
        <div className="flex justify-between items-center mb-6 pt-1.5 transform-style-3d" style={{ transform: "translateZ(15px)" }}>
          <div className="p-2.5 bg-stone-900 border border-yellow-500/15 rounded-xl shadow-inner">
            {getProjectIcon(project.iconName)}
          </div>
          
          {/* Controls toggle tabs */}
          <div className="flex p-0.5 rounded-lg bg-stone-900/90 border border-stone-800 gap-1 text-[10px] font-mono">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("overview");
              }}
              className={`px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                activeTab === "overview" ? "bg-yellow-500 text-black font-extrabold" : "text-stone-400 hover:text-white"
              }`}
            >
              OVERVIEW
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("specs");
              }}
              className={`px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                activeTab === "specs" ? "bg-yellow-500 text-black font-extrabold" : "text-stone-400 hover:text-white"
              }`}
            >
              ASSEMBLIES
            </button>
          </div>
        </div>

        {/* Dynamic Panel Canvas */}
        <div className="h-[200px] transform-style-3d my-2 overflow-hidden" style={{ transform: "translateZ(10px)" }}>
          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full justify-between py-1"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white font-sans tracking-tight leading-tight group-hover:text-yellow-500 transition-colors">
                    {project.title}
                  </h3>
                  <h4 className="text-[11px] font-mono text-yellow-500/70 uppercase tracking-widest mt-1">
                    {project.subtitle}
                  </h4>
                  <p className="text-xs md:text-sm text-stone-400 leading-relaxed mt-4 font-sans line-clamp-4">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="specs"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-start space-y-2.5 overflow-y-auto pr-1 py-1"
              >
                <div className="inline-flex items-center gap-1.5 text-[9px] font-mono text-yellow-500 uppercase tracking-widest pb-1 border-b border-stone-900">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>SPECIFICATION_INVENTORY_REPORT</span>
                </div>
                {project.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs font-sans text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-550 shrink-0 mt-0.5" />
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tags and Action Links */}
      <div className="space-y-4 pt-3 border-t border-white/5 relative z-10 transform-style-3d" style={{ transform: "translateZ(8px)" }}>
        {/* Technologies List */}
        <div className="flex flex-wrap gap-1.5 h-[50px] overflow-hidden">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-stone-900 border border-white/5 text-[10px] font-mono text-stone-400 uppercase font-semibold"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="px-2 py-0.5 rounded bg-stone-900 border border-yellow-550/10 text-[10px] font-mono text-yellow-500 font-extrabold">
              +{project.tags.length - 5} UNITS
            </span>
          )}
        </div>

        {/* URL Target controls */}
        <div className="flex justify-between items-center text-xs pt-1">
          <span className="text-[9px] font-mono text-stone-500 flex items-center gap-1.5 uppercase font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            ONLINE_SECURE
          </span>

          <div className="flex items-center gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-stone-900 border border-stone-850 hover:border-yellow-500/40 text-stone-400 hover:text-white transition-all flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider font-extrabold"
                onClick={(e) => e.stopPropagation()}
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span>CODE_LOG</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects3D() {
  return (
    <section id="projects" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Ambient background grid dots */}
      <div className="absolute left-6 top-1/4 writing-mode-vertical hidden xl:block text-[9px] font-mono text-stone-700 tracking-widest select-none pointer-events-none uppercase">
        0X_DEPLOY_CENTRAL_CORE_CONTAINER // SWISS_HOROLOGY
      </div>

      {/* Heading Group */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-16 space-y-4 relative z-10"
      >
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded bg-stone-900 border border-yellow-500/20 text-yellow-500 text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
          <Layers className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
          <span>BLUEPRINT BLUE VAULT</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans">
          DEVELOPER LAB<span className="text-yellow-500 font-mono font-light text-2xl lg:text-3xl ml-2">_BLUEPRINTS</span>
        </h1>
        <p className="text-xs md:text-sm text-stone-400 max-w-lg mx-auto">
          Take a look through my curated, highly-parametric implementations, focusing on deep learning videometrics, automated caption pipelines, and formula telemetry reporting.
        </p>
      </motion.div>

      {/* 3D Grid Collection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-20">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Luxury Specifications spreadsheet details (Exactly mimicking index watch telemetry sheet inside video at 00:03-00:05) */}
      <div className="relative z-10 mt-16 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0a0a0c] to-[#040405] border border-yellow-500/15 overflow-hidden">
        
        {/* Mesh design grids */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-6 border-b border-stone-900 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-stone-900 border border-yellow-500/10">
              <TableProperties className="w-5 h-5 text-yellow-500 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block font-bold">CHRONOMETER MATRIX RECORD</span>
              <h3 className="text-lg md:text-xl font-black text-white font-sans tracking-tight">ENGINEERING SPECS SPREADSHEET</h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-stone-950/80 border border-stone-850 text-[10px] font-mono text-yellow-500 font-bold tracking-widest uppercase">
            CAL_STABLE: 100% RELIABILITY
          </span>
        </div>

        {/* Scrollable Specifications matrix row-by-row */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left border-collapse select-all">
            <thead>
              <tr className="border-b border-stone-900/60 font-mono text-[10px] text-stone-500 uppercase tracking-widest font-extrabold pb-3">
                <th className="py-4 pl-2">SPEC / PARAMETER</th>
                <th className="py-4">CALIBRE MOTOR</th>
                <th className="py-4">COMPLIANCE METRICS</th>
                <th className="py-4">JEWELS / CORE MODULES</th>
                <th className="py-4 text-right pr-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Row 1: Surevelcap */}
              <tr className="border-b border-stone-900/65 font-sans text-xs md:text-sm text-stone-300 hover:bg-stone-950/50 transition-colors group">
                <td className="py-4.5 pl-2 font-bold text-white group-hover:text-yellow-500 transition-colors">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-yellow-500/60" />
                    <span>01 // Surevelcap</span>
                  </div>
                </td>
                <td className="py-4.5 font-mono text-xs uppercase text-stone-400">MIL Deep Learning Net</td>
                <td className="py-4.5 text-xs text-stone-450 italic">72H continuous stream captioning</td>
                <td className="py-4.5 font-mono text-[10px] text-yellow-500/80 uppercase">ResNeXt-101 \\ GRU \\ GloVe</td>
                <td className="py-4.5 text-right pr-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 font-mono text-[9px] text-emerald-400 font-bold uppercase">
                    DEPLOYED
                  </span>
                </td>
              </tr>

              {/* Row 2: Lo-Fi Station */}
              <tr className="border-b border-stone-900/65 font-sans text-xs md:text-sm text-stone-300 hover:bg-stone-950/50 transition-colors group">
                <td className="py-4.5 pl-2 font-bold text-white group-hover:text-yellow-500 transition-colors">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-yellow-500/60" />
                    <span>02 // Lo-Fi Music Station</span>
                  </div>
                </td>
                <td className="py-4.5 font-mono text-xs uppercase text-stone-400">YouTube API Pipeline</td>
                <td className="py-4.5 text-xs text-stone-450 italic">Aesthetic client weather overlays</td>
                <td className="py-4.5 font-mono text-[10px] text-yellow-500/80 uppercase">HTML5 Audio \\ Web API \\ Framer</td>
                <td className="py-4.5 text-right pr-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 font-mono text-[9px] text-emerald-400 font-bold uppercase">
                    ACTIVE
                  </span>
                </td>
              </tr>

              {/* Row 3: F1 Stats Dashboard */}
              <tr className="border-b border-stone-900/65 font-sans text-xs md:text-sm text-stone-300 hover:bg-stone-950/50 transition-colors group">
                <td className="py-4.5 pl-2 font-bold text-white group-hover:text-yellow-500 transition-colors">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-yellow-500/60" />
                    <span>03 // F1 Stats Dashboard</span>
                  </div>
                </td>
                <td className="py-4.5 font-mono text-xs uppercase text-stone-400">Flask Python Server</td>
                <td className="py-4.5 text-xs text-stone-450 italic">60 FPS dynamic analytics grids</td>
                <td className="py-4.5 font-mono text-[10px] text-yellow-500/80 uppercase">React JS \\ Chart.JS \\ Scraping</td>
                <td className="py-4.5 text-right pr-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-955/40 border border-amber-500/20 font-mono text-[9px] text-yellow-500 font-bold uppercase">
                    LAB PROTOTYPE
                  </span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>

    </section>
  );
}
