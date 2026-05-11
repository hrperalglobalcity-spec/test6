import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  containerClassName = '', 
  className = '',
  ...props 
}) => {
  const baseTextareaClasses = 'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700';
  const errorTextareaClasses = error ? 'border-red-500' : 'border-gray-300';
  const textareaClasses = `${baseTextareaClasses} ${errorTextareaClasses} ${className}`;

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea 
        className={textareaClasses}
        {...props} 
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;