import React from 'react';
import { AvatarData } from '../App';

interface FeaturesOverviewScreenProps {
    avatar: AvatarData;
    onStartCreating: () => void;
}

const features = [
    { title: "Bring Your Knowledge", description: "Upload, drag, or simply write down your notes and learning materials." },
    { title: "Challenge Yourself", description: "Turn your notes into fun and engaging puzzles." },
    { title: "Interactive Fun", description: "Design your own drag-and-drop games." },
    { title: "Sharpen Your Eye", description: "Create 'find the mistake' challenges to test your attention to detail." },
    { title: "Race the Clock", description: "Test your recall with exciting speed rounds." },
    { title: "Become the Hero", description: "Weave your knowledge into captivating story-based challenges." },
    { title: "Connect the Dots", description: "Explore scenarios, analogies, and see how your knowledge applies across different fields." },
    { title: "Think Differently", description: "Tackle creative 'outside-the-box' problems." },
    { title: "Embark on Quests", description: "Go on mini-adventures where learning is the ultimate prize." },
    { title: "Watch Yourself Grow", description: "Track how your knowledge deepens and transfers to new situations." },
];

const FeatureItem: React.FC<{ title: string; description: string; }> = ({ title, description }) => (
    <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-600" style={{textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
            {title}
        </h3>
        <p className="text-sm sm:text-base text-warm-brown/80">{description}</p>
    </div>
);


const FeaturesOverviewScreen: React.FC<FeaturesOverviewScreenProps> = ({ avatar, onStartCreating }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pastel-yellow via-warm-orange to-pastel-pink font-handwritten p-4 flex flex-col items-center justify-center overflow-hidden">
            
            <div className="relative w-full max-w-lg md:max-w-3xl animate-fade-in">
                <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 z-20" style={{filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))'}}>
                    <avatar.component />
                </div>
                
                {/* Diary */}
                <div className="relative z-10 w-full aspect-[1/1.2] md:aspect-[2/1.3] bg-gradient-to-br from-paper-light to-paper-dark rounded-xl shadow-2xl shadow-deep-sienna/30 border-4 border-aurora-gold-dark/30 flex animate-sway">
                    {/* Spine */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-4 md:w-6 bg-gradient-to-b from-deep-sienna to-warm-brown rounded-sm shadow-inner"></div>

                    {/* Pages */}
                    <div className="flex-1 p-6 pt-20 sm:pt-24 md:p-10 overflow-y-auto">
                        {features.slice(0, 5).map(f => <FeatureItem key={f.title} {...f} />)}
                    </div>
                    <div className="flex-1 p-6 pt-20 sm:pt-24 md:p-10 overflow-y-auto hidden md:block">
                         {features.slice(5).map(f => <FeatureItem key={f.title} {...f} />)}
                    </div>
                </div>
                 {/* Mobile view for second half of features */}
                 <div className="w-full text-center mt-6 md:hidden">
                    <p className="text-deep-sienna/60">...and so much more!</p>
                </div>
            </div>

             <div className="mt-8">
                 <button 
                    onClick={onStartCreating}
                    className="relative overflow-hidden bg-aurora-gold/30 backdrop-blur-md border border-white/20 text-aurora-gold-dark font-bold text-lg py-3 px-10 rounded-full shadow-lg 
                                transform active:scale-95 hover:bg-aurora-gold/40 transition-all duration-300 ease-in-out animate-fade-in"
                    style={{animationDelay: '0.3s'}}
                 >
                    <span 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shine" 
                        style={{ backgroundSize: '200% 100%' }}
                    ></span>
                    <span className="relative font-nunito">Start Creating!</span>
                </button>
             </div>

        </div>
    );
};

export default FeaturesOverviewScreen;