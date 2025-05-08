import React from 'react';

const Button = ({ onClick, children, variant = 'primary', className = '' }) => {
  return (
    <button
    onClick={onClick}
    className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 