import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import InterviewTabNav from './InterviewTabNav/InterviewTabNav';
import UpcomingInterviewsTab from './UpcomingInterviewsTab/UpcomingInterviewsTab';
import CompletedInterviewsTab from './CompletedInterviewsTab/CompletedInterviewsTab';
import PracticeTopicsTab from './PracticeTopicsTab/PracticeTopicsTab';
import TrainingSession from './TrainingSession/TrainingSession';
import { upcomingInterviews, completedInterviews, prepTopics } from '../../data/interviewData';
import type { TrainingInterview } from '../../types/interview';
import { Box, Container, useTheme, alpha } from '@mui/material';

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
  const theme = useTheme();

  const [upcomingInterviewsList] = useState(upcomingInterviews);
  const [completedInterviewsList, setCompletedInterviewsList] = useState(completedInterviews);
  const [prepTopicsList, setPrepTopicsList] = useState(prepTopics);

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

  const handleFinishSession = (report: any) => {
    const newCompletedInterview = {
      id: Date.now(),
      title: `${report.position} Interview`,
      company: report.company,
      position: report.position,
      date: report.date,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      duration: '15 mins',
      interviewer: 'AI Interviewer',
      status: 'completed' as const,
      difficulty: 'Medium' as const,
      topics: session.interview?.topics || [],
      score: report.overallScore,
      feedback: report.feedback,
    };

    setCompletedInterviewsList(prev => [newCompletedInterview, ...prev]);

    if (session.interview?.topics) {
      setPrepTopicsList(prev => prev.map(topic => {
        const matches = session.interview?.topics.some(t => topic.title.toLowerCase().includes(t.toLowerCase()) || topic.category.toLowerCase().includes(t.toLowerCase()));
        if (matches && topic.completed < topic.total) {
          return { ...topic, completed: topic.completed + 1 };
        }
        return topic;
      }));
    }
  };

  if (session.isActive && session.interview) {
    return (
      <TrainingSession
        session={session as any}
        onClose={handleCloseSession}
        onUpdate={handleSessionUpdate}
        onFinish={handleFinishSession}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 5,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box component="header" sx={{ textAlign: 'center', py: { xs: 3, md: 5 } }}>
          <VisualHeader
            badge="Ready to ace it?"
            title="Interview Prep Hub"
            gradient_title="with AI"
            subtitle="Master your next technical round with AI-driven insights and personalized feedback."
          />
        </Box>

        <InterviewTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <Box sx={{ mt: 4 }}>
          {activeTab === 0 && (
            <UpcomingInterviewsTab
              interviews={upcomingInterviewsList}
              onStartTraining={handleStartTraining}
            />
          )}
          {activeTab === 1 && (
            <CompletedInterviewsTab
              interviews={completedInterviewsList as any}
            />
          )}
          {activeTab === 2 && (
            <PracticeTopicsTab
              topics={prepTopicsList}
              onStartTraining={handleStartTraining}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Interview;