import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Terminal, 
  User, 
  Bot, 
  Cpu, 
  AlertCircle 
} from "lucide-react";
import { ChatMessage } from "../types";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const SUGGESTED_QUERIES = [
  "Why should we hire Joshwa?",
  "Tell me about the Surevelcap project.",
  "What was his role at VCodez?",
  "What is his core tech stack?"
];

export default function AIAssistant({ isOpen, onClose, onOpen }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedBanner, setSimulatedBanner] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Welcome to Joshwa's Portfolio Core. I am Joshwa's digital clockwork double. I carry full parameters of his ML engines, system web prototypes, and qualifications. Ask me any question to query his background telemetry!",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  // Scroll messages feed cleanly
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Format for backend
    const apiMessages = [...messages, userMessage].map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      content: msg.content
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text || "I was unable to structure an output. Please email me at astrojoshwa@gmail.com",
        timestamp: new Date()
      };

      if (data.simulated) {
        setSimulatedBanner(true);
      } else {
        setSimulatedBanner(false);
      }

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to connect to Joshwa's AI model:", err);
      const errorMessage: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: "I had trouble connecting to my central neural node, but you can always reach the physical Joshwa directly at astrojoshwa@gmail.com or +91 9360492446!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating summons button widget bottom-right */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: 50, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 shadow-xl shadow-yellow-500/15 text-black cursor-pointer group flex items-center gap-1.5 focus:outline-none"
            title="Chat with Joshwa's AI Twin"
            id="summon-ai-btn"
          >
            <MessageSquare className="w-5.5 h-5.5 shrink-0 text-black fill-transparent stroke-[2.5]" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-mono text-xs font-black uppercase tracking-widest whitespace-nowrap text-black">
              SUMMON_AI
            </span>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-yellow-405 border-2 border-stone-950 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-yellow-405 border-2 border-stone-950" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating HUD Chat Box Console styled like luxury watch display screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 22, stiffness: 140 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[92vw] sm:w-[410px] h-[540px] rounded-3xl glass-panel border border-yellow-550/20 shadow-2xl overflow-hidden flex flex-col justify-between"
            id="ai-console-pane"
          >
            {/* Top Command Banner Header */}
            <div className="p-4 bg-stone-950 border-b border-white/5 flex justify-between items-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="p-2 rounded-xl bg-stone-900 border border-yellow-500/20 text-yellow-500">
                  <Cpu className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-widest font-mono">J_CLONE_V1.5</h3>
                  <div className="flex items-center gap-1 text-[8px] text-yellow-500 font-mono">
                    <span className="w-1 h-1 rounded-full bg-yellow-500 animate-ping" />
                    <span>COGNITIVE_CO_PILOT_STABLE</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/5 text-[#888] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Demo Warning Banner */}
            {simulatedBanner && (
              <div className="bg-[#12100e] border-b border-yellow-800/10 py-1.5 px-3 flex items-center gap-2 text-[10px] font-mono text-yellow-500/80 shrink-0 select-none">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Running in sandbox simulation demo mode</span>
              </div>
            )}

            {/* Chat message logs area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      isUser ? "bg-stone-900 border border-stone-850 text-stone-400" : "bg-stone-900 border border-yellow-500/20 text-yellow-500"
                    }`}>
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs md:text-sm font-sans ${
                      isUser
                        ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-tr-none shadow-md shadow-amber-950/20"
                        : "bg-stone-900 border border-white/5 text-stone-200 rounded-tl-none whitespace-pre-wrap leading-relaxed"
                    }`}>
                      {msg.content}
                      <span className="block text-[8px] opacity-40 text-right mt-1.5 font-mono">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Formulation placeholder state */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-stone-905 border border-yellow-500/20 text-yellow-500 shrink-0">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-stone-900 border border-white/5 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" />
                    <span className="text-[9px] font-mono text-yellow-500/80 ml-1.5 uppercase font-bold tracking-widest">FORMULATING TELEMETRY...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Core Controls Console with Suggestion Chips */}
            <div className="p-4 border-t border-white/5 bg-[#050506] relative">
              {/* Query suggestion chips panel */}
              {messages.length < 3 && !isLoading && (
                <div className="flex flex-wrap gap-1.5 pb-3">
                  {SUGGESTED_QUERIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendMessage(q)}
                      className="px-2.5 py-1 rounded-full text-[9px] font-mono text-yellow-500 bg-stone-900 border border-yellow-500/10 hover:border-yellow-500/40 hover:bg-stone-850 transition-all duration-200 text-left cursor-pointer active:scale-95 font-bold uppercase tracking-wide"
                    >
                      +{q}
                    </button>
                  ))}
                </div>
              )}

              {/* Form submit bar */}
              <form onSubmit={handleFormSubmit} className="flex gap-2.5">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Query system parameters..."
                  disabled={isLoading}
                  className="flex-1 bg-stone-900 border border-white/5 rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-yellow-500/40 transition-colors font-sans"
                  id="assistant-prompt-box"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-extrabold cursor-pointer disabled:pointer-events-none disabled:opacity-40 transition-all shadow-md"
                  id="assistant-submit-btn"
                >
                  <Send className="w-4 h-4 text-black stroke-[3px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
