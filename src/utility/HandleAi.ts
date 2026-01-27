import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const MODEL_ID = "gemini-2.0-flash";

export const getAiResponse = async (prompt: string) => {
    try {
        const model = genAI.getGenerativeModel({
            model: MODEL_ID,
            generationConfig: { temperature: 0.7 }
        });

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error: any) {
        if (error.message?.includes("404") || error.message?.includes("not found")) {
            console.warn(`Model ${MODEL_ID} not found, trying fallback...`);
        }
        throw error;
    }
}

export const getAiStream = async (userInput: string, history: any[]) => {


    try {
        const model = genAI.getGenerativeModel({
            model: MODEL_ID,
            systemInstruction: "You are a Senior Recruiter. Give 1-2 sentences of feedback, then ask exactly one follow-up question."
        });

        const sanitizedHistory = history.map(h => {
            if (h.parts) return h;
            return {
                role: h.role === 'ai' ? 'model' : 'user',
                parts: [{ text: h.content }]
            };
        });

        const chat = model.startChat({ history: sanitizedHistory });
        const result = await chat.sendMessageStream(userInput);
        return result.stream;
    } catch (error: any) {
        if (error.message?.includes("404") || error.message?.includes("not found")) {
            console.warn(`Model ${MODEL_ID} not found, trying fallback...`);
        }
        throw error;
    }
};