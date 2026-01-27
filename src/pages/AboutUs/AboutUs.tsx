import React, { useEffect } from 'react';
import { Target, Users, Zap, Shield, Rocket, Trophy } from 'lucide-react';
import './aboutUs.scss';
import VisualHeader from '../../components/VisualHeader/VisualHeader';

const AboutUs: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-us-page">
            {/* Background elements */}
            <div className="bg-glow-1"></div>
            <div className="bg-glow-2"></div>

            <div className="about-header">
                <VisualHeader
                    badge="Our Story"
                    title="Empowering Future"
                    gradient_title="Engineers"
                    subtitle="At HirePilot, we're building the most advanced AI-driven career acceleration platform for the next generation of developers."
                />
            </div>

            <div className="about-content">
                <section className="mission-section glass-panel">
                    <div className="section-icon-wrapper">
                        <Target size={32} />
                    </div>
                    <h2>Our Mission</h2>
                    <p>
                        We believe that every talented developer deserves their dream job.
                        Our mission is to bridge the gap between preparation and performance by providing
                        state-of-the-art AI tools for mock interviews, skill assessment, and personalized learning.
                    </p>
                </section>

                <div className="stats-grid">
                    <div className="stat-card glass-panel">
                        <div className="stat-icon"><Users size={28} /></div>
                        <h3>10k+</h3>
                        <p>Active Users</p>
                    </div>
                    <div className="stat-card glass-panel">
                        <div className="stat-icon"><Rocket size={28} /></div>
                        <h3>5k+</h3>
                        <p>Interviews Conducted</p>
                    </div>
                    <div className="stat-card glass-panel">
                        <div className="stat-icon"><Trophy size={28} /></div>
                        <h3>2k+</h3>
                        <p>Succesful Placements</p>
                    </div>
                </div>

                <section className="features-section">
                    <div className="section-header">
                        <span className="section-badge">The Advantage</span>
                        <h2>Why Choose HirePilot?</h2>
                    </div>
                    <div className="features-grid">
                        <div className="feature-item glass-panel">
                            <Zap size={24} className="feature-icon" />
                            <h3>AI-Powered Insights</h3>
                            <p>Get real-time feedback on your interview performance with advanced AI analysis and behavioral mapping.</p>
                        </div>
                        <div className="feature-item glass-panel">
                            <Shield size={24} className="feature-icon" />
                            <h3>Risk-Free Practice</h3>
                            <p>Build confidence without pressure. Our mock interviews simulate real-world high-stakes scenarios.</p>
                        </div>
                        <div className="feature-item glass-panel">
                            <Rocket size={24} className="feature-icon" />
                            <h3>Career Acceleration</h3>
                            <p>Go from candidate to hire faster with our data-driven matching system and role-specific preparation.</p>
                        </div>
                    </div>
                </section>

                <section className="story-section glass-panel">
                    <div className="story-header">
                        <h2>The Inspiration</h2>
                    </div>
                    <p>
                        HirePilot started as a simple idea: what if a developer could have an expert mentor available 24/7?
                        We saw brilliant minds struggling not with code, but with the pressure of high-stakes technical interviews.
                        By leveraging the latest in AI technology, we've built a platform that doesn't just test your skills—it helps you evolve them into a career.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
