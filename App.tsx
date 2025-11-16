import React, { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import AvatarSelectionScreen from './screens/AvatarSelectionScreen';
import IntroductionScreen from './screens/IntroductionScreen';
import DashboardScreen from './screens/DashboardScreen';
import FeaturesOverviewScreen from './screens/FeaturesOverviewScreen';
import CreationHubScreen from './screens/CreationHubScreen';
import PuzzleScreen from './screens/PuzzleScreen';
import DragAndDropGameScreen from './screens/DragAndDropGameScreen';
import FindTheMistakeScreen from './screens/FindTheMistakeScreen';
import SpeedRoundsScreen from './screens/SpeedRoundsScreen';
import StoryBasedChallengeScreen from './screens/StoryBasedChallengeScreen';
import ScenariosAndAnalogiesScreen from './screens/ScenariosAndAnalogiesScreen';
import OutsideTheBoxScreen from './screens/OutsideTheBoxScreen';
import MiniAdventureScreen from './screens/MiniAdventureScreen';
import KnowledgeTrackerScreen from './screens/KnowledgeTrackerScreen';
import { Ashette } from './components/avatars'; // Default avatar
import { DragAndDropGameData, FindTheMistakeData, SpeedRoundsData, StoryBasedChallengeData, ScenariosAndAnalogiesData, OutsideTheBoxData, MiniAdventureData, KnowledgeTrackerData } from './lib/gemini';

type Screen = 'landing' | 'avatarSelection' | 'introduction' | 'dashboard' | 'featuresOverview' | 'creationHub' | 'puzzles' | 'dragAndDropGame' | 'findTheMistake' | 'speedRounds' | 'storyBasedChallenge' | 'scenariosAndAnalogies' | 'outsideTheBox' | 'miniAdventure' | 'knowledgeTracker';

export interface AvatarData {
  name: string;
  component: React.FC;
  story: string;
}

export interface PuzzleData {
  crossword?: any;
  wordSearch?: any;
  fillInTheBlanks?: any;
  matching?: any;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarData>({ 
    name: 'Ashette', component: Ashette, story: '' 
  });
  const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);
  const [dragAndDropGameData, setDragAndDropGameData] = useState<DragAndDropGameData | null>(null);
  const [findTheMistakeData, setFindTheMistakeData] = useState<FindTheMistakeData | null>(null);
  const [speedRoundsData, setSpeedRoundsData] = useState<SpeedRoundsData | null>(null);
  const [storyBasedChallengeData, setStoryBasedChallengeData] = useState<StoryBasedChallengeData | null>(null);
  const [scenariosAndAnalogiesData, setScenariosAndAnalogiesData] = useState<ScenariosAndAnalogiesData | null>(null);
  const [outsideTheBoxData, setOutsideTheBoxData] = useState<OutsideTheBoxData | null>(null);
  const [miniAdventureData, setMiniAdventureData] = useState<MiniAdventureData | null>(null);
  const [knowledgeTrackerData, setKnowledgeTrackerData] = useState<KnowledgeTrackerData | null>(null);


  const handleStartJourney = () => {
    setCurrentScreen('avatarSelection');
  };

  const handleAvatarSelected = (avatar: AvatarData) => {
    setSelectedAvatar(avatar);
    setCurrentScreen('introduction');
  };
  
  const handleIntroductionComplete = () => {
    setCurrentScreen('dashboard');
  }

  const handleDashboardComplete = () => {
    setCurrentScreen('featuresOverview');
  }

  const handleStartCreation = () => {
    setCurrentScreen('creationHub');
  }

  const handlePuzzlesGenerated = (puzzles: PuzzleData) => {
    setPuzzleData(puzzles);
    setCurrentScreen('puzzles');
  };

  const handleDragAndDropGameGenerated = (gameData: DragAndDropGameData) => {
    setDragAndDropGameData(gameData);
    setCurrentScreen('dragAndDropGame');
  };

  const handleFindTheMistakeGenerated = (gameData: FindTheMistakeData) => {
    setFindTheMistakeData(gameData);
    setCurrentScreen('findTheMistake');
  };

  const handleSpeedRoundsGenerated = (gameData: SpeedRoundsData) => {
    setSpeedRoundsData(gameData);
    setCurrentScreen('speedRounds');
  };

  const handleStoryBasedChallengeGenerated = (gameData: StoryBasedChallengeData) => {
    setStoryBasedChallengeData(gameData);
    setCurrentScreen('storyBasedChallenge');
  };

  const handleScenariosAndAnalogiesGenerated = (gameData: ScenariosAndAnalogiesData) => {
    setScenariosAndAnalogiesData(gameData);
    setCurrentScreen('scenariosAndAnalogies');
  };

  const handleOutsideTheBoxGenerated = (gameData: OutsideTheBoxData) => {
    setOutsideTheBoxData(gameData);
    setCurrentScreen('outsideTheBox');
  };
  
  const handleMiniAdventureGenerated = (gameData: MiniAdventureData) => {
    setMiniAdventureData(gameData);
    setCurrentScreen('miniAdventure');
  };

  const handleKnowledgeTrackerGenerated = (gameData: KnowledgeTrackerData) => {
    setKnowledgeTrackerData(gameData);
    setCurrentScreen('knowledgeTracker');
  };

  const handleBackToHub = () => {
    setPuzzleData(null);
    setDragAndDropGameData(null);
    setFindTheMistakeData(null);
    setSpeedRoundsData(null);
    setStoryBasedChallengeData(null);
    setScenariosAndAnalogiesData(null);
    setOutsideTheBoxData(null);
    setMiniAdventureData(null);
    setKnowledgeTrackerData(null);
    setCurrentScreen('creationHub');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onStart={handleStartJourney} />;
      case 'avatarSelection':
        return <AvatarSelectionScreen onAvatarSelect={handleAvatarSelected} />;
      case 'introduction':
        return <IntroductionScreen avatar={selectedAvatar} onComplete={handleIntroductionComplete} />;
      case 'dashboard':
        return <DashboardScreen avatar={selectedAvatar} onComplete={handleDashboardComplete} />;
      case 'featuresOverview':
        return <FeaturesOverviewScreen avatar={selectedAvatar} onStartCreating={handleStartCreation} />;
      case 'creationHub':
        return <CreationHubScreen 
                  avatar={selectedAvatar} 
                  onPuzzlesGenerated={handlePuzzlesGenerated} 
                  onDragAndDropGameGenerated={handleDragAndDropGameGenerated} 
                  onFindTheMistakeGenerated={handleFindTheMistakeGenerated}
                  onSpeedRoundsGenerated={handleSpeedRoundsGenerated}
                  onStoryBasedChallengeGenerated={handleStoryBasedChallengeGenerated}
                  onScenariosAndAnalogiesGenerated={handleScenariosAndAnalogiesGenerated}
                  onOutsideTheBoxGenerated={handleOutsideTheBoxGenerated}
                  onMiniAdventureGenerated={handleMiniAdventureGenerated}
                  onKnowledgeTrackerGenerated={handleKnowledgeTrackerGenerated}
                />;
      case 'puzzles':
        return <PuzzleScreen puzzles={puzzleData} onBack={handleBackToHub} />;
      case 'dragAndDropGame':
        return <DragAndDropGameScreen gameData={dragAndDropGameData} onBack={handleBackToHub} />;
      case 'findTheMistake':
        return <FindTheMistakeScreen gameData={findTheMistakeData} onBack={handleBackToHub} />;
      case 'speedRounds':
        return <SpeedRoundsScreen gameData={speedRoundsData} onBack={handleBackToHub} />;
      case 'storyBasedChallenge':
        return <StoryBasedChallengeScreen gameData={storyBasedChallengeData} onBack={handleBackToHub} />;
      case 'scenariosAndAnalogies':
        return <ScenariosAndAnalogiesScreen gameData={scenariosAndAnalogiesData} onBack={handleBackToHub} />;
      case 'outsideTheBox':
        return <OutsideTheBoxScreen gameData={outsideTheBoxData} onBack={handleBackToHub} />;
      case 'miniAdventure':
        return <MiniAdventureScreen gameData={miniAdventureData} onBack={handleBackToHub} avatar={selectedAvatar} />;
      case 'knowledgeTracker':
        return <KnowledgeTrackerScreen gameData={knowledgeTrackerData} onBack={handleBackToHub} />;
      default:
        return <LandingScreen onStart={handleStartJourney} />;
    }
  };

  return <>{renderScreen()}</>;
};

export default App;