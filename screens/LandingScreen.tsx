import React from 'react';
import { CompanionIcon } from '../components/CompanionIcon';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-gradient-to-b from-aurora-dark-text to-aurora-purple min-h-screen text-white font-sans flex flex-col items-center justify-between p-6 sm:p-8">
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center text-center -mt-16">
        <CompanionIcon />
        <h1 className="mt-6 text-6xl md:text-7xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-pink-200 animate-emerge-glow">
          Aurora
        </h1>
        <p className="mt-2 text-md font-medium text-aurora-light-text tracking-wider">
          Your Learning Companion
        </p>
      </div>

      {/* Footer / Call to Action Area */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-4">
        <a href="#" className="text-sm text-aurora-mid-text hover:text-white transition-colors duration-300">
          Already have an account? Log in!
        </a>
        <button 
          onClick={onStart}
          className="relative w-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-aurora-light-text font-bold text-lg py-4 px-8 rounded-full shadow-lg 
                     transform active:scale-95 hover:bg-white/20 transition-all duration-300 ease-in-out">
          <span 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shine" 
            style={{ backgroundSize: '200% 100%' }}
          ></span>
          <span className="relative">Start Your Learning Journey</span>
        </button>
        <p className="text-xs text-aurora-mid-text text-center mt-2 px-4">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-white">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-white">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;