import { PlayCircle, Star, Clock, Award, ArrowRight } from 'lucide-react'
import React from 'react'
import type { UserCourse } from '../../types/course'

import './userCourseCard.scss'


const UserCourseCard: React.FC<UserCourse> = (course) => {
    return (
        <div className="user-course-card">
            <div className="image-wrapper">
                <img src={course.image} alt={course.title} loading="lazy" />
                <div className="gradient-overlay"></div>
                <div className="play-overlay">
                    <PlayCircle size={56} color="white" strokeWidth={1.5} />
                </div>
                <div className="category-badge">{course.category}</div>
            </div>

            <div className="card-content">
                <div className="card-meta">
                    <span className="lesson-badge">{course.lessons} lessons</span>
                    <div className="rating-tag">
                        <Star size={14} fill="#f59e0b" stroke="none" />
                        <span>{course.rating}</span>
                        <span className="student-count">({course.students})</span>
                    </div>
                </div>

                <h3 className="course-title">{course.title}</h3>
                <p className="instructor-name">by {course.instructor}</p>

                <div className="course-meta-info">
                    <span className="meta-item">
                        <Clock size={14} />
                        {course.duration}
                    </span>
                    <span className="meta-item">
                        <Award size={14} />
                        Certificate
                    </span>
                </div>

                <div className="progress-section">
                    <div className="progress-header">
                        <span className="progress-label">Progress</span>
                        <span className="progress-percentage">{course.progress}%</span>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                </div>

                <button className="card-button">Continue <ArrowRight /></button>
            </div>
        </div>
    )
}

export default UserCourseCard