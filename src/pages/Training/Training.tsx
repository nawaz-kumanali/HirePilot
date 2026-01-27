import React, { useState } from 'react';
import {
    Clock,
    BookOpen,
    Award,
    TrendingUp,
    Search,
    Filter,
    ArrowRight,
    PlayCircle,
    X,
    Star,
    Users
} from 'lucide-react';
import './training.scss';
import { USER_COURSES } from '../../data/usercourses';
import CourseCard from '../../components/UserCourseCard/UserCourseCard';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar';
import Button from '../../components/ui/Button/Button';
import Card from '../../components/ui/Card/Card';

type StatCardProps = {
    Icon: any,
    label: string,
    value: string,
    color: string
}

const Training: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const statItems: StatCardProps[] = [
        { Icon: Clock, label: 'Learning Time', value: '12.5h', color: '#6366f1' },
        { Icon: BookOpen, label: 'Courses', value: '4 Active', color: '#10b981' },
        { Icon: Award, label: 'Certificates', value: '2 Earned', color: '#f59e0b' },
        { Icon: TrendingUp, label: 'Skill Score', value: '840', color: '#ec4899' },
    ];

    const openCourseDetails = (course: any) => {
        setSelectedCourse(course);
        setIsDialogOpen(true);
    };

    return (
        <main className="training-page">
            <header className="training-header">
                <div className="header-info">
                    <h1>Your <span className="gradient-text">Learning Hub</span></h1>
                    <p>Track your progress and continue your skill development journey.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="Search courses..." />
                    </div>
                    <button className="filter-btn">
                        <Filter size={18} />
                    </button>
                </div>
            </header>

            <section className="stats-grid">
                {statItems.map((card, i) => (
                    <Card key={i} className="stat-item">
                        <div className="icon-wrapper" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                            <card.Icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{card.value}</h3>
                            <span className="label">{card.label}</span>
                        </div>
                    </Card>
                ))}
            </section>

            <section className="courses-section">
                <div className="section-title-bar">
                    <div className="title-left">
                        <h2>Continue Learning</h2>
                        <p className="section-subtext">Pick up where you left off</p>
                    </div>
                    <Link to="/courses" >
                        <Button variant="ghost" iconRight={<ArrowRight size={16} />}>
                            Browse All Courses
                        </Button>
                    </Link>
                </div>

                <div className="courses-grid">
                    {USER_COURSES.map(course => (
                        <div key={course.id} onClick={() => openCourseDetails(course)}>
                            <CourseCard {...course} />
                        </div>
                    ))}
                </div>
            </section>

            {isDialogOpen && selectedCourse && (
                <div className="course-detail-modal-overlay" onClick={() => setIsDialogOpen(false)}>
                    <Card className="course-detail-modal-content" onClick={(e: any) => e.stopPropagation()}>
                        <button className="course-detail-modal-close-icon" onClick={() => setIsDialogOpen(false)}>
                            <X size={24} />
                        </button>

                        <div className="course-detail-modal-inner">
                            <div className="course-detail-modal-hero">
                                <img src={selectedCourse.image} alt="" className="course-detail-modal-hero-img" />
                                <div className="course-detail-modal-hero-overlay">
                                    <div className="badge-row">
                                        <span className="category-badge">{selectedCourse.category}</span>
                                        <div className="rating-badge">
                                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                            <span>{selectedCourse.rating}</span>
                                        </div>
                                    </div>
                                    <h2>{selectedCourse.title}</h2>
                                    <div className="instructor-info">
                                        <Users size={16} />
                                        <span>By {selectedCourse.instructor}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="course-detail-modal-body">
                                <div className="course-detail-modal-stats">
                                    <div className="modal-stat">
                                        <Clock size={18} />
                                        <span>{selectedCourse.duration}</span>
                                    </div>
                                    <div className="modal-stat">
                                        <PlayCircle size={18} />
                                        <span>{selectedCourse.lessons} lessons</span>
                                    </div>
                                </div>

                                <ProgressBar
                                    progress={selectedCourse.progress}
                                    showLabel
                                    label="Your Progress"
                                    className="course-detail-modal-progress"
                                />

                                <p className="course-detail-modal-desc">
                                    Continue your learning journey! You're currently at lesson {Math.floor((selectedCourse.lessons * selectedCourse.progress) / 100)} of {selectedCourse.lessons}. Great progress so far!
                                </p>

                                <div className="course-detail-modal-actions">
                                    <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Close</Button>
                                    <Button variant="primary" iconRight={<ArrowRight size={18} />} className="course-detail-modal-button">
                                        Resume Lesson
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </main>
    );
};

export default Training;
