"use client";

import { motion } from "framer-motion";
import { 
  ArrowDown, 
  BrainCircuit, 
  ShieldAlert, 
  Sparkles, 
  Network, 
  Wrench, 
  Code2, 
  CheckCircle2, 
  XCircle,
  TrendingDown,
  History,
  Activity,
  Send,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export default function LearningDebugger() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Let's debug your thinking.</h1>
        <p className="text-white/50 text-lg flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary" /> We found a possible gap behind this mistake.
        </p>
      </header>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ============================================================== */}
        {/* LEFT PANEL: Context */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Original Context</h2>
          
          <GlassCard className="p-6 border-white/5 bg-white/5">
            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              <Code2 className="w-4 h-4" /> The Question
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              "What will this recursive function return?"
            </p>
            <pre className="bg-[#090812] border border-white/10 p-4 rounded-lg text-xs font-mono text-blue-300 overflow-x-auto mb-6">
              <code>{`function mystery(n) {
  if (n === 0) return 1;
  return n * mystery(n - 1);
}
console.log(mystery(4));`}</code>
            </pre>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" /> Your Answer
                </span>
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3 rounded-lg text-sm line-through decoration-rose-500/50">
                  10
                </div>
              </div>
              
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct Answer
                </span>
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-3 rounded-lg text-sm font-medium">
                  24
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* ============================================================== */}
        {/* CENTER PANEL: Reasoning Analysis */}
        {/* ============================================================== */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6 w-full text-left sm:text-center">Reasoning Analysis</h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full flex flex-col items-center relative"
          >
            {/* Background tracking line */}
            <div className="absolute top-0 bottom-32 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary/20 via-primary/50 to-primary/0 -z-10 hidden sm:block" />

            {/* Step 1: Pattern */}
            <motion.div variants={itemVariants} className="w-full sm:w-[85%] mb-6">
              <GlassCard className="p-5 border-white/10 bg-[#1A1635]/60 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <BrainCircuit className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary-foreground mb-1">Reasoning Pattern</h3>
                  <p className="text-white/70 text-sm">You added the numbers (4+3+2+1=10) instead of multiplying them, ignoring the return statement's operator.</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 text-primary/50 hidden sm:block"><ArrowDown className="w-5 h-5" /></motion.div>

            {/* Step 2: Assumption */}
            <motion.div variants={itemVariants} className="w-full sm:w-[85%] mb-6">
              <GlassCard className="p-5 border-amber-500/20 bg-amber-950/20 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-400 mb-1">Incorrect Assumption</h3>
                  <p className="text-amber-100/70 text-sm">You assumed recursion naturally implies addition or you lost track of the state being returned up the stack.</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 text-amber-500/50 hidden sm:block"><ArrowDown className="w-5 h-5" /></motion.div>

            {/* Step 3: Concept Gap */}
            <motion.div variants={itemVariants} className="w-full sm:w-[85%] mb-6">
              <GlassCard className="p-5 border-rose-500/20 bg-rose-950/20 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Activity className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-rose-400 mb-1">Concept Gap</h3>
                  <p className="text-rose-100/70 text-sm">Difficulty visualizing the unwinding phase of the stack where returned values are evaluated.</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 text-rose-500/50 hidden sm:block"><ArrowDown className="w-5 h-5" /></motion.div>

            {/* Step 4: Root Cause Card */}
            <motion.div variants={itemVariants} className="w-full mt-2">
              <GlassCard className="p-8 border-rose-500/40 bg-gradient-to-b from-[#1A1635] to-rose-950/30 relative overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.15)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Root Cause Identified
                    </h3>
                    <h2 className="text-3xl font-bold text-white">Call Stack</h2>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="text-right">
                      <span className="text-xs text-white/40 uppercase font-bold tracking-wider block">Mastery</span>
                      <span className="text-xl font-bold text-rose-400">31%</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-right">
                      <span className="text-xs text-white/40 uppercase font-bold tracking-wider block">Confidence</span>
                      <span className="text-xl font-bold text-primary-foreground">87%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#090812]/50 border border-white/5 rounded-xl p-6 relative">
                  <div className="absolute -left-px top-6 bottom-6 w-[2px] bg-rose-500/50" />
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                    You understand function calls perfectly (Mastery: 84%), but your answers suggest that you are not fully visualizing how function calls are stored and returned from the <strong className="text-rose-400">Call Stack</strong>. When a recursive function hits its base case, the stack unwinds and evaluates the operators at each step.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT PANEL: Evidence & Action */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Evidence & Action</h2>
          
          <div className="space-y-6 flex-1">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <GlassCard className="p-3 border-white/5 bg-white/5 flex flex-col justify-center items-center text-center">
                <History className="w-5 h-5 text-rose-400 mb-2" />
                <span className="text-xl font-bold text-white">4</span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Incorrect</span>
              </GlassCard>
              <GlassCard className="p-3 border-white/5 bg-white/5 flex flex-col justify-center items-center text-center">
                <Network className="w-5 h-5 text-primary mb-2" />
                <span className="text-xl font-bold text-white">2</span>
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Related Concepts</span>
              </GlassCard>
              <GlassCard className="p-3 border-white/5 bg-white/5 flex flex-col justify-center items-center text-center col-span-2">
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-5 h-5 text-rose-400" />
                  <div className="text-left">
                    <span className="text-sm font-bold text-white block">12% Recent Decline</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">In retention score</span>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Diagnostic Evidence Cards */}
            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Why we think this</h3>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5" />
                  <p className="text-xs text-white/60">Failed 3 consecutive questions on recursive unwinding phase.</p>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg p-3 flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                  <p className="text-xs text-white/60">Spent 4x longer than average calculating final returned values.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 mt-auto">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Recommended Action</h3>
              <Link href="/repair" className="block w-full mb-3">
                <Button variant="primary" className="w-full py-6 text-base font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 border-0">
                  <Wrench className="w-4 h-4 mr-2" />
                  Repair Call Stack (4 mins)
                </Button>
              </Link>
            </div>

            {/* Ask Learnova */}
            <div className="bg-[#090812]/80 border border-white/10 rounded-xl p-3 relative mt-6 shadow-inner">
              <div className="flex items-center gap-2 mb-2 px-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-white/60">Ask Learnova</span>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="I still don't get why it's not 10..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-3 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary/20 text-primary rounded flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
