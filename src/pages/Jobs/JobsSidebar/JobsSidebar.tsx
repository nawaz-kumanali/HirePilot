import { X, Filter, RotateCcw, ChevronDown, Briefcase, TrendingUp, MapPin } from 'lucide-react';
import './JobsSidebar.scss';
import { useRef, useEffect, useState } from 'react';

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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onMobileClose();
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen, onMobileClose]);

  return (
    <div className="jobs-sidebar-outer-wrapper" ref={menuRef}>
      {/* Mobile Backdrop */}
      <div
        className={`jobs-sidebar-backdrop ${mobileOpen ? 'visible' : ''}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <aside 
        className={`jobs-filter-sidebar ${mobileOpen ? 'open' : ''}`}
        role="complementary"
        aria-label="Job Filters"
      >
        {/* Header */}
        <div className="jobs-filter-header">
          <div className="jobs-filter-title">
            <div className="jobs-filter-icon-box">
              <Filter size={22} strokeWidth={2.5} />
            </div>
            <div className="jobs-filter-title-text">
              <span className="jobs-filter-title-main">Filters</span>
              {activeFilters > 0 && (
                <span className="jobs-filter-count">
                  {activeFilters} selected
                </span>
              )}
            </div>
          </div>
          <button 
            className="jobs-close-mobile-btn" 
            onClick={onMobileClose}
            aria-label="Close filters"
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="jobs-filter-body">
          <FilterDropdown
            label="Job Type"
            activeValue={filterType}
            onChange={onFilterTypeChange}
            options={jobTypes}
            icon={<Briefcase size={18} strokeWidth={2} />}
          />

          <FilterDropdown
            label="Experience Level"
            activeValue={filterLevel}
            onChange={onFilterLevelChange}
            options={jobLevels}
            icon={<TrendingUp size={18} strokeWidth={2} />}
          />

          <FilterDropdown
            label="Location"
            activeValue={filterLocation}
            onChange={onFilterLocationChange}
            options={locations}
            icon={<MapPin size={18} strokeWidth={2} />}
          />
        </div>

        {/* Footer */}
        <div className="jobs-filter-footer">
          <button
            className={`jobs-reset-btn ${activeFilters === 0 ? 'disabled' : ''}`}
            onClick={onReset}
            disabled={activeFilters === 0}
            type="button"
            aria-label="Clear all filters"
          >
            <RotateCcw size={16} />
            <span>Clear All</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

interface FilterDropdownProps {
  label: string;
  activeValue: string;
  onChange: (value: string) => void;
  options: string[];
  icon: React.ReactNode;
}

const FilterDropdown = ({ 
  label, 
  activeValue, 
  onChange, 
  options, 
  icon 
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedLabel = activeValue || `All ${label}s`;

  return (
    <div className="jobs-filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        <div className="dropdown-trigger-content">
          <span className="dropdown-icon">{icon}</span>
          <div className="dropdown-label-wrapper">
            <span className="dropdown-label-text">{label}</span>
            <span className="dropdown-selected">{selectedLabel}</span>
          </div>
        </div>
        <ChevronDown 
          size={20} 
          className={`dropdown-chevron ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          <button
            className={`dropdown-item ${activeValue === '' ? 'active' : ''}`}
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            type="button"
          >
            <span>All {label}s</span>
            {activeValue === '' && <span className="checkmark">✓</span>}
          </button>
          {options.map((option) => (
            <button
              key={option}
              className={`dropdown-item ${activeValue === option ? 'active' : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              type="button"
            >
              <span>{option}</span>
              {activeValue === option && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsSidebar;