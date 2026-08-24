"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Wrench, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw,
  BookOpen,
  Target,
  ArrowRightCircle,
  Sparkles,
  XCircle
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

// Stack Animation Sequence Data
const STACK_SEQUENCE = [
  [], // 0
  ['main()'], // 1
  ['main()', 'factorial(3)'], // 2
  ['main()', 'factorial(3)', 'factorial(2)'], // 3
  ['main()', 'factorial(3)', 'factorial(2)', 'factorial(1)'], // 4
  ['main()', 'factorial(3)', 'factorial(2)'], // 5 (1 returns)
  ['main()', 'factorial(3)'], // 6 (2 returns)
  ['main()'], // 7 (3 returns)
  [] // 8 (main finishes)
];

const mockPracticeQuestions = [
  {
    text: "Which stack frame is the first to be destroyed (popped)?",
    options: ["The one that was pushed first", "The one that was pushed last", "They are all destroyed at the same time", "The main() function frame"],
    correct: 1
  },
  {
    text: "If factorial(5) is called, what happens when it reaches factorial(1)?",
    options: ["The stack collapses immediately", "factorial(1) returns to factorial(2)", "factorial(1) calls main()", "An infinite loop occurs"],
    correct: 1
  }
];

export default function RepairSession() {
  const [step, setStep] = useState(0); // 0: Understand, 1: Practice, 2: Verify
  
  // Call Stack Animator State
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Quick Check State (Step 0)
  const [quickCheckSelected, setQuickCheckSelected] = useState<number | null>(null);
  const quickCheckCorrect = 1; // "factorial(2) resumes execution"

  // Practice State (Step 1)
  const [practiceAnswers, setPracticeAnswers] = useState<number[]>([]);

  // Animator logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setFrameIndex((prev) => {
          if (prev >= STACK_SEQUENCE.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const resetStack = () => {
    setIsPlaying(false);
    setFrameIndex(0);
  };

  const currentStack = STACK_SEQUENCE[frameIndex];

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden min-h-screen">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="mb-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Repair: Call Stack</h1>
              <p className="text-white/50 text-sm mt-1">Let's fix the smallest gap causing the problem.</p>
            </div>
          </div>
        </div>

        {/* Top Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest px-2">
            <span className={step >= 0 ? "text-primary drop-shadow-[0_0_5px_rgba(124,58,237,0.8)] transition-all" : ""}>Understand</span>
            <span className={step >= 1 ? "text-primary drop-shadow-[0_0_5px_rgba(124,58,237,0.8)] transition-all" : ""}>Practice</span>
            <span className={step >= 2 ? "text-primary drop-shadow-[0_0_5px_rgba(124,58,237,0.8)] transition-all" : ""}>Verify</span>
          </div>
          <div className="w-full bg-[#151226] rounded-full h-1.5 flex overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.8)]"
              initial={{ width: '33.33%' }}
              animate={{ width: `${((step + 1) / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        
        {/* ============================================================== */}
        {/* PHASE 1: UNDERSTAND */}
        {/* ============================================================== */}
        {step === 0 && (
          <motion.div
            key="understand"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="space-y-8 relative z-10"
          >
            {/* Concept Card */}
            <GlassCard className="p-6 md:p-8 border-white/10">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Concept in one minute
              </h2>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">
                A <strong className="text-primary-foreground">Call Stack</strong> tracks exactly where a program is in its execution. 
                When a recursive function calls itself, it must wait for the new call to finish before it can continue. 
                It does this by pushing a new "frame" onto the stack. When the base case is hit, the stack unwinds, popping frames off one by one, 
                returning their values back down the chain.
              </p>
            </GlassCard>

            {/* Visual Animator */}
            <GlassCard className="p-6 md:p-8 border-white/10 bg-gradient-to-br from-[#1A1635]/80 to-[#110E20]/80 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                
                {/* Code visual */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Execution Code</h3>
                  <pre className="bg-[#090812] border border-white/10 p-4 rounded-xl text-sm font-mono text-blue-300">
                    <code>{`function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

main() {
  factorial(3);
}`}</code>
                  </pre>
                  
                  {/* Controls */}
                  <div className="flex items-center gap-3 mt-6">
                    <Button 
                      variant="primary" 
                      onClick={togglePlay}
                      disabled={frameIndex >= STACK_SEQUENCE.length - 1}
                      className="w-12 h-12 !p-0 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={resetStack}
                      className="h-12 px-4 rounded-xl border border-white/10 hover:bg-white/5"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                  </div>
                </div>

                {/* Stack Visual */}
                <div className="w-full md:w-1/2 h-[300px] flex flex-col justify-end items-center bg-[#090812]/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-4 left-4 text-xs font-bold text-white/30 uppercase tracking-widest">Memory Stack</div>
                  
                  <div className="flex flex-col-reverse items-center justify-start w-full gap-2 relative z-10">
                    <AnimatePresence initial={false}>
                      {currentStack.map((frame, index) => (
                        <motion.div
                          key={`${frame}-${index}`} // unique key for AnimatePresence
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className={`w-[80%] py-3 px-4 rounded-lg font-mono text-center text-sm font-bold border shadow-lg
                            ${index === currentStack.length - 1 
                              ? 'bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]' 
                              : 'bg-white/5 border-white/10 text-white/50'
                            }`}
                        >
                          {frame}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Empty stack state */}
                  {currentStack.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 font-mono text-sm">Stack is empty</span>
                    </div>
                  )}
                  
                  {/* Stack Base UI */}
                  <div className="w-[90%] h-2 bg-white/10 rounded-full mt-2" />
                </div>

              </div>
            </GlassCard>

            {/* Quick Check */}
            <GlassCard className="p-6 md:p-8 border-white/10">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" /> Quick Check
              </h3>
              <p className="text-lg font-medium text-white mb-6">What happens to <code>factorial(2)</code> immediately after <code>factorial(1)</code> returns?</p>
              
              <div className="space-y-3">
                {[
                  "It is destroyed immediately", 
                  "It resumes execution and receives the returned value", 
                  "It calls main() again"
                ].map((opt, idx) => {
                  const isSelected = quickCheckSelected === idx;
                  const isCorrect = idx === quickCheckCorrect;
                  const showFeedback = quickCheckSelected !== null;

                  return (
                    <button 
                      key={idx}
                      disabled={showFeedback && isCorrect}
                      onClick={() => setQuickCheckSelected(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 font-medium flex items-center justify-between
                        ${showFeedback && isCorrect && isSelected ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : ''}
                        ${showFeedback && !isCorrect && isSelected ? 'border-rose-500/50 bg-rose-500/10 text-rose-400' : ''}
                        ${(!showFeedback || (!isSelected && !isCorrect)) ? 'border-white/5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white' : ''}
                        ${showFeedback && isCorrect && !isSelected ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400/50 opacity-50' : ''}
                      `}
                    >
                      <span>{opt}</span>
                      {showFeedback && isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {quickCheckSelected === quickCheckCorrect && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-end"
                >
                  <Button onClick={() => setStep(1)} className="px-8 shadow-[0_0_20px_rgba(124,58,237,0.3)] gap-2">
                    Continue to Practice <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </GlassCard>

          </motion.div>
        )}

        {/* ============================================================== */}
        {/* PHASE 2: PRACTICE */}
        {/* ============================================================== */}
        {step === 1 && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="space-y-6 relative z-10"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Practice Phase</h2>
              <p className="text-white/50 text-sm">Let's solidify that understanding.</p>
            </div>

            {mockPracticeQuestions.map((q, qIndex) => (
              <GlassCard key={qIndex} className="p-6 md:p-8 border-white/10 bg-gradient-to-br from-[#1A1635]/50 to-[#110E20]/50">
                <p className="text-lg font-medium text-white mb-6">
                  <span className="text-primary font-bold mr-2">Q{qIndex + 1}.</span> {q.text}
                </p>
                <div className="space-y-3">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = practiceAnswers[qIndex] === optIndex;
                    const hasAnswered = practiceAnswers[qIndex] !== undefined;
                    const isCorrect = optIndex === q.correct;

                    return (
                      <button 
                        key={optIndex}
                        disabled={hasAnswered}
                        onClick={() => {
                          const newAnswers = [...practiceAnswers];
                          newAnswers[qIndex] = optIndex;
                          setPracticeAnswers(newAnswers);
                        }}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 font-medium flex items-center justify-between
                          ${hasAnswered && isCorrect ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : ''}
                          ${hasAnswered && !isCorrect && isSelected ? 'border-rose-500/50 bg-rose-500/10 text-rose-400 line-through decoration-rose-500/50' : ''}
                          ${(!hasAnswered) ? 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white' : ''}
                          ${hasAnswered && !isCorrect && !isSelected ? 'border-white/5 bg-[#090812] text-white/20 opacity-50' : ''}
                        `}
                      >
                        <span>{opt}</span>
                        {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                      </button>
                    )
                  })}
                </div>
              </GlassCard>
            ))}

            {practiceAnswers.length === mockPracticeQuestions.length && practiceAnswers.every((a, i) => a === mockPracticeQuestions[i].correct) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="pt-6 flex justify-end"
              >
                <Button size="lg" onClick={() => setStep(2)} className="px-8 shadow-[0_0_20px_rgba(124,58,237,0.3)] gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
                  I'm ready to verify <ArrowRightCircle className="w-5 h-5" />
                </Button>
              </motion.div>
            )}

            {practiceAnswers.length === mockPracticeQuestions.length && !practiceAnswers.every((a, i) => a === mockPracticeQuestions[i].correct) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="pt-6"
              >
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-sm flex items-center justify-between">
                  <span>Review the concepts in Phase 1 and try again.</span>
                  <Button variant="ghost" size="sm" onClick={() => setPracticeAnswers([])} className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/20">
                    Reset Practice
                  </Button>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}

        {/* ============================================================== */}
        {/* PHASE 3: VERIFY */}
        {/* ============================================================== */}
        {step === 2 && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <GlassCard className="p-10 md:p-14 text-center border-emerald-500/30 bg-gradient-to-b from-[#110E20]/90 to-emerald-950/20 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
              
              <div className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                <Sparkles className="w-10 h-10 relative z-10" />
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Ready to verify?</h2>
              <p className="text-white/60 text-lg mb-10 max-w-sm mx-auto">
                You've completed the repair session. Let's make sure it sticks with a quick diagnostic retest.
              </p>

              <div className="bg-[#090812]/50 p-6 rounded-2xl border border-white/5 mb-10 flex flex-col items-center">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Projected Mastery Increase</span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-white/30 line-through decoration-rose-500/50">31%</span>
                  <ArrowRight className="w-5 h-5 text-white/20" />
                  <span className="text-4xl font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">85%</span>
                </div>
              </div>

              <Link href="/diagnose" className="block w-full">
                <Button size="lg" className="w-full py-6 text-lg font-bold shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)]">
                  Take Retest <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
