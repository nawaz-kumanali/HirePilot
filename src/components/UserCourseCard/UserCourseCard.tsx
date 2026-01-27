import React from 'react';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar/ProgressBar';
import Button from '../ui/Button/Button';
import Badge from '../ui/Badge/Badge';
import './userCourseCard.scss'

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
                <Badge variant="primary" className="category-tag">{category}</Badge>
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

                <ProgressBar progress={progress} showLabel label="Progress" />

                <Button variant="primary" iconRight={<ChevronRight size={16} />} fullWidth>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default UserCourseCard;
