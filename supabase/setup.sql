-- Hola! Step 1. Kör hela filen i Supabase SQL Editor.
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 username text not null,
 nickname text not null,
 role text not null check (role in ('parent','child')),
 parent_id uuid references public.profiles(id) on delete cascade,
 consent_at timestamptz,
 consent_version text,
 created_at timestamptz not null default now(),
 constraint child_parent_check check ((role='parent' and parent_id is null) or (role='child' and parent_id is not null))
);
create unique index if not exists profiles_username_lower_uq on public.profiles (lower(username));
create table if not exists public.quiz_results (
 id bigint generated always as identity primary key,
 user_id uuid not null references public.profiles(id) on delete cascade,
 score integer not null check(score>=0),
 total integer not null check(total>0 and score<=total),
 created_at timestamptz not null default now()
);
-- Topplistor för familjen, avskilda från andra familjer.
create table if not exists public.game_highscores (
 id bigint generated always as identity primary key,
 user_id uuid not null references public.profiles(id) on delete cascade,
 game text not null check (game in ('quiz','worm','sentence','spelling')),
 score integer not null check (score>=0 and score<=10000),
 total integer,
 created_at timestamptz not null default now(),
 constraint game_highscores_total_check check (
   (game='worm' and total is null) or
   (game='quiz' and total=15 and score<=total) or
   (game='sentence' and total=4 and score<=total) or
   (game='spelling' and total in (6,8) and score<=total)
 )
);
create index if not exists game_highscores_game_user_score_idx
 on public.game_highscores (game,user_id,score desc,created_at asc);
alter table public.game_highscores enable row level security;
revoke all on public.game_highscores from anon,authenticated;
grant all on public.game_highscores to service_role;

create table if not exists public.quiz_sessions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 questions jsonb not null,
 question_index integer not null default 0,
 score integer not null default 0,
 created_at timestamptz not null default now(),
 completed_at timestamptz
);
alter table public.profiles enable row level security;
alter table public.quiz_results enable row level security;
alter table public.game_highscores enable row level security;
alter table public.quiz_sessions enable row level security;
drop policy if exists "profile self or parent reads family" on public.profiles;
create policy "profile self or parent reads family" on public.profiles for select to authenticated using (id=auth.uid() or parent_id=auth.uid());
drop policy if exists "child reads own results parent reads family" on public.quiz_results;
create policy "child reads own results parent reads family" on public.quiz_results for select to authenticated using (user_id=auth.uid() or exists(select 1 from public.profiles c where c.id=user_id and c.parent_id=auth.uid()));
grant select on public.profiles,public.quiz_results to authenticated;
-- Quiz-session rows are private server data and have no client policies.
revoke all on public.quiz_sessions from anon,authenticated;
revoke insert,update,delete on public.profiles,public.quiz_results from anon,authenticated;
revoke all on public.game_highscores from anon,authenticated;
grant all on public.profiles,public.quiz_results,public.quiz_sessions,public.game_highscores to service_role;
