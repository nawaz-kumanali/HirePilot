export const generateAIQuestion = async (interview: any): Promise<string> => {
  const questions: Record<string, string[]> = {
    'Senior Full Stack Developer': [
      'Can you explain your approach to system design for a high-traffic application?',
      'Walk us through how you would optimize a React application for performance.',
      'How do you handle state management in large-scale applications?',
      'Describe your experience with microservices architecture.',
      'How would you approach debugging a complex full-stack issue?',
    ],
    'Frontend Engineer': [
      'Tell us about a complex UI you\'ve built. How did you approach it?',
      'How do you optimize CSS and ensure cross-browser compatibility?',
      'Explain your testing strategy for Vue.js components.',
      'How do you handle state management in your Vue applications?',
      'Describe your approach to responsive design.',
    ],
    'Backend Engineer': [
      'Design a REST API for a scalable e-commerce platform.',
      'How do you ensure API security and prevent common vulnerabilities?',
      'Explain your approach to database optimization.',
      'How do you handle error handling and logging in production?',
      'Describe your experience with deployment and DevOps.',
    ],
  };

  const roleQuestions = questions[interview.position] || questions['Senior Full Stack Developer'];
  return roleQuestions[Math.floor(Math.random() * roleQuestions.length)];
};

export const generateAIFeedback = (_userAnswer: string, _position: string): string => {
  const feedbackTemplates = [
    'Good start! You covered the basics well. To improve, consider exploring edge cases...',
    'That\'s a solid approach. Have you thought about the trade-offs between performance and maintainability?',
    'Nice explanation! In production environments, we often also consider scalability and security...',
    'Good technical knowledge. Can you elaborate on how you would handle error scenarios?',
    'Interesting perspective. How would you scale this solution for millions of users?',
  ];

  return feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
};

import { getAiResponse } from '../../utility/HandleAi';

export const getPerformanceReport = async (history: any[], position: string) => {
  const prompt = `
    Analyze the following interview history for a ${position} role.
    
    Interview History:
    ${JSON.stringify(history)}

    Provide a JSON response with the following format (NO MARKDOWN, JUST THE JSON):
    {
      "communicationScore": number (1-100),
      "technicalScore": number (1-100),
      "overallScore": number (1-100),
      "feedback": "A summary of the candidate's performance",
      "tips": ["Tip 1", "Tip 2", "Tip 3"]
    }
  `;

  try {
    const response = await getAiResponse(prompt);
    // Remove potential markdown block if AI adds it
    const cleanJson = response.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to generate performance report:", error);
    throw error;
  }
};
