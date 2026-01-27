import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COURSES } from '../../../data/courses';
import {
  Star, Users, Clock, ArrowLeft, CheckCircle,
  PlayCircle, Globe, Award, Shield, ChevronRight
} from 'lucide-react';
import './course.scss';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === id);

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <button onClick={() => navigate('/courses')}>Back to Courses</button>
      </div>
    );
  }

  return (
    <motion.div
      className="course-details-wrapper"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className="course-details-header">
        <div className="header-container">
          <motion.button
            className="back-btn"
            onClick={() => navigate('/courses')}
            variants={itemVariants}
          >
            <ArrowLeft size={20} /> Back to Courses
          </motion.button>

          <div className="header-grid">
            <motion.div className="header-info" variants={itemVariants}>
              <div className="category-pill">{course.category}</div>
              <h1 className="course-title">{course.title}</h1>
              <p className="course-subtitle">{course.subtitle || course.description.substring(0, 100) + '...'}</p>

              <div className="course-meta-strip">
                <div className="meta-item rating">
                  <Star size={16} fill="#fbaf24" color="#fbaf24" />
                  <span className="bold">{course.rating}</span>
                  <span className="muted">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="meta-item students">
                  <Users size={16} />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="meta-item level">
                  <Award size={16} />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="instructor-brief">
                <img src={course.instructorImage} alt={course.instructor} className="instructor-avatar" />
                <span>Created by <span className="instructor-name">{course.instructor}</span></span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="course-details-container">
        <motion.main className="course-main-content" variants={itemVariants}>
          <section className="course-section">
            <h3>What you'll learn</h3>
            <div className="learning-grid">
              <div className="learning-item">
                <CheckCircle size={18} className="check-icon" />
                <span>Master industry-standard practices and tools</span>
              </div>
              <div className="learning-item">
                <CheckCircle size={18} className="check-icon" />
                <span>Build a professional portfolio project</span>
              </div>
              <div className="learning-item">
                <CheckCircle size={18} className="check-icon" />
                <span>Understand core architectures and design patterns</span>
              </div>
              <div className="learning-item">
                <CheckCircle size={18} className="check-icon" />
                <span>Prepare for technical interviews and assessments</span>
              </div>
            </div>
          </section>

          <section className="course-section description-section">
            <h3>Description</h3>
            <p>{course.description}</p>
          </section>

          <section className="course-section curriculum-section">
            <h3>Course content</h3>
            <div className="curriculum-stats">
              <span>{course.modules} modules • {course.lessons} lessons • {course.duration} total length</span>
            </div>
            {/* Placeholder for curriculum list */}
            <div className="curriculum-list">
              {[1, 2, 3].map(m => (
                <div key={m} className="module-item">
                  <div className="module-header">
                    <ChevronRight size={18} />
                    <span>Module {m}: Fundamentals and Core Concepts</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.main>

        <motion.aside className="course-sticky-sidebar" variants={itemVariants}>
          <div className="enroll-card">
            <div className="course-preview">
              <img src={course.image} alt={course.title} />
              <div className="play-overlay"><PlayCircle size={48} /></div>
            </div>

            <div className="card-content">
              <div className="price-row">
                <span className="current-price">${course.price}</span>
                {course.originalPrice && <span className="original-price">${course.originalPrice}</span>}
              </div>

              <button className="enroll-now-btn">Enroll Now</button>
              <p className="guarantee">30-Day Money-Back Guarantee</p>

              <div className="course-includes">
                <h4>This course includes:</h4>
                <div className="include-item">
                  <PlayCircle size={16} /> <span>{course.duration} on-demand video</span>
                </div>
                <div className="include-item">
                  <Clock size={16} /> <span>Full lifetime access</span>
                </div>
                <div className="include-item">
                  <Globe size={16} /> <span>Access on mobile and TV</span>
                </div>
                <div className="include-item">
                  <Shield size={16} /> <span>Certificate of completion</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default CoursePage;