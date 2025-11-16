import React, { useState, useEffect } from 'react';
import { DragAndDropGameData } from '../lib/gemini';
import PuzzleContainer from '../components/puzzles/PuzzleContainer';
import BackButton from '../components/BackButton';

interface DragAndDropGameScreenProps {
    gameData: DragAndDropGameData | null;
    onBack: () => void;
}

interface Item {
    id: number;
    text: string;
    correctCategory: string;
}

interface ItemLocations {
    [key: string]: Item[];
}

const DragAndDropGameScreen: React.FC<DragAndDropGameScreenProps> = ({ gameData, onBack }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [locations, setLocations] = useState<ItemLocations>({});
    const [draggedItem, setDraggedItem] = useState<Item | null>(null);
    const [feedback, setFeedback] = useState<{[itemId: number]: 'correct' | 'incorrect'}>({});

    useEffect(() => {
        if (gameData && Array.isArray(gameData.items) && Array.isArray(gameData.categories)) {
            const initialItems = gameData.items.map((item, index) => ({
                id: index,
                text: item.text,
                correctCategory: item.category,
            }));
            setItems(initialItems);

            const initialLocations: ItemLocations = { 'unassigned': initialItems };
            gameData.categories.forEach(cat => initialLocations[cat] = []);
            setLocations(initialLocations);
            setFeedback({});
        }
    }, [gameData]);

    if (!gameData || !Array.isArray(gameData.categories) || !Array.isArray(gameData.items)) {
        return (
             <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't find your game. The generated data might be incomplete.</p>
            </div>
        );
    }
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetCategory: string) => {
        e.preventDefault();
        if (!draggedItem) return;

        const newLocations = { ...locations };
        
        // Find and remove item from its current location
        Object.keys(newLocations).forEach(key => {
            newLocations[key] = newLocations[key].filter(i => i.id !== draggedItem.id);
        });

        // Add item to the new location
        newLocations[targetCategory] = [...(newLocations[targetCategory] || []), draggedItem];
        
        setLocations(newLocations);
        setDraggedItem(null);
        setFeedback({}); // Reset feedback on move
    };

    const checkAnswers = () => {
        const newFeedback: {[itemId: number]: 'correct' | 'incorrect'} = {};
        Object.keys(locations).forEach(category => {
            if (category !== 'unassigned') {
                const items = locations[category];
                items.forEach(item => {
                    newFeedback[item.id] = item.correctCategory === category ? 'correct' : 'incorrect';
                });
            }
        });
        setFeedback(newFeedback);
    };

    const getFeedbackClass = (itemId: number) => {
        if (feedback[itemId] === 'correct') return 'border-green-400 bg-green-100/80';
        if (feedback[itemId] === 'incorrect') return 'border-red-400 bg-red-100/80';
        return 'border-transparent';
    }

    const { title, instruction, categories } = gameData;

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <BackButton onBack={onBack} />
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center pt-10">
                <PuzzleContainer title={title}>
                    <p className="text-center mb-6 text-aurora-dark-text/70">{instruction}</p>

                    {/* Drop Zones */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {categories.map(category => (
                            <div 
                                key={category} 
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, category)}
                                className="p-4 rounded-xl bg-white/30 backdrop-blur-sm min-h-[150px] border-2 border-dashed border-white/50 transition-colors duration-300"
                            >
                                <h3 className="font-handwritten text-2xl text-center text-aurora-dark-text/80 mb-2">{category}</h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {locations[category]?.map(item => (
                                        <div 
                                            key={item.id}
                                            draggable 
                                            onDragStart={(e) => handleDragStart(e, item)}
                                            className={`p-2 rounded-lg bg-white/70 shadow-sm cursor-grab active:cursor-grabbing border ${getFeedbackClass(item.id)}`}
                                        >
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Unassigned Items */}
                    <div 
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'unassigned')}
                        className="p-4 rounded-xl bg-black/5 min-h-[100px]"
                    >
                         <h3 className="font-semibold text-center text-aurora-dark-text/60 mb-2 text-sm">Items to Categorize</h3>
                         <div className="flex flex-wrap gap-2 justify-center">
                            {locations['unassigned']?.map(item => (
                                <div 
                                    key={item.id}
                                    draggable 
                                    onDragStart={(e) => handleDragStart(e, item)}
                                    className="p-2 rounded-lg bg-white/70 shadow-md cursor-grab active:cursor-grabbing border border-transparent"
                                >
                                    {item.text}
                                </div>
                            ))}
                         </div>
                    </div>
                     <div className="text-center pt-6">
                        <button onClick={checkAnswers} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                            Check Answers
                        </button>
                    </div>
                </PuzzleContainer>
            </div>
        </div>
    );
};

export default DragAndDropGameScreen;