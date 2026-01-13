export interface TrainingInterview {
    position: string;
    company: string;
    topics: string[];
}

export interface Interview extends TrainingInterview {
    id: number;
    title: string;
    date: string;
    time: string;
    duration: string;
    interviewer: string;
    status: string;
    difficulty: string;
}

export interface UpcomingInterview extends Interview { }

export interface CompletedInterview extends Interview {
    score: number;
    feedback: string;
}

export interface PrepTopic {
    id: number;
    title: string;
    category: string;
    completed: number;
    total: number;
    difficulty: string;
    duration: string;
}
