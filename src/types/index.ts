export interface Note {
  id: string;
  employee_name: string;
  title: string;
  content: string;
  is_important: boolean;
  created_at: string;
}

export interface CreateNoteData {
  employee_name: string;
  title: string;
  content: string;
  is_important: boolean;
}