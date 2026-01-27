import React from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Experience } from '../../../../store/CurrentUser/currentuser.types';
import Card from '../../../../components/ui/Card/Card';
import './careerJourney.scss';

interface CareerJourneyProps {
    experience: Experience[];
}

const CareerJourney: React.FC<CareerJourneyProps> = ({ experience }) => {
    return (
        <Card className="journey-section">
            <div className="section-header">
                <h2><Briefcase size={22} className="accent" /> Career Journey</h2>
                <Link to="/jobs" className="explore-btn">Explore Jobs <ChevronRight size={16} /></Link>
            </div>
            <div className="timeline">
                {experience.map((exp, i) => (
                    <div key={i} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="item-content">
                            <div className="item-header">
                                <h4 className="role">{exp.role}</h4>
                                <span className="period">{exp.period}</span>
                            </div>
                            <p className="company">{exp.company}</p>
                            <p className="description">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default CareerJourney;
