import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Send, Loader } from 'lucide-react';
import './controlBar.scss';

interface ControlBarProps {
    isMuted: boolean;
    isVideoOff: boolean;
    isAudioEnabled: boolean;
    onToggleMute: () => void;
    onToggleVideo: () => void;
    onToggleAudio: () => void;
    isListening: boolean;
    onToggleListening: () => void;
    userInput: string;
    setUserInput: (val: string) => void;
    onSendMessage: () => void;
    isLoading: boolean;
}

const ControlBar = ({
    isMuted,
    isVideoOff,
    isAudioEnabled,
    onToggleMute,
    onToggleVideo,
    onToggleAudio,
    isListening,
    onToggleListening,
    userInput,
    setUserInput,
    onSendMessage,
    isLoading
}: ControlBarProps) => {
    return (
        <footer className="video-controls-bar">
            <div className="control-group">
                <button className={`control-btn ${isMuted ? 'active' : ''}`} onClick={onToggleMute}>
                    {isMuted ? <MicOff /> : <Mic />}
                </button>
                <button className={`control-btn ${isVideoOff ? 'active' : ''}`} onClick={onToggleVideo}>
                    {isVideoOff ? <VideoOff /> : <Video />}
                </button>
                <button className={`control-btn ${!isAudioEnabled ? 'active' : ''}`} onClick={onToggleAudio}>
                    {isAudioEnabled ? <Volume2 /> : <VolumeX />}
                </button>
            </div>

            <div className="input-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Type your response..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                        disabled={isLoading}
                    />
                    <button
                        className={`voice-btn ${isListening ? 'listening' : ''}`}
                        onClick={onToggleListening}
                        disabled={isLoading}
                    >
                        {isListening ? <div className="mic-ring" /> : null}
                        <Mic size={20} />
                    </button>
                </div>

                <button
                    className="send-btn"
                    onClick={onSendMessage}
                    disabled={isLoading || (!userInput.trim() && !isListening)}
                >
                    {isLoading ? <Loader className="spin" size={20} /> : <Send size={20} />}
                </button>
            </div>
        </footer>
    );
};

export default ControlBar;
