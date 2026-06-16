import { useState, useEffect } from "react";
import { Menu, X, Cpu, Terminal, Compass, Disc } from "lucide-react";
import BackgroundMatrix from "./components/BackgroundMatrix";
import Hero from "./components/Hero";
import Internships from "./components/Internships";
import Skills3D from "./components/Skills3D";
import Projects3D from "./components/Projects3D";
import AboutContact from "./components/AboutContact";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll offset trigger for translucent glassmorphic navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen text-stone-100 selection:bg-yellow-500/20 selection:text-yellow-200 bg-[#020204]">
      
      {/* 3D Gold Particle Starfield Fabric Background */}
      <BackgroundMatrix />

      {/* Cyberpunk Luxury Gold Separator overlay */}
      <div className="fixed top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent z-50 pointer-events-none" />

      {/* Glassmorphed Navigation Bar with Swiss Luxury Styling */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-stone-950/85 backdrop-blur-md py-4.5 border-yellow-500/10"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center w-full">
          
          {/* Logo Name Node resembling brand mark */}
          <a href="#top" className="flex items-center gap-2.5 group cursor-pointer" id="logo-anchor">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 group-hover:border-yellow-400 group-hover:bg-yellow-500/20 transition-all">
              <Compass className="w-4 h-4 text-yellow-550 animate-gear-fast group-hover:text-yellow-400" />
            </div>
            <span className="font-mono text-sm font-extrabold tracking-[0.18em] text-white">
              JOSHWA<span className="text-yellow-500">_PORTFOLIO</span>
            </span>
          </a>

          {/* Desktop Navigation Links (Extreme tracking, spaced, minimal capitalized design) */}
          <nav className="hidden md:flex items-center gap-9 text-[11px] font-mono font-bold uppercase tracking-widest pl-4">
            <a
              href="#internships"
              className="text-stone-400 hover:text-yellow-500 transition-colors duration-250"
            >
              INTERNSHIPS
            </a>
            <a
              href="#skills"
              className="text-stone-400 hover:text-yellow-500 transition-colors duration-250"
            >
              CALIBRE MATRIX
            </a>
            <a
              href="#projects"
              className="text-stone-400 hover:text-yellow-500 transition-colors duration-250"
            >
              BLUEPRINTS
            </a>
            <a
              href="#about"
              className="text-stone-400 hover:text-yellow-500 transition-colors duration-250"
            >
              CHASSIS
            </a>
          </nav>

          {/* Call-to-Action Buttons (AI Twin summoning key) in Gold */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleChat}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-stone-900/60 hover:bg-stone-900 border border-yellow-550/20 hover:border-yellow-500 text-yellow-500 font-bold text-[10px] font-mono uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-101 cursor-pointer active:scale-98"
              id="header-summon-btn"
            >
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>COGNITIVE_CO_PILOT</span>
            </button>
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg bg-stone-950 border border-stone-850 text-stone-500 hover:text-white focus:outline-none cursor-pointer"
            id="mobile-hamburguer-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Floating Translucent Mobile Menu drawer in gold aesthetic */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 pt-24 bg-stone-950/98 backdrop-blur-xl flex flex-col p-6 space-y-6 border-b border-yellow-500/10 md:hidden">
          <nav className="flex flex-col space-y-5 text-sm font-mono font-bold uppercase tracking-widest pl-2">
            <a
              href="#internships"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-300 hover:text-yellow-500 py-1.5 transition-colors border-b border-stone-900"
            >
              ENGINE INTERNSHIPS
            </a>
            <a
              href="#skills"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-300 hover:text-yellow-500 py-1.5 transition-colors border-b border-stone-900"
            >
              CALIBRE MATRIX
            </a>
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-300 hover:text-yellow-500 py-1.5 transition-colors border-b border-stone-900"
            >
              LAB BLUEPRINTS
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-stone-300 hover:text-yellow-500 py-1.5 transition-colors border-b border-stone-900"
            >
              CHASSIS SPECS
            </a>
          </nav>
          
          <div className="pt-6 border-t border-stone-900 flex flex-col gap-3">
            <button
              onClick={toggleChat}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 border border-yellow-500/40 text-yellow-500 font-mono text-xs uppercase tracking-widest font-black transition-all"
              id="mobile-summon-btn"
            >
              <Cpu className="w-4 h-4 animate-spin" />
              <span>COGNITIVE CO-PILOT</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating coordinates banner overlay */}
      <div className="fixed bottom-4 left-6 z-30 hidden lg:flex items-center gap-2 font-mono text-[9px] text-stone-550 opacity-60">
        <Disc className="w-3.5 h-3.5 text-yellow-550 animate-spin" />
        <span>NODE_SYS_STREAM: SWISS_GRID_ESTABLISHED_60_FPS</span>
      </div>

      {/* Main Page Layout Wrapper */}
      <main className="relative z-10 w-full overflow-x-hidden">
        
        {/* HERO SECTION */}
        <Hero onOpenChat={() => setIsChatOpen(true)} />

        {/* INTERNSHIP SEPARATE SECTION */}
        <Internships />

        {/* SKILLS SECTION */}
        <Skills3D />

        {/* PROJECTS SECTION */}
        <Projects3D />

        {/* TIMELINES AND CONTACT SECTION */}
        <AboutContact />

      </main>

      {/* SECURED GATEWAY CHAT INTERFACE COMPONENT */}
      <AIAssistant
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
      />

      {/* Simple elegant footer */}
      <footer className="relative border-t border-[#ffffff03] bg-stone-955/80 py-8 text-center text-[10px] font-mono text-stone-650 relative z-10 mt-12 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Joshwa Jeba Kumar A. Designed with swiss mechanical timepiece aesthetics.</p>
      </footer>

    </div>
  );
}
