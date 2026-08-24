"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Bell, 
  Menu, 
  Command, 
  BrainCircuit, 
  Wrench, 
  TrendingUp, 
  Activity, 
  CheckCircle2,
  Calendar,
  X,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { GlassCard } from "@/components/ui/GlassCard";

// Mock Data for Search
const MOCK_SEARCH_RESULTS = [
  { id: 1, title: "Recursion", category: "Concepts", metric: "83% mastery", icon: BrainCircuit, link: "/galaxy" },
  { id: 2, title: "Call Stack", category: "Concepts", metric: "79% mastery", icon: BrainCircuit, link: "/galaxy" },
  { id: 3, title: "Graph Traversal", category: "Concepts", metric: "34% mastery", icon: BrainCircuit, link: "/galaxy" },
  { id: 4, title: "Recursion Repair Session", category: "Learning Sessions", metric: "Completed 2 hours ago", icon: Wrench, link: "/repair" },
  { id: 5, title: "Call Stack Unwinding", category: "Knowledge Gaps", metric: "Repaired", icon: CheckCircle2, link: "/debugger" },
  { id: 6, title: "Weekly Progress Report", category: "Progress", metric: "+18% overall", icon: TrendingUp, link: "/progress" }
];

// Mock Data for Notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Your Call Stack gap has been repaired.", type: "red", time: "2h ago", icon: Wrench },
  { id: 2, text: "Retention check for Recursion is due tomorrow.", type: "yellow", time: "5h ago", icon: Calendar },
  { id: 3, text: "You improved your mastery by 8% this week.", type: "green", time: "1d ago", icon: TrendingUp },
  { id: 4, text: "New algorithm modules are available.", type: "purple", time: "2d ago", icon: Activity }
];

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const userName = session?.user?.name || "Alex H.";
  const firstName = userName.split(" ")[0];
  const initial = userName.charAt(0).toUpperCase();
  
  // State for modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Close notifications on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);
  
  // Format the pathname into a readable title
  let title = "Overview";
  if (pathname && pathname !== "/") {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      const firstPart = pathParts[0];
      title = firstPart.charAt(0).toUpperCase() + firstPart.slice(1).replace(/-/g, ' ');
    }
  }

  // Filter search results
  const filteredSearch = searchQuery.trim() === "" 
    ? MOCK_SEARCH_RESULTS 
    : MOCK_SEARCH_RESULTS.filter(res => res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.category.toLowerCase().includes(searchQuery.toLowerCase()));

  // Group filtered results by category
  const groupedResults = filteredSearch.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, typeof MOCK_SEARCH_RESULTS>);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-6 lg:px-10 lg:py-8 border-b border-white/[0.05] bg-[#090812]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            aria-label="Toggle mobile menu"
            className="lg:hidden w-10 h-10 rounded-full text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">{title}</h1>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Search Trigger */}
          <div 
            className="relative group hidden md:block" 
            onClick={() => setIsSearchOpen(true)}
            role="button"
            aria-label="Open command search"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setIsSearchOpen(true); }}
          >
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-primary transition-colors" />
            <div className="bg-[#151226]/80 border border-white/5 rounded-full py-2.5 pl-11 pr-4 w-[240px] lg:w-[280px] text-sm text-white/30 hover:border-primary/50 transition-all backdrop-blur-md cursor-pointer flex items-center justify-between">
              <span>Start searching here...</span>
              <div className="flex items-center gap-1 text-[10px] font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40">
                <Command className="w-3 h-3" /> K
              </div>
            </div>
          </div>
          
          {/* Notifications Trigger */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label="Toggle notifications"
              aria-expanded={isNotificationsOpen}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors border 
                ${isNotificationsOpen ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-white/5 border-white/5 text-white hover:bg-white/10'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-[#0D0B16]">4</span>
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 w-[320px] bg-[#110E20]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="font-bold text-white text-sm">Notifications</h3>
                    <button className="text-xs text-primary hover:text-primary-foreground font-medium transition-colors">Mark all read</button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map(notif => {
                      const colorMap: Record<string, string> = {
                        purple: 'text-primary bg-primary/10 border-primary/20',
                        green: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                        yellow: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                        red: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                      };
                      return (
                        <div key={notif.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 group">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 mt-0.5 ${colorMap[notif.type]}`}>
                            <notif.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm text-white/90 leading-snug group-hover:text-white transition-colors">{notif.text}</p>
                            <span className="text-xs text-white/40 mt-1 block">{notif.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3 text-center border-t border-white/5 bg-white/[0.02]">
                    <button className="text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-wider">View All</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile Trigger */}
          <Link href="/profile" aria-label="Go to Profile" className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white leading-tight group-hover:text-primary-foreground transition-colors">{firstName}</p>
              <p className="text-xs text-white/50">Explorer</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px] shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <div className="w-full h-full rounded-full bg-[#151226] border-2 border-[#151226] overflow-hidden group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">{initial}</div>
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* COMMAND PALETTE (SEARCH MODAL) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4">
            
            {/* Dimmed Background */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-[#090812]/80 backdrop-blur-sm"
            />
            
            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-[#151226]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden relative z-10 flex flex-col max-h-[70vh]"
            >
              {/* Input Header */}
              <div className="relative flex items-center p-4 border-b border-white/10">
                <Search className="w-5 h-5 text-primary absolute left-6" />
                <input 
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search concepts, gaps, or sessions..."
                  aria-label="Search concepts, gaps, or sessions"
                  className="w-full bg-transparent border-none text-white text-lg pl-10 pr-12 py-2 focus:outline-none placeholder:text-white/30"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search panel"
                  className="absolute right-4 p-1.5 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results Area */}
              <div className="flex-1 overflow-y-auto p-2">
                {Object.keys(groupedResults).length === 0 ? (
                  <div className="p-8 text-center text-white/40">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  Object.entries(groupedResults).map(([category, items]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <div className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                        {category}
                      </div>
                      <div className="space-y-1">
                        {items.map(item => (
                          <Link 
                            key={item.id} 
                            href={item.link}
                            onClick={() => setIsSearchOpen(false)}
                            className="w-full flex items-center justify-between p-3 px-4 rounded-xl hover:bg-white/5 group transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all">
                                <item.icon className="w-4 h-4" />
                              </div>
                              <span className="text-white/80 font-medium group-hover:text-white transition-colors">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-white/40">{item.metric}</span>
                              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Footer */}
              <div className="p-3 border-t border-white/5 bg-[#090812]/50 flex justify-between items-center text-[10px] text-white/30 font-medium">
                <span className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono">ESC</kbd>
                  to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
