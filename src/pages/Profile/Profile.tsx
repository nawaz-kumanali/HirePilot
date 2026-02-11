import { useState } from 'react';
import './profile.scss'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUserActions } from '../../store/CurrentUser/currentuser.slice';
import { authActions } from '../../store/auth/auth.slice';
import { type CurrentUserState } from '../../store/CurrentUser/currentuser.types';

// Components
import EditProfile from './Edit/EditProfile';
import ReadinessSection from './ReadinessSection/ReadinessSection';
import AboutMe from './AboutMe/AboutMe';
import CareerJourney from './CareerJourney/CareerJourney';
import SkillsCloud from './SkillsCloud/SkillsCloud';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import ImageModal from './ImageModal/ImageModal';

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

  const handleLogout = () => {
    dispatch(currentUserActions.resetCurrentUser());
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">

        <ProfileSidebar
          profileData={profileData}
          profileCompletion={profileCompletion}
          isEditing={isEditing}
          copiedLink={copiedLink}
          onEditClick={() => setIsEditing(true)}
          onCopyClick={copyToClipboard}
          onLogoutClick={handleLogout}
          onImageClick={() => setOpenImageDialog(true)}
        />

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

      {openImageDialog && (
        <ImageModal onClose={() => setOpenImageDialog(false)} />
      )}
    </div>
  );
};

export default Profile;
