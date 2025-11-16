import React, { useState } from 'react';
import { AvatarCard } from '../components/AvatarCard';
import { AvatarStoryModal } from '../components/AvatarStoryModal';
import { Ashette, Crux, Manawi, Revnant, Stella, Urula } from '../components/avatars';
import { AvatarData } from '../App';

const avatars: AvatarData[] = [
  { 
    name: 'Urula', 
    component: Urula, 
    story: 'Urula is a wise owl made of amethyst. It is said that its feathers hold the secrets of ancient crystals, and its gentle hoots can calm any troubled mind.' 
  },
  { 
    name: 'Manawi', 
    component: Manawi, 
    story: 'A cheerful plant sprite, Manawi carries a blooming flower on its tail. It loves sunshine and can make flowers sprout from the ground with a happy little dance.' 
  },
  { 
    name: 'Ashette', 
    component: Ashette, 
    story: 'Ashette is a friendly fire spirit born from a gentle ember. Its flames are warm to the touch and flicker with happiness, leaving a trail of tiny, harmless sparks.' 
  },
  { 
    name: 'Revnant', 
    component: Revnant, 
    story: 'This little golem is a guardian of ancient forests. Formed from moss and river stones, Revnant is incredibly shy but fiercely loyal to those it calls friends.' 
  },
  { 
    name: 'Crux', 
    component: Crux, 
    story: 'Crux is a cosmic creature that dreams among the stars. It fell to Earth on a moonbeam and now spends its days sleeping peacefully, collecting stardust in its fur.' 
  },
  { 
    name: 'Stella', 
    component: Stella, 
    story: 'Stella is a celestial deer whose body is a living constellation. It walks silently through the night, and its glowing antlers guide lost travelers to safety.' 
  },
];

let audioContext: AudioContext | null = null;

const playSelectSound = () => {
  if (typeof window.AudioContext === 'undefined') return;
  if (!audioContext) {
    audioContext = new (window.AudioContext)();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.8);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.8);
};

interface AvatarSelectionScreenProps {
    onAvatarSelect: (avatar: AvatarData) => void;
}

const AvatarSelectionScreen: React.FC<AvatarSelectionScreenProps> = ({ onAvatarSelect }) => {
  const [currentSelection, setCurrentSelection] = useState<AvatarData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAvatar = (avatar: AvatarData) => {
    setCurrentSelection(avatar);
    setIsModalOpen(true);
    playSelectSound();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
      if (currentSelection) {
          onAvatarSelect(currentSelection);
      }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-pastel-yellow to-pastel-pink font-nunito text-aurora-dark-text p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-aurora-dark-text/80" style={{textShadow: '0 2px 10px rgba(255, 255, 255, 0.5)'}}>Choose Your Companion</h1>
          <p className="text-aurora-dark-text/60 mb-10 sm:mb-16 text-sm sm:text-base">Select a mythical friend to get to know them better.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 max-w-4xl mx-auto">
            {avatars.map((avatar) => (
              <AvatarCard
                key={avatar.name}
                name={avatar.name}
                AvatarComponent={avatar.component}
                isSelected={currentSelection?.name === avatar.name}
                onSelect={() => handleSelectAvatar(avatar)}
              />
            ))}
          </div>
          
          <div className="mt-20 sm:mt-24">
              <button 
                onClick={handleContinue}
                disabled={!currentSelection}
                className="relative font-bold text-base text-white py-2.5 px-10 rounded-full overflow-hidden
                           bg-aurora-purple/80 border border-white/20 backdrop-blur-md shadow-lg
                           transition-all duration-300 ease-in-out 
                           disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                           hover:enabled:bg-aurora-purple hover:enabled:shadow-xl hover:enabled:shadow-aurora-purple/30
                           active:enabled:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shine" style={{ backgroundSize: '200% 100%' }}></span>
                Continue with {currentSelection?.name || '...'}
              </button>
          </div>
        </div>
      </div>
      {isModalOpen && currentSelection && (
        <AvatarStoryModal 
          avatar={currentSelection} 
          onClose={closeModal} 
        />
      )}
    </>
  );
};

export default AvatarSelectionScreen;