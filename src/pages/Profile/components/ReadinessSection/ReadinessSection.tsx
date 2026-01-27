import React from 'react';
import { Rocket, Activity, Zap, Shield, Target } from 'lucide-react';
import type { ReadinessMetric } from '../../../../store/CurrentUser/currentuser.types';
import ProgressBar from '../../../../components/ui/ProgressBar/ProgressBar';
import Card from '../../../../components/ui/Card/Card';
import './readinessSection.scss';

interface ReadinessSectionProps {
    readiness: ReadinessMetric[];
}

const iconMap: Record<string, any> = {
    Zap, Activity, Shield, Target
};

const ReadinessSection: React.FC<ReadinessSectionProps> = ({ readiness }) => {
    return (
        <Card className="readiness-section">
            <div className="section-header">
                <h2><Rocket size={22} className="accent" /> Interview Readiness</h2>
                <p>Real-time analytics based on your AI interview performance.</p>
            </div>
            <div className="readiness-grid">
                {readiness.map((m, i) => {
                    const Icon = iconMap[m.icon] || Activity;
                    return (
                        <div key={i} className="metric-card">
                            <div className="metric-info">
                                <div className="icon-box" style={{ background: `${m.color}15`, color: m.color }}>
                                    <Icon size={20} />
                                </div>
                                <div className="text-info">
                                    <span className="label">{m.label}</span>
                                    <span className="score">{m.score}%</span>
                                </div>
                            </div>
                            <ProgressBar progress={m.score} color={m.color} />
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default ReadinessSection;
