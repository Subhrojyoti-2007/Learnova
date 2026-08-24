"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Play, 
  ArrowRight, 
  Activity, 
  Flame, 
  BrainCircuit, 
  Target, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Wrench,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock Data
const progressData = [
  { name: 'Mon', mastery: 65 },
  { name: 'Tue', mastery: 68 },
  { name: 'Wed', mastery: 67 },
  { name: 'Thu', mastery: 70 },
  { name: 'Fri', mastery: 72 },
  { name: 'Sat', mastery: 73 },
  { name: 'Sun', mastery: 74 },
];

export default function Overview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex-1 w-full p-6 md:p-10 relative z-10 max-w-7xl mx-auto overflow-x-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-[0%] right-[0%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[0%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <header className="mb-10 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Good evening, Alex 👋</h1>
        <p className="text-white/60 text-lg">Let's close a few knowledge gaps today.</p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 relative z-10"
      >
        {/* Top Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6 border-white/5 hover:border-primary/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3" /> 2.4%
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">74%</h3>
            <p className="text-white/50 text-sm font-medium">Overall Mastery</p>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 hover:border-blue-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3" /> +3
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">28</h3>
            <p className="text-white/50 text-sm font-medium">Concepts Mastered</p>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 hover:border-orange-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-white/40 text-sm font-semibold bg-white/5 px-2 py-1 rounded-md">
                Keep it up!
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">8 days</h3>
            <p className="text-white/50 text-sm font-medium">Learning Streak</p>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 hover:border-rose-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-2 py-1 rounded-md">
                <ArrowDownRight className="w-3 h-3" /> -2
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">6</h3>
            <p className="text-white/50 text-sm font-medium">Knowledge Gaps</p>
          </GlassCard>
        </motion.div>

        {/* MAIN LAYOUT (3 Columns) */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Today's Learning Plan */}
          <GlassCard className="p-6 lg:p-8 flex flex-col h-full border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">Today's Learning Plan</h2>
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 opacity-60">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-white font-medium line-through decoration-white/30">Review Functions</h4>
                  <span className="text-xs text-white/40 block mt-1">10 min • Completed</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/30 shadow-[0_0_15px_rgba(124,58,237,0.1)] group">
                <Circle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:fill-primary/20 transition-colors cursor-pointer" />
                <div className="flex-1">
                  <h4 className="text-primary-foreground font-bold">Repair Call Stack</h4>
                  <span className="text-xs text-white/60 block mt-1 mb-3">15 min • Priority</span>
                  <Link href="/repair">
                    <Button size="sm" className="w-full gap-2 bg-primary hover:bg-primary/90 text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]">
                      <Wrench className="w-4 h-4" /> Start Repair
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent transition-colors group cursor-pointer">
                <Circle className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5 group-hover:text-white/60 transition-colors" />
                <div className="flex-1">
                  <h4 className="text-white/80 font-medium group-hover:text-white transition-colors">5 Recursion Questions</h4>
                  <span className="text-xs text-white/40 block mt-1">8 min • Practice</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent transition-colors group cursor-pointer">
                <Circle className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5 group-hover:text-white/60 transition-colors" />
                <div className="flex-1">
                  <h4 className="text-white/80 font-medium group-hover:text-white transition-colors">Retention Check</h4>
                  <span className="text-xs text-white/40 block mt-1">5 min • Quiz</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Center: Knowledge Health */}
          <GlassCard className="p-6 lg:p-8 flex flex-col items-center justify-center text-center h-full border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
            <h2 className="text-xl font-bold text-white mb-8 w-full text-left z-10">Knowledge Health</h2>
            
            <div className="relative w-48 h-48 mb-8 z-10">
              {/* Circular Visualization */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background track */}
                <circle cx="50" cy="50" r="40" className="stroke-white/5" strokeWidth="8" fill="none" />
                {/* Progress track */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  className="stroke-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.8)] transition-all duration-1000 ease-out" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.74)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white tracking-tighter">74<span className="text-2xl text-white/50">%</span></span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">Mastery</span>
              </div>
            </div>

            <div className="flex justify-between w-full text-left gap-4 z-10 border-t border-white/5 pt-6 mt-auto">
              <div>
                <span className="text-xs font-bold text-emerald-400 block mb-1">Strong</span>
                <span className="text-lg font-bold text-white">28 <span className="text-xs text-white/40 font-normal">Concepts</span></span>
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 block mb-1">Developing</span>
                <span className="text-lg font-bold text-white">12 <span className="text-xs text-white/40 font-normal">Concepts</span></span>
              </div>
              <div>
                <span className="text-xs font-bold text-rose-400 block mb-1">Needs Attn</span>
                <span className="text-lg font-bold text-white">6 <span className="text-xs text-white/40 font-normal">Concepts</span></span>
              </div>
            </div>
          </GlassCard>

          {/* Right: Learning Debugger */}
          <GlassCard className="p-6 lg:p-8 flex flex-col h-full border-primary/20 bg-gradient-to-br from-[#1A1635]/80 to-[#0D0B16]">
            <h2 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
              Learning Debugger
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </h2>
            
            <div className="bg-[#090812] border border-rose-500/20 rounded-2xl p-5 mb-6 shadow-[0_0_20px_rgba(244,63,94,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
              <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Recent Mistake</p>
              <h4 className="text-white font-semibold mb-4 text-lg">Recursion</h4>
              
              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <div>
                  <p className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> Root Gap</p>
                  <p className="text-white font-medium">Call Stack</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-1">Mastery</p>
                  <p className="text-rose-500 font-bold text-lg leading-none">31%</p>
                </div>
              </div>
            </div>

            <Link href="/debugger" className="mb-auto">
              <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white gap-2 justify-between px-5 py-6 group">
                <span className="font-semibold text-base">Understand Why</span>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="w-16 h-16 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-2 rounded-full border border-primary/30 animate-spin-slow" />
                <BrainCircuit className="w-8 h-8 text-primary relative z-10" />
              </div>
              <p className="text-xs text-primary font-medium tracking-widest uppercase mt-4 opacity-80">AI Analyzing Patterns...</p>
            </div>
          </GlassCard>

        </motion.div>

        {/* Knowledge Gaps Section */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Knowledge Gaps</h2>
              <p className="text-white/50 text-sm">Prioritized by impact on your current goals.</p>
            </div>
            <Link href="/diagnose" className="text-primary hover:text-primary-foreground text-sm font-semibold flex items-center gap-1 transition-colors">
              View Map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { title: "Call Stack", mastery: 31, status: "Critical", color: "rose" },
              { title: "Recursion", mastery: 44, status: "Weak", color: "orange" },
              { title: "Pointers", mastery: 58, status: "Developing", color: "amber" },
              { title: "Graphs", mastery: 67, status: "Developing", color: "blue" },
            ].map((gap, i) => (
              <GlassCard key={i} className="p-5 border-white/5 flex flex-col hover:bg-white/[0.03] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-white text-lg">{gap.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md
                    ${gap.color === 'rose' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : ''}
                    ${gap.color === 'orange' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : ''}
                    ${gap.color === 'amber' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : ''}
                    ${gap.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : ''}
                  `}>
                    {gap.status}
                  </span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Mastery</span>
                    <span className="font-bold text-white">{gap.mastery}%</span>
                  </div>
                  <div className="w-full bg-[#090812] rounded-full h-2 border border-white/5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000
                        ${gap.color === 'rose' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : ''}
                        ${gap.color === 'orange' ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : ''}
                        ${gap.color === 'amber' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''}
                        ${gap.color === 'blue' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''}
                      `} 
                      style={{ width: `${gap.mastery}%` }} 
                    />
                  </div>
                </div>
                <Link href="/repair" className="mt-auto">
                  <Button variant="glass" size="sm" className="w-full text-xs uppercase tracking-widest font-bold">
                    Repair
                  </Button>
                </Link>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Recent Progress Section */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6 lg:p-8 border-white/5">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Recent Progress</h2>
                <p className="text-white/50 text-sm">Overall mastery over the last 7 days.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(124,58,237,0.8)]"></span>
                <span className="text-sm font-medium text-white/80">Mastery %</span>
              </div>
            </div>
            
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.2)" 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.2)" 
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={[60, 80]}
                    dx={-10}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: '#151226', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      boxShadow: '0 0 20px rgba(124,58,237,0.2)'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mastery" 
                    stroke="#8B5CF6" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#151226', stroke: '#8B5CF6', strokeWidth: 2 }} 
                    activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2, className: 'drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]' }} 
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Continue Learning Section */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Continue Learning</h2>
              <p className="text-white/50 text-sm">Pick up right where you left off.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/learn" className="block group">
              <GlassCard className="p-6 lg:p-8 border-white/5 group-hover:border-primary/30 transition-all group-hover:-translate-y-1 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors pointer-events-none" />
                <div className="flex-1 relative z-10 w-full">
                  <div className="p-2.5 bg-white/5 rounded-xl text-primary inline-flex mb-4 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors">Recursion Fundamentals</h3>
                  <div className="flex items-center gap-4 text-sm text-white/50 font-medium mb-4">
                    <span>4 modules left</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>Est. 45 min</span>
                  </div>
                  <ProgressBar value={76} />
                </div>
                <div className="flex-shrink-0 relative z-10 w-full sm:w-auto flex justify-end">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                </div>
              </GlassCard>
            </Link>

            <Link href="/learn" className="block group">
              <GlassCard className="p-6 lg:p-8 border-white/5 group-hover:border-blue-500/30 transition-all group-hover:-translate-y-1 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors pointer-events-none" />
                <div className="flex-1 relative z-10 w-full">
                  <div className="p-2.5 bg-white/5 rounded-xl text-blue-400 inline-flex mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Binary Search</h3>
                  <div className="flex items-center gap-4 text-sm text-white/50 font-medium mb-4">
                    <span>7 modules left</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>Est. 1h 15m</span>
                  </div>
                  <ProgressBar value={42} indicatorColor="bg-blue-500" />
                </div>
                <div className="flex-shrink-0 relative z-10 w-full sm:w-auto flex justify-end">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
