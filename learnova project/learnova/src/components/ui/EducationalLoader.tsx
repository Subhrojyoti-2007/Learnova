import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

interface EducationalLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function EducationalLoader({ text = "Processing...", size = "md" }: EducationalLoaderProps) {
  const sizeMap = {
    sm: { container: "w-10 h-10", icon: "w-4 h-4", border: "inset-1" },
    md: { container: "w-20 h-20", icon: "w-8 h-8", border: "inset-2" },
    lg: { container: "w-32 h-32", icon: "w-12 h-12", border: "inset-3" }
  };

  const s = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full min-h-[200px]">
      <div className={`relative flex items-center justify-center ${s.container}`}>
        {/* Outer glowing rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-primary/20 border-r-primary shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className={`absolute ${s.border} rounded-full border-2 border-blue-500/20 border-l-blue-500`}
        />
        
        {/* Center Icon */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <BrainCircuit className={`${s.icon} text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]`} />
        </motion.div>
      </div>
      
      {text && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm font-mono tracking-widest text-white/70 uppercase text-center max-w-[250px]">
            {text}
          </span>
          {/* Loading bar */}
          <div className="w-32 h-1 bg-white/10 rounded-full mt-4 overflow-hidden relative">
             <motion.div 
               animate={{ x: ["-100%", "100%"] }}
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
               className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
             />
          </div>
        </motion.div>
      )}
    </div>
  );
}
