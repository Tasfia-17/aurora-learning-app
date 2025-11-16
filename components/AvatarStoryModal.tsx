import React from 'react';

interface Avatar {
  name: string;
  component: React.FC;
  story: string;
}

interface AvatarStoryModalProps {
  avatar: Avatar;
  onClose: () => void;
}

export const AvatarStoryModal: React.FC<AvatarStoryModalProps> = ({ avatar, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-11/12 max-w-sm m-4 p-6 bg-gradient-to-br from-yellow-200/10 via-aurora-gold/20 to-yellow-400/10 rounded-2xl border border-aurora-gold/50 shadow-2xl shadow-aurora-gold/20 animate-fade-in font-nunito"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 mb-3" style={{filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))'}}>
            <avatar.component />
          </div>
          <h2 className="text-3xl font-bold text-aurora-gold mb-2" style={{textShadow: '0 1px 4px rgba(0,0,0,0.4)'}}>
            {avatar.name}
          </h2>
          <p className="text-aurora-dark-text/80 text-sm leading-relaxed" style={{textShadow: '0 1px 2px rgba(255, 220, 150, 0.3)'}}>
            {avatar.story}
          </p>
        </div>
      </div>
    </div>
  );
};