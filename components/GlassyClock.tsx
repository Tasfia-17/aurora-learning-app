import React from 'react';

interface GlassyClockProps {
  duration: number;
  timeLeft: number;
}

const GlassyClock: React.FC<GlassyClockProps> = ({ duration, timeLeft }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / duration;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <defs>
            <radialGradient id="clock-glass" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </radialGradient>
            <linearGradient id="clock-progress" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
            <filter id="clock-glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        {/* Glassy Background */}
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="url(#clock-glass)"
          stroke="rgba(255, 215, 0, 0.3)"
          strokeWidth="1"
        />
        
        {/* Timer Track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="6"
        />

        {/* Timer Progress */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="url(#clock-progress)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          filter="url(#clock-glow)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl sm:text-5xl font-mono text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          {Math.ceil(timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default GlassyClock;
