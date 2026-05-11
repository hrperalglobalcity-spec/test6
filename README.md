# Team Notes Board

A Next.js 16 application for team collaboration with shared notes. Built with TypeScript, Tailwind CSS, and Supabase.

## Features

- Create, view, and delete notes
- Mark notes as important
- Responsive dashboard UI
- Real-time updates from Supabase
- Clean, modern interface

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [Supabase](https://supabase.io) and create an account
2. Create a new project
3. In your project, go to SQL Editor and run the following SQL to create the notes table:

```sql
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
```

### 3. Environment Variables

Copy the `.env.local.example` file to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then fill in your Supabase credentials:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous API key

You can find these in your Supabase project under Settings → API.

### 4. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add your environment variables in the Vercel dashboard (Settings → Environment Variables)
5. Click "Deploy"

Your application will be deployed and available at a URL like `https://your-project.vercel.app`.

## Folder Structure

```
src/
├── app/                 # Next.js pages
│   ├── page.tsx         # Dashboard
│   ├── add-note/        # Add note page
│   └── notes/           # All notes page
├── components/          # React components
│   ├── layout/          # Layout components (Sidebar, Header)
│   ├── notes/           # Note-specific components (NoteCard, NotesGrid)
│   ├── ui/              # Basic UI components (Button, Input, etc.)
│   └── forms/           # Form components (NoteForm)
├── lib/                 # Utilities and external libraries
│   ├── supabase/        # Supabase client and helpers
│   └── utils/           # Helper functions
├── types/               # TypeScript types
└── styles/              # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)