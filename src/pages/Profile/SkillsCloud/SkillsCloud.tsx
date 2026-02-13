import React from 'react';
import { Award } from 'lucide-react';
import type { Skill } from '../../../store/CurrentUser/currentuser.types';
import { Card, Box, Stack, Typography, Chip, useTheme, alpha } from '@mui/material';

interface SkillsCloudProps {
    /** List of professional skills and their proficiency levels. */
    skills: Skill[];
}

/**
 * Interactive cloud of skill badges.
 * 
 * Displays skills as chips with color-coded proficiency indicators 
 * (Expert, Advanced, etc.) and hover effects.
 */
const SkillsCloud: React.FC<SkillsCloudProps> = ({ skills }) => {
    const theme = useTheme();

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Expert':
                return theme.palette.success.main;
            case 'Advanced':
                return theme.palette.info.main;
            case 'Intermediate':
                return theme.palette.warning.main;
            default:
                return theme.palette.text.secondary;
        }
    };

    return (
        <Card
            sx={{
                p: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                <Award size={22} color={theme.palette.primary.main} />
                <Typography variant="h5" fontWeight={700}>
                    Technical Expertise
                </Typography>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1.5,
                }}
            >
                {skills.map((skill, i) => (
                    <Chip
                        key={i}
                        label={
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Box
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: getLevelColor(skill.level),
                                    }}
                                />
                                <Typography variant="body2" fontWeight={600}>
                                    {skill.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                    {skill.level}
                                </Typography>
                            </Stack>
                        }
                        sx={{
                            px: 1.5,
                            py: 2.5,
                            height: 'auto',
                            bgcolor: alpha(theme.palette.background.default, 0.5),
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                borderColor: 'primary.main',
                            },
                        }}
                    />
                ))}
            </Box>
        </Card>
    );
};

export default SkillsCloud;
