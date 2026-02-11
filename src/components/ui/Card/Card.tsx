import type { ReactNode } from 'react';
import './card.scss';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'glass' | 'glass-alt';
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

const Card = ({
    children,
    className = '',
    variant = 'glass',
    hoverable = false,
    padding = 'md',
    onClick
}: CardProps) => {
    const classes = [
        'hp-card',
        `hp-card--${variant}`,
        `hp-card--p-${padding}`,
        hoverable ? 'hp-card--hoverable' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

// Sub-components for better structure
interface SubComponentProps {
    children: ReactNode;
    className?: string;
}

const CardHeader = ({ children, className = '' }: SubComponentProps) => (
    <div className={`hp-card__header ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }: SubComponentProps) => (
    <div className={`hp-card__body ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }: SubComponentProps) => (
    <div className={`hp-card__footer ${className}`}>{children}</div>
);

// Attach sub-components to the main Card component
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
