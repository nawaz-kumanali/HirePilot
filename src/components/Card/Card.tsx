import React from 'react';
import './card.scss';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: any) => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
    return (
        <div className={`hp-card glass-card ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
