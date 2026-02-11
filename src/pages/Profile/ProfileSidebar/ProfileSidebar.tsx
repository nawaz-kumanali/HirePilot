import { MapPin, Edit, LogOut, Github, Linkedin, Twitter, Globe, Copy, Check, Mail, Phone, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import Card from '../../../components/Card/Card';
import profileImg from '../../../assets/Nawaz_profile_IMG.jpg';
import { Box, Stack, Typography, IconButton, Avatar, Divider, useTheme, alpha } from '@mui/material';

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
    const theme = useTheme();

    return (
        <Box component="aside" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card>
                {/* Avatar Section */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={profileImg}
                            alt="profile"
                            sx={{
                                width: 120,
                                height: 120,
                                border: `4px solid ${theme.palette.background.paper}`,
                                boxShadow: theme.shadows[4],
                            }}
                        >
                            NK
                        </Avatar>
                        <IconButton
                            onClick={onImageClick}
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}
                        >
                            <Camera size={18} />
                        </IconButton>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: -4,
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: 'success.main',
                                border: `3px solid ${theme.palette.background.paper}`,
                            }}
                        />
                    </Box>
                </Box>

                {/* User Info */}
                <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight={700} textAlign="center">
                        {profileData.firstName} {profileData.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        {profileData.headline || 'Senior Full Stack Developer'}
                    </Typography>
                    <Badge variant="ghost" iconLeft={<MapPin size={14} />}>
                        {profileData.location || 'San Francisco, CA'}
                    </Badge>
                </Stack>

                {/* Stats */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                    <Stack alignItems="center">
                        <Typography variant="h6" fontWeight={700}>
                            {profileData.interviewsCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Interviews
                        </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack alignItems="center">
                        <Typography variant="h6" fontWeight={700}>
                            {profileData.successRate}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Success
                        </Typography>
                    </Stack>
                </Stack>

                {/* Profile Completion */}
                <Box sx={{ mb: 3 }}>
                    <ProgressBar progress={profileCompletion} showLabel label="Profile Strength" height={8} />
                </Box>

                {/* Contact Info */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Mail size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                            {profileData.email}
                        </Typography>
                    </Stack>
                    {profileData.phone && (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Phone size={16} color={theme.palette.text.secondary} />
                            <Typography variant="body2" color="text.secondary">
                                {profileData.phone}
                            </Typography>
                        </Stack>
                    )}
                </Stack>

                {/* Actions */}
                <Stack spacing={2}>
                    <Button variant="secondary" iconLeft={<Edit size={16} />} onClick={onEditClick} fullWidth>
                        Edit Profile
                    </Button>
                    <Button variant="secondary" iconLeft={copiedLink ? <Check size={16} /> : <Copy size={16} />} onClick={onCopyClick} fullWidth>
                        Share Portfolio
                    </Button>
                    <Button variant="danger" iconLeft={<LogOut size={16} />} onClick={onLogoutClick} fullWidth>
                        Logout
                    </Button>
                </Stack>
            </Card>

            {/* Social Card */}
            <Card>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Connect Everywhere
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 1.5,
                    }}
                >
                    {[
                        { icon: Github, link: profileData.github, color: '#333' },
                        { icon: Linkedin, link: profileData.linkedin, color: '#0077b5' },
                        { icon: Twitter, link: profileData.twitter, color: '#1da1f2' },
                        { icon: Globe, link: profileData.website, color: theme.palette.primary.main },
                    ].map(({ icon: Icon, link, color }, i) => (
                        <IconButton
                            key={i}
                            component={Link}
                            to={link || '#'}
                            target="_blank"
                            sx={{
                                bgcolor: alpha(color, 0.1),
                                color: color,
                                '&:hover': {
                                    bgcolor: color,
                                    color: 'white',
                                },
                            }}
                        >
                            <Icon size={20} />
                        </IconButton>
                    ))}
                </Box>
            </Card>
        </Box>
    );
};

export default ProfileSidebar;
