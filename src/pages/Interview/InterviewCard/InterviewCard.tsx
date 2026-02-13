import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Badge from '../../../components/Badge/Badge';
import type { Interview } from '../../../types/interview';
import { Box, Typography, Button, Stack, useTheme, alpha } from '@mui/material';
import Card from '../../../components/Card/Card';

interface InterviewCardProps {
    /** The interview data to display. */
    interview: Interview;
    /** Callback to start the training simulation. */
    onStartTraining: (interview: Interview) => void;
}

/**
 * A detailed card representing an individual interview round.
 * 
 * Displays company info, position, status badges (upcoming/completed), 
 * date/time, and targeted topics. Provides a direct action link 
 * to start/resume training.
 */
const InterviewCard = ({ interview, onStartTraining }: InterviewCardProps) => {
    const { company, position, date, time, duration, status, difficulty, topics } = interview;
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 3.5,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                },
                '&:hover': {
                    '&::before': {
                        opacity: 1,
                    }
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, gap: 1.5 }}>
                <Stack direction="row" spacing={1}>
                    <Badge variant={status === 'upcoming' ? 'info' : 'success'} className={status}>
                        {status}
                    </Badge>
                    <Badge variant="secondary" className={difficulty.toLowerCase()}>
                        {difficulty}
                    </Badge>
                </Stack>
                <Box
                    sx={{
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        color: 'primary.main',
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                    }}
                >
                    {company}
                </Box>
            </Box>

            <Typography variant="h6" fontWeight={800} gutterBottom sx={{ fontSize: '1.2rem', mb: 0.5 }}>
                {position}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 2, fontSize: '0.9rem' }}>
                {company}
            </Typography>

            <Stack spacing={1.25} sx={{ mb: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={1.25} sx={{ fontSize: '0.9rem', color: 'text.secondary', fontWeight: 500 }}>
                    <Calendar size={16} color={theme.palette.primary.main} />
                    <span>{date}</span>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.25} sx={{ fontSize: '0.9rem', color: 'text.secondary', fontWeight: 500 }}>
                    <Clock size={16} color={theme.palette.primary.main} />
                    <span>{time} • {duration}</span>
                </Stack>
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 2.5,
                    pb: 2.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                {topics.map((topic, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            bgcolor: alpha(theme.palette.background.paper, 0.5),
                            color: 'primary.main',
                            px: 1.5,
                            py: 0.75,
                            borderRadius: 5,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                borderColor: alpha(theme.palette.primary.main, 0.3),
                            }
                        }}
                    >
                        {topic}
                    </Box>
                ))}
            </Box>

            <Button
                fullWidth
                variant="contained"
                onClick={() => onStartTraining(interview)}
                endIcon={<ArrowRight size={16} />}
                sx={{
                    mt: 'auto',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: 'common.white',
                    py: 1.75,
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    boxShadow: 'none',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    }
                }}
            >
                Start Training
            </Button>
        </Card>
    );
};

export default InterviewCard;