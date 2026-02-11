import { Timer, Loader, X } from 'lucide-react';
import './sessionHeader.scss';

interface SessionHeaderProps {
    position: string;
    company: string;
    timeLeft: number;
    formatTime: (seconds: number) => string;
    onFinish: () => void;
    onClose: () => void;
    isFinishing: boolean;
    canFinish: boolean;
}

const SessionHeader = ({
    position,
    company,
    timeLeft,
    formatTime,
    onFinish,
    onClose,
    isFinishing,
    canFinish
}: SessionHeaderProps) => {
    return (
        <header className="video-header">
            <div className="interview-info">
                <div className="live-pill">
                    <span className="dot pulse"></span> LIVE INTERVIEW
                </div>
                <h1>{position}</h1>
                <p className="company-name">{company}</p>
            </div>

            <div className="timer-display glass-panel">
                <Timer size={18} className={timeLeft < 60 ? 'warning' : ''} />
                <span className={`time ${timeLeft < 60 ? 'warning' : ''}`}>
                    {formatTime(timeLeft)}
                </span>
            </div>

            <div className="header-actions">
                {canFinish && (
                    <button className="finish-btn highlight" onClick={onFinish} disabled={isFinishing}>
                        {isFinishing ? <Loader className="spin" size={18} /> : "Finish Now"}
                    </button>
                )}
                <button className="exit-btn" onClick={onClose} title="Exit Session">
                    <X size={20} />
                </button>
            </div>
        </header>
    );
};

export default SessionHeader;
