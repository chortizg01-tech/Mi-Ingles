-- ==============================================================================
-- SCHEMA SUPABASE: MI INGLÉS (A2/B1 -> C1)
-- Ejecutar en el SQL Editor de tu proyecto Supabase
-- ==============================================================================

-- 1. Tabla de Perfiles de Usuario
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text default 'Learner',
  email text,
  current_level text default 'B1.1',
  target_level text default 'C1',
  streak_days integer default 1,
  last_study_date date default current_date,
  daily_goal_minutes integer default 240, -- 4 horas diarias
  today_study_minutes integer default 0,
  total_study_minutes integer default 0,
  xp integer default 0,
  completed_lessons jsonb default '[]'::jsonb,
  mastery_scores jsonb default '{"reading": 50, "writing": 45, "listening": 40, "speaking": 35, "grammar": 52, "vocabulary": 48}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Tabla de Banco de Errores y Repetición Espaciada (Adaptive Review)
create table if not exists public.error_bank (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  category text not null,
  skill text not null,
  mistake text not null,
  correction text not null,
  explanation text not null,
  incorrect_count integer default 1,
  correct_in_a_row integer default 0,
  is_mastered boolean default false,
  last_reviewed_at timestamp with time zone default timezone('utc'::text, now()),
  next_review_date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabla de Entregas de Writing con Corrección de IA
create table if not exists public.writing_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  prompt_id text not null,
  prompt_title text not null,
  level text not null,
  user_text text not null,
  word_count integer not null,
  scores jsonb not null,
  feedback jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tabla de Sesiones de Speaking y Transcripción de Voz
create table if not exists public.speaking_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  scenario_id text not null,
  scenario_title text not null,
  level text not null,
  duration_seconds integer default 0,
  turns jsonb not null,
  overall_feedback jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Registro Diario de Tiempo de Estudio (Métricas de 4 Horas)
create table if not exists public.daily_study_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date not null,
  minutes_studied integer default 0,
  skills_practiced text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_user_date unique(user_id, date)
);

-- 6. Resultados de Evaluaciones y Certificaciones CEFR
create table if not exists public.assessment_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  assessment_type text not null,
  calculated_level text not null,
  overall_score integer not null,
  skill_breakdown jsonb not null,
  recommendations text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.error_bank enable row level security;
alter table public.writing_submissions enable row level security;
alter table public.speaking_sessions enable row level security;
alter table public.daily_study_logs enable row level security;
alter table public.assessment_results enable row level security;

-- Políticas de Seguridad RLS
create policy "Usuarios gestionan su propio perfil" on public.profiles
  for all using (auth.uid() = id);

create policy "Usuarios gestionan su banco de errores" on public.error_bank
  for all using (auth.uid() = user_id);

create policy "Usuarios gestionan sus envíos de writing" on public.writing_submissions
  for all using (auth.uid() = user_id);

create policy "Usuarios gestionan sus sesiones de speaking" on public.speaking_sessions
  for all using (auth.uid() = user_id);

create policy "Usuarios gestionan sus logs diarios" on public.daily_study_logs
  for all using (auth.uid() = user_id);

create policy "Usuarios gestionan sus evaluaciones" on public.assessment_results
  for all using (auth.uid() = user_id);
