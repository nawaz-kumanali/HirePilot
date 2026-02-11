import React from 'react';
import './progressBar.scss';

interface ProgressBarProps {
    progress: number;
    color?: string;
    height?: string;
    showLabel?: boolean;
    label?: string;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = 'var(--accent)',
    height = '6px',
    showLabel = false,
    label,
    className = ''
}) => {
    return (
        <div className={`ui-progress-container ${className}`}>
            {showLabel && (
                <div className="progress-info">
                    {label && <span className="label-text">{label}</span>}
                    <span className="percent-text">{progress}%</span>
                </div>
            )}
            <div className="progress-track" style={{ height }}>
                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: color
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
