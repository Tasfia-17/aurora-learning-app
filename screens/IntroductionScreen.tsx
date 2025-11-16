import React, { useState } from 'react';
import { AvatarData } from '../App';

interface IntroductionScreenProps {
  avatar: AvatarData;
  onComplete: () => void;
}

const MessagePopup: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="relative bg-gradient-to-br from-yellow-200/10 via-aurora-gold/20 to-yellow-400/10 backdrop-blur-md border border-aurora-gold/50 text-aurora-light-text p-4 rounded-xl rounded-bl-none shadow-lg max-w-xs sm:max-w-sm mx-auto animate-fade-in" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>
            <p className="text-center font-semibold">{text}</p>
            <div className="absolute left-0 -bottom-3 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-yellow-400/20"></div>
        </div>
    );
};

const NextButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="animate-bounce-sm" aria-label="Next message">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/60 hover:text-white/90 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );
}

const IntroductionScreen: React.FC<IntroductionScreenProps> = ({ avatar, onComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Hello!",
    `I'm ${avatar.name}, and I'm here to help you with your learning journey.`
  ];

  const handleNext = () => {
    setMessageIndex(prev => Math.min(prev + 1, messages.length - 1));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-orange via-warm-brown to-deep-sienna text-white font-nunito p-8 flex flex-col items-center justify-between animate-background-pan" style={{backgroundSize: '200% 200%'}}>
      
      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-48 h-48 sm:w-56 sm:h-56">
            <avatar.component />
        </div>
        <div className="h-28 mt-4">
            {messages[messageIndex] && <MessagePopup key={messageIndex} text={messages[messageIndex]} />}
        </div>
      </div>
      
      {/* Footer / Call to Action */}
      <div className="flex-1 flex flex-col items-center justify-end">
          {messageIndex < messages.length - 1 ? (
            <NextButton onClick={handleNext} />
          ) : (
             <button 
                onClick={onComplete}
                className="relative mt-4 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-aurora-light-text font-bold text-lg py-3 px-10 rounded-full shadow-lg 
                            transform active:scale-95 hover:bg-white/20 transition-all duration-300 ease-in-out animate-fade-in">
                <span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shine" 
                    style={{ backgroundSize: '200% 100%' }}
                ></span>
                <span className="relative">Let's Begin!</span>
            </button>
          )}
      </div>
    </div>
  );
};

export default IntroductionScreen;