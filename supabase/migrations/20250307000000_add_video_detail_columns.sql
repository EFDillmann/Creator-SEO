-- Add columns for video detail/optimization form
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS category_id text;
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS recording_location text;
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS default_language text DEFAULT 'es';
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS privacy_status text DEFAULT 'public';
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS ai_context text;
