"use client";

import { motion } from "framer-motion";
import { 
  Fingerprint, 
  BrainCircuit, 
  Target, 
  TrendingUp, 
  Eye, 
  Activity, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from "recharts";

// Mock Data for mini charts
const mockAccuracyData = Array.from({ length: 14 }, (_, i) => ({ day: i, val: 50 + Math.random() * 40 }));
const mockConsistencyData = Array.from({ length: 14 }, (_, i) => ({ day: i, val: 30 + Math.random() * 60 }));
const mockRetentionData = Array.from({ length: 14 }, (_, i) => ({ day: i, val: 90 - (i * 1.5) + Math.random() * 10 }));
const mockSpeedData = Array.from({ length: 14 }, (_, i) => ({ day: i, val: 120 - (i * 3) + Math.random() * 20 }));

const CustomTooltip = () => null; // Hide tooltip for sparklines

export default function LearningDNA() {
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
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden min-h-[calc(100vh-100px)]">
      
      {/* Background Ambience */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <header className="mb-10 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
          <Fingerprint className="w-8 h-8 text-primary" /> Your Learning DNA
        </h1>
        <p className="text-white/50 text-lg">
          A snapshot of how you learn, where you excel, and where you need attention.
        </p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 relative z-10"
      >
        {/* ============================================================== */}
        {/* HERO CARD */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-8 border-primary/20 bg-gradient-to-br from-[#1A1635]/80 to-[#110E20]/80 shadow-[0_0_30px_rgba(124,58,237,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_15px_rgba(124,58,237,1)]" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-primary" /> Overall Mastery
                </span>
                <span className="text-4xl font-bold text-white">74<span className="text-xl text-white/50">%</span></span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-blue-400" /> Learning Style
                </span>
                <span className="text-2xl font-bold text-white/90">Visual <span className="text-primary">+</span> Practice</span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Strongest Area
                </span>
                <span className="text-xl font-bold text-white/90 leading-tight mt-1">Logical Reasoning</span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-rose-400" /> Current Challenge
                </span>
                <span className="text-xl font-bold text-white/90 leading-tight mt-1">Graph Algorithms</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* MAIN CONTENT GRID */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Traits & Specifics */}
          <div className="lg:col-span-5 space-y-6">
            
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 border-white/5 border-l-2 border-l-emerald-500">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Strengths
                </h3>
                <ul className="space-y-3">
                  {['Arrays', 'Functions', 'Pattern Recognition'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500/70" /> {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 border-white/5 border-l-2 border-l-orange-500">
                <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Current Challenges
                </h3>
                <ul className="space-y-3">
                  {['Call Stack', 'Recursion', 'Graph Traversal'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500/70 ml-1.5" /> {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard className="p-6 border-white/5 border-l-2 border-l-rose-500">
                <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Common Mistakes
                </h3>
                <ul className="space-y-4 text-sm text-white/70">
                  <li className="bg-white/5 p-3 rounded-lg border border-white/5">Off-by-one errors in loop boundaries.</li>
                  <li className="bg-white/5 p-3 rounded-lg border border-white/5">Incorrect or missing base cases in recursion.</li>
                  <li className="bg-white/5 p-3 rounded-lg border border-white/5">Prematurely updating traversal states before verifying conditions.</li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Behavior & Strategy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Learning Behavior Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Learning Behavior Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Accuracy */}
                <GlassCard className="p-4 border-white/5 flex flex-col h-32">
                  <span className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Accuracy</span>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockAccuracyData}>
                        <defs>
                          <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <Area type="monotone" dataKey="val" stroke="#60A5FA" strokeWidth={2} fillOpacity={1} fill="url(#colorAcc)" isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                {/* Consistency */}
                <GlassCard className="p-4 border-white/5 flex flex-col h-32">
                  <span className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-primary" /> Consistency</span>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockConsistencyData}>
                        <defs>
                          <linearGradient id="colorCon" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <Area type="monotone" dataKey="val" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorCon)" isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                {/* Retention */}
                <GlassCard className="p-4 border-white/5 flex flex-col h-32">
                  <span className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1.5"><BrainCircuit className="w-3.5 h-3.5 text-amber-400" /> Retention</span>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockRetentionData}>
                        <defs>
                          <linearGradient id="colorRet" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <Area type="monotone" dataKey="val" stroke="#FBBF24" strokeWidth={2} fillOpacity={1} fill="url(#colorRet)" isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

                {/* Speed */}
                <GlassCard className="p-4 border-white/5 flex flex-col h-32">
                  <span className="text-xs font-bold text-white/60 mb-2 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-400" /> Speed</span>
                  <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockSpeedData}>
                        <defs>
                          <linearGradient id="colorSpd" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <Area type="monotone" dataKey="val" stroke="#34D399" strokeWidth={2} fillOpacity={1} fill="url(#colorSpd)" isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </GlassCard>

              </div>
            </motion.div>

            {/* Recommended Learning Strategy */}
            <motion.div variants={itemVariants} className="mt-auto pt-4">
              <GlassCard className="p-8 border-primary/30 bg-gradient-to-r from-primary/10 to-[#110E20]/50 relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute -right-10 -top-10 text-primary/10">
                  <Cpu className="w-48 h-48" />
                </div>
                
                <h3 className="text-sm font-bold text-primary-foreground uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                  <Lightbulb className="w-4 h-4 text-primary" /> Recommended Strategy
                </h3>
                
                <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed relative z-10">
                  "Short visual explanations followed by immediate practice appear to work best for you."
                </p>
                <p className="text-white/40 text-sm mt-4 relative z-10">
                  Based on recent interaction history and performance on visually-driven diagnostic tasks.
                </p>
              </GlassCard>
            </motion.div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
