import React, { useState, useMemo } from 'react';
import PuzzleContainer from './PuzzleContainer';

interface WordSearchData {
    title: string;
    grid: string[][];
    words: string[];
}

const WordSearchPuzzle: React.FC<{ data: WordSearchData }> = ({ data }) => {
    const { title, grid, words } = data;
    const gridSize = grid.length;
    
    const [isSelecting, setIsSelecting] = useState(false);
    const [startCell, setStartCell] = useState<{row: number, col: number} | null>(null);
    const [currentCell, setCurrentCell] = useState<{row: number, col: number} | null>(null);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    
    const normalizedWords = useMemo(() => words.map(w => w.toUpperCase()), [words]);

    const handleMouseDown = (row: number, col: number) => {
        setIsSelecting(true);
        setStartCell({ row, col });
        setCurrentCell({ row, col });
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isSelecting) {
            setCurrentCell({ row, col });
        }
    };
    
    const handleMouseUp = () => {
        if (!isSelecting || !startCell || !currentCell) return;

        let selectedString = '';
        const { row: r1, col: c1 } = startCell;
        const { row: r2, col: c2 } = currentCell;

        if (r1 === r2) { // Horizontal
            const [start, end] = c1 < c2 ? [c1, c2] : [c2, c1];
            for (let i = start; i <= end; i++) selectedString += grid[r1][i];
        } else if (c1 === c2) { // Vertical
            const [start, end] = r1 < r2 ? [r1, r2] : [r2, r1];
            for (let i = start; i <= end; i++) selectedString += grid[i][c1];
        } else if (Math.abs(r2 - r1) === Math.abs(c2 - c1)) { // Diagonal
            const rowStep = r1 < r2 ? 1 : -1;
            const colStep = c1 < c2 ? 1 : -1;
            let [r, c] = [r1, c1];
            while (true) {
                selectedString += grid[r][c];
                if (r === r2 && c === c2) break;
                r += rowStep;
                c += colStep;
            }
        }
        
        const reversedString = selectedString.split('').reverse().join('');
        if (normalizedWords.includes(selectedString) && !foundWords.includes(selectedString)) {
            setFoundWords(prev => [...prev, selectedString]);
        } else if (normalizedWords.includes(reversedString) && !foundWords.includes(reversedString)) {
            setFoundWords(prev => [...prev, reversedString]);
        }

        setIsSelecting(false);
        setStartCell(null);
        setCurrentCell(null);
    };

    const isCellSelected = (row: number, col: number) => {
        if (!isSelecting || !startCell || !currentCell) return false;
        
        const { row: r1, col: c1 } = startCell;
        const { row: r2, col: c2 } = currentCell;

        // Horizontal
        if (r1 === r2 && r1 === row && col >= Math.min(c1, c2) && col <= Math.max(c1, c2)) return true;
        // Vertical
        if (c1 === c2 && c1 === col && row >= Math.min(r1, r2) && row <= Math.max(r1, r2)) return true;
        // Diagonal
        if (Math.abs(r2 - r1) === Math.abs(c2 - c1) && Math.abs(row - r1) === Math.abs(col - c1) && (row-r1)/(col-c1) === (r2-r1)/(c2-c1)) {
            if (row >= Math.min(r1, r2) && row <= Math.max(r1, r2) && col >= Math.min(c1, c2) && col <= Math.max(c1, c2)) return true;
        }

        return false;
    };

    return (
        <PuzzleContainer title={title}>
            <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
                {/* Grid */}
                 <div className="flex-shrink-0 mx-auto select-none" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                     <div 
                        className="grid bg-white/50 p-2 rounded-lg shadow-inner cursor-pointer"
                        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
                    >
                        {grid.map((row, rIndex) => row.map((letter, cIndex) => (
                             <div 
                                key={`${rIndex}-${cIndex}`} 
                                className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-sm sm:text-base font-bold uppercase text-aurora-dark-text/80 transition-colors duration-100
                                ${isCellSelected(rIndex, cIndex) ? 'bg-yellow-300 rounded-md' : ''}`}
                                onMouseDown={() => handleMouseDown(rIndex, cIndex)}
                                onMouseEnter={() => handleMouseEnter(rIndex, cIndex)}
                            >
                                {letter}
                            </div>
                        )))}
                    </div>
                 </div>

                {/* Word List */}
                <div className="w-full md:w-64 flex-shrink-0">
                     <h3 className="font-bold text-lg mb-2 text-aurora-dark-text/80 text-center">Find these words:</h3>
                     <div className="columns-2 sm:columns-3 md:columns-2 bg-white/30 p-3 rounded-lg">
                        <ul className="space-y-1">
                            {words.map((word, i) => (
                                <li key={i} className={`text-sm sm:text-base font-semibold break-inside-avoid transition-all duration-300 ${foundWords.includes(word.toUpperCase()) ? 'line-through text-gray-400' : ''}`}>
                                    {word}
                                </li>
                            ))}
                        </ul>
                     </div>
                </div>
            </div>
        </PuzzleContainer>
    );
};

export default WordSearchPuzzle;