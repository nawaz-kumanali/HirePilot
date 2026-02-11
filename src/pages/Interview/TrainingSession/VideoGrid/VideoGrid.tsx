import { useRef, useEffect } from 'react';
import { Sparkles, Lightbulb, User } from 'lucide-react';
import './videoGrid.scss';

interface VideoGridProps {
    isSpeaking: boolean;
    isLoading: boolean;
    isInsightVisible: boolean;
    insight: string | null;
    lastAiMessage: string | undefined;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isVideoOff: boolean;
    isMuted: boolean;
}

const VideoGrid = ({
    isSpeaking,
    isLoading,
    isInsightVisible,
    insight,
    lastAiMessage,
    videoRef,
    isVideoOff,
    isMuted
}: VideoGridProps) => {
    return (
        <div className="video-grid">
            {/* AI Interviewer View */}
            <div className="video-card ai-view">
                <div className={`ai-avatar-container ${isSpeaking ? 'speaking' : ''}`}>
                    {isLoading && <div className="thinking-pulse"></div>}
                    <div className="ai-visual">
                        <Sparkles size={80} className={`ai-icon ${isSpeaking ? 'active' : ''}`} />
                        <div className="waves">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                    </div>
                    <div className="ai-label">AI Interviewer</div>
                </div>

                {/* AI Insight Popup */}
                {isInsightVisible && (
                    <div className="ai-insight-toast">
                        <Lightbulb size={20} className="light-icon" />
                        <div className="insight-text">
                            <span className="insight-label">AI HINT</span>
                            <p>{insight}</p>
                        </div>
                    </div>
                )}

                {/* Subtitles */}
                {lastAiMessage && (
                    <div className="ai-subtitle-overlay">
                        <p>{lastAiMessage}</p>
                    </div>
                )}
            </div>

            {/* User Preview View */}
            <div className="video-card user-view">
                <video ref={videoRef} autoPlay playsInline muted className={isVideoOff ? 'hidden' : ''} />
                {isVideoOff && (
                    <div className="camera-off-placeholder">
                        <User size={80} />
                        <p>Camera Signal Lost</p>
                    </div>
                )}
                <div className="user-label">
                    <span className="name">You</span>
                    {isMuted && <span className="muted-icon">Muted</span>}
                </div>
            </div>
        </div>
    );
};

export default VideoGrid;
