import React from 'react';
import { Note } from '@/types';
import NoteCard from './NoteCard';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

interface NotesGridProps {
  notes: Note[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionText?: string;
  emptyActionLink?: string;
}

const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  onDelete,
  isLoading = false,
  emptyTitle = 'No notes yet',
  emptyDescription = 'Get started by creating a new note.',
  emptyActionText = 'Add your first note',
  emptyActionLink = '/add-note'
}) => {
  if (isLoading) {
    return (
      <div className="py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionText={emptyActionText}
        actionLink={emptyActionLink}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default NotesGrid;