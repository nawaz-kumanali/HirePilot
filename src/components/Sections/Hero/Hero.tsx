import { Box, Container } from '@mui/material';
import HeroBackground from './HeroBackground';
import HeroHeader from './HeroHeader';
import HeroFeatures from './HeroFeatures';

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <HeroBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 3 } }}>
        <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
          <HeroHeader />
          <HeroFeatures />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
