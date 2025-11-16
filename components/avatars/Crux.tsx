import React from 'react';

export const Crux: React.FC = () => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="crux-fur-grad" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#6C5B7B" />
                    <stop offset="100%" stopColor="#355C7D" />
                </linearGradient>
                <radialGradient id="crux-belly-grad">
                    <stop offset="0%" stopColor="#F8E9A1" />
                    <stop offset="100%" stopColor="#F7C9C9" />
                </radialGradient>
                 <pattern id="crux-stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="30" r="1" fill="white" opacity="0.8">
                         <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="60" r="1.5" fill="white" opacity="0.9">
                         <animate attributeName="opacity" values="0.9;0.3;0.9" dur="3s" repeatCount="indefinite" begin="-1s" />
                    </circle>
                    <circle cx="80" cy="40" r="0.8" fill="white" opacity="0.7">
                         <animate attributeName="opacity" values="0.7;0.1;0.7" dur="3s" repeatCount="indefinite" begin="-2s" />
                    </circle>
                </pattern>
                <filter id="crux-glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
            </defs>

            <g className="animate-float-subtle">
                {/* Body shape */}
                <g transform="translate(5, 10)">
                    <path 
                        d="M50 25 C 20 25, 10 50, 25 75 C 40 100, 75 100, 85 70 C 95 40, 80 25, 50 25 Z" 
                        fill="url(#crux-fur-grad)" 
                    />
                    <path 
                        d="M50 25 C 20 25, 10 50, 25 75 C 40 100, 75 100, 85 70 C 95 40, 80 25, 50 25 Z" 
                        fill="url(#crux-stars)" 
                    />
                     <path 
                        d="M50 60 C 35 65, 30 80, 50 85 C 70 80, 65 65, 50 60 Z" 
                        fill="url(#crux-belly-grad)" 
                    />
                </g>

                 {/* Fluffy Tail */}
                <g>
                    <animateTransform attributeName="transform" type="rotate" values="-3 80 65; 3 80 65; -3 80 65" dur="4s" repeatCount="indefinite" />
                    <path d="M80 65 C 95 50, 100 70, 85 80 Z" fill="url(#crux-fur-grad)" />
                    <path d="M80 65 C 95 50, 100 70, 85 80 Z" fill="url(#crux-stars)" />
                    <path d="M86 78 C 95 72, 98 78, 90 82 Z" fill="url(#crux-belly-grad)" />
                </g>

                {/* Ears */}
                <path d="M35 30 C 25 20, 45 20, 40 35 Z" fill="#355C7D"/>
                <path d="M65 30 C 75 20, 55 20, 60 35 Z" fill="#355C7D"/>
                <path d="M36 30 C 32 25, 42 25, 39 32 Z" fill="#F7C9C9"/>
                <path d="M64 30 C 68 25, 58 25, 61 32 Z" fill="#F7C9C9"/>

                {/* Sleeping Face */}
                <g transform="translate(5, 10)">
                    {/* Left Eye */}
                    <path d="M40 55 C 43 58, 47 58, 50 55" stroke="#2c3e50" fill="none" strokeWidth="2" strokeLinecap="round"/>
                    {/* Right Eye */}
                    <path d="M60 55 C 63 58, 67 58, 70 55" stroke="#2c3e50" fill="none" strokeWidth="2" strokeLinecap="round"/>
                    {/* Nose */}
                    <path d="M54 62 L 56 62 L 55 64 Z" fill="#2c3e50" />
                </g>
            </g>
        </svg>
    );
};