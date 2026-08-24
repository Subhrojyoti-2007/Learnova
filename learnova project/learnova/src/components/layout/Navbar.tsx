"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, LayoutDashboard, Brain, Network, Play, Wrench } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Diagnostic", href: "/diagnostic", icon: Brain },
    { name: "Galaxy", href: "/galaxy", icon: Network },
    { name: "Quiz", href: "/quiz", icon: Play },
    { name: "Debugger", href: "/debugger", icon: Wrench },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-100 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="font-semibold text-slate-800 tracking-tight">Learnova</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive ? "text-indigo-600" : "text-slate-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
