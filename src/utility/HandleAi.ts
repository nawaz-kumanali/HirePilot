import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);



const MODEL_ID = "gemini-2.5-flash";
console.log('called outside')
export const getAiResponse = async (prompt: string) => {
    console.log('called')
    try {
        const model = genAI.getGenerativeModel({
            model: MODEL_ID,
            generationConfig: { temperature: 0.7 }
        });

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error: any) {
        let errorMessage = "AI Error";
        if (error.message?.includes("404") || error.message?.includes("not found")) {
            errorMessage = "Model not found. Please check your configuration.";
        } else if (error.message?.includes("429")) {
            errorMessage = "Rate limit exceeded. Please wait a moment.";
        }
        console.error(`AI Error (${MODEL_ID}):`, error.message);
        throw new Error(errorMessage);
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
        let errorMessage = "AI Stream Error";
        if (error.message?.includes("404") || error.message?.includes("not found")) {
            errorMessage = "Model not found. Please check your configuration.";
        } else if (error.message?.includes("429")) {
            errorMessage = "Rate limit reached. Please try again in 1 minute.";
        }
        console.error(`AI Stream Error (${MODEL_ID}):`, error.message);
        throw new Error(errorMessage);
    }
};