import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import './jobs.scss';
import type Job from '../../types/job';
import { jobList } from '../../data/jobs'; // Fallback for static demo

// Components & Hooks
import JobDetails from './JobDetails/JobDetails';
import JobsSidebar from './JobsSidebar/JobsSidebar';
import EmptyState from '../../components/EmptyState/EmptyState';
import JobCard from './JobCard/JobCard';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import Pagination from '../../components/Pagination/Pagination';
import JobToolbar from './JobToolbar/JobToolbar';

// RTK Query
import { useGetJobsQuery } from '../../api/jobApi';

type JobType = '' | Job['type'];
type JobLevel = '' | Job['level'];

const ITEMS_PER_PAGE = 5;

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<JobType>('');
  const [filterLevel, setFilterLevel] = useState<JobLevel>('');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  // RTK Query Call
  const { data: jobsData, isLoading } = useGetJobsQuery({
    search: searchTerm,
    type: filterType,
    level: filterLevel,
    location: filterLocation
  });

  // For this demo, since we don't have a real server, we use local filtering as a fallback
  // if jobsData is undefined (which it will be in the current setup)
  const jobs = jobsData || jobList;

  // Dynamic Options derived from data
  const jobTypes = useMemo(() => Array.from(new Set(jobList.map(j => j.type))), []);
  const jobLevels = useMemo(() => Array.from(new Set(jobList.map(j => j.level))), []);
  const locations = useMemo(() => Array.from(new Set(jobList.map(j => j.location))), []);

  // Filtering Logic (kept local for the trial, but hooked up to UI)
  const filteredJobs = useMemo(() => {
    return jobs.filter((job: any) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = filterType === '' || job.type === filterType;
      const matchesLevel = filterLevel === '' || job.level === filterLevel;
      const matchesLocation = filterLocation === '' || job.location === filterLocation;

      return matchesSearch && matchesType && matchesLevel && matchesLocation;
    });
  }, [searchTerm, filterType, filterLevel, filterLocation, jobs]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, filterLevel, filterLocation]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOpenJob = (job: Job) => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterLevel('');
    setFilterLocation('');
  };

  const activeFilters = [filterType, filterLevel, filterLocation].filter(f => f !== '').length;

  return (
    <main className="jobs-page-wrapper">
      <div className="jobs-container">
        <header className="jobs-header-container">
          <VisualHeader
            badge='New opportunities added today'
            title='Find Your'
            gradient_title='Dream Job'
            subtitle="Discover amazing opportunities and advance your career with HirePilot's curated job board for developers."
          />
        </header>

        <JobToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onMobileFilterOpen={() => setMobileFiltersOpen(true)}
        />

        <div className="jobs-layout">
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
            activeFilters={activeFilters}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <section className="jobs-list-container">
            <div className="jobs-grid-wrapper">
              {isLoading ? (
                <div className="loading-state">Loading jobs...</div>
              ) : paginatedJobs.length > 0 ? (
                <>
                  <div className="jobs-stack">
                    {paginatedJobs.map((job: any) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onOpen={handleOpenJob}
                      />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <EmptyState
                  title="No jobs found"
                  description="We couldn't find any jobs matching your current filters. Try broadening your search criteria."
                />
              )}
            </div>
          </section>
        </div>
      </div>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setOpenDialog(false)}
          open={openDialog}
        />
      )}
    </main>
  );
};

export default Jobs;