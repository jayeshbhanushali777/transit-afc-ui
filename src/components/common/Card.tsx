import React, { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  noPadding?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  noPadding = false,
  onClick,
  style,
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        bg-white rounded-2xl shadow-soft
        ${hoverable ? 'hover:shadow-strong hover:-translate-y-1 cursor-pointer transition-all duration-300' : ''}
        ${noPadding ? '' : 'p-6'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};