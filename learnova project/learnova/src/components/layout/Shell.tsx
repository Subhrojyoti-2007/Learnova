"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export function Shell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 lg:ml-[240px]">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 flex flex-col relative pb-16 lg:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
    </>
  );
}
