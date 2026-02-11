import InterviewCard from "../InterviewCard/InterviewCard";
import type { Interview } from "../../../types/interview";
import { Box } from '@mui/material';

interface UpcomingInterviewsTabProps {
  interviews: Interview[];
  onStartTraining: (interview: Interview) => void;
}

const UpcomingInterviewsTab = ({ interviews, onStartTraining }: UpcomingInterviewsTabProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onStartTraining={onStartTraining}
        />
      ))}
    </Box>
  );
};

export default UpcomingInterviewsTab;