import React, { useState } from 'react';
import { KnowledgeTrackerData } from '../lib/gemini';
import BackButton from '../components/BackButton';

interface KnowledgeTrackerScreenProps {
    gameData: KnowledgeTrackerData | null;
    onBack: () => void;
}

const Calendar: React.FC = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const todayDate = today.getDate();

    const days = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`empty-${i}`} className="w-full aspect-square"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === todayDate;
        days.push(
            <div key={day} className={`w-full aspect-square flex items-center justify-center font-bold text-sm rounded-full transition-all duration-300 ${isToday ? 'bg-aurora-gold/80 text-white shadow-lg' : 'text-aurora-dark-text/50'}`}>
                {day}
            </div>
        );
    }
    
    return (
        <div className="w-full p-0.5 rounded-2xl bg-gradient-to-r from-aurora-gold/30 via-white/50 to-aurora-gold/30 shadow-2xl shadow-aurora-gold/10">
            <div className="bg-white/40 backdrop-blur-sm rounded-[14px] p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-handwritten text-2xl text-aurora-gold-dark">{today.toLocaleString('default', { month: 'long' })}</h3>
                    <p className="font-bold text-aurora-gold-dark">{year}</p>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-aurora-dark-text/60">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-1 mt-1">
                    {days}
                </div>
            </div>
        </div>
    );
};


const KnowledgeTrackerScreen: React.FC<KnowledgeTrackerScreenProps> = ({ gameData, onBack }) => {
    const [reflection, setReflection] = useState('');

    if (!gameData || !gameData.overallSummary || !Array.isArray(gameData.activitySummaries) || gameData.activitySummaries.length === 0 || !Array.isArray(gameData.reflectionPrompts) || gameData.reflectionPrompts.length === 0) {
        return (
             <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't load your knowledge tracker. The generated data is incomplete.</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 lg:p-8 flex flex-col items-center overflow-auto">
            <BackButton onBack={onBack} />
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center pt-10 animate-fade-in">
                <h1 className="font-handwritten text-4xl sm:text-5xl text-aurora-dark-text/80 my-4" style={{textShadow: '0 1px 3px rgba(255,255,255,0.5)'}}>
                    {gameData.title || "Your Learning Journey"}
                </h1>
                <p className="text-center max-w-2xl text-aurora-dark-text/70 mb-8">{gameData.overallSummary}</p>

                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Calendar and Reflection */}
                    <div className="lg:col-span-1 space-y-6">
                        <Calendar />
                        <div className="w-full p-0.5 rounded-2xl bg-gradient-to-r from-aurora-purple/30 via-white/50 to-aurora-purple/30 shadow-2xl shadow-aurora-purple/10">
                            <div className="bg-white/40 backdrop-blur-sm rounded-[14px] p-4 flex flex-col h-full">
                                <h3 className="font-handwritten text-2xl text-aurora-dark-text/80 mb-2">My Reflections</h3>
                                <p className="text-sm text-aurora-dark-text/60 mb-3">{gameData.reflectionPrompts[0]}</p>
                                <textarea
                                    value={reflection}
                                    onChange={(e) => setReflection(e.target.value)}
                                    placeholder="Jot down your thoughts..."
                                    className="w-full flex-grow bg-transparent border-t border-white/30 pt-2 focus:ring-0 outline-none resize-none placeholder:text-aurora-dark-text/40 
                                           text-base text-aurora-dark-text/90"
                                    rows={5}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Game Summaries */}
                    <div className="lg:col-span-2">
                         <div className="w-full p-0.5 rounded-2xl bg-gradient-to-r from-aurora-gold/30 via-white/50 to-aurora-gold/30 shadow-2xl shadow-aurora-gold/10">
                            <div className="bg-white/40 backdrop-blur-sm rounded-[14px] p-4">
                                 <h3 className="font-handwritten text-2xl text-aurora-gold-dark mb-4 text-center">Your Learning Arsenal</h3>
                                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                     {gameData.activitySummaries.map((summary, index) => (
                                         <div key={index} className="relative aspect-[4/5] overflow-hidden p-3 rounded-xl flex flex-col justify-end
                                            bg-gradient-to-br from-aurora-gold/20 via-aurora-gold/5 to-transparent backdrop-blur-sm 
                                            border border-aurora-gold/40 shadow-lg shadow-aurora-gold/10
                                            text-aurora-gold-dark font-semibold text-center">
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-glass-shine" style={{ backgroundSize: '200% 100%' }}></span>
                                             <div className="relative">
                                                <h4 className="text-sm font-bold">{summary.activity}</h4>
                                                <p className="text-xs font-medium opacity-80">{summary.skill}</p>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeTrackerScreen;