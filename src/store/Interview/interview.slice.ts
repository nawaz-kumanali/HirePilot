import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { upcomingInterviews, completedInterviews, prepTopics } from '../../data/interviewData';

interface Interview {
    id: number;
    title: string;
    company: string;
    position: string;
    date: string;
    time: string;
    duration: string;
    interviewer: string;
    status: 'scheduled' | 'pending' | 'completed';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topics: string[];
    score?: number;
    feedback?: string;
}

interface PrepTopic {
    id: number;
    title: string;
    category: string;
    completed: number;
    total: number;
    difficulty: string;
    duration: string;
}

interface InterviewState {
    upcomingInterviews: Interview[];
    completedInterviews: Interview[];
    prepTopics: PrepTopic[];
}

const initialState: InterviewState = {
    upcomingInterviews: upcomingInterviews as unknown as Interview[],
    completedInterviews: completedInterviews as unknown as Interview[],
    prepTopics: prepTopics,
};

const interviewSlice = createSlice({
    name: 'interview',
    initialState,
    reducers: {
        saveInterviewResult: (state, action: PayloadAction<Record<string, unknown>>) => {
            const report = action.payload;
            const newCompletedInterview: Interview = {
                id: Date.now(),
                title: (report.position as string) || 'Interview',
                company: (report.company as string) || 'Unknown',
                position: (report.position as string) || 'Unknown',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                duration: '30 mins',
                interviewer: 'AI Interviewer',
                status: 'completed',
                difficulty: 'Medium',
                topics: (report.topics as string[]) || [],
                score: (report.overallScore as number) || 0,
                feedback: (report.feedback as string) || '',
            };
            state.completedInterviews = [newCompletedInterview, ...state.completedInterviews];

            // Update prep topics progress if applicable
            const reportTopics = report.topics as string[] | undefined;
            if (Array.isArray(reportTopics)) {
                state.prepTopics = state.prepTopics.map(topic => {
                    const matchesData = reportTopics.some((t: string) =>
                        topic.title.toLowerCase().includes(t.toLowerCase()) ||
                        topic.category.toLowerCase().includes(t.toLowerCase())
                    );
                    if (matchesData && topic.completed < topic.total) {
                        return { ...topic, completed: topic.completed + 1 };
                    }
                    return topic;
                });
            }
        },
        scheduleInterview: (state, action: PayloadAction<Interview>) => {
            state.upcomingInterviews = [action.payload, ...state.upcomingInterviews];
        },
        cancelInterview: (state, action: PayloadAction<number>) => {
            state.upcomingInterviews = state.upcomingInterviews.filter(i => i.id !== action.payload);
        }
    },
});

export const { saveInterviewResult, scheduleInterview, cancelInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
