import React from 'react';
import { Award } from 'lucide-react';
import type { Skill } from '../../../../store/CurrentUser/currentuser.types';
import Card from '../../../../components/ui/Card/Card';
import './skillsCloud.scss';

interface SkillsCloudProps {
    skills: Skill[];
}

const SkillsCloud: React.FC<SkillsCloudProps> = ({ skills }) => {
    return (
        <Card className="skills-section">
            <div className="section-header">
                <h2><Award size={22} className="accent" /> Technical Expertise</h2>
            </div>
            <div className="skills-cloud">
                {skills.map((skill, i) => (
                    <div key={i} className="skill-tag">
                        <span className="dot"></span>
                        <span className="name">{skill.name}</span>
                        <span className="level">{skill.level}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default SkillsCloud;
