import { MapPin, Edit, LogOut, Github, Linkedin, Twitter, Globe, Copy, Check, Mail, Phone, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import Card from '../../../components/ui/Card/Card';
import profileImg from '../../../assets/Nawaz_profile_IMG.jpg';
import './profileSidebar.scss';

interface ProfileSidebarProps {
    profileData: any;
    profileCompletion: number;
    isEditing: boolean;
    copiedLink: boolean;
    onEditClick: () => void;
    onCopyClick: () => void;
    onLogoutClick: () => void;
    onImageClick: () => void;
}

const ProfileSidebar = ({
    profileData,
    profileCompletion,
    copiedLink,
    onEditClick,
    onCopyClick,
    onLogoutClick,
    onImageClick
}: ProfileSidebarProps) => {
    return (
        <aside className="profile-sidebar">
            <Card className="profile-main-card">
                <div className="avatar-section">
                    <div className="avatar-wrapper">
                        <div className="main-avatar">
                            {profileImg ? <img src={profileImg} alt="profile" /> : "NK"}
                        </div>
                        <button className="camera-btn" onClick={onImageClick}>
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
                    <Button variant="secondary" iconLeft={<Edit size={16} />} onClick={onEditClick} fullWidth>
                        Edit Profile
                    </Button>
                    <Button variant="secondary" iconLeft={copiedLink ? <Check size={16} /> : <Copy size={16} />} onClick={onCopyClick} fullWidth>
                        Share Portfolio
                    </Button>
                    <Button variant="danger" iconLeft={<LogOut size={16} />} onClick={onLogoutClick} fullWidth>
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
    );
};

export default ProfileSidebar;
