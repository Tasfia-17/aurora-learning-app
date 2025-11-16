import { GoogleGenAI, Type } from "@google/genai";
import { PuzzleData } from '../App';

// --- Puzzle Generation ---

const puzzleSchema = {
    type: Type.OBJECT,
    properties: {
        crossword: {
            type: Type.OBJECT,
            description: "A crossword puzzle with a grid, clues, and answers.",
            properties: {
                title: { type: Type.STRING },
                size: { type: Type.INTEGER, description: "The grid size, e.g., 10 for a 10x10 grid." },
                grid: {
                    type: Type.ARRAY,
                    description: "A 2D array representing the crossword grid. Use null for black squares and a number for the start of a clue.",
                    items: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT, properties: { number: { type: Type.INTEGER }, letter: { type: Type.STRING } }, nullable: true }
                    }
                },
                clues: {
                    type: Type.OBJECT,
                    properties: {
                        across: { type: Type.ARRAY, items: { type: Type.STRING, description: "Clue format: '1. The clue text'" } },
                        down: { type: Type.ARRAY, items: { type: Type.STRING, description: "Clue format: '2. The clue text'" } }
                    }
                }
            }
        },
        wordSearch: {
            type: Type.OBJECT,
            description: "A word search puzzle with a grid of letters and a list of words to find.",
            properties: {
                title: { type: Type.STRING },
                grid: {
                    type: Type.ARRAY,
                    description: "A 2D array of letters.",
                    items: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                words: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        fillInTheBlanks: {
            type: Type.OBJECT,
            description: "A quiz with sentences where a key word is missing.",
            properties: {
                title: { type: Type.STRING },
                questions: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "The sentence with '___' for the blank." },
                            answer: { type: Type.STRING }
                        }
                    }
                }
            }
        },
        matching: {
            type: Type.OBJECT,
            description: "An exercise to match terms with their definitions.",
            properties: {
                title: { type: Type.STRING },
                pairs: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            term: { type: Type.STRING },
                            definition: { type: Type.STRING }
                        }
                    }
                }
            }
        }
    }
};


export async function generatePuzzlesFromText(text: string): Promise<PuzzleData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const prompt = `Based on the following text, create a set of four educational puzzles: a crossword, a word search (10x10 grid), a fill-in-the-blanks quiz (5 questions), and a matching exercise (5 pairs). Ensure all puzzle content is directly derived from the text. Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: puzzleSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedPuzzles = JSON.parse(jsonString);

        return generatedPuzzles;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        return null;
    }
}

// --- Drag and Drop Game Generation ---

export interface DragAndDropGameData {
    title: string;
    instruction: string;
    categories: string[];
    items: {
        text: string;
        category: string;
    }[];
}

const dragAndDropSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the game." },
        instruction: { type: Type.STRING, description: "A simple instruction for the player." },
        categories: { 
            type: Type.ARRAY,
            description: "An array of exactly 3 category names.",
            items: { type: Type.STRING }
        },
        items: {
            type: Type.ARRAY,
            description: "An array of exactly 8 items to be categorized. Each item must belong to one of the defined categories.",
            items: {
                type: Type.OBJECT,
                properties: {
                    text: { type: Type.STRING, description: "The text of the draggable item." },
                    category: { type: Type.STRING, description: "The correct category name for this item." }
                }
            }
        }
    }
};

export async function generateDragAndDropGame(text: string): Promise<DragAndDropGameData | null> {
     try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const prompt = `Based on the following text, create the content for a drag-and-drop categorization game. Identify exactly 3 main categories and 8 distinct items from the text that fit into those categories. The game should be educational and relevant to the text provided. Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dragAndDropSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedGame = JSON.parse(jsonString);

        return generatedGame;

    } catch (error) {
        console.error("Gemini API call for Drag-and-Drop game failed:", error);
        return null;
    }
}

// --- Find the Mistake Challenge Generation ---

export interface Mistake {
    incorrectText: string;
    correctText: string;
    explanation: string;
}

export interface FindTheMistakeData {
    title: string;
    instruction: string;
    challengeText: string;
    mistakes: Mistake[];
}

const findTheMistakeSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the challenge." },
        instruction: { type: Type.STRING, description: "A simple instruction for the player." },
        challengeText: { type: Type.STRING, description: "A paragraph of text derived from the user's notes, but with 3 subtle factual errors intentionally introduced." },
        mistakes: {
            type: Type.ARRAY,
            description: "An array of objects detailing each mistake.",
            items: {
                type: Type.OBJECT,
                properties: {
                    incorrectText: { type: Type.STRING, description: "The exact word or phrase that is incorrect in the challenge text." },
                    correctText: { type: Type.STRING, description: "The correct word or phrase." },
                    explanation: { type: Type.STRING, description: "A brief explanation of why the original text was incorrect." }
                }
            }
        }
    }
};

export async function generateFindTheMistakeChallenge(text: string): Promise<FindTheMistakeData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Based on the following text, create a "Find the Mistake" challenge.
1. Write a single paragraph that summarizes or uses key information from the text.
2. Introduce exactly 3 subtle, factual errors into this paragraph. The errors should be incorrect words or short phrases, not entire sentences.
3. For each mistake, provide the exact incorrect text, the correction, and a brief explanation.
Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: findTheMistakeSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedChallenge = JSON.parse(jsonString);
        return generatedChallenge;

    } catch (error) {
        console.error("Gemini API call for Find the Mistake challenge failed:", error);
        return null;
    }
}


// --- Speed Rounds Challenge Generation ---

export interface SpeedRoundQuestion {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

export interface SpeedRoundsData {
    title: string;
    instruction: string;
    questions: SpeedRoundQuestion[];
}

const speedRoundsSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the speed round." },
        instruction: { type: Type.STRING, description: "A simple instruction for the player about the timed quiz." },
        questions: {
            type: Type.ARRAY,
            description: "An array of exactly 8 multiple-choice questions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    questionText: { type: Type.STRING, description: "The question to be asked." },
                    options: { 
                        type: Type.ARRAY,
                        description: "An array of 4 string options for the multiple-choice question.",
                        items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING, description: "The correct answer, which must be one of the provided options." }
                }
            }
        }
    }
};


export async function generateSpeedRoundsChallenge(text: string): Promise<SpeedRoundsData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Based on the following text, create a "Speed Round" multiple-choice quiz.
1. Generate exactly 8 questions based on key facts and concepts from the text.
2. For each question, provide 4 distinct options.
3. One option must be the correct answer. The other three should be plausible but incorrect distractors.
4. Ensure the correct answer is present in the options list.
Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speedRoundsSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedChallenge = JSON.parse(jsonString);
        return generatedChallenge;

    } catch (error) {
        console.error("Gemini API call for Speed Rounds challenge failed:", error);
        return null;
    }
}

// --- Story-Based Challenge Generation ---

export interface StoryNode {
    storyText: string;
    question: string;
    options: {
        text: string;
        isCorrect: boolean;
        feedback: string;
    }[];
}

export interface StoryBasedChallengeData {
    title: string;
    introduction: string;
    nodes: StoryNode[];
    conclusion: string;
}

const storyBasedChallengeSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative, adventurous title for the story." },
        introduction: { type: Type.STRING, description: "A short introductory paragraph to set the scene." },
        nodes: {
            type: Type.ARRAY,
            description: "An array of exactly 3 story nodes, each representing a step in the adventure.",
            items: {
                type: Type.OBJECT,
                properties: {
                    storyText: { type: Type.STRING, description: "The narrative text for this part of the story." },
                    question: { type: Type.STRING, description: "A multiple-choice question based on the user's notes to challenge the player." },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 3 or 4 options for the question.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING, description: "The text of the choice." },
                                isCorrect: { type: Type.BOOLEAN, description: "Whether this choice is the correct answer." },
                                feedback: { type: Type.STRING, description: "Feedback to show the user after they select this option, explaining the consequence or correcting their knowledge." }
                            }
                        }
                    }
                }
            }
        },
        conclusion: { type: Type.STRING, description: "A concluding paragraph to wrap up the story after the final challenge." }
    }
};

export async function generateStoryBasedChallenge(text: string): Promise<StoryBasedChallengeData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Create an interactive story-based challenge from the provided text. The story should be a short adventure that creatively incorporates the key information from the text.
1.  **Title and Introduction:** Give the story a title and a brief introduction to set the scene.
2.  **Story Nodes:** Create exactly 3 sequential "nodes" or chapters. Each node should contain:
    *   A piece of the story (storyText).
    *   A multiple-choice question that tests knowledge from the user's text (question).
    *   3-4 options for the question, where exactly one is correct (isCorrect: true).
    *   Engaging feedback for each option, explaining why it's right or wrong (feedback).
3.  **Conclusion:** Write a conclusion to end the adventure.
Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: storyBasedChallengeSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedChallenge = JSON.parse(jsonString);
        return generatedChallenge;

    } catch (error) {
        console.error("Gemini API call for Story-Based Challenge failed:", error);
        return null;
    }
}

// --- Scenarios and Analogies Challenge Generation ---

export interface ChallengeItem {
    type: 'Scenario' | 'Analogy';
    title: string;
    text: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface ScenariosAndAnalogiesData {
    title: string;
    challenges: ChallengeItem[];
}

const scenariosAndAnalogiesSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for this set of challenges." },
        challenges: {
            type: Type.ARRAY,
            description: "An array of exactly 3 challenges, mixing scenarios and analogies.",
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: "The type of challenge, either 'Scenario' or 'Analogy'." },
                    title: { type: Type.STRING, description: "A specific title for this challenge, e.g., 'A Real-World Scenario' or 'Analogy: The Solar System'." },
                    text: { type: Type.STRING, description: "The descriptive text for the scenario or analogy." },
                    question: { type: Type.STRING, description: "A multiple-choice question to test the user's understanding of the concept's application." },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 4 string options for the multiple-choice question.",
                        items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING, description: "The correct answer, which must be one of the provided options." },
                    explanation: { type: Type.STRING, description: "A brief explanation of why the correct answer is right, reinforcing the learning concept." }
                }
            }
        }
    }
};

export async function generateScenariosAndAnalogiesChallenge(text: string): Promise<ScenariosAndAnalogiesData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Based on the following text, create a set of exactly 3 "Scenarios and Analogies" challenges.
1.  For each challenge, decide if it's a 'Scenario' (a practical, real-world example) or an 'Analogy' (a comparison to something familiar).
2.  Write the descriptive text for the scenario or analogy.
3.  Formulate a multiple-choice question that requires the user to apply a concept from their notes to the challenge.
4.  Provide 4 plausible options, with one being the correct answer.
5.  Include a clear explanation for why the correct answer is right.
Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: scenariosAndAnalogiesSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedChallenge = JSON.parse(jsonString);
        return generatedChallenge;

    } catch (error) {
        console.error("Gemini API call for Scenarios and Analogies failed:", error);
        return null;
    }
}


// --- Outside-the-Box Challenge Generation ---

export interface OutsideTheBoxData {
    title: string;
    problemStatement: string;
    hints: string[];
    solutionExplanation: string;
}

const outsideTheBoxSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative and intriguing title for the problem." },
        problemStatement: { type: Type.STRING, description: "A paragraph describing a non-obvious, creative problem related to the user's text. It should require lateral thinking." },
        hints: {
            type: Type.ARRAY,
            description: "An array of 3 hints that progressively guide the user towards the solution without giving it away.",
            items: { type: Type.STRING }
        },
        solutionExplanation: { type: Type.STRING, description: "A detailed explanation of the creative solution and the thought process behind it." }
    }
};

export async function generateOutsideTheBoxChallenge(text: string): Promise<OutsideTheBoxData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Based on the following text, create one "Outside-the-Box" problem. This problem should not be a simple recall question. Instead, it should require creative application, synthesis, or a change in perspective related to the core concepts in the text.
1.  **Problem:** Formulate a unique problem statement that challenges the user to think laterally.
2.  **Hints:** Create 3 distinct hints that guide the user's thinking process. The first hint should be very subtle, and they should get progressively more direct.
3.  **Solution:** Write a clear explanation of a creative solution, detailing the logic.
Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: outsideTheBoxSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedChallenge = JSON.parse(jsonString);
        return generatedChallenge;

    } catch (error) {
        console.error("Gemini API call for Outside-the-Box challenge failed:", error);
        return null;
    }
}

// --- Mini-Adventures Generation ---

export interface AdventureStage {
    description: string;
    companionDialogue: string;
    challenge: {
        question: string;
        options: string[];
        correctAnswer: string;
    };
    successResponse: string;
    failureResponse: string;
}

export interface MiniAdventureData {
    title: string;
    introduction: string;
    stages: AdventureStage[];
    conclusion: string;
}

const miniAdventureSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A whimsical title for the mini-adventure." },
        introduction: { type: Type.STRING, description: "An introductory paragraph that sets the scene for an adventure with a companion." },
        stages: {
            type: Type.ARRAY,
            description: "An array of exactly 3 stages for the adventure.",
            items: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING, description: "The narrative text describing this stage of the adventure." },
                    companionDialogue: { type: Type.STRING, description: "A short, encouraging, or curious line of dialogue for the user's companion." },
                    challenge: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "A multiple-choice question related to the user's notes, framed as a challenge in the story." },
                            options: {
                                type: Type.ARRAY,
                                description: "An array of 3 or 4 options for the question.",
                                items: { type: Type.STRING }
                            },
                            correctAnswer: { type: Type.STRING, description: "The correct answer, which must be one of the options." }
                        }
                    },
                    successResponse: { type: Type.STRING, description: "A short narrative text describing the positive outcome of answering correctly." },
                    failureResponse: { type: Type.STRING, description: "A short narrative text describing the consequence of answering incorrectly, which should still allow the story to progress." }
                }
            }
        },
        conclusion: { type: Type.STRING, description: "A concluding paragraph that wraps up the adventure and praises the user." }
    }
};

export async function generateMiniAdventure(text: string): Promise<MiniAdventureData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Based on the following text, create a "Mini-Adventure" for a learning companion app. The adventure should be a short, engaging story where the user and their companion overcome challenges using knowledge from the text.
1.  **Story Arc:** Create a simple story with a beginning (introduction), exactly 3 steps (stages), and an end (conclusion).
2.  **Companion Integration:** At each stage, include a line of dialogue for the user's companion.
3.  **Challenges:** Each stage must include a multiple-choice question derived from the text, presented as a story challenge. Provide options and a correct answer.
4.  **Feedback:** Write success and failure responses for each challenge that fit the narrative.
Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: miniAdventureSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedAdventure = JSON.parse(jsonString);
        return generatedAdventure;

    } catch (error) {
        console.error("Gemini API call for Mini-Adventure failed:", error);
        return null;
    }
}

// --- Knowledge Transfer Tracker Generation ---

export interface KnowledgeTrackerData {
    title: string;
    overallSummary: string;
    activitySummaries: {
        activity: string;
        skill: string;
    }[];
    reflectionPrompts: string[];
}

const knowledgeTrackerSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the knowledge tracker page, like 'Your Learning Constellation'." },
        overallSummary: { type: Type.STRING, description: "A brief, encouraging summary of the key concepts found in the user's text." },
        activitySummaries: {
            type: Type.ARRAY,
            description: "An array of objects summarizing the skill tested by each activity type, based on the provided text.",
            items: {
                type: Type.OBJECT,
                properties: {
                    activity: { type: Type.STRING, description: "The name of the learning activity (e.g., 'Puzzles', 'Mini-Adventures')." },
                    skill: { type: Type.STRING, description: "The core skill this activity helps develop with this specific knowledge (e.g., 'Pattern Recognition', 'Narrative Application')." }
                }
            }
        },
        reflectionPrompts: {
            type: Type.ARRAY,
            description: "An array of 3 thoughtful, open-ended questions to prompt user reflection.",
            items: { type: Type.STRING }
        }
    }
};

export async function generateKnowledgeTrackerData(text: string): Promise<KnowledgeTrackerData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Analyze the provided text to create data for a "Knowledge Transfer Tracker" feature.
1.  **Summarize:** Write a brief, encouraging 'overallSummary' of the text's key concepts.
2.  **Analyze Activities:** For each of the following activities ('Puzzles', 'Drag-and-Drop', 'Find the Mistake', 'Speed Rounds', 'Story-Based Challenges', 'Scenarios & Analogies', 'Outside-the-Box Problems', 'Mini-Adventures'), identify the primary 'skill' a user would practice related to the text. Keep the skill description concise (2-4 words).
3.  **Create Prompts:** Generate 3 distinct and insightful 'reflectionPrompts' that encourage the user to think about their learning process and future application of this knowledge.
Return the response as a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: knowledgeTrackerSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const generatedData = JSON.parse(jsonString);
        return generatedData;

    } catch (error) {
        console.error("Gemini API call for Knowledge Tracker failed:", error);
        return null;
    }
}

export function generateDefaultKnowledgeTrackerData(): KnowledgeTrackerData {
    return {
        title: "Your Learning Journey Awaits",
        overallSummary: "This is your personal space to watch your knowledge grow! Start by adding some notes, and I'll help you turn them into fun activities and track your progress.",
        activitySummaries: [
            { activity: "Puzzles", skill: "Detail Recall" },
            { activity: "Drag-and-Drop", skill: "Categorization" },
            { activity: "Find the Mistake", skill: "Critical Analysis" },
            { activity: "Speed Rounds", skill: "Quick Recall" },
            { activity: "Story Challenges", skill: "Applied Knowledge" },
            { activity: "Scenarios", skill: "Practical Application" },
            { activity: "Creative Problems", skill: "Lateral Thinking" },
            { activity: "Adventures", skill: "Engaged Learning" },
        ],
        reflectionPrompts: [
            "What was the most interesting thing I learned today?",
            "How can I use this knowledge in a real-life situation?",
            "What concept is still a little fuzzy to me?"
        ]
    };
}
