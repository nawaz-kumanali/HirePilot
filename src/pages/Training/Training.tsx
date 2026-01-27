import React, { useState } from 'react';
import {
    Clock,
    BookOpen,
    Award,
    TrendingUp,
    ArrowRight,
    PlayCircle,
    X,
    Star,
    Play
} from 'lucide-react';
import './training.scss';
import { USER_COURSES } from '../../data/usercourses';
import CourseCard from '../../components/UserCourseCard/UserCourseCard';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card/Card';
import { motion, AnimatePresence } from 'framer-motion';

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
        <main className="training-container">
            <div className="background-animation"></div>

            <header className="training-header">
                <div className="header-text">
                    <div className="greeting-badge">
                        <TrendingUp size={14} />
                        <span>Continuous Learning</span>
                    </div>
                    <h1 className="welcome-title">
                        Your <span className="gradient-text">Learning Hub</span>
                    </h1>
                    <p className="welcome-subtitle">
                        Pick up where you left off and accelerate your career with AI-driven training.
                    </p>
                </div>

                <div className="stats-bar">
                    {statItems.map((card, i) => (
                        <Card key={i} className="stat-card">
                            <div className="stat-icon-wrapper" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                                <card.Icon size={22} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-value">{card.value}</span>
                                <span className="stat-label">{card.label}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </header>

            <section className="section-container">
                <div className="section-title-row">
                    <div className="title-left">
                        <h2 className="section-heading">Continue Learning</h2>
                        <p className="section-subtext">Resume your recent courses</p>
                    </div>
                    <Link to="/courses" className="text-link">
                        Browse All Courses <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="course-grid">
                    {USER_COURSES.map(course => (
                        <motion.div
                            key={course.id}
                            onClick={() => openCourseDetails(course)}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CourseCard {...course} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {isDialogOpen && selectedCourse && (
                    <div className="course-detail-modal-overlay" onClick={() => setIsDialogOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="course-detail-modal-content"
                            onClick={(e: any) => e.stopPropagation()}
                        >
                            <button className="course-detail-modal-close-icon" onClick={() => setIsDialogOpen(false)}>
                                <X size={20} />
                            </button>

                            <div className="course-detail-modal-inner">
                                <div className="course-detail-modal-hero">
                                    <img src={selectedCourse.image} alt="" className="course-detail-modal-hero-img" />
                                    <div className="course-detail-modal-hero-overlay"></div>
                                    <span className="course-detail-modal-hero-badge">{selectedCourse.category}</span>
                                </div>

                                <div className="course-detail-modal-details">
                                    <h2 className="course-detail-modal-title">{selectedCourse.title}</h2>

                                    <div className="course-detail-modal-instructor">
                                        <img
                                            src={selectedCourse.instructorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCourse.instructor}`}
                                            alt={selectedCourse.instructor}
                                            className="instructor-avatar"
                                        />
                                        <div>
                                            <p className="instructor-label">Instructor</p>
                                            <p className="instructor-detail">{selectedCourse.instructor}</p>
                                        </div>
                                    </div>

                                    <div className="course-detail-modal-stats-grid">
                                        <div className="course-detail-modal-stat">
                                            <Clock size={16} />
                                            <div>
                                                <span className="stat-label-small">Duration</span>
                                                <p>{selectedCourse.duration}</p>
                                            </div>
                                        </div>
                                        <div className="course-detail-modal-stat">
                                            <PlayCircle size={16} />
                                            <div>
                                                <span className="stat-label-small">Lessons</span>
                                                <p>{selectedCourse.lessons} lessons</p>
                                            </div>
                                        </div>
                                        <div className="course-detail-modal-stat">
                                            <Star size={16} />
                                            <div>
                                                <span className="stat-label-small">Rating</span>
                                                <p>{selectedCourse.rating}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="course-detail-modal-progress">
                                        <div className="progress-header">
                                            <span>Your Progress</span>
                                            <span>{selectedCourse.progress}%</span>
                                        </div>
                                        <div className="progress-track">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${selectedCourse.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <p className="course-detail-modal-desc">
                                        Continue your learning journey! You're currently at lesson {Math.floor((selectedCourse.lessons * selectedCourse.progress) / 100)} of {selectedCourse.lessons}. Great progress so far!
                                    </p>

                                    <div className="course-detail-modal-actions">
                                        <button className="secondary-button" onClick={() => setIsDialogOpen(false)}>
                                            Back
                                        </button>
                                        <button className="primary-button">
                                            Resume Lesson <Play size={18} fill="currentColor" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Training;
