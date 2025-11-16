import React from 'react';

export const CompanionIcon: React.FC = () => {
  return (
    <svg
      width="250"
      height="250"
      viewBox="-25 -25 250 250"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 6px 15px rgba(46, 30, 106, 0.5))' }}
    >
      <defs>
        {/* Gradients using soft purples */}
        <radialGradient id="grad-body-fluff" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </radialGradient>
        <linearGradient id="grad-wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9BFFD" />
          <stop offset="40%" stopColor="#D6CFFC" />
          <stop offset="80%" stopColor="#F3C9E3" />
          <stop offset="100%" stopColor="#FDF4E9" />
        </linearGradient>
        <linearGradient id="grad-hair" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#A695F3" />
          <stop offset="50%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#E6DEFF" />
        </linearGradient>
        <linearGradient id="grad-horn" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#E6DEFF" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
        <radialGradient id="grad-gem">
          <stop offset="0%" stopColor="#E1C4FF" />
          <stop offset="100%" stopColor="#A685E2" />
        </radialGradient>
        <radialGradient id="grad-eye">
          <stop offset="0%" stopColor="#8A7DFF" />
          <stop offset="100%" stopColor="#473A9A" />
        </radialGradient>
        
        {/* Reusable sparkle shape */}
        <path id="sparkle" d="M1.5 0 L2 1 L3 1.5 L2 2 L1.5 3 L1 2 L0 1.5 L1 1 Z" fill="white"/>
      </defs>

      {/* Main animation group for floating effect */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -5; 0 0"
          dur="5s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0; 0.5; 1"
          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
        />
        
        {/* -- Back Hair -- */}
        <g id="hair-back" transform="translate(10, -10)">
           <animateTransform attributeName="transform" type="rotate" values="-2 130 50; 2 130 50; -2 130 50" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
           <path d="M110 50 C 130 10, 180 20, 160 60 C 180 30, 140 25, 110 50Z" fill="url(#grad-hair)" />
           <path d="M140 55 C 170 40, 190 70, 150 80 C 170 60, 160 45, 140 55Z" fill="url(#grad-hair)" opacity="0.8"/>
        </g>

        {/* -- Back Wings -- */}
        <g id="wing-left-back">
          <animateTransform attributeName="transform" type="rotate" values="-10 80 85; 4 80 85; -10 80 85" dur="2s" begin="-0.2s" repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
          <path d="M80 85 C 20 65, 30 140, 80 120 Q 60 100, 80 85Z" fill="url(#grad-wing)" />
          <path d="M75 110 C 30 100, 10 130, 40 140 C 50 120, 70 120, 75 110Z" fill="url(#grad-wing)" opacity="0.7" />
        </g>
        
        {/* -- Body & Head -- */}
        <path id="body-fluff" d="M100,160 Q 50,150 70,100 C 80,75 120,75 130,100 Q 150,150 100,160 Z" fill="url(#grad-body-fluff)" />
        <path id="head" d="M125 100 C 135 70, 115 40, 100 40 C 85 40, 65 70, 75 100 C 80,110 120,110 125,100 Z" fill="#fff" />

        {/* -- Body Markings -- */}
        <g id="body-markings" opacity="0.6">
            <path d="M85 110 C 80 120, 85 130, 95 128 C 105 126, 110 115, 105 108" fill="#D6CFFC" />
            <path d="M90 95 C 70 98, 70 120, 85 130 L 90 110 Z" fill="#E6DEFF" />
        </g>
        
        {/* -- Face Details -- */}
        <g id="face">
           {/* Horn, Gem, and Setting */}
           <path d="M100 42 C 98 32, 102 32, 100 42 L 98 43 C 99 35, 101 35, 102 43 Z" fill="url(#grad-horn)"/>
           <path d="M92 68 C 90 62, 110 62, 108 68 C 105 72, 95 72, 92 68Z" fill="#F3C9E3" />
           <ellipse cx="100" cy="67" rx="8" ry="5" fill="url(#grad-gem)" />

           {/* Eyes */}
           <path d="M82 80 C 80 90, 92 92, 94 82 C 92 75, 84 73, 82 80Z" fill="url(#grad-eye)"/>
           <path d="M118 80 C 120 90, 108 92, 106 82 C 108 75, 116 73, 118 80Z" fill="url(#grad-eye)"/>
           <circle cx="86" cy="79" r="2.5" fill="white" opacity="0.9" />
           <circle cx="114" cy="79" r="2.5" fill="white" opacity="0.9" />
           
           {/* Nose */}
           <path d="M98 90 L 102 90 L 100 92 Z" fill="#F3C9E3" />
        </g>
        
        {/* -- Front Wings -- */}
        <g id="wing-right-front">
          <animateTransform attributeName="transform" type="rotate" values="10 120 85; -4 120 85; 10 120 85" dur="2s" repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
          <path d="M120 85 C 180 65, 170 140, 120 120 Q 140 100, 120 85Z" fill="url(#grad-wing)" />
          <path d="M125 110 C 170 100, 190 130, 160 140 C 150 120, 130 120, 125 110Z" fill="url(#grad-wing)" opacity="0.7" />
        </g>

        {/* -- Front Hair -- */}
        <g id="hair-front">
           <animateTransform attributeName="transform" type="rotate" values="2 85 55; -2 85 55; 2 85 55" dur="4s" begin="-1s" repeatCount="indefinite" calcMode="spline" keyTimes="0; 0.5; 1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"/>
          <path d="M85 55 C 65 25, 105 10, 115 40 C 105 30, 90 35, 85 55Z" fill="url(#grad-hair)" />
        </g>
      </g>

      {/* -- Glitter Effect -- */}
      <g id="glitter-group" opacity="0.8">
        <use href="#sparkle" x="140" y="80">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0s"/>
            <animateTransform attributeName="transform" type="translate" values="0 0; 5 -10; 10 -20" dur="2.5s" repeatCount="indefinite" begin="0s"/>
        </use>
        <use href="#sparkle" x="60" y="100">
            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="-1s"/>
            <animateTransform attributeName="transform" type="translate" values="0 0; -5 -8; -10 -18" dur="2.5s" repeatCount="indefinite" begin="-1s"/>
        </use>
         <use href="#sparkle" x="170" y="120" transform="scale(1.2)">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="-0.5s"/>
            <animateTransform attributeName="transform" type="translate" values="0 0; 8 5; 16 10" dur="3s" repeatCount="indefinite" begin="-0.5s"/>
        </use>
         <use href="#sparkle" x="100" y="65" transform="scale(0.8)">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="-1.5s"/>
        </use>
      </g>
    </svg>
  );
};
