import React, { useState } from 'react';
import { OutsideTheBoxData } from '../lib/gemini';
import BackButton from '../components/BackButton';
import PuzzleContainer from '../components/puzzles/PuzzleContainer';

interface OutsideTheBoxScreenProps {
    gameData: OutsideTheBoxData | null;
    onBack: () => void;
}

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM9 11a1 1 0 11-2 0 1 1 0 012 0zM4.343 5.757a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 16a1 1 0 10-2 0v1a1 1 0 102 0v-1zM4 11a1 1 0 100-2 1 1 0 000 2zM15.657 14.243a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM10 18a7 7 0 100-14 7 7 0 000 14z" />
    </svg>
);


const OutsideTheBoxScreen: React.FC<OutsideTheBoxScreenProps> = ({ gameData, onBack }) => {
    const [revealedHintCount, setRevealedHintCount] = useState(0);
    const [isSolutionVisible, setIsSolutionVisible] = useState(false);

    if (!gameData || !gameData.problemStatement || !Array.isArray(gameData.hints) || !gameData.solutionExplanation) {
        return (
            <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't create your creative problem. The generated data is incomplete.</p>
            </div>
        );
    }

    const revealNextHint = () => {
        if (gameData && revealedHintCount < gameData.hints.length) {
            setRevealedHintCount(prev => prev + 1);
        }
    };

    const { title, problemStatement, hints, solutionExplanation } = gameData;

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
            <BackButton onBack={onBack} />
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
                <PuzzleContainer title={title}>
                    <div className="animate-fade-in">
                        <p className="text-lg text-aurora-dark-text/90 mb-6 leading-relaxed text-center font-semibold">{problemStatement}</p>
                        
                        {/* Hints Section */}
                        <div className="space-y-3 my-6">
                            {hints.slice(0, revealedHintCount).map((hint, index) => (
                                <div key={index} className="p-3 bg-white/20 rounded-lg animate-fade-in">
                                    <p><span className="font-bold">Hint {index + 1}:</span> {hint}</p>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        {!isSolutionVisible && (
                             <div className="flex justify-center items-center gap-4 mt-4">
                                <button 
                                    onClick={revealNextHint}
                                    disabled={revealedHintCount >= hints.length}
                                    className="bg-aurora-gold/80 hover:bg-aurora-gold text-white font-bold py-2 px-6 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    <LightbulbIcon />
                                    Reveal Hint
                                </button>
                                <button 
                                    onClick={() => setIsSolutionVisible(true)}
                                    className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
                                >
                                    Reveal Solution
                                </button>
                             </div>
                        )}

                        {/* Solution Section */}
                        {isSolutionVisible && (
                            <div className="mt-6 p-4 bg-green-100/50 border-t-2 border-green-300 animate-fade-in">
                                <h3 className="text-xl font-bold text-green-800 text-center mb-2">The Solution</h3>
                                <p className="text-green-900/90 leading-relaxed">{solutionExplanation}</p>
                            </div>
                        )}
                    </div>
                </PuzzleContainer>
            </div>
        </div>
    );
};

export default OutsideTheBoxScreen;