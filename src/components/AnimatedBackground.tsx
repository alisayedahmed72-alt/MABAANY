import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#FCFCFB]">
      {/* 1. Base Blueprint Grid Pattern with modern architectural look */}
      <div className="absolute inset-0 opacity-[0.09] bg-[linear-gradient(to_right,#264A8A_1px,transparent_1px),linear-gradient(to_bottom,#264A8A_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Secondary accent grid at a different scale to create depth */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#EA8A22_1px,transparent_1px),linear-gradient(to_bottom,#EA8A22_1px,transparent_1px)] bg-[size:200px_200px]" />

      {/* 2. Soft, slow-shifting atmospheric light orbs (Parallax glow effects) */}
      <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-[#264A8A]/[0.06] blur-[120px] animate-pulse" style={{ animationDuration: '15s' }} />
      <div className="absolute bottom-[15%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-[#EA8A22]/[0.04] blur-[140px] animate-pulse" style={{ animationDuration: '22s' }} />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-[#264A8A]/[0.03] blur-[100px] animate-pulse" style={{ animationDuration: '18s' }} />

      {/* 3. Static blueprint-draft coordinates (Crosshairs "+") */}
      <div className="absolute top-[20%] right-[15%] text-[9px] font-mono text-neutral-400/40">
        +
      </div>
      <div className="absolute top-[60%] left-[10%] text-[9px] font-mono text-neutral-400/40">
        +
      </div>
      <div className="absolute bottom-[35%] left-[40%] text-[9px] font-mono text-neutral-400/40">
        +
      </div>
      <div className="absolute top-[45%] right-[45%] text-[9px] font-mono text-neutral-400/40">
        +
      </div>

      {/* 4. Elegant animated visual drafting wireframes floating in the background */}
      
      {/* Visual 1: Concentric dashed blueprint circles with rotating indicator */}
      <div 
        className="absolute top-[15%] left-[8%] w-64 h-64 opacity-[0.16] flex items-center justify-center animate-float-slow"
        style={{ transformOrigin: 'center' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#264A8A]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.25" strokeDasharray="3 3" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.25" strokeDasharray="3 3" />
          {/* Rotating dial */}
          <line 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="10" 
            stroke="currentColor" 
            strokeWidth="0.75" 
            className="origin-[50px_50px] animate-[spin_40s_linear_infinite]" 
          />
        </svg>
      </div>

      {/* Visual 2: Tech sector angle diagram */}
      <div 
        className="absolute bottom-[10%] left-[12%] w-56 h-56 opacity-[0.14] flex items-center justify-center animate-float-medium"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#EA8A22]">
          <path d="M 10 50 A 40 40 0 0 1 50 10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
          <path d="M 10 50 A 30 30 0 0 1 40 20" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Visual 3: Large abstract blueprint grid matrix with a scanning pulse */}
      <div 
        className="absolute top-[40%] right-[6%] w-72 h-72 opacity-[0.12] flex items-center justify-center animate-float-slow"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#264A8A]">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="0.25" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.25" />
          <line x1="10" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="0.25" />
          <line x1="30" y1="10" x2="30" y2="90" stroke="currentColor" strokeWidth="0.25" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.25" />
          <line x1="70" y1="10" x2="70" y2="90" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="2" className="fill-current animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="30" cy="30" r="1" className="fill-current" />
          <circle cx="70" cy="70" r="1" className="fill-current" />
          <circle cx="30" cy="70" r="1" className="fill-current" />
          <circle cx="70" cy="30" r="1" className="fill-current" />
        </svg>
      </div>

      {/* Visual 4: Tiny orbiting blueprint coordinate nodes */}
      <div className="absolute bottom-[25%] left-[45%] w-40 h-40 opacity-[0.15] animate-spin" style={{ animationDuration: '60s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#264A8A]">
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="5 5" />
          <circle cx="85" cy="50" r="2" className="fill-current" />
          <circle cx="15" cy="50" r="2" className="fill-current" />
          <line x1="50" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}
