import React from 'react';

export const Revnant: React.FC = () => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                 <linearGradient id="revnant-body-grad" y2="1">
                    <stop offset="0%" stopColor="#795548" />
                    <stop offset="100%" stopColor="#5D4037" />
                </linearGradient>
                <linearGradient id="revnant-moss-grad" y2="1">
                    <stop offset="0%" stopColor="#AED581" />
                    <stop offset="100%" stopColor="#7CB342" />
                </linearGradient>
                <radialGradient id="revnant-belly-grad">
                    <stop offset="0%" stopColor="#EFEBE9" />
                    <stop offset="100%" stopColor="#D7CCC8" />
                </radialGradient>
                 <filter id="revnant-shroom-glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                </filter>
            </defs>
            <g className="animate-float-subtle">
                {/* Body */}
                <path d="M50 100 C 10 100, 10 50, 50 20 C 90 50, 90 100, 50 100 Z" fill="url(#revnant-body-grad)" />
                <path d="M50 85 C 30 88, 25 70, 50 65 C 75 70, 70 88, 50 85 Z" fill="url(#revnant-belly-grad)" />

                {/* Moss Patch on Head */}
                <path d="M50 20 C 40 15, 60 15, 50 20 L 35 30 Q 50 25, 65 30 Z" fill="url(#revnant-moss-grad)"/>

                {/* Ears */}
                <path d="M35 30 C 25 20, 40 20, 35 30 L 30 20 Z" fill="url(#revnant-body-grad)"/>
                <path d="M65 30 C 75 20, 60 20, 65 30 L 70 20 Z" fill="url(#revnant-body-grad)"/>

                {/* Glowing Mushroom */}
                <g transform="translate(18, -5)">
                    <g filter="url(#revnant-shroom-glow)" opacity="0.8">
                        <path d="M70 65 C 65 60, 75 60, 70 65 L 70 58 Z" fill="#80DEEA" />
                    </g>
                    <path d="M70 65 C 65 60, 75 60, 70 65 L 70 58 Z" fill="#4DD0E1" />
                    <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="3s" repeatCount="indefinite" />
                </g>

                {/* Simple Dot Eyes */}
                <circle cx="42" cy="55" r="4" fill="#3E2723"/>
                <circle cx="58" cy="55" r="4" fill="#3E2723"/>

                {/* Blinking Animation */}
                <g fill="url(#revnant-body-grad)">
                     <animate attributeName="d" path="M38 53 h8 v0; M38 53 h8 v4; M38 53 h8 v0" dur="6s" repeatCount="indefinite" begin="-2s" />
                     <animate attributeName="d" path="M54 53 h8 v0; M54 53 h8 v4; M54 53 h8 v0" dur="6s" repeatCount="indefinite" begin="-2s" />
                </g>

                {/* Little leaf */}
                <g transform="translate(-15, 20)">
                    <animateTransform attributeName="transform" type="rotate" values="-5 50 25; 5 50 25; -5 50 25" dur="4s" repeatCount="indefinite" />
                    <path d="M45 55 C 40 50, 50 50, 45 55 L 45 45 Z" fill="url(#revnant-moss-grad)"/>
                </g>
            </g>
        </svg>
    );
};