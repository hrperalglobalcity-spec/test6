import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex justify-center items-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = clsx({
    'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white': variant === 'primary',
    'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-800': variant === 'secondary',
    'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white': variant === 'danger',
    'border border-gray-300 bg-white hover:bg-gray-50 focus:ring-blue-500 text-gray-700': variant === 'outline',
  });
  
  const sizeClasses = clsx({
    'text-sm py-1.5 px-3': size === 'sm',
    'text-base py-2 px-4': size === 'md',
    'text-lg py-2.5 px-5': size === 'lg',
  });

  const classes = clsx(baseClasses, variantClasses, sizeClasses, className);

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;