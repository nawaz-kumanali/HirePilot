import React, { useEffect } from 'react';
import { Target, Users, Zap, Shield, Rocket, Trophy } from 'lucide-react';
import './aboutUs.scss';

const AboutUs: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-us-page">
            <div className="about-header">
                <h1 className="gradient-text">About HirePilot</h1>
                <p className="subtitle">Empowering the next generation of developers with AI-driven career growth.</p>
            </div>

            <div className="about-content">
                <section className="mission-section glass-panel">
                    <div className="section-icon">
                        <Target size={40} />
                    </div>
                    <h2>Our Mission</h2>
                    <p>
                        At HirePilot, we believe that every talented developer deserves their dream job.
                        Our mission is to bridge the gap between preparation and performance by providing
                        state-of-the-art AI tools for mock interviews, skill assessment, and personalized learning.
                    </p>
                </section>

                <div className="stats-grid">
                    <div className="stat-card glass-panel">
                        <Users size={32} />
                        <h3>10k+</h3>
                        <p>Active Users</p>
                    </div>
                    <div className="stat-card glass-panel">
                        <Rocket size={32} />
                        <h3>5k+</h3>
                        <p>Interviews Conducted</p>
                    </div>
                    <div className="stat-card glass-panel">
                        <Trophy size={32} />
                        <h3>2k+</h3>
                        <p>Succesful Placements</p>
                    </div>
                </div>

                <section className="features-section">
                    <h2>Why HirePilot?</h2>
                    <div className="features-grid">
                        <div className="feature-item glass-panel">
                            <Zap size={24} className="feature-icon" />
                            <h3>AI-Powered Insights</h3>
                            <p>Get real-time feedback on your interview performance with advanced AI analysis.</p>
                        </div>
                        <div className="feature-item glass-panel">
                            <Shield size={24} className="feature-icon" />
                            <h3>Safe Environment</h3>
                            <p>Practice without pressure. Our mock interviews simulate real scenarios in a supportive setting.</p>
                        </div>
                        <div className="feature-item glass-panel">
                            <Rocket size={24} className="feature-icon" />
                            <h3>Career Acceleration</h3>
                            <p>Fast-track your career with real-time job matching.</p>
                        </div>
                    </div>
                </section>

                <section className="story-section glass-panel">
                    <h2>The Story</h2>
                    <p>
                        HirePilot started as a simple idea: what if a developer could have a mentor available 24/7?
                        We saw brilliant minds struggling not with code, but with the pressure of high-stakes interviews.
                        By leveraging the latest in AI technology, we've built a platform that doesn't just test you—it helps you grow.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
