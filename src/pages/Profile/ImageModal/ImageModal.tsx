import { X, Camera, Github } from 'lucide-react';
import './imageModal.scss';

interface ImageModalProps {
    onClose: () => void;
}

const ImageModal = ({ onClose }: ImageModalProps) => {
    return (
        <div className="image-modal-overlay" onClick={onClose}>
            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                <header>
                    <h3>Profile Picture</h3>
                    <button onClick={onClose}><X size={20} /></button>
                </header>
                <div className="modal-options">
                    <button className="option">
                        <Camera size={20} />
                        <span>Upload Photo</span>
                    </button>
                    <button className="option">
                        <Github size={20} />
                        <span>Import from GitHub</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
