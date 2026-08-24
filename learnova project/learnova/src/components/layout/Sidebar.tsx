"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, HelpCircle, User, BrainCircuit, Activity, Network, Wrench, RefreshCw, TrendingUp, BookOpen, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const mainNavItems = [
    { name: "Overview", href: "/overview", icon: Home },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Knowledge Galaxy", href: "/galaxy", icon: Network },
    { name: "Diagnose", href: "/diagnose", icon: Activity },
    { name: "Practice", href: "/practice", icon: TargetIcon },
    { name: "Progress", href: "/progress", icon: TrendingUp },
  ];

  const bottomNavItems = [
    { name: "Help", href: "#", icon: HelpCircle },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Profile", href: "#", icon: User },
  ];

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: { 
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    desktop: {
      x: 0,
      width: "240px",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    tablet: {
      x: 0,
      width: "80px",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial="closed"
        animate={{
          x: 0,
          width: "240px" 
        }}
        className={cn(
          "h-screen bg-[#0D0B16] border-r border-white/[0.05] flex flex-col py-6 z-50 fixed left-0 top-0 overflow-y-auto overflow-x-hidden transition-all duration-300",
          isOpen ? "translate-x-0 w-[240px]" : "-translate-x-full lg:translate-x-0 lg:w-[240px] xl:w-[240px]"
        )}
      >
        <Link href="/" className="mb-10 px-6 flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:scale-105 transition-transform flex-shrink-0">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary-foreground transition-colors whitespace-nowrap">Learnova</span>
        </Link>

        <nav className="flex flex-col gap-2 px-4 flex-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group overflow-hidden",
                  isActive 
                    ? "bg-primary/10 text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.15)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_8px_rgba(124,58,237,1)]" />
                )}
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary-foreground" : "text-slate-400 group-hover:text-white")} />
                <span className="font-medium whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-4 flex flex-col gap-2 pt-6 border-t border-white/5">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group text-slate-400 hover:text-white hover:bg-white/5 overflow-hidden"
              >
                <Icon className="w-5 h-5 flex-shrink-0 group-hover:text-white" />
                <span className="font-medium whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.aside>
    </>
  );
}

// Target icon isn't in lucide-react standard imports in my head, but it is available.
// If Target doesn't exist, I'll map to something else, but it does.
function TargetIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
