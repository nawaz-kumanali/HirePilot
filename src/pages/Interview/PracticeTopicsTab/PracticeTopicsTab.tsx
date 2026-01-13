import { TrendingUp, ArrowRight } from 'lucide-react';
import './practiceTopicsTab.scss';

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
}

const PracticeTopicsTab = ({ topics }: PracticeTopicsTabProps) => {
  return (
    <div className="interview-grid-layout">
      {topics.map((topic) => (
        <div key={topic.id} className="interview-practice-card">
          <div className="interview-practice-header">
            <div>
              <h3 className="interview-card-title">{topic.title}</h3>
              <p className="interview-practice-category">{topic.category}</p>
            </div>
            <TrendingUp size={24} className="interview-trend-icon" />
          </div>

          <div className="interview-progress-container">
            <div className="interview-progress-labels">
              <span>Progress</span>
              <span>{topic.completed}/{topic.total} lessons</span>
            </div>
            <div className="interview-progress-track">
              <div
                className="interview-progress-fill"
                style={{ width: `${(topic.completed / topic.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="interview-practice-footer">
            <div className="interview-practice-left">
              <span className={`interview-diff-chip ${topic.difficulty.toLowerCase()}`}>
                {topic.difficulty}
              </span>
              <span className="interview-duration-text">⏱️ {topic.duration}</span>
            </div>
            <button className="interview-continue-btn">
              Continue <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PracticeTopicsTab;