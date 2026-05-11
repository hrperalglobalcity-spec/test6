import React from 'react';
import { Trash2, Star } from 'lucide-react';
import { Note } from '@/types';
import Button from '../ui/Button';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              {note.title}
              {note.is_important && (
                <Star className="ml-2 h-4 w-4 text-yellow-500 fill-current" aria-hidden="true" />
              )}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{note.employee_name}</p>
          </div>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={handleDelete}
            aria-label="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-3">
          <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(note.created_at).toLocaleString()}
          </span>
          {note.is_important && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Important
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;