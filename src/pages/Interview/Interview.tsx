import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './interview.scss';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import InterviewTabNav from './InterviewTabNav/InterviewTabNav';
import UpcomingInterviewsTab from './UpcomingInterviewsTab/UpcomingInterviewsTab';
import CompletedInterviewsTab from './CompletedInterviewsTab/CompletedInterviewsTab';
import PracticeTopicsTab from './PracticeTopicsTab/PracticeTopicsTab';
import TrainingSession from './TrainingSession/TrainingSession';
import { upcomingInterviews, completedInterviews, prepTopics } from '../../data/interviewData';
import type { TrainingInterview } from '../../types/interview';


interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface InterviewSession {
  isActive: boolean;
  interview: TrainingInterview | null;
  messages: Message[];
  isLoading: boolean;
}

const Interview = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [session, setSession] = useState<InterviewSession>({
    isActive: false,
    interview: null,
    messages: [],
    isLoading: false,
  });

  const handleStartTraining = (interview: TrainingInterview) => {
    setSession(prev => ({
      ...prev,
      isActive: true,
      interview,
      messages: [],
      isLoading: false,
    }));
  };

  useEffect(() => {
    if (location.state?.job) {
      const job = location.state.job;
      handleStartTraining({
        position: job.title,
        company: job.company,
        topics: job.tags || []
      });
      // Clear location state to prevent restart on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCloseSession = () => {
    setSession(prev => ({
      ...prev,
      isActive: false,
      interview: null,
      messages: [],
    }));
  };

  const handleSessionUpdate = (newMessages: Message[], isLoading: boolean) => {
    setSession(prev => ({
      ...prev,
      messages: newMessages,
      isLoading,
    }));
  };

  if (session.isActive && session.interview) {
    return (
      <TrainingSession
        session={session as any}
        onClose={handleCloseSession}
        onUpdate={handleSessionUpdate}
      />
    );
  }

  return (
    <div className="interview-wrapper">
      <div className="interview-container">
        <header className="interview-header">
          <VisualHeader
            badge="Ready to ace it?"
            title="Interview Prep Hub"
            gradient_title="with AI"
            subtitle="Master your next technical round with AI-driven insights and personalized feedback."
          />
        </header>

        <InterviewTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="interview-tab-content">
          {activeTab === 0 && (
            <UpcomingInterviewsTab
              interviews={upcomingInterviews}
              onStartTraining={handleStartTraining}
            />
          )}
          {activeTab === 1 && (
            <CompletedInterviewsTab
              interviews={completedInterviews}
            />
          )}
          {activeTab === 2 && (
            <PracticeTopicsTab
              topics={prepTopics}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Interview;