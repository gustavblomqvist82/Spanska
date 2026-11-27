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
   (game='sentence' and total=15 and score<=total) or
   (game='spelling' and total=15 and score<=total)
 )
);
create index if not exists game_highscores_game_user_score_idx
 on public.game_highscores (game,user_id,score desc,created_at asc);
alter table public.game_highscores enable row level security;
revoke all on public.game_highscores from anon,authenticated;
grant all on public.game_highscores to service_role;
