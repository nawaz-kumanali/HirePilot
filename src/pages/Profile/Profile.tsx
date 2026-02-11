import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUserActions } from '../../store/CurrentUser/currentuser.slice';
import { authActions } from '../../store/auth/auth.slice';
import { type CurrentUserState } from '../../store/CurrentUser/currentuser.types';
import { Box, Stack } from '@mui/material';

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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '320px 1fr' },
            gap: 4,
          }}
        >
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

          <Box component="main">
            {isEditing ? (
              <EditProfile profileData={profileData} setIsEditing={setIsEditing} />
            ) : (
              <Stack spacing={3}>
                <ReadinessSection readiness={profileData.readiness} />
                <AboutMe bio={profileData.bio} />
                <CareerJourney experience={profileData.experience} />
                <SkillsCloud skills={profileData.skills} />
              </Stack>
            )}
          </Box>
        </Box>
      </Box>

      {openImageDialog && (
        <ImageModal onClose={() => setOpenImageDialog(false)} />
      )}
    </Box>
  );
};

export default Profile;
