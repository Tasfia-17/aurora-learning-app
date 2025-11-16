import React from 'react';

export const Urula: React.FC = () => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="urula-body-grad" y2="1">
          <stop offset="0%" stopColor="#E1BEE7" />
          <stop offset="100%" stopColor="#BA68C8" />
        </linearGradient>
        <radialGradient id="urula-belly-grad">
          <stop offset="0%" stopColor="#F3E5F5" />
          <stop offset="100%" stopColor="#E1BEE7" />
        </radialGradient>
        <radialGradient id="urula-eye-grad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#D1C4E9" />
          <stop offset="100%" stopColor="#7E57C2" />
        </radialGradient>
        <path id="urula-sparkle" d="M-2 -0.5 L 2 -0.5 L 0 -2.5 L 0 1.5 Z M -0.5 -2 L -0.5 2 L -2.5 0 L 1.5 0 Z" fill="white" />
      </defs>
      
      <g className="animate-float-subtle">
        {/* Body */}
        <path d="M50 90 C 20 95, 15 60, 50 30 C 85 60, 80 95, 50 90 Z" fill="url(#urula-body-grad)"/>
        <path d="M50 85 C 30 90, 25 70, 50 60 C 75 70, 70 90, 50 85 Z" fill="url(#urula-belly-grad)"/>
        
        {/* Ear Tufts */}
        <path d="M35 35 C 25 25, 40 25, 35 35 L 30 20 Z" fill="#CE93D8"/>
        <path d="M65 35 C 75 25, 60 25, 65 35 L 70 20 Z" fill="#CE93D8"/>

        {/* Huge Anime Eyes */}
        <g>
            {/* Left Eye */}
            <ellipse cx="38" cy="55" rx="14" ry="16" fill="white" />
            <ellipse cx="38" cy="57" rx="12" ry="14" fill="url(#urula-eye-grad)" />
            <circle cx="34" cy="49" r="6" fill="white" />
            <use href="#urula-sparkle" x="45" y="62" transform="scale(0.8)">
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" begin="-1s"/>
            </use>

            {/* Right Eye */}
            <ellipse cx="62" cy="55" rx="14" ry="16" fill="white" />
            <ellipse cx="62" cy="57" rx="12" ry="14" fill="url(#urula-eye-grad)" />
            <circle cx="58" cy="49" r="6" fill="white" />
            <use href="#urula-sparkle" x="69" y="52" transform="scale(1)">
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </use>

            {/* Blinking Animation */}
            <path fill="url(#urula-body-grad)">
                <animate attributeName="d" values="M24 39 h28 v0 z; M24 39 h28 v20 z; M24 39 h28 v0 z; M24 39 h28 v0 z" dur="5s" repeatCount="indefinite" />
            </path>
             <path fill="url(#urula-body-grad)">
                <animate attributeName="d" values="M48 39 h28 v0 z; M48 39 h28 v20 z; M48 39 h28 v0 z; M48 39 h28 v0 z" dur="5s" repeatCount="indefinite" />
            </path>
        </g>
        
        {/* Beak */}
        <path d="M48 72 L 52 72 L 50 75 Z" fill="#FFD54F" />
      </g>
    </svg>
  );
};