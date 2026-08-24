"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Activity, 
  ArrowRight,
  BrainCircuit,
  Wrench,
  Clock,
  Calendar,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Mock Data
const masteryData = {
  "7 Days": [
    { name: "Mon", val: 68 }, { name: "Tue", val: 69 }, { name: "Wed", val: 69 },
    { name: "Thu", val: 71 }, { name: "Fri", val: 72 }, { name: "Sat", val: 74 }, { name: "Sun", val: 74 }
  ],
  "30 Days": [
    { name: "Week 1", val: 56 }, { name: "Week 2", val: 62 }, { name: "Week 3", val: 68 }, { name: "Week 4", val: 74 }
  ],
  "3 Months": [
    { name: "Month 1", val: 42 }, { name: "Month 2", val: 56 }, { name: "Month 3", val: 74 }
  ]
};

const conceptProgress = [
  { name: "Arrays", before: 82, current: 92, change: 10 },
  { name: "Recursion", before: 42, current: 83, change: 41 },
  { name: "Call Stack", before: 31, current: 79, change: 48 },
  { name: "Pointers", before: 55, current: 68, change: 13 }
];

const retentionSchedule = [
  { concept: "Binary Search", time: "Tomorrow", status: "urgent", icon: Clock },
  { concept: "Recursion", time: "In 3 days", status: "upcoming", icon: Calendar },
  { concept: "Pointers", time: "In 7 days", status: "later", icon: Calendar }
];

type FilterType = "7 Days" | "30 Days" | "3 Months";

export default function Progress() {
  const [filter, setFilter] = useState<FilterType>("30 Days");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden min-h-[calc(100vh-100px)]">
      
      {/* Background Ambience */}
      <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <header className="mb-10 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-primary" /> Progress
        </h1>
        <p className="text-white/50 text-lg">
          See how your knowledge is evolving.
        </p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10 relative z-10"
      >
        {/* ============================================================== */}
        {/* TOP: MASTERY OVER TIME */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6 md:p-8 border-primary/20 bg-gradient-to-br from-[#1A1635]/80 to-[#110E20]/80 shadow-[0_0_30px_rgba(124,58,237,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-1">Overall Mastery</span>
                  <span className="text-4xl font-bold text-white">74%</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-1">Change</span>
                  <span className="text-2xl font-bold text-emerald-400 flex items-center gap-1">
                    <ArrowUpRight className="w-5 h-5" /> +18% <span className="text-sm font-medium text-emerald-400/50">this month</span>
                  </span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex bg-[#090812] rounded-lg p-1 border border-white/10">
                {(["7 Days", "30 Days", "3 Months"] as FilterType[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors
                      ${filter === f ? 'bg-primary/20 text-primary border border-primary/30' : 'text-white/40 hover:text-white/80'}
                    `}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Chart */}
            <div className="w-full h-[250px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={masteryData[filter]} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090812', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#7C3AED' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorMastery)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* CONCEPT PROGRESS & GAPS REPAIRED */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-4">
              <BrainCircuit className="w-4 h-4 text-primary" /> Concept Progress
            </h2>
            
            <GlassCard className="p-0 border-white/5 overflow-hidden">
              <div className="grid grid-cols-4 px-5 py-3 bg-white/5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                <div className="col-span-2">Concept</div>
                <div className="text-center">Shift</div>
                <div className="text-right">Change</div>
              </div>
              <div className="divide-y divide-white/5">
                {conceptProgress.map((item, i) => (
                  <div key={i} className="grid grid-cols-4 px-5 py-4 items-center">
                    <div className="col-span-2 text-sm font-medium text-white/90">{item.name}</div>
                    <div className="text-center text-xs font-medium text-white/50 flex items-center justify-center gap-1.5">
                      {item.before}% <ArrowRight className="w-3 h-3 text-white/20" /> {item.current}%
                    </div>
                    <div className="text-right text-sm font-bold text-emerald-400">
                      +{item.change}%
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" /> Gaps Repaired
              </h2>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">12 Total</span>
            </div>

            <GlassCard className="p-5 border-white/5 space-y-5">
              <div className="relative pl-6">
                <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-amber-500/50 to-transparent" />
                
                <div className="relative mb-5">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] border-2 border-[#110E20]" />
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Today</span>
                  <p className="text-sm font-medium text-white">Call Stack Unwinding</p>
                </div>

                <div className="relative mb-5">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white/20 border-2 border-[#110E20]" />
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">3 Days Ago</span>
                  <p className="text-sm font-medium text-white/70">Recursive Base Cases</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white/20 border-2 border-[#110E20]" />
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Last Week</span>
                  <p className="text-sm font-medium text-white/70">Pointer Arithmetic</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

        </div>

        {/* ============================================================== */}
        {/* RETENTION (UPCOMING REVIEWS) */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-blue-400" /> Retention Schedule
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {retentionSchedule.map((item, i) => (
              <GlassCard key={i} className={`p-5 border-l-2 flex flex-col justify-between h-full
                ${item.status === 'urgent' ? 'border-l-orange-500 border-white/5 bg-orange-950/10' : 'border-l-white/10 border-white/5'}
              `}>
                <div className="flex justify-between items-start mb-4">
                  <item.icon className={`w-5 h-5 ${item.status === 'urgent' ? 'text-orange-400' : 'text-white/40'}`} />
                  {item.status === 'urgent' && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                  )}
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1
                    ${item.status === 'urgent' ? 'text-orange-400/80' : 'text-white/30'}
                  `}>{item.time}</span>
                  <span className="text-sm font-bold text-white/90">{item.concept}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
