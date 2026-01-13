import { FileText } from 'lucide-react';
import './completedInterviewsTab.scss';
import type { CompletedInterview } from '../../../types/interview';

interface CompletedInterviewsTabProps {
  interviews: CompletedInterview[];
}

const CompletedInterviewsTab = ({ interviews }: CompletedInterviewsTabProps) => {
  return (
    <div className="interview-grid-layout">
      {interviews.map((interview) => (
        <div key={interview.id} className="interview-history-card">
          <div className="interview-history-header">
            <div className="interview-history-title-section">
              <h3 className="interview-card-title">{interview.title}</h3>
              <p className="interview-history-company">
                {interview.company} • {interview.position}
              </p>
            </div>
            <div className="interview-score-circle">
              <span className="interview-score-val">{interview.score}%</span>
            </div>
          </div>

          <div className="interview-feedback-section">
            <div className="interview-feedback-label">
              <FileText size={16} />
              Feedback
            </div>
            <p className="interview-feedback-text">"{interview.feedback}"</p>
          </div>

          <div className="interview-history-meta">
            <span className="interview-history-date">{interview.date}</span>
            <span className="interview-history-interviewer">by {interview.interviewer}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedInterviewsTab;