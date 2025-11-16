import React, { useState } from 'react';
import { PuzzleData } from '../App';
import CrosswordPuzzle from '../components/puzzles/CrosswordPuzzle';
import FillInTheBlanksPuzzle from '../components/puzzles/FillInTheBlanksPuzzle';
import MatchingPuzzle from '../components/puzzles/MatchingPuzzle';
import WordSearchPuzzle from '../components/puzzles/WordSearchPuzzle';
import BackButton from '../components/BackButton';

interface PuzzleScreenProps {
    puzzles: PuzzleData | null;
    onBack: () => void;
}

type PuzzleType = 'crossword' | 'wordSearch' | 'fillInTheBlanks' | 'matching';

const PuzzleScreen: React.FC<PuzzleScreenProps> = ({ puzzles, onBack }) => {
    
    const availablePuzzles = Object.keys(puzzles || {}).filter(key => puzzles?.[key as keyof PuzzleData]) as PuzzleType[];
    const [activePuzzle, setActivePuzzle] = useState<PuzzleType>(availablePuzzles[0] || 'crossword');

    if (!puzzles) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't find your puzzles.</p>
                <BackButton onBack={onBack} />
            </div>
        );
    }
    
    const renderActivePuzzle = () => {
        switch (activePuzzle) {
            case 'crossword':
                return puzzles.crossword ? <CrosswordPuzzle data={puzzles.crossword} /> : null;
            case 'wordSearch':
                return puzzles.wordSearch ? <WordSearchPuzzle data={puzzles.wordSearch} /> : null;
            case 'fillInTheBlanks':
                return puzzles.fillInTheBlanks ? <FillInTheBlanksPuzzle data={puzzles.fillInTheBlanks} /> : null;
            case 'matching':
                return puzzles.matching ? <MatchingPuzzle data={puzzles.matching} /> : null;
            default:
                return <p>Select a puzzle to begin!</p>;
        }
    }

    const puzzleTypeToName = (type: PuzzleType) => {
        switch (type) {
            case 'crossword': return 'Crossword';
            case 'wordSearch': return 'Word Search';
            case 'fillInTheBlanks': return 'Fill in the Blanks';
            case 'matching': return 'Matching';
        }
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 lg:p-8 flex flex-col items-center">
             <BackButton onBack={onBack} />
             <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                <h1 className="font-handwritten text-4xl sm:text-5xl text-aurora-dark-text/80 my-4" style={{textShadow: '0 1px 3px rgba(255,255,255,0.5)'}}>
                    Puzzle Time!
                </h1>

                {/* Glassy Tabs */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 my-4 p-2 bg-white/30 backdrop-blur-sm rounded-full shadow-lg">
                    {availablePuzzles.map(type => (
                        <button 
                            key={type}
                            onClick={() => setActivePuzzle(type)}
                            className={`relative text-center overflow-hidden font-semibold text-xs sm:text-sm
                                       py-2 px-4 sm:px-6 rounded-full transition-all duration-300 ease-in-out
                                       ${activePuzzle === type 
                                            ? 'bg-white/70 text-aurora-dark-text shadow-md' 
                                            : 'bg-transparent text-aurora-dark-text/60 hover:bg-white/50'
                                        }`}
                        >
                            {puzzleTypeToName(type)}
                        </button>
                    ))}
                </div>

                {/* Puzzle Display Area */}
                <div className="w-full animate-fade-in mt-4">
                    {renderActivePuzzle()}
                </div>
             </div>
        </div>
    );
};

export default PuzzleScreen;