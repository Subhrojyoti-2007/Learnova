"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon,
  Moon,
  Sun,
  Monitor,
  Bell,
  Brain,
  Target,
  CalendarDays,
  Gauge
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// Helper for localStorage
const getSavedSettings = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('learnova_settings');
    if (saved) return JSON.parse(saved);
  }
  return {
    appearance: 'Dark',
    notifications: {
      dailyReminder: true,
      retentionReminders: true,
      progressUpdates: false
    },
    learning: {
      difficulty: 'Intermediate',
      dailyGoal: '45 mins',
      practiceFrequency: 'Every day'
    }
  };
};

export default function Settings() {
  const [settings, setSettings] = useState(getSavedSettings());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('learnova_settings', JSON.stringify(settings));
    }
  }, [settings, isMounted]);

  const updateNestedSetting = (category: 'notifications' | 'learning', key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

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

  // Prevent hydration mismatch on initial render with localStorage
  if (!isMounted) return null;

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative overflow-x-hidden min-h-[calc(100vh-100px)]">
      
      {/* Page Header */}
      <header className="mb-10 flex items-center gap-3 relative z-10">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Settings</h1>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 relative z-10"
      >
        
        {/* ============================================================== */}
        {/* APPEARANCE */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Appearance</h2>
          <GlassCard className="p-6 border-white/5">
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Dark', icon: Moon },
                { name: 'Light', icon: Sun },
                { name: 'System', icon: Monitor }
              ].map((mode) => (
                <button
                  key={mode.name}
                  onClick={() => setSettings({ ...settings, appearance: mode.name })}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200
                    ${settings.appearance === mode.name 
                      ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.2)]' 
                      : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
                    }`}
                >
                  <mode.icon className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">{mode.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Note: Learnova is optimized for the Dark premium aesthetic. Changing modes currently only saves your preference locally.
            </p>
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* NOTIFICATIONS */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Notifications</h2>
          <GlassCard className="p-0 border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg"><Bell className="w-5 h-5 text-blue-400" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-white/90">Daily learning reminder</h3>
                    <p className="text-xs text-white/50">Push notification to maintain your streak.</p>
                  </div>
                </div>
                <Toggle 
                  checked={settings.notifications.dailyReminder} 
                  onChange={(val) => updateNestedSetting('notifications', 'dailyReminder', val)} 
                />
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-lg"><Brain className="w-5 h-5 text-amber-400" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-white/90">Retention reminders</h3>
                    <p className="text-xs text-white/50">Alerts when a concept is due for review.</p>
                  </div>
                </div>
                <Toggle 
                  checked={settings.notifications.retentionReminders} 
                  onChange={(val) => updateNestedSetting('notifications', 'retentionReminders', val)} 
                />
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg"><Target className="w-5 h-5 text-emerald-400" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-white/90">Progress updates</h3>
                    <p className="text-xs text-white/50">Weekly summary of your mastery shifts.</p>
                  </div>
                </div>
                <Toggle 
                  checked={settings.notifications.progressUpdates} 
                  onChange={(val) => updateNestedSetting('notifications', 'progressUpdates', val)} 
                />
              </div>

            </div>
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* LEARNING PREFERENCES */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Learning Preferences</h2>
          <GlassCard className="p-6 border-white/5 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-white/40" />
                <span className="text-sm font-bold text-white/90">Difficulty Profile</span>
              </div>
              <select 
                value={settings.learning.difficulty}
                onChange={(e) => updateNestedSetting('learning', 'difficulty', e.target.value)}
                className="bg-[#090812] border border-white/10 text-white/80 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-white/40" />
                <span className="text-sm font-bold text-white/90">Daily Goal</span>
              </div>
              <select 
                value={settings.learning.dailyGoal}
                onChange={(e) => updateNestedSetting('learning', 'dailyGoal', e.target.value)}
                className="bg-[#090812] border border-white/10 text-white/80 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none"
              >
                <option value="15 mins">15 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60+ mins">60+ mins</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-white/40" />
                <span className="text-sm font-bold text-white/90">Practice Frequency</span>
              </div>
              <select 
                value={settings.learning.practiceFrequency}
                onChange={(e) => updateNestedSetting('learning', 'practiceFrequency', e.target.value)}
                className="bg-[#090812] border border-white/10 text-white/80 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none"
              >
                <option value="Every day">Every day</option>
                <option value="Weekdays">Weekdays only</option>
                <option value="Weekends">Weekends only</option>
              </select>
            </div>

          </GlassCard>
        </motion.div>

      </motion.div>
    </div>
  );
}

// Simple custom toggle component
function Toggle({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <button 
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none 
        ${checked ? 'bg-primary' : 'bg-white/10'}`}
    >
      <span 
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
          ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}
