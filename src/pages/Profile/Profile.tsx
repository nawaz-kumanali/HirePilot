import { useState } from 'react';
import {
  User, MapPin, Briefcase, Edit, Save, X,
  Camera, LogOut,
  Github, Linkedin, Twitter, Globe, Copy, Check,
  Mail, Phone, Award, Rocket, Zap, Shield,
  ChevronRight, Activity, Target
} from 'lucide-react';

import profileImg from '../../assets/Nawaz_profile_IMG.jpg'
import './profile.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUserActions } from '../../store/CurrentUser/currentuser.slice';
import { authActions } from '../../store/auth/auth.slice';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const profileData = useAppSelector(state => state.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [editData, setEditData] = useState(profileData);

  const readinessMetrics = [
    { label: 'Technical Depth', score: 85, icon: Zap, color: '#6366f1' },
    { label: 'Communication', score: 92, icon: Activity, color: '#10b981' },
    { label: 'System Design', score: 65, icon: Shield, color: '#f59e0b' },
    { label: 'Behavioral', score: 88, icon: Target, color: '#ec4899' },
  ];

  const experience = [
    {
      company: 'TechFlow Systems',
      role: 'Senior Full Stack Developer',
      period: 'Jan 2022 - Present',
      description: 'Leading the development of highly scalable microservices and real-time data visualizers.'
    },
    {
      company: 'Digital Wave',
      role: 'Frontend Engineer',
      period: 'Jun 2019 - Dec 2021',
      description: 'Specialized in building high-performance Vue and React applications for enterprise clients.'
    }
  ];

  const skills = [
    { name: 'React', level: 'Expert', category: 'Frontend' },
    { name: 'TypeScript', level: 'Expert', category: 'Language' },
    { name: 'Node.js', level: 'Advanced', category: 'Backend' },
    { name: 'PostgreSQL', level: 'Advanced', category: 'Database' },
    { name: 'AWS', level: 'Intermediate', category: 'DevOps' },
    { name: 'System Design', level: 'Advanced', category: 'Architecture' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('hirepilot.app/profile/nawaz');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const profileCompletion = 85;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">

        {/* Left Sidebar - Quick Info */}
        <aside className="profile-sidebar">
          <div className="sidebar-card profile-main-card">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <div className="main-avatar">
                  {profileImg ? <img src={profileImg} alt="profile" /> : "NK"}
                </div>
                <button className="camera-btn" onClick={() => setOpenImageDialog(true)}>
                  <Camera size={18} />
                </button>
                <div className="online-indicator"></div>
              </div>
            </div>

            <div className="user-intro">
              <h1 className="user-name">{profileData.firstName} {profileData.lastName}</h1>
              <p className="user-headline">{profileData.headline || 'Senior Full Stack Developer'}</p>
              <div className="location-pill">
                <MapPin size={14} />
                <span>{profileData.location || 'San Francisco, CA'}</span>
              </div>
            </div>

            <div className="profile-stats-row">
              <div className="stat-item">
                <span className="value">12</span>
                <span className="label">Interviews</span>
              </div>
              <div className="stat-item">
                <span className="value">92%</span>
                <span className="label">Success</span>
              </div>
            </div>

            <div className="completion-card">
              <div className="completion-info">
                <span>Profile Strength</span>
                <span>{profileCompletion}%</span>
              </div>
              <div className="completion-bar">
                <div className="fill" style={{ width: `${profileCompletion}%` }}></div>
              </div>
            </div>

            <div className="contact-list">
              <div className="contact-item">
                <Mail size={16} />
                <span>{profileData.email}</span>
              </div>
              {profileData.phone && (
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{profileData.phone}</span>
                </div>
              )}
            </div>

            <div className="sidebar-actions">
              <button className="edit-btn" onClick={() => { setEditData(profileData); setIsEditing(true); }}>
                <Edit size={16} /> Edit Profile
              </button>
              <button className="share-btn" onClick={copyToClipboard}>
                {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                Share Portfolio
              </button>
              <button className="logout-btn" onClick={() => {
                dispatch(currentUserActions.resetCurrentUser());
                dispatch(authActions.logout());
                navigate("/");
              }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          <div className="sidebar-card social-card">
            <h3>Connect Everywhere</h3>
            <div className="social-grid">
              <Link to={profileData.github || '#'} className="social-icon github" target="_blank"><Github size={20} /></Link>
              <Link to={profileData.linkedin || '#'} className="social-icon linkedin" target="_blank"><Linkedin size={20} /></Link>
              <Link to={profileData.twitter || '#'} className="social-icon twitter" target="_blank"><Twitter size={20} /></Link>
              <Link to={profileData.website || '#'} className="social-icon globe" target="_blank"><Globe size={20} /></Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="profile-main-content">
          {isEditing ? (
            <section className="glass-card edit-section fade-in">
              <div className="section-header">
                <h2><Edit size={22} /> Update Your Identity</h2>
                <p>Ensure your profile remains competitive and up-to-date.</p>
              </div>

              <div className="edit-form-grid">
                <div className="form-group half">
                  <label>First Name</label>
                  <input type="text" value={editData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
                </div>
                <div className="form-group half">
                  <label>Last Name</label>
                  <input type="text" value={editData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Headline</label>
                  <input type="text" value={editData.headline} onChange={(e) => handleInputChange('headline', e.target.value)} placeholder="e.g. Senior Full Stack Developer" />
                </div>
                <div className="form-group">
                  <label>Professional Bio</label>
                  <textarea rows={4} value={editData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} />
                </div>
                <div className="form-group half">
                  <label>Email</label>
                  <input type="email" value={editData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                </div>
                <div className="form-group half">
                  <label>Phone</label>
                  <input type="text" value={editData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={() => { dispatch(currentUserActions.setCurrentUser(editData)); setIsEditing(false); }}>
                  <Save size={18} /> Save Changes
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </section>
          ) : (
            <div className="main-content-grid">
              {/* Readiness Metrics */}
              <section className="glass-card readiness-section">
                <div className="section-header">
                  <h2><Rocket size={22} className="accent" /> Interview Readiness</h2>
                  <p>Real-time analytics based on your AI interview performance.</p>
                </div>
                <div className="readiness-grid">
                  {readinessMetrics.map((m, i) => (
                    <div key={i} className="metric-card">
                      <div className="metric-info">
                        <div className="icon-box" style={{ background: `${m.color}15`, color: m.color }}>
                          <m.icon size={20} />
                        </div>
                        <div className="text-info">
                          <span className="label">{m.label}</span>
                          <span className="score">{m.score}%</span>
                        </div>
                      </div>
                      <div className="metric-bar">
                        <div className="fill" style={{ width: `${m.score}%`, backgroundColor: m.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Professional Bio */}
              <section className="glass-card bio-section">
                <div className="section-header">
                  <h2><User size={22} className="accent" /> About Me</h2>
                </div>
                <p className="bio-text">{profileData.bio || 'Passionately developing high-impact software solutions with a focus on modern web technologies.'}</p>
              </section>

              {/* Career Journey */}
              <section className="glass-card journey-section">
                <div className="section-header">
                  <h2><Briefcase size={22} className="accent" /> Career Journey</h2>
                  <Link to="/jobs" className="explore-btn">Explore Jobs <ChevronRight size={16} /></Link>
                </div>
                <div className="timeline">
                  {experience.map((exp, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="item-content">
                        <div className="item-header">
                          <h4 className="role">{exp.role}</h4>
                          <span className="period">{exp.period}</span>
                        </div>
                        <p className="company">{exp.company}</p>
                        <p className="description">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills Cloud */}
              <section className="glass-card skills-section">
                <div className="section-header">
                  <h2><Award size={22} className="accent" /> Technical Expertise</h2>
                </div>
                <div className="skills-cloud">
                  {skills.map((skill, i) => (
                    <div key={i} className="skill-tag">
                      <span className="dot"></span>
                      <span className="name">{skill.name}</span>
                      <span className="level">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Image Change Modal */}
      {openImageDialog && (
        <div className="image-modal-overlay" onClick={() => setOpenImageDialog(false)}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <header>
              <h3>Profile Picture</h3>
              <button onClick={() => setOpenImageDialog(false)}><X size={20} /></button>
            </header>
            <div className="modal-options">
              <button className="option">
                <Camera size={20} />
                <span>Upload Photo</span>
              </button>
              <button className="option">
                <Github size={20} />
                <span>Import from GitHub</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
