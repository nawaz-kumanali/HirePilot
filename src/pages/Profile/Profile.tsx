import { useState } from 'react';
import {
  MapPin, Edit, X,
  Camera, LogOut,
  Github, Linkedin, Twitter, Globe, Copy, Check,
  Mail, Phone
} from 'lucide-react';

import profileImg from '../../assets/Nawaz_profile_IMG.jpg'
import './profile.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUserActions } from '../../store/CurrentUser/currentuser.slice';
import { authActions } from '../../store/auth/auth.slice';
import { type CurrentUserState } from '../../store/CurrentUser/currentuser.types';
import EditProfile from './Edit/EditProfile';
import ReadinessSection from './components/ReadinessSection/ReadinessSection';
import AboutMe from './components/AboutMe/AboutMe';
import CareerJourney from './components/CareerJourney/CareerJourney';
import SkillsCloud from './components/SkillsCloud/SkillsCloud';
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar';
import Button from '../../components/ui/Button/Button';
import Badge from '../../components/ui/Badge/Badge';
import Card from '../../components/ui/Card/Card';


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const profileData = useAppSelector(state => state.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const copyToClipboard = () => {
    navigator.clipboard.writeText('hirepilot.app/profile/nawaz');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const calculateCompletion = () => {
    const fields: (keyof CurrentUserState)[] = [
      'firstName', 'lastName', 'headline', 'location', 'bio',
      'github', 'linkedin', 'phone', 'experience', 'skills'
    ];
    const populatedFields = fields.filter(field => {
      const value = profileData[field];
      if (Array.isArray(value)) return value.length > 0;
      return !!value;
    });
    return Math.round((populatedFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateCompletion();

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">

        {/* Left Sidebar - Quick Info */}
        <aside className="profile-sidebar">
          <Card className="profile-main-card">
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
              <Badge variant="ghost" iconLeft={<MapPin size={14} />} className="location-pill">
                {profileData.location || 'San Francisco, CA'}
              </Badge>
            </div>

            <div className="profile-stats-row">
              <div className="stat-item">
                <span className="value">{profileData.interviewsCount}</span>
                <span className="label">Interviews</span>
              </div>
              <div className="stat-item">
                <span className="value">{profileData.successRate}%</span>
                <span className="label">Success</span>
              </div>
            </div>

            <ProgressBar progress={profileCompletion} showLabel label="Profile Strength" height="8px" className="completion-card-new" />

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
              <Button variant="secondary" iconLeft={<Edit size={16} />} onClick={() => setIsEditing(true)} fullWidth>
                Edit Profile
              </Button>
              <Button variant="secondary" iconLeft={copiedLink ? <Check size={16} /> : <Copy size={16} />} onClick={copyToClipboard} fullWidth>
                Share Portfolio
              </Button>
              <Button variant="danger" iconLeft={<LogOut size={16} />} onClick={() => {
                dispatch(currentUserActions.resetCurrentUser());
                dispatch(authActions.logout());
                navigate("/");
              }} fullWidth>
                Logout
              </Button>
            </div>
          </Card>

          <Card className="social-card">
            <h3>Connect Everywhere</h3>
            <div className="social-grid">
              <Link to={profileData.github || '#'} className="social-icon github" target="_blank"><Github size={20} /></Link>
              <Link to={profileData.linkedin || '#'} className="social-icon linkedin" target="_blank"><Linkedin size={20} /></Link>
              <Link to={profileData.twitter || '#'} className="social-icon twitter" target="_blank"><Twitter size={20} /></Link>
              <Link to={profileData.website || '#'} className="social-icon globe" target="_blank"><Globe size={20} /></Link>
            </div>
          </Card>
        </aside>

        {/* Main Content Area */}
        <main className="profile-main-content">
          {isEditing ? (
            <EditProfile profileData={profileData} setIsEditing={setIsEditing} />
          ) : (
            <div className="main-content-grid">
              <ReadinessSection readiness={profileData.readiness} />
              <AboutMe bio={profileData.bio} />
              <CareerJourney experience={profileData.experience} />
              <SkillsCloud skills={profileData.skills} />
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
