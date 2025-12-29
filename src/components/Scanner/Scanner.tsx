import './scanner.scss';

const Scanner = () => {
    return (
        <div className="scanner-visual">
            <div className="ai-scanner">
                <div className="scanner-line"></div>

                {/* Floating Feedback Elements */}
                <div className="ui-element feedback-card">
                    <div className="feedback-header">
                        <div className="dot"></div>
                        <span>AI Analysis</span>
                    </div>
                    <div className="skeleton-line long"></div>
                    <div className="skeleton-line medium"></div>
                </div>

                <div className="ui-element score-card">
                    <div className="score-circle">
                        <svg viewBox="0 0 36 36">
                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="circle-progress" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className="score-text">85%</span>
                    </div>
                    <span className="score-label">Readiness</span>
                </div>

                <div className="ui-element insight-bar">
                    <div className="pulse-icon"></div>
                    <div className="skeleton-line short"></div>
                </div>
            </div>
        </div>
    )
}

export default Scanner