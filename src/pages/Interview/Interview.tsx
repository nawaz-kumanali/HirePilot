import { useState } from 'react';
import {
  Video,
  Clock,
  CheckCircle,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  Target,
  ArrowRight,
  X,
  Zap,
  Award,
  Sparkles
} from 'lucide-react';

import './interview.scss'
const Interview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const upcomingInterviews: any = [
    {
      id: 1,
      title: 'Full Stack Developer Interview',
      company: 'Tech Corp',
      position: 'Senior Full Stack Developer',
      date: 'Dec 28, 2025',
      time: '2:00 PM',
      duration: '60 mins',
      interviewer: 'John Smith',
      status: 'scheduled',
      difficulty: 'Hard',
      topics: ['React', 'Node.js', 'System Design'],
    },
    {
      id: 2,
      title: 'Frontend Engineering Interview',
      company: 'Design Studio',
      position: 'Frontend Engineer',
      date: 'Dec 30, 2025',
      time: '3:30 PM',
      duration: '45 mins',
      interviewer: 'Sarah Wilson',
      status: 'pending',
      difficulty: 'Medium',
      topics: ['Vue.js', 'CSS', 'Testing'],
    },
  ];

  const completedInterviews : any = [
    {
      id: 4,
      title: 'Backend Developer Interview',
      company: 'Cloud Systems',
      position: 'Backend Engineer',
      date: 'Dec 20, 2025',
      time: '1:00 PM',
      duration: '60 mins',
      interviewer: 'Alex Rivera',
      status: 'completed',
      difficulty: 'Medium',
      topics: ['Java', 'Spring Boot', 'API Design'],
      score: 85,
      feedback: 'Great problem-solving skills. Good understanding of backend concepts.',
    },
  ];

  const prepTopics : any= [
    { id: 1, title: 'System Design Fundamentals', category: 'System Design', completed: 8, total: 12, difficulty: 'Hard', duration: '4h 30m' },
    { id: 2, title: 'Data Structures & Algorithms', category: 'Coding', completed: 15, total: 20, difficulty: 'Medium', duration: '6h 20m' },
  ];

  return (
    <div className="interview-wrapper">
      <div className="interview-background"></div>
      <div className="interview-container">
        {/* Dashboard Header */}
        <header className="interview-header">
          <div className="interview-header-info">
            <div className="interview-header-badge">
              <Sparkles size={16} /> Ready to ace it?
            </div>
            <h1 className="interview-main-title">Interview Prep Hub</h1>
            <p className="interview-main-subtitle">Master your next technical round with AI-driven insights and personalized feedback.</p>
          </div>

          <div className="interview-stats-row">
            <div className="interview-stat-pill">
              <div className="interview-icon-box purple"><Target size={20} /></div>
              <div className="interview-stat-content">
                <span className="interview-stat-num">3</span>
                <span className="interview-stat-desc">Upcoming</span>
              </div>
            </div>
            <div className="interview-stat-pill">
              <div className="interview-icon-box green"><CheckCircle size={20} /></div>
              <div className="interview-stat-content">
                <span className="interview-stat-num">12</span>
                <span className="interview-stat-desc">Completed</span>
              </div>
            </div>
            <div className="interview-stat-pill">
              <div className="interview-icon-box blue"><Zap size={20} /></div>
              <div className="interview-stat-content">
                <span className="interview-stat-num">92%</span>
                <span className="interview-stat-desc">Success Rate</span>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="interview-tab-navigation">
          <button 
            className={`interview-tab-btn ${activeTab === 0 ? 'active' : ''}`} 
            onClick={() => setActiveTab(0)}
          >
            <Calendar size={18} />
            Upcoming Rounds
          </button>
          <button 
            className={`interview-tab-btn ${activeTab === 1 ? 'active' : ''}`} 
            onClick={() => setActiveTab(1)}
          >
            <Award size={18} />
            Past History
          </button>
          <button 
            className={`interview-tab-btn ${activeTab === 2 ? 'active' : ''}`} 
            onClick={() => setActiveTab(2)}
          >
            <TrendingUp size={18} />
            Practice Topics
          </button>
        </nav>

        {/* Content Area */}
        <div className="interview-tab-content">
          {activeTab === 0 && (
            <div className="interview-grid-layout">
              {upcomingInterviews.map((item: any) => (
                <div key={item.id} className="interview-card">
                  <div className="interview-card-top">
                    <div className="interview-card-badges">
                      <span className={`interview-status-badge ${item.status}`}>{item.status}</span>
                      <span className={`interview-difficulty-badge ${item.difficulty.toLowerCase()}`}>{item.difficulty}</span>
                    </div>
                    <span className="interview-company-tag">{item.company}</span>
                  </div>
                  
                  <h3 className="interview-card-title">{item.title}</h3>
                  <p className="interview-position-text">{item.position}</p>
                  
                  <div className="interview-card-meta">
                    <div className="interview-meta-row">
                      <Calendar size={16} />
                      <span>{item.date}</span>
                    </div>
                    <div className="interview-meta-row">
                      <Clock size={16} />
                      <span>{item.time} • {item.duration}</span>
                    </div>
                    <div className="interview-meta-row">
                      <Users size={16} />
                      <span>{item.interviewer}</span>
                    </div>
                  </div>

                  <div className="interview-topics">
                    {item.topics.map((topic: string, idx: number) => (
                      <span key={idx} className="interview-topic-tag">{topic}</span>
                    ))}
                  </div>

                  <button 
                    className="interview-btn-primary" 
                    onClick={() => { setSelected(item); setIsModalOpen(true); }}
                  >
                    Start Preparation <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div className="interview-grid-layout">
              {completedInterviews.map((item: any) => (
                <div key={item.id} className="interview-history-card">
                  <div className="interview-history-header">
                    <div className="interview-history-title-section">
                      <h3 className="interview-card-title">{item.title}</h3>
                      <p className="interview-history-company">{item.company} • {item.position}</p>
                    </div>
                    <div className="interview-score-circle">
                      <span className="interview-score-val">{item.score}%</span>
                    </div>
                  </div>
                  
                  <div className="interview-feedback-section">
                    <div className="interview-feedback-label">
                      <FileText size={16} />
                      Feedback
                    </div>
                    <p className="interview-feedback-text">"{item.feedback}"</p>
                  </div>

                  <div className="interview-history-meta">
                    <span className="interview-history-date">{item.date}</span>
                    <span className="interview-history-interviewer">by {item.interviewer}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 2 && (
            <div className="interview-grid-layout">
              {prepTopics.map((topic: any) => (
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
          )}
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="interview-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="interview-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button 
              className="interview-modal-close-x" 
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            
            <div className="interview-modal-body">
              <div className="interview-modal-icon">
                <Video size={48} />
              </div>
              
              <h2 className="interview-modal-title">Confirm Mock Session</h2>
              
              <p className="interview-modal-desc">
                You are starting a specialized practice session for <strong>{selected?.position}</strong> at <strong>{selected?.company}</strong>.
                The AI will simulate technical questions based on your background and difficulty level.
              </p>

              <div className="interview-modal-card">
                <div className="interview-modal-avatar">
                  <Sparkles size={24} color="white" />
                </div>
                <div className="interview-modal-avatar-info">
                  <div className="interview-modal-avatar-label">AI INTERVIEWER</div>
                  <div className="interview-modal-avatar-name">Technical Lead Alpha</div>
                </div>
              </div>

              <div className="interview-modal-info">
                <div className="interview-modal-info-row">
                  <Clock size={16} />
                  <span>Session Duration: {selected?.duration}</span>
                </div>
                <div className="interview-modal-info-row">
                  <Target size={16} />
                  <span>Difficulty: {selected?.difficulty}</span>
                </div>
              </div>

              <button 
                className="interview-modal-btn-primary" 
                onClick={() => setIsModalOpen(false)}
              >
                <Video size={18} />
                Launch Video Interview
              </button>
              
              <button 
                className="interview-modal-btn-secondary" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;