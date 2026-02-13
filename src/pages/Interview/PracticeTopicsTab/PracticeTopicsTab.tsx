import { TrendingUp, ArrowRight } from 'lucide-react';
import { Box, Card, Typography, Stack, LinearProgress, Chip, Button, useTheme, alpha } from '@mui/material';

interface PracticeTopic {
  id: number;
  title: string;
  category: string;
  completed: number;
  total: number;
  difficulty: string;
  duration: string;
}

interface PracticeTopicsTabProps {
  topics: PracticeTopic[];
  onStartTraining: (interview: { position: string; company: string; topics: string[] }) => void;
}

const PracticeTopicsTab = ({ topics, onStartTraining }: PracticeTopicsTabProps) => {
  const theme = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {topics.map((topic) => (
        <Card
          key={topic.id}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {topic.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {topic.category}
              </Typography>
            </Box>
            <TrendingUp size={24} color={theme.palette.primary.main} />
          </Stack>

          <Box sx={{ mb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" fontWeight={600}>
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {topic.completed}/{topic.total} lessons
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(topic.completed / topic.total) * 100}
              sx={{
                height: 8,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1,
                },
              }}
            />
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={topic.difficulty}
                size="small"
                color={getDifficultyColor(topic.difficulty) as 'success' | 'warning' | 'error' | 'default'}
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="caption" color="text.secondary">
                ⏱️ {topic.duration}
              </Typography>
            </Stack>
            <Button
              size="small"
              endIcon={<ArrowRight size={14} />}
              onClick={() => onStartTraining({
                position: topic.title,
                company: 'Practice Session',
                topics: [topic.category, topic.title]
              })}
              sx={{
                borderRadius: 1.5,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Continue
            </Button>
          </Stack>
        </Card>
      ))}
    </Box>
  );
};

export default PracticeTopicsTab;