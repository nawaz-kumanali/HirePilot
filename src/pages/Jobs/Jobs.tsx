import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type Job from '../../types/job';
import { Box, Container, useTheme, alpha, CircularProgress, Typography } from '@mui/material';

// Components & Hooks
import JobDetails from './JobDetails/JobDetails';
import JobsSidebar from './JobsSidebar/JobsSidebar';
import EmptyState from '../../components/EmptyState/EmptyState';
import JobCard from './JobCard/JobCard';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import Pagination from '../../components/Pagination/Pagination';
import JobToolbar from './JobToolbar/JobToolbar';
import { useJobFilters } from '../../hooks/useJobFilters';

// RTK Query
import { useGetJobsQuery } from '../../api/jobApi';

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const theme = useTheme();

  // RTK Query Call
  const { data: jobsData, isLoading } = useGetJobsQuery({});

  const {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterLevel,
    setFilterLevel,
    filterLocation,
    setFilterLocation,
    currentPage,
    setCurrentPage,
    jobTypes,
    jobLevels,
    locations,
    paginatedJobs,
    totalPages,
    handleReset,
    activeFiltersCount
  } = useJobFilters({ jobs: jobsData });

  const handleOpenJob = (job: Job) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setSelectedJob(job);
    setOpenDialog(true);
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        py: 5,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', pr: { xs: 3, md: 0 } }}>
        <Box component="header" sx={{ textAlign: 'center', py: { xs: 3, md: 5 } }}>
          <VisualHeader
            badge='New opportunities added today'
            title='Find Your'
            gradient_title='Dream Job'
            subtitle="Discover amazing opportunities and advance your career with HirePilot's curated job board for developers."
          />
        </Box>

        <JobToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onMobileFilterOpen={() => setMobileFiltersOpen(true)}
        />

        <Box sx={{ display: 'flex', gap: 4, alignItems: 'start', mt: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
          <JobsSidebar
            jobTypes={jobTypes}
            jobLevels={jobLevels}
            locations={locations}
            filterType={filterType}
            filterLevel={filterLevel}
            filterLocation={filterLocation}
            onFilterTypeChange={setFilterType as any}
            onFilterLevelChange={setFilterLevel as any}
            onFilterLocationChange={setFilterLocation}
            onReset={handleReset}
            activeFilters={activeFiltersCount}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, width: '100%' }}>
            <Box>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                  <CircularProgress />
                  <Typography variant="body1" sx={{ ml: 2 }}>Loading jobs...</Typography>
                </Box>
              ) : paginatedJobs.length > 0 ? (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {paginatedJobs.map((job: any) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onOpen={handleOpenJob}
                      />
                    ))}
                  </Box>
                  <Box sx={{ mt: 3.5 }}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </Box>
                </>
              ) : (
                <EmptyState
                  title="No jobs found"
                  description="We couldn't find any jobs matching your current filters. Try broadening your search criteria."
                />
              )}
            </Box>
          </Box>
        </Box>
      </Container>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setOpenDialog(false)}
          open={openDialog}
        />
      )}
    </Box>
  );
};

export default Jobs;