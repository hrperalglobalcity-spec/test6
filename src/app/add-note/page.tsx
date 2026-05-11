'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/supabase/helpers';
import { CreateNoteData } from '@/types';
import NoteForm from '@/components/forms/NoteForm';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function AddNotePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateNoteData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createNote(data);
      // Redirect to the notes page after successful creation
      router.push('/notes');
      router.refresh(); // Refresh to update any cached data
    } catch (err: any) {
      console.error('Error creating note:', err);
      setError(err.message || 'An error occurred while creating the note.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Note</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new note for the team board.
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Note Details</h3>
          <p className="mt-1 text-sm text-gray-500">Fill in the information for your new note.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
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

          <NoteForm 
            onSubmit={handleSubmit} 
            isLoading={isSubmitting}
            submitButtonText="Save Note"
          />

          <div className="mt-6">
            <Link href="/notes" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              ← Back to Notes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}