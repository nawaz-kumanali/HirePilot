import { Filter } from 'lucide-react';
import SearchBar from '../../../components/SearchBar/SearchBar';
import './jobToolbar.scss';

interface JobToolbarProps {
    searchTerm: string;
    onSearchChange: (val: string) => void;
    onMobileFilterOpen: () => void;
}

const JobToolbar = ({ searchTerm, onSearchChange, onMobileFilterOpen }: JobToolbarProps) => {
    return (
        <div className="list-toolbar">
            <div className="toolbar-actions">
                <SearchBar
                    placeHolder="Search jobs by title, company, or skills..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                <button className="mobile-filter-trigger" onClick={onMobileFilterOpen}>
                    <Filter size={16} />
                    <span>Filters</span>
                </button>
            </div>
        </div>
    );
};

export default JobToolbar;
