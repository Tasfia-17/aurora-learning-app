import React from 'react';
import { AvatarData } from '../App';

interface DashboardScreenProps {
  avatar: AvatarData;
  onComplete: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ avatar, onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-orange via-warm-brown to-deep-sienna text-white font-nunito p-8 flex flex-col items-center justify-center text-center animate-background-pan" style={{backgroundSize: '200% 200%'}}>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-48 h-48 mb-6 animate-fade-in" style={{ animationDelay: '0.2s'}}>
            <avatar.component />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-orange-200 animate-fade-in" style={{filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))', animationDelay: '0.4s'}}>
          Welcome!
        </h1>
        <p className="text-lg text-white/80 animate-fade-in" style={{ animationDelay: '0.6s'}}>
          Let's see what adventures await with {avatar.name}.
        </p>
      </div>
      <div className="h-24 flex items-end">
         <button 
            onClick={onComplete}
            className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-aurora-light-text font-bold text-base py-3 px-8 rounded-full shadow-lg 
                        transform active:scale-95 hover:bg-white/20 transition-all duration-300 ease-in-out animate-fade-in" style={{ animationDelay: '0.8s'}}>
            <span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shine" 
                style={{ backgroundSize: '200% 100%' }}
            ></span>
            <span className="relative">See what we can do!</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;