import { Box } from '@mui/material';
import InterviewCard from '../InterviewCard/InterviewCard';

interface PracticeTopic {
  id: number;
  title: string;
  category: string;
  completed: number;
  total: number;
  difficulty: string;
  duration: string;
}

interface PracticeTopicsTabProps {
  topics: PracticeTopic[];
  onStartTraining: (interview: { position: string; company: string; topics: string[] }) => void;
}

const PracticeTopicsTab = ({ topics, onStartTraining }: PracticeTopicsTabProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {topics.map((topic) => (
        <InterviewCard
          key={topic.id}
          interview={{
            id: topic.id,
            title: topic.title,
            position: topic.title,
            company: topic.category,
            date: 'Available Anytime',
            time: 'Self-paced',
            duration: topic.duration,
            difficulty: topic.difficulty,
            topics: [topic.category],
            interviewer: 'AI'
          }}
          onStartTraining={(interview) => onStartTraining({
            position: interview.position,
            company: interview.company,
            topics: interview.topics
          })}
        />
      ))}
    </Box>
  );
};

export default PracticeTopicsTab;