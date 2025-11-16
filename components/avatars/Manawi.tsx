import React from 'react';

export const Manawi: React.FC = () => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="manawi-skin-grad" y2="1">
                    <stop offset="0%" stopColor="#C8E6C9" />
                    <stop offset="100%" stopColor="#A5D6A7" />
                </linearGradient>
                <linearGradient id="manawi-leaf-grad" y2="1">
                    <stop offset="0%" stopColor="#81C784" />
                    <stop offset="100%" stopColor="#4CAF50" />
                </linearGradient>
                <linearGradient id="manawi-petal-grad" y2="1">
                    <stop offset="0%" stopColor="#F8BBD0" />
                    <stop offset="100%" stopColor="#EC407A" />
                </linearGradient>
                <radialGradient id="manawi-eye-grad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#66BB6A" />
                    <stop offset="100%" stopColor="#2E7D32" />
                </radialGradient>
            </defs>
            <g className="animate-float-subtle">
                {/* Petal Dress */}
                <g transform="translate(50 70)">
                    <path d="M0 0 C -20 -5, -25 20, 0 25 C 25 20, 20 -5, 0 0 Z" fill="url(#manawi-petal-grad)"/>
                    <path d="M0 0 C -15 -3, -20 15, 0 20 C 20 15, 15 -3, 0 0 Z" fill="#FCE4EC"/>
                </g>

                {/* Head */}
                <circle cx="50" cy="50" r="25" fill="url(#manawi-skin-grad)"/>

                 {/* Leafy Wings */}
                <g>
                    <animateTransform attributeName="transform" type="rotate" values="10 30 60; 0 30 60; 10 30 60" dur="1s" repeatCount="indefinite" />
                    <path d="M30 60 C 10 50, 15 80, 30 70 Z" fill="url(#manawi-leaf-grad)"/>
                </g>
                 <g>
                    <animateTransform attributeName="transform" type="rotate" values="-10 70 60; 0 70 60; -10 70 60" dur="1s" repeatCount="indefinite" begin="-0.5s"/>
                    <path d="M70 60 C 90 50, 85 80, 70 70 Z" fill="url(#manawi-leaf-grad)"/>
                </g>

                {/* Leaf Hair */}
                <g>
                     <animateTransform attributeName="transform" type="rotate" values="-3 50 25; 3 50 25; -3 50 25" dur="5s" repeatCount="indefinite"/>
                    <path d="M50 25 C 30 20, 35 40, 50 40 Z" fill="url(#manawi-leaf-grad)"/>
                    <path d="M50 25 C 70 20, 65 40, 50 40 Z" fill="url(#manawi-leaf-grad)"/>
                </g>

                {/* Huge Anime Eyes */}
                <g>
                    {/* Left Eye */}
                    <ellipse cx="40" cy="52" rx="10" ry="12" fill="white" />
                    <ellipse cx="40" cy="54" rx="8" ry="10" fill="url(#manawi-eye-grad)" />
                    <circle cx="37" cy="49" r="4" fill="white" />
                    <circle cx="43" cy="58" r="1.5" fill="white" opacity="0.8"/>

                    {/* Right Eye */}
                    <ellipse cx="60" cy="52" rx="10" ry="12" fill="white" />
                    <ellipse cx="60" cy="54" rx="8" ry="10" fill="url(#manawi-eye-grad)" />
                    <circle cx="57" cy="49" r="4" fill="white" />
                    <circle cx="63" cy="58" r="1.5" fill="white" opacity="0.8"/>
                </g>
                 {/* Mouth */}
                <path d="M48 65 C 50 67, 52 67, 54 65" stroke="#2E7D32" fill="none" strokeWidth="1" strokeLinecap="round" />
            </g>
        </svg>
    );
};