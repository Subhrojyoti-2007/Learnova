import { ReactNode } from "react";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#090812]">
      {/* Background ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      {/* Header Logo */}
      <header className="p-6 absolute top-0 left-0 w-full z-20">
        <Link href="/" className="flex items-center gap-3 w-fit group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:scale-105 transition-transform flex-shrink-0">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary-foreground transition-colors">Learnova</span>
        </Link>
      </header>

      {/* Main Content Centered */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 w-full">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
