import { getAiResponse } from './HandleAi';

/**
 * Generates a dynamic interview question using AI.
 * It considers the role, company, past conversation, and topics.
 */
export const generateAIQuestion = async (session: any): Promise<string> => {
  const { interview, messages } = session;
  const history = messages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');

  const prompt = `
        You are an expert interviewer for the position of ${interview.position} at ${interview.company}.
        The focus areas for this interview are: ${interview.topics.join(', ')}.
        
        Current Interview History:
        ${history}

        Randomness Seed: ${Date.now()}

        Based on the candidate's last answer and the interview goals, generate the NEXT professional, probing interview question.
        
        CRITICAL INSTRUCTIONS FOR VARIETY:
        - If this is the start of the interview (history is empty), pick a RANDOM starting style: (A) Brief professional greeting & open-ended experience question, (B) Direct scenario-based challenge, or (C) Core technical concept inquiry.
        - DO NOT repeat the same opening question style across sessions.
        - Keep it concise (1-2 sentences). Do not include any meta-talk, just the question.
    `;

  try {
    const response: any = await getAiResponse(prompt);
    return response;
  } catch (error) {
    console.error("AI Question Generation Failed:", error);
    return "Can you tell me more about your experience with complex systems?"; // Fallback
  }
};

/**
 * Generates real-time behavioral/technical hints for the user during the interview.
 */
export const generateRealTimeInsight = async (lastUserMessage: string, position: string): Promise<string> => {
  const prompt = `
        A candidate for a ${position} role just said: "${lastUserMessage}"
        
        Give a single, very short (max 10 words) encouraging tip or technical hint for their next response.
        Example: "Mention specific tools used," or "Focus on the business impact."
    `;

  try {
    const response: any = await getAiResponse(prompt);
    return response.trim();
  } catch (error) {
    return ""; // Silently fail
  }
};

/**
 * Generates a comprehensive performance report at the end of the session.
 */
export const getPerformanceReport = async (history: any[], position: string) => {
  const prompt = `
    Analyze this interview history for a ${position} role.
    
    Interview History:
    ${JSON.stringify(history)}

    Return a JSON object with:
    - communicationScore (1-100)
    - technicalScore (1-100)
    - overallScore (1-100)
    - feedback (Professional summary)
    - tips (Array of exactly 3 actionable tips)
    
    NO MARKDOWN, JUST RAW JSON.
  `;

  try {
    const response: any = await getAiResponse(prompt);
    const cleanJson = response.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to generate performance report:", error);
    throw error;
  }
};

