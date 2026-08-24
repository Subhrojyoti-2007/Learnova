"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Trophy, 
  Flame, 
  BrainCircuit, 
  Target,
  Clock,
  BarChart,
  BookOpen,
  Award,
  Star,
  CheckCircle2,
  Zap,
  Loader2
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState } from "react";

const achievements = [
  { title: "First Knowledge Gap Repaired", icon: WrenchIcon, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { title: "7 Day Streak", icon: Flame, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  { title: "Recursion Master", icon: Zap, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30" },
  { title: "10 Concepts Mastered", icon: Trophy, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" }
];

function WrenchIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default function Profile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/user/overview');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (loading) {
    return (
      <div className="flex-1 w-full h-full flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 w-full p-6 md:p-10 relative z-10">
        <p className="text-white">Error loading profile. Please try again later.</p>
      </div>
    );
  }

  const { user, progress } = data;

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden min-h-[calc(100vh-100px)]">
      
      {/* Background Ambience */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <header className="mb-10 relative z-10 flex items-center gap-3">
        <User className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Profile</h1>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 relative z-10"
      >
        {/* ============================================================== */}
        {/* HERO CARD: User Info & Top Stats */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-8 border-primary/20 bg-gradient-to-r from-[#1A1635]/80 to-[#110E20]/80 shadow-[0_0_40px_rgba(124,58,237,0.15)] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Avatar & Name */}
              <div className="flex flex-col items-center md:items-start">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-blue-600 p-1 shadow-[0_0_30px_rgba(124,58,237,0.4)] mb-4 relative">
                  <div className="w-full h-full bg-[#090812] rounded-full flex items-center justify-center overflow-hidden border-4 border-[#110E20]">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || 'User'}&backgroundColor=transparent`} alt={user?.name} className="w-full h-full object-cover opacity-90" />
                  </div>
                  <div className="absolute bottom-0 right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-[#110E20]" />
                </div>
                <h2 className="text-3xl font-bold text-white">{user?.name || 'Learner'}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                  <span className="text-sm font-medium text-white/70">{user?.fieldOfStudy || 'Explorer'}</span>
                </div>
              </div>

              {/* Top Stats */}
              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 md:mt-4">
                <div className="bg-[#090812]/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <BrainCircuit className="w-6 h-6 text-primary mb-2" />
                  <span className="text-3xl font-bold text-white">{progress?.overallMastery || 0}%</span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Overall Mastery</span>
                </div>
                
                <div className="bg-[#090812]/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <Flame className="w-6 h-6 text-orange-400 mb-2" />
                  <span className="text-3xl font-bold text-white">{progress?.learningStreakDays || 0}<span className="text-lg text-white/50"> days</span></span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Current Streak</span>
                </div>
                
                <div className="bg-[#090812]/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-2" />
                  <span className="text-3xl font-bold text-white">{progress?.conceptsMastered || 0}</span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Concepts Mastered</span>
                </div>
              </div>

            </div>
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* LEARNING DETAILS GRID */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-5 border-white/5 flex flex-col">
            <Target className="w-5 h-5 text-rose-400 mb-3" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Learning Goals</span>
            <span className="text-sm font-medium text-white">{user?.learningGoals || 'Not specified'}</span>
          </GlassCard>
          
          <GlassCard className="p-5 border-white/5 flex flex-col">
            <Clock className="w-5 h-5 text-blue-400 mb-3" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Institution</span>
            <span className="text-sm font-medium text-white truncate" title={user?.institution}>{user?.institution || 'Not specified'}</span>
          </GlassCard>

          <GlassCard className="p-5 border-white/5 flex flex-col">
            <BarChart className="w-5 h-5 text-amber-400 mb-3" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Grade Level</span>
            <span className="text-sm font-medium text-white">{user?.gradeLevel || 'Not specified'}</span>
          </GlassCard>

          <GlassCard className="p-5 border-white/5 flex flex-col">
            <BookOpen className="w-5 h-5 text-emerald-400 mb-3" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Field of Study</span>
            <span className="text-sm font-medium text-white">{user?.fieldOfStudy || 'Not specified'}</span>
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* ACHIEVEMENTS */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-amber-400" /> Recent Achievements
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach, i) => (
              <GlassCard key={i} className={`p-4 border flex items-center gap-4 ${ach.border} hover:bg-white/[0.02] transition-colors`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${ach.bg} ${ach.color}`}>
                  <ach.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white/90">{ach.title}</h4>
                  <span className="text-xs text-white/40 font-medium">Unlocked recently</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
