"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, ScanSearch, Wrench, RefreshCw, Trophy, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const loopSteps = [
    { icon: BookOpen, title: "Learn", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: ScanSearch, title: "Test", color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { icon: BrainCircuit, title: "Diagnose", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: Wrench, title: "Repair", color: "text-rose-400", bg: "bg-rose-500/10" },
    { icon: RefreshCw, title: "Retest", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Trophy, title: "Master", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="flex-1 w-full flex flex-col relative overflow-hidden bg-[#090812]">
      {/* Premium Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 z-10">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-4xl w-full text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary-foreground text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Meet Learnova
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            The Ultimate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] to-[#8B5CF6]">
              Learning Intelligence OS
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Don't just learn what you got wrong. Understand why. Learnova traces your mistakes back to the root cause and provides targeted micro-repairs.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto text-lg gap-2 group">
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="glass" size="lg" className="w-full sm:w-auto text-lg">
                Create Free Account
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full max-w-5xl mx-auto">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-8">The Core Loop</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {loopSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <GlassCard key={idx} className="p-4 flex flex-col items-center justify-center text-center group hover:bg-[#1A1635] transition-colors cursor-default">
                    <div className={`w-12 h-12 rounded-full ${step.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <span className="font-semibold text-white/80">{step.title}</span>
                  </GlassCard>
                )
              })}
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
