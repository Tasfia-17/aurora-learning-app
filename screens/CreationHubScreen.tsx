import React, { useState, useRef } from 'react';
import { AvatarData, PuzzleData } from '../App';
import { generatePuzzlesFromText, generateDragAndDropGame, DragAndDropGameData, generateFindTheMistakeChallenge, FindTheMistakeData, generateSpeedRoundsChallenge, SpeedRoundsData, generateStoryBasedChallenge, StoryBasedChallengeData, generateScenariosAndAnalogiesChallenge, ScenariosAndAnalogiesData, generateOutsideTheBoxChallenge, OutsideTheBoxData, generateMiniAdventure, MiniAdventureData, generateKnowledgeTrackerData, KnowledgeTrackerData, generateDefaultKnowledgeTrackerData } from '../lib/gemini';

const creationFeatures = [
    { id: 'puzzles', label: "Create Puzzles" },
    { id: 'dnd', label: "Create Drag-and-Drop Games" },
    { id: 'mistakes', label: "Create 'Find the Mistake' Challenges" },
    { id: 'speed', label: "Create Speed Rounds" },
    { id: 'story', label: "Create Story-Based Challenges" },
    { id: 'scenarios', label: "Create Scenarios & Analogies" },
    { id: 'creative', label: "Create 'Outside-the-Box' Problems" },
    { id: 'adventures', label: "Create Mini Adventures" },
    { id: 'tracking', label: "Track Knowledge Transfer" }
];

interface CreationHubScreenProps {
    avatar: AvatarData;
    onPuzzlesGenerated: (puzzles: PuzzleData) => void;
    onDragAndDropGameGenerated: (gameData: DragAndDropGameData) => void;
    onFindTheMistakeGenerated: (gameData: FindTheMistakeData) => void;
    onSpeedRoundsGenerated: (gameData: SpeedRoundsData) => void;
    onStoryBasedChallengeGenerated: (gameData: StoryBasedChallengeData) => void;
    onScenariosAndAnalogiesGenerated: (gameData: ScenariosAndAnalogiesData) => void;
    onOutsideTheBoxGenerated: (gameData: OutsideTheBoxData) => void;
    onMiniAdventureGenerated: (gameData: MiniAdventureData) => void;
    onKnowledgeTrackerGenerated: (gameData: KnowledgeTrackerData) => void;
}

const CreationHubScreen: React.FC<CreationHubScreenProps> = ({ avatar, onPuzzlesGenerated, onDragAndDropGameGenerated, onFindTheMistakeGenerated, onSpeedRoundsGenerated, onStoryBasedChallengeGenerated, onScenariosAndAnalogiesGenerated, onOutsideTheBoxGenerated, onMiniAdventureGenerated, onKnowledgeTrackerGenerated }) => {
    const [notes, setNotes] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loadingFeature, setLoadingFeature] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_CHARS = 5000;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setNotes(text.slice(0, MAX_CHARS));
            };
            reader.readAsText(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleCreatePuzzles = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('puzzles');
        try {
            const result = await generatePuzzlesFromText(notes);
            if (result) {
                onPuzzlesGenerated(result);
            } else {
                alert("Sorry, I couldn't create puzzles from that text. Please try again with different material.");
            }
        } catch (error) {
            console.error("Error generating puzzles:", error);
            alert("An error occurred while conjuring puzzles. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleCreateDragAndDrop = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('dnd');
        try {
            const result = await generateDragAndDropGame(notes);
            if (result) {
                onDragAndDropGameGenerated(result);
            } else {
                alert("Sorry, I couldn't create a game from that text. Please try again.");
            }
        } catch (error) {
            console.error("Error generating drag and drop game:", error);
            alert("An error occurred while conjuring your game. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleCreateFindTheMistake = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('mistakes');
        try {
            const result = await generateFindTheMistakeChallenge(notes);
            if (result) {
                onFindTheMistakeGenerated(result);
            } else {
                alert("Sorry, I couldn't create a challenge from that text. Please try again.");
            }
        } catch (error) {
            console.error("Error generating find the mistake game:", error);
            alert("An error occurred while conjuring your challenge. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleCreateSpeedRounds = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('speed');
        try {
            const result = await generateSpeedRoundsChallenge(notes);
            if (result) {
                onSpeedRoundsGenerated(result);
            } else {
                alert("Sorry, I couldn't create a speed round from that text. Please try again.");
            }
        } catch (error) {
            console.error("Error generating speed round:", error);
            alert("An error occurred while conjuring your speed round. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleCreateStoryBasedChallenge = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('story');
        try {
            const result = await generateStoryBasedChallenge(notes);
            if (result) {
                onStoryBasedChallengeGenerated(result);
            } else {
                alert("Sorry, I couldn't create a story from that text. Please try again.");
            }
        } catch (error) {
            console.error("Error generating story challenge:", error);
            alert("An error occurred while conjuring your story. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };
    
    const handleCreateScenariosAndAnalogies = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('scenarios');
        try {
            const result = await generateScenariosAndAnalogiesChallenge(notes);
            if (result) {
                onScenariosAndAnalogiesGenerated(result);
            } else {
                alert("Sorry, I couldn't create scenarios from that text. Please try again.");
            }
        } catch (error) {
            console.error("Error generating scenarios challenge:", error);
            alert("An error occurred while conjuring your scenarios. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleCreateOutsideTheBox = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('creative');
        try {
            const result = await generateOutsideTheBoxChallenge(notes);
            if (result) {
                onOutsideTheBoxGenerated(result);
            } else {
                alert("Sorry, I couldn't create a creative problem from that text. Please try again.");
            }
        } catch (error) {
            console.error("Error generating creative challenge:", error);
            alert("An error occurred while conjuring your creative problem. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleCreateMiniAdventure = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('adventures');
        try {
            const result = await generateMiniAdventure(notes);
            if (result) {
                onMiniAdventureGenerated(result);
            } else {
                alert("Sorry, I couldn't create an adventure from that text. Please try again.");
            }
        } catch (error) {
            console.error("Error generating mini adventure:", error);
            alert("An error occurred while conjuring your adventure. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleCreateKnowledgeTracker = async () => {
        if (!notes.trim() || loadingFeature) return;

        setLoadingFeature('tracking');
        try {
            const result = await generateKnowledgeTrackerData(notes);
            if (result) {
                onKnowledgeTrackerGenerated(result);
            } else {
                alert("Sorry, I couldn't analyze that text for knowledge tracking. Please try again.");
            }
        } catch (error) {
            console.error("Error generating knowledge tracker:", error);
            alert("An error occurred while analyzing your knowledge. Please check your connection and try again.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleShowDefaultKnowledgeTracker = () => {
        if (loadingFeature) return;
        setLoadingFeature('tracking');
        try {
            const defaultData = generateDefaultKnowledgeTrackerData();
            onKnowledgeTrackerGenerated(defaultData);
        } catch (error) {
            console.error("Error getting default knowledge tracker:", error);
            alert("An error occurred while preparing your tracker.");
        } finally {
            setLoadingFeature(null);
        }
    };

    const handleFeatureClick = (featureId: string) => {
        if (featureId === 'puzzles') {
            handleCreatePuzzles();
        } else if (featureId === 'dnd') {
            handleCreateDragAndDrop();
        } else if (featureId === 'mistakes') {
            handleCreateFindTheMistake();
        } else if (featureId === 'speed') {
            handleCreateSpeedRounds();
        } else if (featureId === 'story') {
            handleCreateStoryBasedChallenge();
        } else if (featureId === 'scenarios') {
            handleCreateScenariosAndAnalogies();
        } else if (featureId === 'creative') {
            handleCreateOutsideTheBox();
        } else if (featureId === 'adventures') {
            handleCreateMiniAdventure();
        } else if (featureId === 'tracking') {
            if (notes.trim()) {
                handleCreateKnowledgeTracker();
            } else {
                handleShowDefaultKnowledgeTracker();
            }
        } else {
            alert('This feature is still brewing!');
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 overflow-hidden relative flex flex-col items-center">
            {/* Animated Glittery Clouds on a pastel background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-1/4 -left-1/4 w-[200%] h-[200%] animate-cloud-drift-slow">
                    <div className="absolute w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.4)_0%,_rgba(255,255,255,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '20%', left: '10%' }}></div>
                    <div className="absolute w-80 h-80 bg-[radial-gradient(ellipse_at_center,_rgba(255,221,238,0.3)_0%,_rgba(255,221,238,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '50%', left: '60%', animationDelay: '2s' }}></div>
                </div>
                 <div className="absolute -top-1/4 -left-1/4 w-[200%] h-[200%] animate-cloud-drift-fast">
                    <div className="absolute w-72 h-72 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '30%', left: '80%', animationDelay: '1s' }}></div>
                    <div className="absolute w-64 h-64 bg-[radial-gradient(ellipse_at_center,_rgba(255,221,238,0.4)_0%,_rgba(255,221,238,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '70%', left: '20%', animationDelay: '3s' }}></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto flex-grow">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mb-4 animate-fade-in" style={{filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))'}}>
                    <avatar.component />
                </div>
                
                {/* Creation Board Section */}
                <div className="w-full flex flex-col items-center mb-6 flex-grow">
                     <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-aurora-dark-text/80" style={{textShadow: '0 1px 3px rgba(255,255,255,0.5)'}}>Upload, Write, or Paste Your Material</h2>
                    <div 
                        className="relative w-full p-0.5 rounded-2xl bg-gradient-to-r from-aurora-purple/30 via-white/50 to-aurora-purple/30 shadow-2xl shadow-aurora-purple/10 h-full"
                    >
                        <div className="bg-white/40 backdrop-blur-sm rounded-[14px] p-4 flex flex-col h-full">
                            <textarea 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                maxLength={MAX_CHARS}
                                placeholder="Begin your journey here..."
                                className="w-full flex-grow bg-transparent border-none focus:ring-0 outline-none resize-none placeholder:text-aurora-dark-text/40 
                                           text-lg text-aurora-dark-text/90 font-semibold tracking-wide"
                            />
                             <div className="flex justify-between items-center mt-2 border-t border-white/30 pt-2">
                                <div className="flex items-center gap-2">
                                     <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt,.md,.rtf" />
                                     <button onClick={handleUploadClick} className="bg-white/50 hover:bg-white/80 text-aurora-dark-text/80 font-bold text-xs py-1.5 px-4 rounded-full transition-colors duration-300">
                                         Upload File
                                     </button>
                                     {selectedFile && <span className="text-xs text-aurora-dark-text/70 truncate max-w-[150px]">{selectedFile.name}</span>}
                                </div>
                                <div className="text-right text-sm text-aurora-dark-text/60 font-mono">{notes.length} / {MAX_CHARS}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Buttons */}
                <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                    {creationFeatures.map((feature, index) => {
                        const isLoading = loadingFeature === feature.id;
                        const isTrackingButton = feature.id === 'tracking';
                        const isDisabled = isTrackingButton ? !!loadingFeature : (!notes.trim() || !!loadingFeature);
                        return (
                            <button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature.id)}
                                disabled={isDisabled}
                                className={`relative text-center w-full overflow-hidden 
                                           bg-gradient-to-br from-aurora-gold/20 via-aurora-gold/5 to-transparent backdrop-blur-md 
                                           border border-aurora-gold/40 text-aurora-gold-dark font-semibold text-[10px] sm:text-xs
                                           py-2 px-2 rounded-lg shadow-lg shadow-aurora-gold/10
                                           transform active:scale-95 hover:bg-aurora-gold/30 hover:border-aurora-gold/60 
                                           transition-all duration-300 ease-in-out animate-fade-in
                                           disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none`}
                                 style={{ animationDelay: `${200 + index * 50}ms` }}
                            >
                                <span 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shine" 
                                    style={{ backgroundSize: '200% 100%' }}
                                ></span>
                                <span className={`relative transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                    {feature.label}
                                </span>
                                {isLoading && (
                                    <span className="absolute inset-0 flex items-center justify-center animate-pulse">
                                        Conjuring...
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreationHubScreen;