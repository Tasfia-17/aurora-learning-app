import React, { useState } from 'react';
import PuzzleContainer from './PuzzleContainer';

interface Question {
    question: string;
    answer: string;
}

interface FillInTheBlanksData {
    title: string;
    questions: Question[];
}

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const FillInTheBlanksPuzzle: React.FC<{ data: FillInTheBlanksData }> = ({ data }) => {
    const { title, questions } = data;
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [feedback, setFeedback] = useState<('correct' | 'incorrect' | null)[]>(Array(questions.length).fill(null));

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        
        // Reset feedback when user types
        const newFeedback = [...feedback];
        newFeedback[index] = null;
        setFeedback(newFeedback);
    };

    const checkAnswers = () => {
        const newFeedback = questions.map((q, index) => {
            if (answers[index].trim().toLowerCase() === q.answer.toLowerCase()) {
                return 'correct';
            }
            return 'incorrect';
        });
        setFeedback(newFeedback);
    };
    
    const getFeedbackClass = (index: number) => {
        if(feedback[index] === 'correct') return 'border-green-400 bg-green-100';
        if(feedback[index] === 'incorrect') return 'border-red-400 bg-red-100';
        return 'border-gray-300 bg-white/80 focus:border-aurora-purple focus:ring-aurora-purple';
    }

    return (
        <PuzzleContainer title={title}>
            <div className="space-y-4 max-w-3xl mx-auto">
                {questions.map((q, index) => {
                    const parts = q.question.split('___');
                    return (
                        <div key={index} className="bg-white/30 p-4 rounded-lg shadow-sm">
                            <p className="text-base sm:text-lg font-semibold flex flex-wrap items-center gap-x-2">
                               <span>{index + 1}. {parts[0]}</span>
                               <span className="inline-flex items-center gap-2">
                                <input 
                                    type="text"
                                    value={answers[index]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className={`inline-block w-32 sm:w-40 px-2 py-1 rounded-md border-2 transition-colors duration-200 ${getFeedbackClass(index)}`}
                                />
                                 {feedback[index] === 'correct' && <CheckIcon />}
                                 {feedback[index] === 'incorrect' && <XIcon />}
                               </span>
                               <span>{parts[1]}</span>
                            </p>
                        </div>
                    )
                })}
                 <div className="text-center pt-4">
                    <button onClick={checkAnswers} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                        Check Answers
                    </button>
                </div>
            </div>
        </PuzzleContainer>
    );
};

export default FillInTheBlanksPuzzle;