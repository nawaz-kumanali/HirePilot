import { Terminal, Code, Layers, BarChart, Settings} from 'lucide-react';
import './trainingTracks.scss';
import VisualHeader from '../../VisualHeader/VisualHeader';
import TTCard from './TTCard/TTCard';

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
          <VisualHeader badge='Career Paths' title='Specialized' gradient_title='Training Tracks' subtitle='Industry-validated curriculums designed to turn beginners into job-ready engineers.' />
        </header>

        <div className="tracks-grid">
          {trainingTracksData.map((track, index) => (
              <TTCard {...track} key={index}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingTracks;