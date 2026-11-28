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
-- Highscore-raderna hanteras av servern och visas i topplistor för alla inloggade spelare.
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
   (game='sentence' and total=15 and score<=total) or
   (game='spelling' and total=15 and score<=total)
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

-- Privat övningshistorik. Läsning och skrivning sker endast via API-servern.
create table if not exists public.sentence_practice_sessions (
 id uuid primary key,
 user_id uuid not null references public.profiles(id) on delete cascade,
 level text not null check (level in ('beginner','easy','medium','advanced')),
 sentence_ids text[] not null check (cardinality(sentence_ids)=15),
 score integer check (score is null or score between 0 and 15),
 total integer check (total is null or total=15),
 started_at timestamptz not null default now(),
 completed_at timestamptz,
 constraint sentence_session_completion_check check ((completed_at is null and score is null and total is null) or (completed_at is not null and score is not null and total=15)),
 constraint sentence_session_id_user_uq unique (id,user_id)
);
create index if not exists sentence_practice_sessions_user_level_idx on public.sentence_practice_sessions(user_id,level,started_at desc);
create table if not exists public.sentence_practice_attempts (
 id uuid primary key,
 session_id uuid not null,
 user_id uuid not null references public.profiles(id) on delete cascade,
 level text not null check (level in ('beginner','easy','medium','advanced')),
 sentence_id text not null,
 is_correct boolean not null,
 answered_at timestamptz not null default now(),
 constraint sentence_attempt_session_owner_fk foreign key(session_id,user_id) references public.sentence_practice_sessions(id,user_id) on delete cascade
);
create index if not exists sentence_practice_attempts_user_level_idx on public.sentence_practice_attempts(user_id,level,answered_at desc);
create index if not exists sentence_practice_attempts_session_idx on public.sentence_practice_attempts(session_id,sentence_id);
alter table public.sentence_practice_sessions enable row level security;
alter table public.sentence_practice_attempts enable row level security;
revoke all on public.sentence_practice_sessions,public.sentence_practice_attempts from anon,authenticated;
grant all on public.sentence_practice_sessions,public.sentence_practice_attempts to service_role;
