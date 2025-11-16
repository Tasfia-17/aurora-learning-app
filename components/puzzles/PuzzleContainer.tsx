import React from 'react';

interface PuzzleContainerProps {
    title: string;
    children: React.ReactNode;
}

const PuzzleContainer: React.FC<PuzzleContainerProps> = ({ title, children }) => {
    return (
        <div className="w-full max-w-5xl mx-auto p-0.5 rounded-2xl bg-gradient-to-r from-aurora-purple/30 via-white/50 to-aurora-purple/30 shadow-2xl shadow-aurora-purple/10">
            <div className="bg-white/40 backdrop-blur-sm rounded-[14px] p-4 sm:p-6">
                <h2 className="font-handwritten text-3xl text-center mb-4 text-aurora-dark-text/80">
                    {title}
                </h2>
                <div className="font-nunito text-aurora-dark-text/90">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PuzzleContainer;
