import React from 'react';
import './badge.scss';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
    iconLeft?: React.ReactNode;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'secondary',
    size = 'md',
    iconLeft,
    className = ''
}) => {
    return (
        <span className={`hp-badge hp-badge-${variant} hp-badge-${size} ${className}`}>
            {iconLeft && <span className="icon-left">{iconLeft}</span>}
            {children}
        </span>
    );
};

export default Badge;
