"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Network, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/overview", icon: Home },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Galaxy", href: "/galaxy", icon: Network },
    { name: "Diagnose", href: "/diagnose", icon: Activity },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090812]/90 backdrop-blur-xl border-t border-white/10 lg:hidden px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                isActive ? "text-primary" : "text-white/40 hover:text-white/80"
              )}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-[2px] bg-primary rounded-b-full shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
