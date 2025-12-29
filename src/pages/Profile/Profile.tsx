import { useState } from 'react';
import {
  User, MapPin, Briefcase, Edit, Save, X,
  Camera, Award, BookOpen, Trophy, Settings, LogOut,
  Github, Linkedin, Twitter, Globe, Copy, Check, 
  Zap, TrendingUp, Heart
} from 'lucide-react';

import profileImg from '../../assets/Nawaz_profile_IMG.jpg'
import './profile.scss'
import { Link } from 'react-router-dom';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Nawaz',
    lastName: 'Kumanali',
    headline: 'Full Stack Developer | Open Source Enthusiast',
    location: 'Nipani, India',
    email: 'iamnawazahmad777@gmail.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate about building scalable applications and mentoring junior developers. Love exploring new technologies and contributing to open source projects.',
    website: 'nawaz.dev',
    joinedDate: 'Joined March 2021'
  });

  const [editData, setEditData] = useState(profileData);

  const skills = [
    { id: 1, name: 'React', level: 'Expert', endorsements: 245, percentage: 95 },
    { id: 2, name: 'TypeScript', level: 'Expert', endorsements: 189, percentage: 92 },
    { id: 3, name: 'Node.js', level: 'Advanced', endorsements: 156, percentage: 88 },
    { id: 4, name: 'System Design', level: 'Beginner', endorsements: 134, percentage: 85 },
    { id: 5, name: 'Java', level: 'Advanced', endorsements: 120, percentage: 86 },
    { id: 6, name: 'Springboot', level: 'Intermediate', endorsements: 98, percentage: 75 },
  ];

  const achievements = [
    { id: 1, icon: Trophy, title: '100 Days Challenge', desc: 'Completed 100 days of coding', color: '#f59e0b' },
    { id: 2, icon: Zap, title: 'Speed Learner', desc: 'Completed 5 courses in 1 month', color: '#ef4444' },
    { id: 3, icon: Award, title: 'Top Contributor', desc: 'Contributed to 10+ open source projects', color: '#10b981' },
    { id: 4, icon: BookOpen, title: 'Knowledge Seeker', desc: 'Read 50+ technical articles', color: '#3b82f6' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Globe, label: 'Website', url: '#' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('nawaz.dev/profile');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        
        {/* Header Card */}
        <div className="profile-header-card">
          <div className="header-banner"></div>
          
          <div className="profile-header-content">
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="main-avatar">
                  <div className="avatar-placeholder">{profileImg ? <img src={profileImg} alt="profile Img" /> : "NK"}</div>
                </div>
                <button className="camera-btn" onClick={() => setOpenImageDialog(true)} title="Change profile picture">
                  <Camera size={20} />
                </button>
                <div className="online-badge"></div>
              </div>
            </div>

            <div className="profile-main-info">
              {!isEditing ? (
                <>
                  <div className="profile-name-section">
                    <h1 className="user-name">{profileData.firstName} {profileData.lastName}</h1>
                    <span className="verified-badge">✓ Verified</span>
                  </div>
                  
                  <p className="user-headline">{profileData.headline}</p>
                  
                  <div className="contact-info-strip">
                    <span><MapPin size={16} /> {profileData.location}</span>
                    <span className="divider">•</span>
                    <span><Briefcase size={16} /> Open for opportunities</span>
                  </div>
                  
                  <p className="user-bio">{profileData.bio}</p>

                  <div className="social-links-row">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link key={link.label} to={link.url} className="social-link" title={link.label}>
                          <Icon size={18} />
                        </Link>
                      );
                    })}
                  </div>

                  <div className="action-buttons">
                    <button className="btn-primary" onClick={() => { setEditData(profileData); setIsEditing(true); }}>
                      <Edit size={16} /> Edit Profile
                    </button>
                    <button className="btn-secondary" onClick={copyToClipboard}>
                      {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                      {copiedLink ? 'Link Copied' : 'Share'}
                    </button>
                    <button className="btn-icon">
                      <Settings size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="edit-form-container">
                  <div className="edit-form-grid">
                    <div className="form-row">
                      <input 
                        type="text" 
                        value={editData.firstName} 
                        onChange={(e) => handleInputChange('firstName', e.target.value)} 
                        placeholder="First Name"
                        className="form-input"
                      />
                      <input 
                        type="text" 
                        value={editData.lastName} 
                        onChange={(e) => handleInputChange('lastName', e.target.value)} 
                        placeholder="Last Name"
                        className="form-input"
                      />
                    </div>
                    <input 
                      type="text" 
                      className="form-input full-width" 
                      value={editData.headline} 
                      onChange={(e) => handleInputChange('headline', e.target.value)} 
                      placeholder="Headline"
                    />
                    <textarea 
                      className="form-input full-width" 
                      rows={4} 
                      value={editData.bio} 
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself"
                    />
                    <div className="form-actions">
                      <button className="btn-save" onClick={() => { setProfileData(editData); setIsEditing(false); }}>
                        <Save size={16} /> Save Changes
                      </button>
                      <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--theme-color-primary), #6366f1)' }}>
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <strong>8</strong>
              <p>Courses</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ec4899, var(--theme-color-primary))' }}>
              <Zap size={24} />
            </div>
            <div className="stat-content">
              <strong>124</strong>
              <p>Hours</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)' }}>
              <Trophy size={24} />
            </div>
            <div className="stat-content">
              <strong>2,450</strong>
              <p>Points</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <strong>12</strong>
              <p>Streak</p>
            </div>
          </div>
        </div>

        {/* Tab System */}
        <div className="tabs-container">
          <div className="tab-headers">
            <button 
              className={`tab-button ${tabValue === 0 ? 'active' : ''}`} 
              onClick={() => setTabValue(0)}
            >
              <Briefcase size={18} />
              <span>Skills</span>
            </button>
            <button 
              className={`tab-button ${tabValue === 1 ? 'active' : ''}`} 
              onClick={() => setTabValue(1)}
            >
              <Award size={18} />
              <span>Achievements</span>
            </button>
            <button 
              className={`tab-button ${tabValue === 2 ? 'active' : ''}`} 
              onClick={() => setTabValue(2)}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>

          <div className="tab-panel">
            {tabValue === 0 && (
              <div className="skills-section">
                <div className="skills-header">
                  <h3>Professional Skills</h3>
                  <p>Skills are endorsed by your connections</p>
                </div>
                <div className="skills-grid">
                  {skills.map(skill => (
                    <div key={skill.id} className="skill-card">
                      <div className="skill-header">
                        <div>
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-badge">{skill.level}</span>
                        </div>
                        <Heart size={18} className="skill-heart" />
                      </div>
                      <small className="skill-endorsements">{skill.endorsements} endorsements</small>
                      <div className="skill-progress-bar">
                        <div className="skill-progress-fill" style={{ width: `${skill.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tabValue === 1 && (
              <div className="achievements-section">
                <div className="achievements-header">
                  <h3>Your Achievements</h3>
                  <p>Milestones you've unlocked</p>
                </div>
                <div className="achievements-grid">
                  {achievements.map(achievement => {
                    const Icon = achievement.icon;
                    return (
                      <div key={achievement.id} className="achievement-card">
                        <div className="achievement-icon" style={{ background: achievement.color }}>
                          <Icon size={32} color="white" />
                        </div>
                        <h4>{achievement.title}</h4>
                        <p>{achievement.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tabValue === 2 && (
              <div className="settings-section">
                <div className="settings-header">
                  <h3>Settings & Privacy</h3>
                </div>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <p className="setting-label">Public Profile</p>
                      <p className="setting-desc">Allow anyone to view your profile</p>
                    </div>
                    <input type="checkbox" className="toggle-switch" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <p className="setting-label">Email Notifications</p>
                      <p className="setting-desc">Receive course recommendations</p>
                    </div>
                    <input type="checkbox" className="toggle-switch" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <p className="setting-label">Show Learning Activity</p>
                      <p className="setting-desc">Display your progress publicly</p>
                    </div>
                    <input type="checkbox" className="toggle-switch" defaultChecked />
                  </div>
                  <button className="logout-btn">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Change Modal */}
      {openImageDialog && (
        <div className="image-change-modal-overlay" onClick={() => setOpenImageDialog(false)}>
          <div className="image-change-modal-content" onClick={e => e.stopPropagation()}>
            <div className="image-change-modal-header">
              <h3>Change Profile Picture</h3>
              <button className="image-change-modal-close-btn" onClick={() => setOpenImageDialog(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="image-change-modal-options">
              <button className="image-change-modal-option">
                <Camera size={20} />
                <span>Upload from Computer</span>
              </button>
              <button className="image-change-modal-option">
                <Globe size={20} />
                <span>Use Gravatar</span>
              </button>
              <button className="image-change-modal-option">
                <User size={20} />
                <span>Create Avatar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;