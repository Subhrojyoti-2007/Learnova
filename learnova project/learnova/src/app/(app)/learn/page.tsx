"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Lock,
  Layers,
  Network,
  Binary,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const syllabus = [
  {
    id: 1,
    title: "Data Structures Basics",
    description: "Arrays, Linked Lists, and foundational memory concepts.",
    status: "mastered",
    icon: Layers,
    progress: 100
  },
  {
    id: 2,
    title: "Advanced Recursion",
    description: "Deep dive into the call stack, base cases, and state unwinding.",
    status: "in-progress",
    icon: Binary,
    progress: 60
  },
  {
    id: 3,
    title: "Graph Theory",
    description: "Nodes, edges, and complex traversal algorithms.",
    status: "locked",
    icon: Network,
    progress: 0
  }
];

export default function Learn() {
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
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden min-h-[calc(100vh-100px)]">
      
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <header className="mb-10 relative z-10 flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">Learning Hub</h1>
          <p className="text-white/50 text-lg">Continue your journey through the curriculum.</p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10 relative z-10"
      >
        {/* ============================================================== */}
        {/* HERO CARD: Continue Learning */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" fill="currentColor" /> Up Next
          </h2>
          <GlassCard className="p-8 border-primary/30 bg-gradient-to-r from-[#1A1635]/90 to-[#110E20]/90 shadow-[0_0_40px_rgba(124,58,237,0.2)] overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary shadow-[0_0_15px_rgba(124,58,237,1)]" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded uppercase tracking-widest">
                    Module 2
                  </span>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Est. 45 mins</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Advanced Recursion</h3>
                <p className="text-white/60 mb-6 max-w-xl">
                  You're currently mastering the call stack. Jump back into practice to solidify your understanding of state unwinding before moving to Graph Theory.
                </p>
                
                <div className="max-w-md">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                    <span className="text-primary">Progress</span>
                    <span className="text-white">60%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                    <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)]" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link href="/practice" tabIndex={-1}>
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all">
                    Resume <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>

            </div>
            
            {/* Background decorative icon */}
            <Binary className="w-64 h-64 absolute -right-10 -bottom-10 text-primary/[0.03] group-hover:text-primary/[0.05] transition-colors pointer-events-none transform -rotate-12" />
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* SYLLABUS GRID */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" /> Course Syllabus
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {syllabus.map((module) => (
              <GlassCard 
                key={module.id} 
                className={`p-6 flex flex-col h-full border-t-2 relative overflow-hidden transition-all duration-300
                  ${module.status === 'mastered' ? 'border-t-emerald-500 hover:bg-white/[0.02]' :
                    module.status === 'in-progress' ? 'border-t-primary shadow-[0_0_20px_rgba(124,58,237,0.1)] hover:bg-white/[0.02]' :
                    'border-t-white/10 opacity-70 hover:opacity-100 grayscale hover:grayscale-0'}
                `}
              >
                {/* Status Icon */}
                <div className="absolute top-4 right-4">
                  {module.status === 'mastered' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] rounded-full" />}
                  {module.status === 'in-progress' && (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                  {module.status === 'locked' && <Lock className="w-4 h-4 text-white/20" />}
                </div>

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6
                  ${module.status === 'mastered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    module.status === 'in-progress' ? 'bg-primary/10 text-primary border border-primary/20' :
                    'bg-white/5 text-white/20 border border-white/5'}
                `}>
                  <module.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-sm text-white/50 mb-6 flex-1">{module.description}</p>

                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-auto">
                  <div 
                    className={`h-full rounded-full ${module.status === 'mastered' ? 'bg-emerald-500' : 'bg-primary'}`} 
                    style={{ width: `${module.progress}%` }} 
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
