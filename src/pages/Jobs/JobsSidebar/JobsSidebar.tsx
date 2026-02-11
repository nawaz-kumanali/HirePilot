import { X, Filter, RotateCcw, ChevronDown, Briefcase, TrendingUp, MapPin, Pin, PinOff } from 'lucide-react';
import { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Stack,
  Collapse,
  List,
  ListItemButton,
  useTheme,
  alpha,

} from '@mui/material';

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
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const toggleLock = () => setIsLocked(!isLocked);
  const expandAndLock = () => setIsLocked(true);

  const showFullContent = isHovered || isLocked || mobileOpen;

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" onClick={toggleLock} sx={{ cursor: 'pointer', flex: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
            }}
          >
            <Filter size={22} strokeWidth={2.5} />
          </Box>
          {showFullContent && (
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Filters
              </Typography>
              {activeFilters > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {activeFilters} selected
                </Typography>
              )}
            </Box>
          )}
        </Stack>

        {showFullContent && (
          <Stack direction="row" spacing={0.5}>
            <IconButton
              size="small"
              onClick={toggleLock}
              title={isLocked ? "Unlock Sidebar" : "Lock Sidebar"}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                color: isLocked ? 'primary.main' : 'text.secondary',
              }}
            >
              {isLocked ? <Pin size={18} /> : <PinOff size={18} />}
            </IconButton>
            <IconButton
              size="small"
              onClick={onMobileClose}
              sx={{ display: { xs: 'flex', lg: 'none' } }}
            >
              <X size={22} />
            </IconButton>
          </Stack>
        )}
      </Box>

      {/* Filter Body */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Stack spacing={2}>
          <FilterDropdown
            label="Job Type"
            activeValue={filterType}
            onChange={onFilterTypeChange}
            options={jobTypes}
            icon={<Briefcase size={18} strokeWidth={2} />}
            compact={!showFullContent}
            onExpand={expandAndLock}
          />

          <FilterDropdown
            label="Experience Level"
            activeValue={filterLevel}
            onChange={onFilterLevelChange}
            options={jobLevels}
            icon={<TrendingUp size={18} strokeWidth={2} />}
            compact={!showFullContent}
            onExpand={expandAndLock}
          />

          <FilterDropdown
            label="Location"
            activeValue={filterLocation}
            onChange={onFilterLocationChange}
            options={locations}
            icon={<MapPin size={18} strokeWidth={2} />}
            compact={!showFullContent}
            onExpand={expandAndLock}
          />
        </Stack>
      </Box>

      {/* Footer */}
      {showFullContent && (
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<RotateCcw size={16} />}
            onClick={onReset}
            disabled={activeFilters === 0}
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
            }}
          >
            Clear All
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: showFullContent ? 280 : 72,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          position: 'sticky',
          top: 80,
          height: 'calc(100vh - 100px)',
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

interface FilterDropdownProps {
  label: string;
  activeValue: string;
  onChange: (value: string) => void;
  options: string[];
  icon: React.ReactNode;
  compact: boolean;
  onExpand: () => void;
}

const FilterDropdown = ({
  label,
  activeValue,
  onChange,
  options,
  icon,
  compact,
  onExpand
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const handleTriggerClick = () => {
    if (compact) {
      onExpand();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const selectedLabel = activeValue || `All ${label}s`;

  return (
    <Box>
      <Button
        fullWidth
        onClick={handleTriggerClick}
        sx={{
          justifyContent: compact ? 'center' : 'space-between',
          p: compact ? 1.5 : 1.5,
          borderRadius: 1.5,
          bgcolor: activeValue ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
          border: `1px solid ${activeValue ? theme.palette.primary.main : theme.palette.divider}`,
          color: 'text.primary',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderColor: 'primary.main',
          },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
          <Box sx={{ color: activeValue ? 'primary.main' : 'text.secondary', display: 'flex' }}>
            {icon}
          </Box>
          {!compact && (
            <Box sx={{ flex: 1, textAlign: 'left' }}>
              <Typography variant="caption" display="block" color="text.secondary" fontWeight={600}>
                {label}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {selectedLabel}
              </Typography>
            </Box>
          )}
        </Stack>
        {!compact && (
          <ChevronDown
            size={20}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        )}
      </Button>

      {!compact && (
        <Collapse in={isOpen}>
          <List sx={{ mt: 1, bgcolor: alpha(theme.palette.background.paper, 0.5), borderRadius: 1.5, overflow: 'hidden' }}>
            <ListItemButton
              selected={activeValue === ''}
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              sx={{
                py: 1,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                  },
                },
              }}
            >
              <Typography variant="body2">All {label}s</Typography>
              {activeValue === '' && (
                <Typography variant="body2" sx={{ ml: 'auto', color: 'primary.main' }}>
                  ✓
                </Typography>
              )}
            </ListItemButton>
            {options.map((option) => (
              <ListItemButton
                key={option}
                selected={activeValue === option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                sx={{
                  py: 1,
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                  },
                }}
              >
                <Typography variant="body2">{option}</Typography>
                {activeValue === option && (
                  <Typography variant="body2" sx={{ ml: 'auto', color: 'primary.main' }}>
                    ✓
                  </Typography>
                )}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

export default JobsSidebar;