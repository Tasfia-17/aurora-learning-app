import React, { useState } from 'react';
import { MiniAdventureData } from '../lib/gemini';
import BackButton from '../components/BackButton';
import { AvatarData } from '../App';

interface MiniAdventureScreenProps {
    gameData: MiniAdventureData | null;
    avatar: AvatarData;
    onBack: () => void;
}

// Speech Bubble Component
const SpeechBubble: React.FC<{ text: string }> = ({ text }) => (
    <div className="relative bg-white/60 backdrop-blur-sm p-3 rounded-lg rounded-bl-none shadow-md text-aurora-dark-text/90 font-semibold text-sm sm:text-base">
        <p>"{text}"</p>
        <div className="absolute left-0 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white/60"></div>
    </div>
);

const MiniAdventureScreen: React.FC<MiniAdventureScreenProps> = ({ gameData, avatar, onBack }) => {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'conclusion'>('intro');
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const isDataValid = gameData &&
        Array.isArray(gameData.stages) &&
        gameData.stages.length > 0 &&
        gameData.stages.every(stage => 
            stage &&
            typeof stage.description === 'string' &&
            typeof stage.companionDialogue === 'string' &&
            stage.challenge &&
            typeof stage.challenge.question === 'string' &&
            Array.isArray(stage.challenge.options) &&
            typeof stage.challenge.correctAnswer === 'string' &&
            typeof stage.successResponse === 'string' &&
            typeof stage.failureResponse === 'string'
        );

    if (!isDataValid) {
        return (
             <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't create your adventure. The generated data might be incomplete.</p>
            </div>
        );
    }

    const currentStage = gameData.stages[currentStageIndex];

    const handleOptionClick = (option: string) => {
        if (feedback) return;

        setSelectedOption(option);
        if (option === currentStage.challenge.correctAnswer) {
            setFeedback(currentStage.successResponse);
        } else {
            setFeedback(currentStage.failureResponse);
        }
    };

    const handleNext = () => {
        if (currentStageIndex < gameData.stages.length - 1) {
            setCurrentStageIndex(prev => prev + 1);
            setSelectedOption(null);
            setFeedback(null);
        } else {
            setGameState('conclusion');
        }
    };

    const handleStartAdventure = () => {
        setGameState('playing');
        setCurrentStageIndex(0);
        setSelectedOption(null);
        setFeedback(null);
    };
    
    const getOptionClass = (option: string) => {
        if (!feedback) return 'bg-white/30 hover:bg-white/50 border-transparent';
        
        const isCorrectAnswer = option === currentStage.challenge.correctAnswer;
        const isSelectedOption = option === selectedOption;

        if (isCorrectAnswer) {
            return 'bg-green-300 border-green-400 scale-105';
        }
        if (isSelectedOption && option !== currentStage.challenge.correctAnswer) {
            return 'bg-red-300 border-red-400';
        }
        
        return 'bg-white/30 border-transparent opacity-60';
    };

    const renderContent = () => {
        switch(gameState) {
            case 'intro':
                return (
                    <div className="text-center animate-fade-in">
                        <p className="text-aurora-dark-text/80 mb-6 leading-relaxed">{gameData.introduction}</p>
                        <button onClick={handleStartAdventure} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                            Start Adventure!
                        </button>
                    </div>
                );
            case 'conclusion':
                 return (
                    <div className="text-center animate-fade-in">
                        <p className="text-aurora-dark-text/80 mb-6 leading-relaxed">{gameData.conclusion}</p>
                        <button onClick={onBack} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                            Return to Hub
                        </button>
                    </div>
                );
            case 'playing':
                return (
                     <div className="animate-fade-in flex flex-col items-center">
                        <div className="w-full flex items-center gap-4 mb-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 animate-bounce-sm">
                                <avatar.component />
                            </div>
                            <SpeechBubble text={currentStage.companionDialogue} />
                        </div>

                        <p className="text-lg text-aurora-dark-text/80 mb-4 leading-relaxed">{currentStage.description}</p>
                        
                        <div className="my-6 w-full border-t border-b border-white/40 py-4">
                            <h3 className="text-xl font-bold text-aurora-dark-text text-center">{currentStage.challenge.question}</h3>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                            {currentStage.challenge.options.map((option, i) => (
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
                            <div className="mt-6 w-full p-4 bg-white/20 rounded-lg animate-fade-in">
                                <p className="font-semibold text-center text-aurora-dark-text/90">{feedback}</p>
                                <div className="text-center mt-4">
                                    <button onClick={handleNext} className="bg-white/50 hover:bg-white/80 text-aurora-dark-text font-bold py-2 px-6 rounded-full transition-colors duration-300">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
        }
    };
    

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

export default MiniAdventureScreen;