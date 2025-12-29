import { Briefcase } from 'lucide-react';
import './EmptyState.scss';

interface EmptyStateProps {
    title?: string;
    description?: string;
    iconSize?: number;
}

const EmptyState = ({
    title = 'Found nothing here',
    description = 'Try adjusting your filters to find more results',
    iconSize = 64,
}: EmptyStateProps) => {
    return (
        <div className="es-root">
            <div className="es-card">
                <div className="es-glow" />
                
                <div className="es-icon-section">
                    <div className="es-floating-icon">
                        <Briefcase size={iconSize} strokeWidth={1.5} />
                    </div>
                    <div className="es-shadow" />
                </div>

                <h3 className="es-title">{title}</h3>
                <p className="es-desc">{description}</p>
            </div>
        </div>
    );
};

export default EmptyState;