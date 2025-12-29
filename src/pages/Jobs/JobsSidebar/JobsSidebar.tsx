import { X, Filter, RotateCcw, ChevronDown } from 'lucide-react';

import './JobsSidebar.scss'
interface JobsFiltersSidebarProps {
  jobTypes: string[];
  jobLevels: string[];
  locations: string[];
  filterType: string;
  filterLevel: string;
  filterLocation: string;
  onFilterTypeChange: (value: string) => void;
  onFilterLevelChange: (value: string) => void;
  onFilterLocationChange: (value: string) => void;
  onReset: () => void;
  activeFilters: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const JobsSidebar = ({
  jobTypes,
  jobLevels,
  locations,
  filterType,
  filterLevel,
  filterLocation,
  onFilterTypeChange,
  onFilterLevelChange,
  onFilterLocationChange,
  onReset,
  activeFilters,
  mobileOpen,
  onMobileClose,
}: JobsFiltersSidebarProps) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`jobs-sidebar-backdrop ${mobileOpen ? 'visible' : ''}`} 
        onClick={onMobileClose} 
      />

      <aside className={`jobs-filter-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="jobs-filter-header">
          <div className="jobs-filter-title">
            <div className="jobs-filter-icon-box">
              <Filter size={20} />
            </div>
            <div className="jobs-filter-title-text">
              <span className="jobs-filter-title-main">Filters</span>
              {activeFilters > 0 && (
                <span className="jobs-filter-count">{activeFilters} active</span>
              )}
            </div>
          </div>
          <button className="jobs-close-mobile-btn" onClick={onMobileClose}>
            <X size={22} />
          </button>
        </div>

        <div className="jobs-filter-body">
          <FilterGroup 
            label="Job Type" 
            value={filterType} 
            onChange={onFilterTypeChange} 
            options={jobTypes}
            icon="💼"
          />
          
          <FilterGroup 
            label="Experience Level" 
            value={filterLevel} 
            onChange={onFilterLevelChange} 
            options={jobLevels}
            icon="📊"
          />
          
          <FilterGroup 
            label="Location" 
            value={filterLocation} 
            onChange={onFilterLocationChange} 
            options={locations}
            icon="📍"
          />
        </div>

        <div className="jobs-filter-footer">
          <button className="jobs-reset-btn" onClick={onReset}>
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      </aside>
    </>
  );
};

interface FilterGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: string;
}

const FilterGroup = ({ label, value, onChange, options, icon }: FilterGroupProps) => (
  <div className="jobs-filter-group">
    <label className="jobs-filter-label">
      {icon && <span className="jobs-filter-group-icon">{icon}</span>}
      {label}
    </label>
    <div className="jobs-select-wrapper">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="jobs-custom-select"
      >
        <option value="">All {label}s</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="jobs-select-chevron" size={18} />
    </div>
  </div>
);

export default JobsSidebar;