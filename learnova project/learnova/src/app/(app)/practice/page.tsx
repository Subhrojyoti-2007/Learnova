"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight, ArrowLeft, BrainCircuit, Code2, Clock, Target, SkipForward } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const mockQuestion = {
  concept: "Recursion",
  difficulty: "Intermediate",
  estimatedTime: "2 mins",
  text: "What will this recursive function return?",
  code: `function mystery(n) {
  if (n === 0) return 1;
  return n * mystery(n - 1);
}

console.log(mystery(4));`,
  options: [
    "10",
    "24",
    "16",
    "An infinite loop"
  ],
  correctAnswer: 1 // index 1 is "24"
};

export default function Practice() {
  const [questions, setQuestions] = useState<any[]>([mockQuestion]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/user/overview')
      .then(res => res.json())
      .then(data => {
        if (data?.user?.currentSyllabusData?.practice?.length > 0) {
          setQuestions(data.user.currentSyllabusData.practice);
        }
      })
      .catch(console.error);
  }, []);

  const currentQuestion = questions[currentIndex] || mockQuestion;

  const isWrong = hasSubmitted && selectedOption !== currentQuestion.correctAnswer;
  const isCorrect = hasSubmitted && selectedOption === currentQuestion.correctAnswer;

  const handleSubmit = () => {
    setHasSubmitted(true);
  };

  const handleReset = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    }
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Practice</h1>
          <div className="flex items-center gap-4 text-sm font-medium text-white/50">
            <span className="flex items-center gap-1.5 text-white/70">
              <Code2 className="w-4 h-4 text-primary" /> Concept: {currentQuestion.concept}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-amber-400">Difficulty: {currentQuestion.difficulty}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white/60 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            Question {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </header>

      {/* Main Card */}
      <GlassCard className="p-6 sm:p-10 border-white/10 bg-gradient-to-br from-[#1A1635]/90 to-[#110E20]/90 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" /> {currentQuestion.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 text-white/50 border border-white/10 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" /> {currentQuestion.estimatedTime || "1 min"}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-medium text-white mb-6 leading-relaxed">
          {currentQuestion.text}
        </h2>

        {/* Premium Code Block */}
        {currentQuestion.code && (
        <div className="relative mb-8 group rounded-xl overflow-hidden border border-white/10 bg-[#090812]">
          <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          </div>
          <pre className="p-6 pt-12 text-sm sm:text-base font-mono leading-loose overflow-x-auto text-blue-300">
            <code>
{currentQuestion.code.split('\n').map((line: string, i: number) => (
  <div key={i} className="table-row">
    <span className="table-cell text-white/20 select-none pr-4 text-right w-8">{i + 1}</span>
    <span className="table-cell">
      <span dangerouslySetInnerHTML={{ 
        __html: line
          .replace(/function|return|if/g, '<span class="text-primary">$&</span>')
          .replace(/mystery|console\.log/g, '<span class="text-blue-400">$&</span>')
          .replace(/\b\d+\b/g, '<span class="text-amber-400">$&</span>') 
      }} />
    </span>
  </div>
))}
            </code>
          </pre>
        </div>
        )}

        {/* Answer Options */}
        <div className="space-y-4 mb-10">
          {(currentQuestion.options || ["True", "False", "Not specified", "All of the above"]).map((option: string, idx: number) => {
            const isSelected = selectedOption === idx;
            const labels = ['A', 'B', 'C', 'D'];
            
            let optionState = "default";
            if (hasSubmitted) {
              if (idx === currentQuestion.correctAnswer) optionState = "correct";
              else if (isSelected) optionState = "incorrect";
              else optionState = "disabled";
            } else if (isSelected) {
              optionState = "selected";
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 font-medium group flex items-center gap-4 relative overflow-hidden
                  ${optionState === 'default' ? 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white' : ''}
                  ${optionState === 'selected' ? 'border-primary/50 bg-primary/10 shadow-[0_0_20px_rgba(124,58,237,0.15)] text-white' : ''}
                  ${optionState === 'correct' ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] text-emerald-400' : ''}
                  ${optionState === 'incorrect' ? 'border-rose-500/50 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.15)] text-rose-400' : ''}
                  ${optionState === 'disabled' ? 'border-white/5 bg-[#090812] text-white/20' : ''}
                `}
              >
                {/* Selection background sweep */}
                {!hasSubmitted && (
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-500 origin-left
                    ${isSelected ? 'scale-x-100' : 'scale-x-0'}
                  `} />
                )}
                
                <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors flex-shrink-0
                  ${optionState === 'default' ? 'bg-[#0D0B16] text-white/50 group-hover:text-white group-hover:bg-white/10 border border-white/10' : ''}
                  ${optionState === 'selected' ? 'bg-primary text-white border border-primary' : ''}
                  ${optionState === 'correct' ? 'bg-emerald-500 text-[#090812] border border-emerald-500' : ''}
                  ${optionState === 'incorrect' ? 'bg-rose-500 text-[#090812] border border-rose-500' : ''}
                  ${optionState === 'disabled' ? 'bg-black text-white/20 border border-white/5' : ''}
                `}>
                  {optionState === 'correct' ? <CheckCircle2 className="w-5 h-5" /> : 
                   optionState === 'incorrect' ? <XCircle className="w-5 h-5" /> : 
                   labels[idx]}
                </div>
                
                <span className="relative z-10 flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        {!hasSubmitted && (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
            <Button variant="ghost" className="gap-2 text-white/50 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="ghost" className="gap-2 text-white/50 hover:text-white flex-1 sm:flex-none">
                Skip <SkipForward className="w-4 h-4" />
              </Button>
              <Button 
                variant="primary"
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="gap-2 px-8 flex-1 sm:flex-none"
              >
                Submit Answer <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Post Submission States */}
      <AnimatePresence mode="wait">
        {isWrong && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card !bg-rose-950/20 p-6 sm:p-8 border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)]" />
            <div>
              <h3 className="text-xl font-bold text-rose-400 mb-1">Something doesn't quite match.</h3>
              <p className="text-rose-200/60 text-sm">Learnova noticed a gap in evaluating recursive base cases.</p>
            </div>
            
            <Link href="/debugger" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white gap-2 group shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <BrainCircuit className="w-5 h-5" />
                Find Why
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        )}

        {isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card !bg-emerald-950/20 p-6 sm:p-8 border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <CheckCircle2 className="w-6 h-6 relative z-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-400">Nailed it!</h3>
                <p className="text-emerald-200/60 text-sm">Your understanding of call stacks is solid.</p>
              </div>
            </div>
            <Button 
              variant="glass"
              onClick={handleReset}
              className="w-full sm:w-auto gap-2 group"
            >
              Next Question <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
