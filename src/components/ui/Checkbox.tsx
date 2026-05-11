import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  error, 
  containerClassName = '', 
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label className="flex items-center">
        <input 
          type="checkbox"
          className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
          {...props} 
        />
        {label && (
          <span className="ml-2 text-sm font-medium text-gray-700">
            {label}
          </span>
        )}
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Checkbox;