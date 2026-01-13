import React from 'react';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import './usercoursecard.scss';

interface UserCourseCardProps {
    id: number;
    title: string;
    progress: number;
    lessons: number;
    status: string;
    instructor: string;
    image: string;
    rating: number;
    duration: string;
    category: string;
}

const UserCourseCard: React.FC<UserCourseCardProps> = ({
    title,
    progress,
    lessons,
    instructor,
    image,
    duration,
    category
}) => {
    return (
        <div className="user-course-card glass-card">
            <div className="card-image">
                <img src={image} alt={title} />
                <div className="category-tag">{category}</div>
            </div>

            <div className="card-content">
                <h3 className="course-title">{title}</h3>
                <p className="instructor">By {instructor}</p>

                <div className="course-meta">
                    <div className="meta-item">
                        <Clock size={14} />
                        <span>{duration}</span>
                    </div>
                    <div className="meta-item">
                        <BookOpen size={14} />
                        <span>{lessons} Lessons</span>
                    </div>
                </div>

                <div className="progress-section">
                    <div className="progress-info">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <button className="continue-btn">
                    Continue <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default UserCourseCard;
