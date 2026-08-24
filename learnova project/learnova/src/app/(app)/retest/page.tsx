"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, BrainCircuit, ArrowUpRight, Flame, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const mockRetestQuestions = [
  {
    id: 1,
    text: "When a recursive function finishes its base case, what happens next?",
    options: ["The program terminates immediately.", "It returns to the previous stack frame that called it.", "It creates a new memory thread.", "It resets all variables to 0."],
    correct: 1
  },
  {
    id: 2,
    text: "In the call stack, which function call evaluates its return statement first?",
    options: ["The first function that was called (bottom of stack).", "The most recently called function (top of stack).", "They all evaluate simultaneously.", "The function with the largest payload."],
    correct: 1
  },
  {
    id: 3,
    text: "Why does an infinite recursive loop cause a 'Stack Overflow'?",
    options: ["Because the CPU gets too hot.", "Because each call allocates a new stack frame until memory runs out.", "Because variables overwrite the global state.", "Because the operating system intentionally crashes it."],
    correct: 1
  }
];

export default function RetestSession() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Animation values for the circular progress (31% to 79%)
  const startPercent = 31;
  const targetPercent = 79;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  const startOffset = circumference - (startPercent / 100) * circumference;
  const targetOffset = circumference - (targetPercent / 100) * circumference;

  const handleNext = () => {
    if (currentStep < mockRetestQuestions.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative min-h-[calc(100vh-100px)] flex flex-col justify-center">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* ============================================================== */}
        {/* PHASE 1: THE TEST */}
        {/* ============================================================== */}
        {!isComplete ? (
          <motion.div
            key="test"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            className="w-full relative z-10"
          >
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Let's see what changed.</h1>
                <p className="text-white/50 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Concept: <span className="text-white">Call Stack</span>
                </p>
              </div>

              <div className="flex items-center gap-6 bg-[#090812]/50 border border-white/5 p-4 rounded-2xl">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1">Before Repair</span>
                  <span className="text-xl font-bold text-white/40">31%</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">After Repair</span>
                  <span className="text-xl font-bold text-primary animate-pulse">pending</span>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <GlassCard className="p-8 md:p-12 border-primary/20 bg-gradient-to-br from-[#1A1635]/80 to-[#110E20]/80 shadow-2xl relative overflow-visible">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="flex justify-between items-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 text-primary-foreground border border-primary/20 text-xs font-bold uppercase tracking-wider">
                  Question {currentStep + 1} of {mockRetestQuestions.length}
                </span>
              </div>

              <h2 className="text-2xl font-medium text-white mb-10 leading-relaxed">
                {mockRetestQuestions[currentStep].text}
              </h2>

              <div className="space-y-4 mb-10">
                {mockRetestQuestions[currentStep].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const labels = ['A', 'B', 'C', 'D'];
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 font-medium group flex items-center gap-4 relative overflow-hidden
                        ${isSelected 
                          ? 'border-primary/50 bg-primary/10 shadow-[0_0_20px_rgba(124,58,237,0.15)] text-white' 
                          : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white'
                        }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-500 origin-left
                        ${isSelected ? 'scale-x-100' : 'scale-x-0'}
                      `} />
                      
                      <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors flex-shrink-0
                        ${isSelected ? 'bg-primary text-white border border-primary' : 'bg-[#0D0B16] text-white/50 group-hover:text-white group-hover:bg-white/10 border border-white/10'}
                      `}>
                        {labels[idx]}
                      </div>
                      
                      <span className="relative z-10 flex-1">{option}</span>
                      
                      <div className={`relative z-10 w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                        ${isSelected ? 'border-primary bg-primary/20' : 'border-white/20 group-hover:border-white/40'}
                      `}>
                        <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-transform duration-300
                          ${isSelected ? 'scale-100' : 'scale-0'}
                        `} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-6 border-t border-white/5">
                <Button 
                  variant="primary"
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="gap-2 px-8"
                >
                  {currentStep === mockRetestQuestions.length - 1 ? 'Analyze Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ) : (

        /* ============================================================== */
        /* PHASE 2: RESULTS (THE "WOW" MOMENT) */
        /* ============================================================== */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="w-full relative z-10 flex flex-col items-center text-center"
          >
            {/* Title */}
            <div className="mb-10">
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <Sparkles className="w-4 h-4" /> Gap Repaired
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">Mastery Upgraded</h1>
              <p className="text-white/50 text-lg">Your conceptual model of the Call Stack is now solid.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-5xl mb-12">
              
              {/* Massive Animated Circular Progress */}
              <GlassCard className="lg:col-span-5 p-10 border-emerald-500/30 bg-gradient-to-b from-[#110E20]/90 to-emerald-950/20 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
                
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-8">Call Stack Mastery</h3>
                
                <div className="relative w-48 h-48 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r={radius} className="stroke-[#151226]" strokeWidth="12" fill="none" />
                    <motion.circle 
                      cx="70" cy="70" r={radius} 
                      className="stroke-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                      strokeWidth="12" fill="none" 
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: startOffset }}
                      animate={{ strokeDashoffset: targetOffset }}
                      transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      className="text-5xl font-bold text-white tracking-tighter"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 3 }}
                    >
                      79<span className="text-2xl text-white/50">%</span>
                    </motion.span>
                    <motion.span 
                      className="text-xs font-bold text-emerald-400 uppercase tracking-widest mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 3 }}
                    >
                      Mastered
                    </motion.span>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3.5 }}
                  className="flex items-center gap-2 text-white/40 text-sm font-semibold"
                >
                  Started at <span className="line-through decoration-rose-500/50 text-white/20">31%</span>
                </motion.div>
              </GlassCard>

              {/* Stats & Compare */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Horizontal Stats Strip */}
                <div className="grid grid-cols-3 gap-4">
                  <GlassCard className="p-4 border-white/5 flex flex-col items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
                    <span className="text-2xl font-bold text-white">84%</span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Accuracy</span>
                  </GlassCard>
                  <GlassCard className="p-4 border-white/5 flex flex-col items-center justify-center">
                    <BrainCircuit className="w-5 h-5 text-primary mb-2" />
                    <span className="text-2xl font-bold text-white">81%</span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Confidence</span>
                  </GlassCard>
                  <GlassCard className="p-4 border-white/5 flex flex-col items-center justify-center">
                    <Flame className="w-5 h-5 text-amber-400 mb-2" />
                    <span className="text-2xl font-bold text-white">72%</span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Retention</span>
                  </GlassCard>
                </div>

                {/* Before / After Comparison */}
                <GlassCard className="p-6 border-white/5 flex-1 flex flex-col justify-center">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 text-left">Cascading Concept Impact</h3>
                  
                  <div className="grid grid-cols-2 gap-8 relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
                    
                    {/* Before */}
                    <div>
                      <span className="text-xs font-bold text-white/30 uppercase tracking-widest block mb-4">Before</span>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-white/60">Call Stack</span>
                          <span className="text-sm font-bold text-rose-400">31%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-white/60">Recursion</span>
                          <span className="text-sm font-bold text-orange-400">42%</span>
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-4">After</span>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-white">Call Stack</span>
                          <span className="text-sm font-bold text-emerald-400 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> 79%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-white">Recursion</span>
                          <span className="text-sm font-bold text-emerald-400 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> 83%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

              </div>
            </div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 4 }}
              className="flex flex-col items-center"
            >
              <p className="text-white/60 font-medium mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Your Knowledge Galaxy has been updated.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link href="/galaxy" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-10 py-6 text-lg font-bold shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]">
                    View Knowledge Galaxy <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/overview" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg border border-white/10 hover:bg-white/5">
                    Continue Learning
                  </Button>
                </Link>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
