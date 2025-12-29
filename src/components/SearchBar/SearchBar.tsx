import { Search } from 'lucide-react'
import './searchbar.scss'

interface JobsSearchProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: JobsSearchProps) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-icon-box">
          <Search size={20} className="search-icon" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search jobs by title, company, or skills..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

      </div>
    </div>
  )
}

export default SearchBar