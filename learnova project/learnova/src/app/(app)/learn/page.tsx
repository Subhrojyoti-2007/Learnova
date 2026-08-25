"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Lock,
  Layers,
  Network,
  Binary,
  ArrowRight,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Loader2,
  Download,
  AlertTriangle,
  BrainCircuit,
  X
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Tesseract from "tesseract.js";
import { generateAssessmentPDF, AssessmentData, Question } from "@/lib/pdfGenerator";

// Set worker source for pdfjs-dist dynamically to avoid SSR issues
const initPdfJs = async () => {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  return pdfjsLib;
};

const DEFAULT_SYLLABUS = [
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
  const [loadingState, setLoadingState] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AssessmentData & { videoIds: string[], modules?: {title: string, description: string}[], warning?: string } | null>(null);
  const [persistedModules, setPersistedModules] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/user/overview')
      .then(res => res.json())
      .then(data => {
        if (data?.user?.currentSyllabusData?.core) {
          const core = data.user.currentSyllabusData.core;
          
          // Restore the entire analysis result so Videos and Questions are preserved too
          setAnalysisResult({
            topic: core.topic,
            videoIds: core.videoIds || [],
            questions: core.questions || [],
            modules: core.modules || []
          });
          
          if (core.modules?.length > 0) {
            setPersistedModules(core.modules);
          }
        }
      })
      .catch(console.error);
  }, []);
  
  // Live Quiz State
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfjsLib = await initPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    
    const numPages = Math.min(pdf.numPages, 3);
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  };

  const extractTextFromImage = async (file: File): Promise<string> => {
    const result = await Tesseract.recognize(file, 'eng');
    return result.data.text;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    
    try {
      setLoadingState("Extracting Text...");
      let extractedText = "";

      if (file.type === "application/pdf") {
        extractedText = await extractTextFromPDF(file);
      } else if (file.type.startsWith("image/")) {
        extractedText = await extractTextFromImage(file);
      } else {
        alert("Please upload a valid PDF or Image file.");
        setLoadingState(null);
        return;
      }

      if (!extractedText || extractedText.trim().length === 0) {
        alert("Could not extract any text from the file.");
        setLoadingState(null);
        return;
      }

      setLoadingState("Step 1/2: Analyzing Core Curriculum...");
      
      const response = await fetch('/api/analyze-syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText })
      });

      if (!response.ok) {
        throw new Error("Failed to analyze syllabus");
      }

      const data = await response.json();
      setAnalysisResult(data);
      
      setLoadingState("Step 2/2: Building Galaxy, Diagnosis & Practice sets...");
      
      // Fire and forget, or wait for them. Let's wait so UI shows loading
      await Promise.allSettled([
        fetch('/api/analyze-syllabus/galaxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: extractedText })
        }),
        fetch('/api/analyze-syllabus/diagnose', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: extractedText })
        }),
        fetch('/api/analyze-syllabus/practice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: extractedText })
        })
      ]);

    } catch (error) {
      console.error(error);
      alert("An error occurred during analysis.");
    } finally {
      setLoadingState(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Extract quiz questions (1-mark and 3-mark)
  const quizQuestions = analysisResult?.questions?.filter(q => q.type === "1-mark" || q.type === "3-mark") || [];

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    setQuizScore(prev => ({ ...prev, total: prev.total + 1 }));
    
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Quiz finished
      setIsQuizActive(false);
      alert(`Quiz Complete! You scored ${quizScore.correct + (isCorrect ? 1 : 0)} out of ${quizScore.total + 1}.`);
      setQuizIndex(0);
      setQuizScore({ correct: 0, total: 0 });
      setShowAnswer(false);
    }
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

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10 relative z-10">
        
        {/* ============================================================== */}
        {/* SYLLABUS UPLOAD DROPZONE */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-primary" /> AI Syllabus Analyzer
          </h2>
          
          {!analysisResult && !loadingState && (
            <GlassCard 
              {...getRootProps()} 
              className={`p-10 border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-primary/50 hover:bg-white/[0.02]'}
              `}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-primary shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload Syllabus</h3>
              <p className="text-white/50 max-w-sm mb-6">
                Drag & drop your syllabus PDF or Image here. Our AI will analyze the topics, curate educational videos, and generate a downloadable assessment.
              </p>
              <div className="flex gap-4 text-white/30">
                <FileText className="w-5 h-5" />
                <ImageIcon className="w-5 h-5" />
              </div>
            </GlassCard>
          )}

          {loadingState && (
            <GlassCard className="p-12 border-primary/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 animate-pulse" />
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{loadingState}</h3>
              <p className="text-white/50 text-sm max-w-xs">Using AI and OCR to process your document. This might take a few seconds.</p>
            </GlassCard>
          )}

          {analysisResult && !loadingState && (
            <GlassCard className="p-6 md:p-8 border-primary/30 bg-[#1A1635]/50 relative">
              <button 
                onClick={() => setAnalysisResult(null)}
                className="absolute top-4 right-4 text-xs font-bold text-white/40 uppercase tracking-widest hover:text-white"
              >
                Start Over
              </button>
              
              {analysisResult.warning && (
                <div className="mb-6 p-3 rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400 flex gap-2 items-center text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {analysisResult.warning}
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">Analysis Complete</h3>
                  <p className="text-white/50 text-sm">Topic identified: <strong className="text-white">{analysisResult.topic}</strong></p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col h-full max-h-[600px]">
                  <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Play className="w-4 h-4 text-blue-400" /> Curated Videos
                  </h4>
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {analysisResult.videoIds && analysisResult.videoIds.length > 0 ? (
                      analysisResult.videoIds.map((id, index) => (
                        <div key={id} className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${id}`} 
                            title={`YouTube video player ${index + 1}`} 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                      ))
                    ) : (
                      <div className="aspect-video w-full rounded-xl border border-white/10 flex items-center justify-center text-white/30 bg-white/5">
                        No videos found.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col h-full max-h-[600px]">
                  <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> Generated Assessment
                  </h4>
                  <div className="flex-1 bg-[#090812] rounded-xl border border-white/5 p-5 relative overflow-hidden group flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -z-10" />
                    
                    <p className="text-sm text-white/70 mb-4 leading-relaxed flex-shrink-0">
                      AI has generated <strong className="text-white">{analysisResult.questions?.length || 0}</strong> highly detailed questions ranging from 1-mark objective queries to massive 10-mark complex problems.
                    </p>
                    
                    <div className="flex-1 overflow-y-auto pr-2 mb-6 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                      {analysisResult.questions?.map((q, i) => (
                        <div key={i} className="flex gap-3 text-sm text-white/40 items-start bg-white/[0.02] p-3 rounded-lg border border-white/5">
                          <span className="font-bold text-primary flex-shrink-0 w-16">{q.type}</span>
                          <span className="line-clamp-2 leading-relaxed">{q.question}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto flex-shrink-0">
                      <Button 
                        onClick={() => setIsQuizActive(true)}
                        disabled={quizQuestions.length === 0}
                        className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      >
                        <BrainCircuit className="w-4 h-4" /> Start Live Quiz
                      </Button>
                      <Button 
                        onClick={() => generateAssessmentPDF(analysisResult)}
                        className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                      >
                        <Download className="w-4 h-4" /> Export PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Network className="w-4 h-4 text-emerald-400" /> Deep Learning Modules Generated
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/galaxy">
                    <Button variant="ghost" className="w-full py-8 border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 gap-3 group">
                      <Network className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                      <div className="text-left">
                        <div className="font-bold">Knowledge Galaxy</div>
                        <div className="text-xs text-emerald-400/50">Explore Concept Map</div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/diagnose">
                    <Button variant="ghost" className="w-full py-8 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 hover:text-amber-300 gap-3 group">
                      <BrainCircuit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-bold">Diagnosis Test</div>
                        <div className="text-xs text-amber-400/50">Identify Weaknesses</div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/practice">
                    <Button variant="ghost" className="w-full py-8 border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 gap-3 group">
                      <Binary className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-bold">Practice Hub</div>
                        <div className="text-xs text-blue-400/50">Master 45+ Questions</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>

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
            
            <Binary className="w-64 h-64 absolute -right-10 -bottom-10 text-primary/[0.03] group-hover:text-primary/[0.05] transition-colors pointer-events-none transform -rotate-12" />
          </GlassCard>
        </motion.div>

        {/* ============================================================== */}
        {/* SYLLABUS GRID (Dynamic if analyzed, otherwise default) */}
        {/* ============================================================== */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" /> {(analysisResult?.modules || persistedModules) ? 'Live Course Modules' : 'Course Syllabus'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(analysisResult?.modules || persistedModules) ? (
              // Dynamic Modules from AI
              (analysisResult?.modules || persistedModules).map((module: any, idx: number) => (
                <GlassCard key={idx} className="p-6 flex flex-col h-full border-t-2 border-t-primary shadow-[0_0_20px_rgba(124,58,237,0.1)] relative overflow-hidden transition-all duration-300 hover:bg-white/[0.02]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-primary/10 text-primary border border-primary/20">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                  <p className="text-sm text-white/50 mb-6 flex-1">{module.description}</p>
                </GlassCard>
              ))
            ) : (
              // Default Hardcoded Modules
              DEFAULT_SYLLABUS.map((module) => (
                <GlassCard 
                  key={module.id} 
                  className={`p-6 flex flex-col h-full border-t-2 relative overflow-hidden transition-all duration-300
                    ${module.status === 'mastered' ? 'border-t-emerald-500 hover:bg-white/[0.02]' :
                      module.status === 'in-progress' ? 'border-t-primary shadow-[0_0_20px_rgba(124,58,237,0.1)] hover:bg-white/[0.02]' :
                      'border-t-white/10 opacity-70 hover:opacity-100 grayscale hover:grayscale-0'}
                  `}
                >
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
              ))
            )}
          </div>
        </motion.div>

      </motion.div>

      {/* ============================================================== */}
      {/* LIVE QUIZ MODAL OVERLAY */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isQuizActive && quizQuestions.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#090812]/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#151226] border border-primary/30 rounded-2xl shadow-[0_0_60px_rgba(124,58,237,0.3)] overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white">Live Quiz: {analysisResult?.topic}</h3>
                </div>
                <button 
                  onClick={() => setIsQuizActive(false)}
                  className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 flex-1">
                <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest mb-6">
                  <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
                  <span className="text-primary">{quizQuestions[quizIndex].type}</span>
                </div>

                <h4 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">
                  {quizQuestions[quizIndex].question}
                </h4>

                <AnimatePresence mode="wait">
                  {!showAnswer ? (
                    <motion.div key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-4">
                      <Button onClick={() => setShowAnswer(true)} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Reveal Answer
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="revealed" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                      <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                        <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Solution Key</h5>
                        <p className="text-white/80 leading-relaxed text-sm md:text-base">{quizQuestions[quizIndex].solution}</p>
                      </div>
                      
                      <div className="pt-4 border-t border-white/10">
                        <h5 className="text-center text-sm text-white/50 mb-4">Did you get it right?</h5>
                        <div className="flex gap-4">
                          <Button onClick={() => handleNextQuestion(false)} variant="outline" className="flex-1 border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50">
                            Incorrect
                          </Button>
                          <Button onClick={() => handleNextQuestion(true)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            Correct
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
