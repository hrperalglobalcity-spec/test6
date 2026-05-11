import React from 'react';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  actionText, 
  actionLink 
}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
        <PlusCircle className="h-6 w-6 text-blue-600" aria-hidden="true" />
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {actionLink && actionText && (
        <div className="mt-6">
          <Link href={actionLink}>
            <Button variant="primary">
              {actionText}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmptyState;