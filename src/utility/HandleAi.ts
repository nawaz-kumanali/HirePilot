// utility/HandleAi.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAiStream = async (userInput: string, history: any[]) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(API_KEY);


    // Change "gemini-1.5-flash" to "gemini-1.5-flash-latest" 
    // or simply "gemini-pro" to test connectivity
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash", // Using the -latest suffix often fixes 404s
        systemInstruction: "You are a Senior Recruiter. Give 1-2 sentences of feedback, then ask exactly one follow-up question."
    });

    try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(userInput);
        return result.stream;
    } catch (error) {
        console.error("Stream initialization failed:", error);
        throw error;
    }
};

export const getAiResponse = async (prompt: string) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI response generation failed:", error);
        throw error;
    }
};
