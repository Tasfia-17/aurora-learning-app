import React from 'react';

export const Ashette: React.FC = () => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <radialGradient id="ashette-body-grad" cx="50%" cy="80%" r="70%">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="100%" stopColor="#FF8A65" />
                </radialGradient>
                <linearGradient id="ashette-hair-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="100%" stopColor="#FFB74D" />
                </linearGradient>
                <filter id="ashette-glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" result="glow" />
                    <feComposite in="glow" in2="SourceGraphic" operator="over" />
                </filter>
            </defs>

            <g className="animate-float-subtle" filter="url(#ashette-glow)">
                {/* Body */}
                <circle cx="50" cy="65" r="25" fill="url(#ashette-body-grad)" />

                {/* Flame Hair */}
                <g>
                    <animateTransform attributeName="transform" type="scale" values="1 1; 1.02 0.98; 1 1" dur="4s" repeatCount="indefinite" />
                    <path d="M50 45 C 20 40, 25 0, 50 10 C 75 0, 80 40, 50 45 Z" fill="url(#ashette-hair-grad)" />
                    <path d="M40 40 C 25 35, 30 15, 40 25 Z" fill="url(#ashette-hair-grad)" opacity="0.8">
                         <animateTransform attributeName="transform" type="rotate" values="-5 40 40; 5 40 40; -5 40 40" dur="3s" repeatCount="indefinite"/>
                    </path>
                     <path d="M60 40 C 75 35, 70 15, 60 25 Z" fill="url(#ashette-hair-grad)" opacity="0.8">
                         <animateTransform attributeName="transform" type="rotate" values="5 60 40; -5 60 40; 5 60 40" dur="3s" repeatCount="indefinite" begin="-1.5s"/>
                    </path>
                </g>

                {/* Big Anime Eyes */}
                <g>
                    {/* Left Eye */}
                    <ellipse cx="40" cy="65" rx="7" ry="9" fill="#8D6E63" />
                    <ellipse cx="40" cy="63" rx="5" ry="7" fill="#BF360C" />
                    <circle cx="38" cy="61" r="2.5" fill="white" />
                    <circle cx="42" cy="66" r="1" fill="white" opacity="0.7"/>

                    {/* Right Eye */}
                    <ellipse cx="60" cy="65" rx="7" ry="9" fill="#8D6E63" />
                    <ellipse cx="60" cy="63" rx="5" ry="7" fill="#BF360C" />
                    <circle cx="58" cy="61" r="2.5" fill="white" />
                    <circle cx="62"cy="66" r="1" fill="white" opacity="0.7"/>
                </g>
                
                {/* Mouth */}
                <path d="M48 78 C 50 80, 52 80, 54 78" stroke="#BF360C" fill="none" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        </svg>
    );
};