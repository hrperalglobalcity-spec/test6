import { supabase } from './client';
import { Note, CreateNoteData } from '@/types';

// Fetch all notes from the team_notes table
export const fetchNotes = async (): Promise<Note[]> => {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('team_notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      throw new Error(`Failed to fetch notes: ${error.message}`);
    }

    return data || [];
  } catch (error: any) {
    console.error('Unexpected error while fetching notes:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

// Create a new note in the team_notes table
export const createNote = async (noteData: CreateNoteData): Promise<Note | null> => {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    throw new Error('Supabase client not initialized. Please check your environment variables.');
  }
  
  try {
    const { data, error } = await supabase
      .from('team_notes')
      .insert([noteData])
      .select()
      .single();

    if (error) {
      console.error('Error creating note:', error);
      throw new Error(`Failed to create note: ${error.message}`);
    }

    return data;
  } catch (error: any) {
    console.error('Unexpected error while creating note:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

// Delete a note by ID
export const deleteNote = async (id: string): Promise<boolean> => {
  if (!supabase) {
    console.error('Supabase client not initialized. Please check your environment variables.');
    throw new Error('Supabase client not initialized. Please check your environment variables.');
  }
  
  try {
    const { error } = await supabase
      .from('team_notes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting note:', error);
      throw new Error(`Failed to delete note: ${error.message}`);
    }

    return true;
  } catch (error: any) {
    console.error('Unexpected error while deleting note:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};