import React, { useState, useCallback } from 'react';
import { Star, Users, Clock, ChevronRight, Bookmark, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../../../types/course';
import './coursecard.scss';

interface CourseCardProps {
    course: Course;
    onEnroll?: (courseId: string) => void;
    onWishlist?: (courseId: string, isWishlisted: boolean) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, onWishlist }) => {
    const {
        id,
        title,
        instructor,
        rating,
        reviews,
        students,
        duration,
        price,
        image,
        level,
        category,
        bestseller
    } = course;

    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);

    const handleNavigate = () => {
        navigate(`/courses/${id}`);
    };

    const handleWishlist = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsWishlisted(prev => !prev);
        onWishlist?.(id, !isWishlisted);
    }, [id, isWishlisted, onWishlist]);

    const handleEnroll = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEnrolling(true);
        try {
            onEnroll?.(id);
        } finally {
            setIsEnrolling(false);
        }
    }, [id, onEnroll]);

    const isPopular = students > 50000;

    return (
        <article
            className="course-card"
            role="article"
            aria-label={`${title} course`}
            onClick={handleNavigate}
        >
            {/* Image Container */}
            <figure className="course-image-container">
                <img
                    src={image}
                    alt={title}
                    className="course-image"
                    loading="lazy"
                    decoding="async"
                />

                {/* Overlays */}
                <div className="image-overlay">
                    <PlayCircle size={40} className="preview-icon" />
                </div>

                {bestseller && <div className="bestseller-badge">Bestseller</div>}
                {isPopular && <div className="popular-badge">Popular</div>}

                <div className="course-badge">
                    <span className="badge-level">{level}</span>
                </div>

                {/* Wishlist Button */}
                <button
                    className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={isWishlisted}
                    onClick={handleWishlist}
                    type="button"
                >
                    <Bookmark size={18} />
                </button>
            </figure>

            {/* Content */}
            <div className="course-content">
                {/* Category */}
                {category && <p className="course-category">{category}</p>}

                {/* Header */}
                <header className="course-header">
                    <h3 className="course-title">{title}</h3>
                    <p className="course-instructor">By {instructor}</p>
                </header>

                {/* Stats */}
                <div className="course-stats">
                    <div className="stat-item rating" aria-label={`${rating.toFixed(1)} out of 5 stars from ${reviews} reviews`}>
                        <Star size={14} fill="#fbaf24" color="#fbaf24" className="stat-icon" />
                        <span className="stat-text">
                            {rating.toFixed(1)} <span className="stat-count">({reviews.toLocaleString()})</span>
                        </span>
                    </div>
                    <div className="stat-item students" aria-label={`${students.toLocaleString()} students enrolled`}>
                        <Users size={14} className="stat-icon" />
                        <span>{students > 1000 ? `${(students / 1000).toFixed(1)}k` : students}</span>
                    </div>
                </div>

                {/* Meta Info */}
                <div className="course-meta">
                    <div className="meta-item">
                        <Clock size={14} aria-hidden="true" />
                        <span>{duration}</span>
                    </div>
                </div>

                {/* Footer */}
                <footer className="course-footer">
                    <div className="price-section">
                        <div className="price-tag">
                            <span className="currency">$</span>
                            <span className="amount">{price}</span>
                        </div>
                    </div>
                    <button
                        className={`enroll-btn ${isEnrolling ? 'loading' : ''}`}
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                        aria-busy={isEnrolling}
                        type="button"
                    >
                        <span>{isEnrolling ? 'Enrolling...' : 'Enroll Now'}</span>
                        <ChevronRight size={18} className="btn-icon" aria-hidden="true" />
                    </button>
                </footer>
            </div>
        </article>
    );
};

export default CourseCard;
