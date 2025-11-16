import React from 'react';

export const Stella: React.FC = () => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="stella-body-grad" y2="1">
                    <stop offset="0%" stopColor="#7E57C2" />
                    <stop offset="100%" stopColor="#4527A0" />
                </linearGradient>
                <linearGradient id="stella-antler-grad" y2="1">
                    <stop offset="0%" stopColor="#FFFDE7" />
                    <stop offset="100%" stopColor="#FFF59D" />
                </linearGradient>
                <radialGradient id="stella-eye-grad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#B39DDB" />
                    <stop offset="100%" stopColor="#673AB7" />
                </radialGradient>
                 <filter id="stella-antler-glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
                 <pattern id="stella-stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="70" r="1.5" fill="white" opacity="0.9">
                         <animate attributeName="opacity" values="0.9;0.3;0.9" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="85" r="1" fill="white" opacity="0.8">
                         <animate attributeName="opacity" values="0.8;0.2;0.8" dur="4s" repeatCount="indefinite" begin="-2s" />
                    </circle>
                </pattern>
            </defs>
            <g className="animate-float-subtle" transform="translate(0, 5)">
                {/* Body */}
                <path d="M25 90 C 15 70, 20 40, 45 35 C 70 30, 80 50, 75 70 C 70 90, 45 100, 25 90 Z" fill="url(#stella-body-grad)" />
                <path d="M25 90 C 15 70, 20 40, 45 35 C 70 30, 80 50, 75 70 C 70 90, 45 100, 25 90 Z" fill="url(#stella-stars)" />

                {/* Head */}
                <circle cx="65" cy="50" r="22" fill="url(#stella-body-grad)" />
                <circle cx="65" cy="50" r="22" fill="url(#stella-stars)" />

                {/* Antlers */}
                <g filter="url(#stella-antler-glow)" opacity="0.8">
                    <path d="M55 30 C 45 15, 60 10, 58 25" stroke="url(#stella-antler-grad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </g>
                <path d="M55 30 C 45 15, 60 10, 58 25" stroke="url(#stella-antler-grad)" strokeWidth="3" fill="none" strokeLinecap="round"/>

                {/* Ear */}
                <path d="M80 35 C 90 30, 90 45, 80 40 Z" fill="#5E35B1" />

                {/* Big Anime Eye */}
                <g transform="translate(5, 2)">
                    <ellipse cx="65" cy="50" rx="10" ry="13" fill="white" />
                    <ellipse cx="65" cy="52" rx="8" ry="11" fill="url(#stella-eye-grad)" />
                    <circle cx="62" cy="46" r="4" fill="white" />
                    <circle cx="68" cy="56" r="1.5" fill="white" opacity="0.8"/>
                    {/* Eyelid for blinking */}
                    <path fill="url(#stella-body-grad)">
                        <animate attributeName="d" values="M55 37 h20 v0 z; M55 37 h20 v16 z; M55 37 h20 v0 z; M55 37 h20 v0 z" dur="5s" repeatCount="indefinite" begin="-2s"/>
                    </path>
                </g>
                {/* Nose */}
                <path d="M83 58 C 82 60, 84 60, 83 58 L 85 57 Z" fill="#D1C4E9" />
            </g>
        </svg>
    );
};