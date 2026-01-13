import { useState, useMemo } from 'react';
import './courses.scss';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import CourseCard from './CourseCard/CourseCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { COURSES } from '../../data/courses';
import { ChevronDown, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Web Dev', 'Data Science', 'Design', 'AI/ML'];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const filteredCourses = useMemo(() => {
    let result = COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory.toLowerCase().replace(' ', '-');
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      default: // popular
        result.sort((a, b) => b.students - a.students);
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div className="courses-page-wrapper">
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="hero-overlay"></div>
        <div className="courses-hero-content">
          <VisualHeader
            badge='Industry-Leading Education'
            title='Master New'
            gradient_title='Career Skills'
            subtitle='Expert-led courses designed to help you land your dream job in tech.'
          />

          <div className="search-filter-bar">
            <SearchBar placeHolder="What do you want to learn today?" value={searchQuery} onChange={setSearchQuery} />
            <div className="sort-dropdown">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="arrow" size={16} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="courses-container">
        {/* Category Filters */}
        <div className="filters-section">
          <div className="category-chips">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="results-count">
            <Sparkles size={16} className="icon" />
            <span>Showing {filteredCourses.length} professional courses</span>
          </div>
        </div>

        {/* Courses Grid */}
        <section className="courses-grid-section">
          {filteredCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <EmptyState title="No courses found" description="Try adjusting your search or filters to find what you're looking for." />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Courses;