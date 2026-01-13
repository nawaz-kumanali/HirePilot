import InterviewCard from "../InterviewCard/InterviewCard";
import type { Interview } from "../../../types/interview";

interface UpcomingInterviewsTabProps {
  interviews: Interview[];
  onStartTraining: (interview: Interview) => void;
}

const UpcomingInterviewsTab = ({ interviews, onStartTraining }: UpcomingInterviewsTabProps) => {
  return (
    <div className="interview-grid-layout">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onStartTraining={onStartTraining}
        />
      ))}
    </div>
  );
};

export default UpcomingInterviewsTab;