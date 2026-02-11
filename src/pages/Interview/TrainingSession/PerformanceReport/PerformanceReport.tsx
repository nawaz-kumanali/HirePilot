import { Award, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react';
import './performanceReport.scss';

interface PerformanceReportProps {
    report: any;
    position: string;
    onClose: () => void;
}

const PerformanceReport = ({ report, position, onClose }: PerformanceReportProps) => {
    if (!report) return null;

    return (
        <div className="performance-report-overlay">
            <div className="report-card">
                <div className="report-header">
                    <Award className="award-icon" />
                    <h1>Interview Complete!</h1>
                    <p>Great job! Here is your performance analysis for the {position} role.</p>
                </div>

                <div className="score-grid">
                    <div className="score-circle">
                        <span className="number">{report.overallScore}</span>
                        <span className="label">Overall Score</span>
                    </div>
                    <div className="score-details">
                        <div className="detail">
                            <div className="detail-info">
                                <span>Communication</span>
                                <span>{report.communicationScore}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="fill" style={{ width: `${report.communicationScore}%` }}></div>
                            </div>
                        </div>
                        <div className="detail">
                            <div className="detail-info">
                                <span>Technical Knowledge</span>
                                <span>{report.technicalScore}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="fill" style={{ width: `${report.technicalScore}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="feedback-section">
                    <h3><CheckCircle size={20} /> Professional Feedback</h3>
                    <p>{report.feedback}</p>
                </div>

                <div className="tips-section">
                    <h3><TrendingUp size={20} /> Actionable Tips</h3>
                    <ul>
                        {report.tips.map((tip: string, i: number) => (
                            <li key={i}>
                                <ChevronRight size={16} />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="done-btn" onClick={onClose}>
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PerformanceReport;
