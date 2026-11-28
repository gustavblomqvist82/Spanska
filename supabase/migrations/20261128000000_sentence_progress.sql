-- Private progress history. All access goes through server API checks for family membership.
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
