"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Globe, MessageCircle, Share2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-[-1] w-full min-h-[800px] bg-[#03030a] flex flex-col justify-between overflow-hidden">
      {/* Dark Educational Background Image */}
      <div className="absolute inset-0 z-0">
         <Image 
           src="/images/dark-footer-bg.jpg"
           alt="Dark Education Abstract"
           fill
           className="object-cover object-bottom opacity-70"
           quality={100}
         />
         {/* Subtle top gradient to blend with the page above it */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#090812] via-transparent to-transparent h-40" />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col px-8 md:px-16 lg:px-24">
        
        {/* Spacer to explicitly push content down */}
        <div className="h-[30vh] w-full pointer-events-none" />
        
        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Ambient Graphics */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-600/20 rounded-full blur-[50px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px] animate-pulse pointer-events-none" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Section: Community & Links */}
          <div className="flex flex-col lg:flex-row justify-between gap-16 relative z-10">
          
          {/* Left: Newsletter */}
          <div className="lg:w-1/3 relative">
            <h3 className="text-2xl md:text-3xl text-white font-medium mb-8">Join Our <span className="italic text-white/70">Community</span></h3>
            <form className="flex items-center gap-4 max-w-sm relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="email" 
                className="bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/40 focus:outline-none focus:border-primary w-full transition-colors"
              />
              <button 
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white text-sm hover:bg-white hover:text-black transition-all"
              >
                Subscribe <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
            
            {/* Decorative Graphic */}
            <div className="absolute top-[80%] left-[-10%] w-80 h-80 pointer-events-none opacity-40 z-0 animate-pulse" style={{ animationDuration: '4s' }}>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path fill="url(#grad1)" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90.1,-16.3,89.1,-0.6C88.1,15.1,83.3,30.3,74.5,42.8C65.7,55.4,52.8,65.3,38.8,71.5C24.8,77.7,9.7,80.1,-4.7,75.9C-19.1,71.8,-32.8,61.1,-46.3,51.3C-59.8,41.4,-73.2,32.3,-79.8,19.3C-86.4,6.2,-86.3,-10.8,-80.5,-25.6C-74.8,-40.4,-63.5,-52.9,-50.2,-61.2C-36.9,-69.5,-21.6,-73.6,-5.7,-70.7C10.2,-67.8,20.4,-57.8,30.4,-83.6" transform="translate(100 100) scale(1.1)" />
              </svg>
            </div>
          </div>

          {/* Right: Links & Info */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/60">
            
            <div className="flex flex-col gap-4">
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              <Link href="#" className="hover:text-white transition-colors">News</Link>
              <Link href="#" className="hover:text-white transition-colors">Careers</Link>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="#" className="hover:text-white transition-colors">Privacy Notice</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
              <Link href="#" className="hover:text-white transition-colors">Overview</Link>
              <Link href="#" className="hover:text-white transition-colors">About Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Process Methodology</Link>
              <Link href="#" className="hover:text-white transition-colors">Blog</Link>
              <Link href="#" className="hover:text-white transition-colors">Become a Partner</Link>
            </div>

            {/* Address and Socials row */}
            <div className="col-span-2 md:col-span-4 mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div>
                  <p>123 Innovation Drive,<br/>Silicon Valley, CA 94025</p>
                </div>
                <div>
                  <p>456 Learning Hub,<br/>London, UK E1 6AN</p>
                </div>
                <div className="flex flex-col gap-4 justify-between">
                  <p>Learnova builds advanced intelligence systems engineered to simplify complexity and accelerate deep learning.</p>
                  
                  <div className="flex gap-4 text-white/40 mt-4">
                    <Link href="#" className="hover:text-white transition-colors" aria-label="Mail"><Mail className="w-5 h-5" /></Link>
                    <Link href="#" className="hover:text-white transition-colors" aria-label="Website"><Globe className="w-5 h-5" /></Link>
                    <Link href="#" className="hover:text-white transition-colors" aria-label="Social"><MessageCircle className="w-5 h-5" /></Link>
                    <Link href="#" className="hover:text-white transition-colors" aria-label="Share"><Share2 className="w-5 h-5" /></Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        </div>

        {/* Bottom Section: Giant Animated Title */}
        <div className="w-full flex justify-center items-end pb-4 overflow-hidden relative z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
            className="text-[14vw] md:text-[18vw] font-bold text-white tracking-tighter leading-none select-none"
            style={{ 
              textShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 100px rgba(139, 92, 246, 0.4)" 
            }}
          >
            Learnova
          </motion.h1>
        </div>

      </div>
    </footer>
  );
};
