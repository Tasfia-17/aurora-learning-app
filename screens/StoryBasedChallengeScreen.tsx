import React, { useState } from 'react';
import { StoryBasedChallengeData, StoryNode } from '../lib/gemini';
import BackButton from '../components/BackButton';

interface StoryBasedChallengeScreenProps {
    gameData: StoryBasedChallengeData | null;
    onBack: () => void;
}

const StoryBasedChallengeScreen: React.FC<StoryBasedChallengeScreenProps> = ({ gameData, onBack }) => {
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<{ text: string, feedback: string, isCorrect: boolean } | null>(null);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'conclusion'>('intro');

    if (!gameData || !Array.isArray(gameData.nodes) || gameData.nodes.length === 0) {
        return (
             <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't find your story.</p>
            </div>
        );
    }

    const handleOptionClick = (option: StoryNode['options'][0]) => {
        if (selectedOption) return;
        setSelectedOption(option);
    };

    const handleNext = () => {
        setSelectedOption(null);
        if (currentNodeIndex < gameData.nodes.length - 1) {
            setCurrentNodeIndex(prev => prev + 1);
        } else {
            setGameState('conclusion');
        }
    };
    
    const handleStartStory = () => {
        setGameState('playing');
        setCurrentNodeIndex(0);
        setSelectedOption(null);
    }
    
    const getOptionClass = (option: StoryNode['options'][0]) => {
        if (!selectedOption) return 'bg-white/30 hover:bg-white/50 border-transparent';
        
        if (selectedOption.text === option.text) {
             return option.isCorrect ? 'bg-green-300 border-green-400 scale-105' : 'bg-red-300 border-red-400 scale-105';
        }
        
        return 'bg-white/30 border-transparent opacity-60';
    }
    
    const currentNode = gameData.nodes[currentNodeIndex];

    const renderContent = () => {
        if (gameState === 'intro') {
            return (
                <div className="text-center animate-fade-in">
                    <p className="text-aurora-dark-text/70 mb-6">{gameData.introduction}</p>
                    <button onClick={handleStartStory} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                        Begin Adventure
                    </button>
                </div>
            );
        }

        if (gameState === 'conclusion') {
             return (
                <div className="text-center animate-fade-in">
                    <p className="text-aurora-dark-text/70 mb-6">{gameData.conclusion}</p>
                    <button onClick={onBack} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                        Finish
                    </button>
                </div>
            );
        }

        return (
            <div className="animate-fade-in">
                <p className="text-lg text-aurora-dark-text/80 mb-4 leading-relaxed">{currentNode.storyText}</p>
                <div className="my-6 border-t border-b border-white/40 py-4">
                    <h3 className="text-xl font-bold text-aurora-dark-text text-center">{currentNode.question}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentNode.options.map((option, i) => (
                        <button 
                            key={i}
                            onClick={() => handleOptionClick(option)}
                            disabled={!!selectedOption}
                            className={`p-3 rounded-xl shadow-md border text-md font-semibold transition-all duration-300 ${getOptionClass(option)} text-aurora-dark-text text-left`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
                
                {selectedOption && (
                    <div className="mt-6 p-4 bg-white/20 rounded-lg animate-fade-in">
                        <p className="font-semibold text-center text-aurora-dark-text/90">{selectedOption.feedback}</p>
                        <div className="text-center mt-4">
                            <button onClick={handleNext} className="bg-white/50 hover:bg-white/80 text-aurora-dark-text font-bold py-2 px-6 rounded-full transition-colors duration-300">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
            <BackButton onBack={onBack} />
             <div className="w-full max-w-3xl mx-auto">
                 <div className="w-full p-0.5 rounded-2xl bg-gradient-to-r from-aurora-purple/30 via-white/50 to-aurora-purple/30 shadow-2xl shadow-aurora-purple/10">
                    <div className="bg-white/40 backdrop-blur-sm rounded-[14px] p-6 sm:p-8">
                        <h2 className="font-handwritten text-4xl text-center mb-6 text-aurora-dark-text/80">
                            {gameData.title}
                        </h2>
                        <div className="font-nunito text-aurora-dark-text/90">
                           {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryBasedChallengeScreen;