-- Create the team_notes table
CREATE TABLE team_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_important BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE team_notes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON team_notes
FOR SELECT TO anon
USING (true);

CREATE POLICY "Allow public insert access" ON team_notes
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow public delete access" ON team_notes
FOR DELETE TO anon
USING (true);