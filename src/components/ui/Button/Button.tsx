import React from 'react';
import './button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    fullWidth = false,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`hp-btn hp-btn-${variant} hp-btn-${size} ${fullWidth ? 'hp-btn-full' : ''} ${className}`}
            {...props}
        >
            {iconLeft && <span className="icon-left">{iconLeft}</span>}
            {children}
            {iconRight && <span className="icon-right">{iconRight}</span>}
        </button>
    );
};

export default Button;
