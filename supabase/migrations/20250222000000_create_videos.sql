create table public.videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  youtube_video_id text not null,
  channel_id text not null,
  status text not null default 'pending' check (status in ('optimized', 'pending')),
  -- Datos cacheados para renderizar sin YouTube API
  title text not null,
  description text,
  thumbnail_url text not null,
  duration_seconds integer,
  published_at timestamptz not null,
  view_count integer default 0,
  like_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, youtube_video_id)
);

create index videos_user_id_idx on public.videos(user_id);
create index videos_user_published_idx on public.videos(user_id, published_at desc);

alter table public.videos enable row level security;

create policy "Users can CRUD own videos"
  on public.videos for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
