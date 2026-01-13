import { Calendar, Clock, ArrowRight } from 'lucide-react';
import './interviewCard.scss';
import type { Interview } from '../../../types/interview';

interface InterviewCardProps {
    interview: Interview;
    onStartTraining: (interview: Interview) => void;
}

const InterviewCard = ({ interview, onStartTraining }: InterviewCardProps) => {
    const { title, company, position, date, time, duration, status, difficulty, topics } = interview;

    return (
        <div className="interview-card">
            <div className="interview-card-top">
                <div className="interview-card-badges">
                    <span className={`interview-status-badge ${status}`}>{status}</span>
                    <span className={`interview-difficulty-badge ${difficulty.toLowerCase()}`}>
                        {difficulty}
                    </span>
                </div>
                <span className="interview-company-tag">{company}</span>
            </div>

            <h3 className="interview-card-title">{title}</h3>
            <p className="interview-position-text">{position}</p>

            <div className="interview-card-meta">
                <div className="interview-meta-row">
                    <Calendar size={16} />
                    <span>{date}</span>
                </div>
                <div className="interview-meta-row">
                    <Clock size={16} />
                    <span>{time} • {duration}</span>
                </div>
            </div>

            <div className="interview-topics">
                {topics.map((topic, idx) => (
                    <span key={idx} className="interview-topic-tag">
                        {topic}
                    </span>
                ))}
            </div>

            <button
                className="interview-btn-primary"
                onClick={() => onStartTraining(interview)}
            >
                Start Training <ArrowRight size={16} />
            </button>
        </div>
    );
};

export default InterviewCard;