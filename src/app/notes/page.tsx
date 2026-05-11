'use client';

import React, { useState, useEffect } from 'react';
import { fetchNotes, deleteNote } from '@/lib/supabase/helpers';
import { Note } from '@/types';
import NotesGrid from '@/components/notes/NotesGrid';
import Loader from '@/components/ui/Loader';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (err: any) {
        console.error('Error fetching notes:', err);
        setError(err.message || 'An error occurred while fetching notes.');
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      // Optimistically update the UI
      setNotes(notes.filter(note => note.id !== id));
      
      // Attempt to delete from the database
      await deleteNote(id);
    } catch (err: any) {
      console.error('Error deleting note:', err);
      // Revert the optimistic update if deletion failed
      setError(err.message || 'An error occurred while deleting the note.');
      const originalNotes = [...notes];
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch {
        setNotes(originalNotes);
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Notes</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all team notes.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <NotesGrid 
        notes={notes} 
        onDelete={handleDelete}
        isLoading={loading}
        emptyTitle="No notes yet"
        emptyDescription="Get started by creating a new note."
        emptyActionText="Add your first note"
        emptyActionLink="/add-note"
      />
    </div>
  );
}