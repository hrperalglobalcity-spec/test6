import React, { useState } from 'react';
import { CreateNoteData } from '@/types';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

interface NoteFormProps {
  onSubmit: (data: CreateNoteData) => void;
  isLoading?: boolean;
  submitButtonText?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  submitButtonText = 'Save Note' 
}) => {
  const [employeeName, setEmployeeName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required';
    }
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length > 1000) {
      newErrors.content = 'Content must be less than 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      employee_name: employeeName,
      title,
      content,
      is_important: isImportant
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Employee Name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        placeholder="Enter your name"
        error={errors.employeeName}
        required
      />
      
      <Input
        label="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        error={errors.title}
        required
      />
      
      <Textarea
        label="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        rows={5}
        error={errors.content}
        required
      />
      
      <Checkbox
        label="Mark as Important"
        checked={isImportant}
        onChange={(e) => setIsImportant(e.target.checked)}
      />
      
      <div className="pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isLoading}
          className="w-full"
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;