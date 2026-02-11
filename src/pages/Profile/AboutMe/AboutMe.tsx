import React from 'react';
import { User } from 'lucide-react';
import Card from '../../../components/Card/Card';
import './aboutMe.scss';

interface AboutMeProps {
    bio: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ bio }) => {
    return (
        <Card className="bio-section">
            <div className="section-header">
                <h2><User size={22} className="accent" /> About Me</h2>
            </div>
            <p className="bio-text">
                {bio || 'Passionately developing high-impact software solutions with a focus on modern web technologies.'}
            </p>
        </Card>
    );
};

export default AboutMe;
