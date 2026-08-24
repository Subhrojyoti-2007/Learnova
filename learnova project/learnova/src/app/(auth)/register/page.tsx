"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, User, Mail, Lock, Building2, GraduationCap, BookOpen, Target } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
    gradeLevel: "",
    fieldOfStudy: "",
    learningGoals: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.password)) {
      setError("Please fill in all basic fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <GlassCard className="p-8 border-white/10 shadow-[0_0_40px_rgba(124,58,237,0.1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] pointer-events-none" />
        
        <div className="mb-8 text-center relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create Account</h1>
          <p className="text-white/60">
            {step === 1 ? "Step 1: Your Details" : "Step 2: Your Learning Profile"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8 relative z-10">
          <div className="h-1.5 flex-1 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all" />
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step === 2 ? 'bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]' : 'bg-white/10'}`} />
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium text-center relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-5 relative z-10">
          
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#090812]/50 border border-white/10 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Alex Hacker"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#090812]/50 border border-white/10 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#090812]/50 border border-white/10 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button type="button" onClick={handleNext} className="w-full h-12 text-base font-semibold group mt-4">
                Next Step
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Institution / School</label>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full bg-[#090812]/50 border border-white/10 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="MIT, Stanford, High School..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Grade Level</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                    <select
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      className="w-full bg-[#090812]/50 border border-white/10 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="" disabled className="bg-[#090812]">Select...</option>
                      <option value="High School" className="bg-[#090812]">High School</option>
                      <option value="Undergraduate" className="bg-[#090812]">Undergraduate</option>
                      <option value="Graduate" className="bg-[#090812]">Graduate</option>
                      <option value="Professional" className="bg-[#090812]">Professional</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Field of Study</label>
                  <div className="relative group">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleChange}
                      className="w-full bg-[#090812]/50 border border-white/10 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Computer Science..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-widest ml-1">Learning Goals</label>
                <div className="relative group">
                  <Target className="absolute left-3 top-4 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                  <textarea
                    name="learningGoals"
                    value={formData.learningGoals}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#090812]/50 border border-white/10 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Master Data Structures and Algorithms..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button type="button" variant="glass" onClick={() => setStep(1)} className="px-6">
                  Back
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 h-12 text-base font-semibold group">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Complete Setup
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-white/50 relative z-10">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary-foreground font-semibold transition-colors">
            Sign in
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
}
