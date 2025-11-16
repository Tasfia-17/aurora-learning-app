import React from 'react';

interface AvatarCardProps {
  name: string;
  AvatarComponent: React.FC;
  isSelected: boolean;
  onSelect: () => void;
}

export const AvatarCard: React.FC<AvatarCardProps> = ({ name, AvatarComponent, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="relative flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 ease-out transform hover:scale-110"
      style={{
        filter: isSelected ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))' : 'none',
        transition: 'filter 0.3s ease-in-out, transform 0.3s ease-out'
      }}
    >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <AvatarComponent />
        </div>
        
        <p className={`mt-2 font-semibold text-center text-xs sm:text-sm transition-colors duration-300 ${isSelected ? 'text-aurora-gold' : 'text-aurora-dark-text/60 group-hover:text-aurora-dark-text'}`}>
            {name}
        </p>
    </div>
  );
};