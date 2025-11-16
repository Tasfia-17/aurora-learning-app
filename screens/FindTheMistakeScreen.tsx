import React, { useState, useMemo } from 'react';
import { FindTheMistakeData, Mistake } from '../lib/gemini';
import PuzzleContainer from '../components/puzzles/PuzzleContainer';
import BackButton from '../components/BackButton';

interface FindTheMistakeScreenProps {
    gameData: FindTheMistakeData | null;
    onBack: () => void;
}

const FindTheMistakeScreen: React.FC<FindTheMistakeScreenProps> = ({ gameData, onBack }) => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [foundMistakes, setFoundMistakes] = useState<Mistake[]>([]);
    const [incorrectAttempt, setIncorrectAttempt] = useState(false);

    if (!gameData || !gameData.challengeText || !Array.isArray(gameData.mistakes) || gameData.mistakes.length === 0) {
        return (
             <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't create your challenge. The generated data might be incomplete.</p>
            </div>
        );
    }

    const words = useMemo(() => gameData.challengeText.split(' '), [gameData.challengeText]);

    const handleWordClick = (index: number) => {
        if (incorrectAttempt) setIncorrectAttempt(false);

        // Check if this word is already part of a found mistake
        const word = words[index];
        const isFound = foundMistakes.some(m => {
            const mistakeWords = m.incorrectText.split(' ');
            for (let i=0; i < words.length; i++) {
                if (words.slice(i, i + mistakeWords.length).join(' ') === m.incorrectText) {
                    if(index >= i && index < i + mistakeWords.length) return true;
                }
            }
            return false;
        });

        if (isFound) return; // Don't allow clicking on already corrected words

        setSelectedIndices(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index].sort((a,b)=>a-b)
        );
    };

    const checkAnswer = () => {
        if (selectedIndices.length === 0) return;

        const selectedText = selectedIndices.map(i => words[i]).join(' ').replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
        
        const unfoundMistakes = gameData.mistakes.filter(
            m => !foundMistakes.some(fm => fm.incorrectText === m.incorrectText)
        );

        const match = unfoundMistakes.find(
            m => m.incorrectText.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"") === selectedText
        );
        
        if (match) {
            setFoundMistakes(prev => [...prev, match]);
        } else {
            setIncorrectAttempt(true);
            setTimeout(() => setIncorrectAttempt(false), 1000);
        }
        setSelectedIndices([]);
    };

    const revealAnswers = () => {
        setFoundMistakes(gameData.mistakes);
        setSelectedIndices([]);
    }

    const renderText = () => {
        let renderedWords: React.ReactNode[] = [];
        let i = 0;
        while(i < words.length) {
            const remainingWords = words.slice(i).join(' ');
            const mistakeFound = foundMistakes.find(m => remainingWords.startsWith(m.incorrectText));

            if (mistakeFound) {
                const mistakeWordCount = mistakeFound.incorrectText.split(' ').length;
                renderedWords.push(
                    <span key={`mistake-${i}`} className="inline-block relative group mx-1">
                        <span className="line-through text-red-500">{mistakeFound.incorrectText}</span>
                        <span className="ml-1 font-bold text-green-600">{mistakeFound.correctText}</span>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-2 bg-aurora-dark-text text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {mistakeFound.explanation}
                        </div>
                    </span>
                );
                i += mistakeWordCount;
            } else {
                 const isSelected = selectedIndices.includes(i);
                 const isIncorrect = incorrectAttempt && isSelected;
                 renderedWords.push(
                     <span 
                        key={i} 
                        onClick={() => handleWordClick(i)}
                        className={`cursor-pointer transition-all duration-200 p-0.5 rounded-md
                        ${isSelected ? 'bg-yellow-200' : 'hover:bg-yellow-100'}
                        ${isIncorrect ? 'bg-red-300' : ''}`}
                    >
                        {words[i]}
                    </span>
                 );
                 renderedWords.push(' ');
                 i++;
            }
        }
        return renderedWords;
    }


    const { title, instruction } = gameData;
    const allFound = foundMistakes.length === gameData.mistakes.length;

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <BackButton onBack={onBack} />
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-10">
                <PuzzleContainer title={title}>
                    <p className="text-center mb-6 text-aurora-dark-text/70">{instruction}</p>
                    
                    <div className="bg-white/30 p-4 sm:p-6 rounded-lg shadow-inner text-lg leading-relaxed min-h-[200px]">
                        {renderText()}
                    </div>
                    
                    {allFound && (
                        <p className="text-center mt-4 font-bold text-green-600 animate-fade-in">
                            Congratulations! You found all the mistakes!
                        </p>
                    )}

                    <div className="text-center pt-6 flex justify-center items-center gap-4">
                        <button 
                            onClick={checkAnswer} 
                            disabled={selectedIndices.length === 0 || allFound}
                            className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            Check Answer
                        </button>
                         <button 
                            onClick={revealAnswers} 
                            disabled={allFound}
                            className="bg-white/50 hover:bg-white/80 text-aurora-dark-text/80 font-bold py-2 px-6 rounded-full transition-colors duration-300 disabled:opacity-50">
                            Reveal Answers
                        </button>
                    </div>
                </PuzzleContainer>
            </div>
        </div>
    );
};

export default FindTheMistakeScreen;