import React from 'react';
import { Terminal, Code, Layers, BarChart, Settings, ArrowRight} from 'lucide-react';
import './trainingTracks.scss';
import SectionHeadline from '../SectionHeadline/SectionHeadline';
import SectionEyebrow from '../SectionEyebrow/SectionEyebrow';
import SectionSubHeadline from '../SectionSubHeadline/SectionSubHeadline';

const trainingTracksData = [
  {
    id: 'backend',
    title: 'Backend Developer',
    desc: 'Master APIs, databases, microservices, and system design for scalable applications.',
    icon: <Terminal size={26} />,
    color: 'var(--theme-color-secondary)',
    tag: 'Popular',
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    desc: 'Craft intuitive UIs with React, Next.js, and optimize for performance and UX.',
    icon: <Code size={26} />,
    color: '#2563eb',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    desc: 'Build and deploy end-to-end solutions, bridging both frontend and backend architectures.',
    icon: <Layers size={26} />,
    color: '#059669',
    tag: 'New',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    desc: 'Uncover insights with SQL, Python, and data visualization for business decisions.',
    icon: <BarChart size={26} />,
    color: '#ea580c',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    desc: 'Automate CI/CD pipelines, manage infrastructure, and ensure seamless delivery.',
    icon: <Settings size={26} />,
    color: '#dc2626',
    tag: 'Coming Soon',
  },
];

const TrainingTracks = () => {
  return (
    <section className="tracks-section">
      <div className="tracks-container">
        <header className="tracks-header">
          <SectionEyebrow text="Career Paths" />
          <SectionHeadline text="Specialized" gradient_text="Training Tracks" />
          <SectionSubHeadline text="Industry-validated curriculums designed to turn beginners into job-ready engineers." />
        </header>

        <div className="tracks-grid">
          {trainingTracksData.map((track) => (
            <div
              key={track.id}
              className="track-card"
              style={{ '--accent-color': track.color } as React.CSSProperties}
            >
              {track.tag && (
                <span className={`track-tag ${track.tag.toLowerCase().replace(' ', '-')}`}>
                  {track.tag}
                </span>
              )}

              <div className="track-icon-container">
                <div className="track-icon-glow"></div>
                {track.icon}
              </div>

              <div className="track-body">
                <h3 className="track-card-title">{track.title}</h3>
                <p className="track-card-desc">{track.desc}</p>
              </div>

              <div className="track-card-footer">
                <span className="track-cta">View Track</span>
                <ArrowRight className="track-arrow" size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingTracks;