import { AlertTriangle } from 'lucide-react';
import './errorOverlay.scss';

interface ErrorOverlayProps {
    error: { title: string; message: string };
    onRetry: () => void;
    onClose: () => void;
}

const ErrorOverlay = ({ error, onRetry, onClose }: ErrorOverlayProps) => {
    return (
        <div className="system-error-overlay">
            <div className="error-popup">
                <div className="error-icon-box">
                    <AlertTriangle size={40} />
                </div>
                <h2>{error.title}</h2>
                <p>{error.message}</p>
                <div className="error-actions">
                    <button className="retry-btn" onClick={onRetry}>
                        Try Again Now for testing
                    </button>
                    <button className="secondary-btn" onClick={onClose}>
                        Exit Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorOverlay;
