import React, { useState } from 'react';
import { ScenariosAndAnalogiesData } from '../lib/gemini';
import BackButton from '../components/BackButton';

interface ScenariosAndAnalogiesScreenProps {
    gameData: ScenariosAndAnalogiesData | null;
    onBack: () => void;
}

const ScenariosAndAnalogiesScreen: React.FC<ScenariosAndAnalogiesScreenProps> = ({ gameData, onBack }) => {
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    if (!gameData || !Array.isArray(gameData.challenges) || gameData.challenges.length === 0) {
        return (
             <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't find your challenges. The generated data is incomplete.</p>
            </div>
        );
    }

    const currentChallenge = gameData.challenges[currentChallengeIndex];

    const handleOptionClick = (option: string) => {
        if (feedback) return;

        setSelectedOption(option);
        if (option === currentChallenge.correctAnswer) {
            setFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            setFeedback('incorrect');
        }
    };

    const handleNext = () => {
        if (currentChallengeIndex < gameData.challenges.length - 1) {
            setCurrentChallengeIndex(prev => prev + 1);
            setSelectedOption(null);
            setFeedback(null);
        } else {
            setIsFinished(true);
        }
    };
    
    const getOptionClass = (option: string) => {
        if (!feedback) return 'bg-white/30 hover:bg-white/50 border-transparent';
        
        const isCorrectAnswer = option === currentChallenge.correctAnswer;
        const isSelectedOption = option === selectedOption;

        if (isCorrectAnswer) {
            return 'bg-green-300 border-green-400 scale-105';
        }
        if (isSelectedOption && feedback === 'incorrect') {
            return 'bg-red-300 border-red-400';
        }
        
        return 'bg-white/30 border-transparent opacity-60';
    }

    const renderContent = () => {
        if (isFinished) {
            return (
                <div className="text-center animate-fade-in">
                    <h3 className="text-2xl font-bold text-aurora-dark-text mb-2">Challenge Complete!</h3>
                    <p className="text-xl text-aurora-dark-text/80 mb-6">Your final score: <span className="font-bold text-aurora-purple">{score} / {gameData.challenges.length}</span></p>
                    <button onClick={onBack} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                        Back to Hub
                    </button>
                </div>
            );
        }

        return (
            <div className="animate-fade-in">
                <div className="text-center mb-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-aurora-purple/80 px-3 py-1 rounded-full bg-aurora-purple/10">{currentChallenge.type}</span>
                    <h3 className="text-xl font-bold text-aurora-dark-text mt-2">{currentChallenge.title}</h3>
                </div>

                <p className="text-lg text-aurora-dark-text/80 mb-4 leading-relaxed bg-white/20 p-4 rounded-lg">{currentChallenge.text}</p>
                
                <div className="my-6 border-t border-b border-white/40 py-4">
                    <h3 className="text-lg font-bold text-aurora-dark-text text-center">{currentChallenge.question}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChallenge.options.map((option, i) => (
                        <button 
                            key={i}
                            onClick={() => handleOptionClick(option)}
                            disabled={!!feedback}
                            className={`p-3 rounded-xl shadow-md border text-md font-semibold transition-all duration-300 ${getOptionClass(option)} text-aurora-dark-text text-left`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                
                {feedback && (
                    <div className="mt-6 p-4 bg-white/20 rounded-lg animate-fade-in">
                        <p className="font-semibold text-center text-aurora-dark-text/90">{currentChallenge.explanation}</p>
                        <div className="text-center mt-4">
                            <button onClick={handleNext} className="bg-white/50 hover:bg-white/80 text-aurora-dark-text font-bold py-2 px-6 rounded-full transition-colors duration-300">
                                {currentChallengeIndex < gameData.challenges.length - 1 ? 'Next' : 'Finish'}
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

export default ScenariosAndAnalogiesScreen;