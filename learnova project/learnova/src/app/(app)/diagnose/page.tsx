"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, BrainCircuit, Activity, Network, CheckCircle2, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

type ViewState = 'intro' | 'questions' | 'results';

const mockQuestions = [
  {
    id: 1,
    concept: "Functions",
    text: "What is the primary purpose of a function parameter?",
    options: ["To declare a new variable inside the function scope.", "To pass data into a function for it to use.", "To return a value from the function.", "To stop the function's execution."]
  },
  {
    id: 2,
    concept: "Arrays",
    text: "Which of the following operations is generally O(1) for an array?",
    options: ["Accessing an element by index.", "Inserting an element at the beginning.", "Searching for a specific value.", "Deleting the first element."]
  },
  {
    id: 3,
    concept: "Pointers",
    text: "What does a pointer variable store?",
    options: ["The actual data value.", "The memory address of another variable.", "A copy of a variable.", "A reference to a function's return value."]
  },
  {
    id: 4,
    concept: "Recursion",
    text: "Which statement best describes what happens when a recursive function calls itself?",
    options: ["A new stack frame is created and pushed onto the call stack.", "The previous stack frame is immediately deleted.", "The function executes in a parallel thread.", "The compiler unwinds the loop automatically."]
  },
  {
    id: 5,
    concept: "Call Stack",
    text: "What happens if a recursive function has no base case?",
    options: ["It returns null.", "It causes a Stack Overflow error.", "It runs forever without consuming memory.", "The compiler catches the error before running."]
  },
];

export default function DiagnosticTest() {
  const [view, setView] = useState<ViewState>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // We'll just map the 5 mock questions but pretend there are 10 for the UI text if we wanted, 
  // but it's cleaner to just show 5 of 5 for actual progress.
  const totalQuestions = mockQuestions.length;

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(c => c + 1);
      setSelectedOption(null);
    } else {
      setView('results');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[calc(100vh-100px)] relative">
      
      {/* Ambient background glow */}
      <div className="absolute top-[20%] right-[-20%] w-[400px] h-[400px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-20%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* VIEW 1: INTRO */}
        {view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full text-center"
          >
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20 relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
              <BrainCircuit className="w-10 h-10 text-primary relative z-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Let's understand how you think.</h1>
            <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto">
              This short assessment helps Learnova map your current knowledge. It's not a test—it's a friendly knowledge scan.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
              <GlassCard className="px-6 py-4 flex items-center gap-4 bg-white/5 border-white/10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Estimated Time</p>
                  <p className="text-white font-medium">5 minutes</p>
                </div>
              </GlassCard>
              
              <GlassCard className="px-6 py-4 flex items-center gap-4 bg-white/5 border-white/10">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Questions</p>
                  <p className="text-white font-medium">10 Questions</p>
                </div>
              </GlassCard>
            </div>

            <Button 
              size="lg" 
              onClick={() => setView('questions')}
              className="text-lg px-12 py-6 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all gap-3"
            >
              Begin Scan <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {/* VIEW 2: QUESTIONS */}
        {view === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="flex flex-col mb-8">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-white tracking-tight">Knowledge Scan</h2>
                {/* User requested "Question 4 of 10" text */}
                <span className="text-sm font-semibold text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  Question {currentStep + 1} of 10
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#151226] rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.8)]" 
                  initial={{ width: `${(currentStep / 10) * 100}%` }}
                  animate={{ width: `${((currentStep + 1) / 10) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            <GlassCard className="p-8 md:p-10 border-white/10 bg-gradient-to-br from-[#1A1635]/90 to-[#110E20]/90 relative overflow-visible shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
                  {mockQuestions[currentStep].text}
                </h3>
              </div>

              <div className="space-y-4">
                {mockQuestions[currentStep].options.map((option, idx) => {
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
                      {/* Selection background sweep */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-500 origin-left
                        ${isSelected ? 'scale-x-100' : 'scale-x-0'}
                      `} />
                      
                      <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors
                        ${isSelected ? 'bg-primary text-white' : 'bg-[#0D0B16] text-white/50 group-hover:text-white group-hover:bg-white/10 border border-white/10'}
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

              <div className="mt-10 flex justify-between items-center pt-6 border-t border-white/5">
                <Button 
                  variant="ghost" 
                  onClick={handlePrev} 
                  disabled={currentStep === 0}
                  className="gap-2 text-white/50 hover:text-white disabled:opacity-20"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </Button>
                
                <Button 
                  variant="primary"
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className="gap-2 px-8"
                >
                  {currentStep === totalQuestions - 1 ? 'Complete Scan' : 'Next'} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* VIEW 3: RESULTS */}
        {view === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <Sparkles className="w-8 h-8 text-emerald-400 relative z-10" />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Knowledge Scan Complete</h1>
              <p className="text-white/50 text-lg">We've mapped your conceptual understanding.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
              
              {/* Overall Readiness */}
              <GlassCard className="md:col-span-5 p-8 flex flex-col items-center justify-center text-center border-white/10 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 relative z-10">Overall Readiness</h3>
                
                <div className="relative w-40 h-40 mb-2 z-10">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="stroke-[#151226]" strokeWidth="8" fill="none" />
                    <motion.circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-primary drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]" 
                      strokeWidth="8" fill="none" 
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - 0.68)}` }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white tracking-tighter">68<span className="text-2xl text-white/50">%</span></span>
                  </div>
                </div>
              </GlassCard>

              {/* Concept Breakdown */}
              <GlassCard className="md:col-span-7 p-8 border-white/10 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Concept Breakdown</h3>
                
                <div className="space-y-4">
                  {[
                    { name: 'Arrays', score: 91, color: 'emerald' },
                    { name: 'Functions', score: 84, color: 'emerald' },
                    { name: 'Pointers', score: 57, color: 'amber' },
                    { name: 'Recursion', score: 43, color: 'orange' },
                    { name: 'Call Stack', score: 29, color: 'rose' },
                  ].map((concept, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-24 text-sm font-medium text-white/80">{concept.name}</span>
                      <div className="flex-1 h-2 bg-[#151226] rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          className={`h-full rounded-full
                            ${concept.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : ''}
                            ${concept.color === 'amber' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''}
                            ${concept.color === 'orange' ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : ''}
                            ${concept.color === 'rose' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : ''}
                          `}
                          initial={{ width: 0 }}
                          animate={{ width: `${concept.score}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm font-bold text-white">{concept.score}%</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Gap Highlight */}
            <GlassCard className="p-6 mb-10 border-rose-500/20 bg-rose-950/20 relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1 h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)]" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-rose-400" />
                    Learnova found 3 concepts that may need attention.
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['1. Call Stack', '2. Recursion', '3. Pointers'].map(gap => (
                      <span key={gap} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-md text-rose-300 text-sm font-medium">
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/overview" className="w-full sm:w-auto">
                <Button size="lg" className="w-full px-8 py-6 rounded-xl text-base shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  Start Learning Path
                </Button>
              </Link>
              <Link href="/galaxy" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full px-8 py-6 rounded-xl text-base gap-2 border border-white/10 hover:bg-white/5">
                  View My Knowledge Galaxy <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
