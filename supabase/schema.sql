-- Drinks Up database setup.
-- Paste this whole file into Supabase → SQL Editor → New query, then click Run. Safe to run more than once.

-- Profile details collected at sign-up.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  city text not null default '',
  state text not null default '',
  created_at timestamptz not null default now()
);

-- Favourite drinks (built-in or the user's own).
create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  recipe_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);

-- Recipes the user created. The whole recipe is stored as JSON.
create table if not exists public.custom_recipes (
  user_id uuid not null references auth.users (id) on delete cascade,
  id text not null,
  recipe jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- Ingredients the user added themselves.
create table if not exists public.custom_ingredients (
  user_id uuid not null references auth.users (id) on delete cascade,
  id text not null,
  name text not null,
  primary key (user_id, id)
);

-- Everyone can only ever see and change their own rows.
alter table public.profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.custom_recipes enable row level security;
alter table public.custom_ingredients enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "own favorites" on public.favorites;
create policy "own favorites" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own recipes" on public.custom_recipes;
create policy "own recipes" on public.custom_recipes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own ingredients" on public.custom_ingredients;
create policy "own ingredients" on public.custom_ingredients
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Create the profile automatically from the sign-up form (works even when email confirmation is on).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, name, city, state)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'city', ''),
    coalesce(new.raw_user_meta_data ->> 'state', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Lets a signed-in user permanently delete their own account and all its data (required by Apple).
create or replace function public.delete_account()
returns void language sql security definer set search_path = '' as $$
  delete from auth.users where id = auth.uid();
$$;

revoke all on function public.delete_account() from public, anon;
grant execute on function public.delete_account() to authenticated;

-- ─── Usage stats (added in v3) ───────────────────────────────────────────────
-- Anonymous daily totals: no user id, device id or location is stored.
-- When the person is signed in, the row is tagged with their profile's city and state instead of ''.
create table if not exists public.usage_counts (
  day date not null default current_date,
  kind text not null check (kind in ('stocked', 'viewed', 'favorited')),
  item text not null,
  city text not null default '',
  state text not null default '',
  count integer not null default 0,
  primary key (day, kind, item, city, state)
);

-- Nobody can read or write the table directly from the app; only the function below can add to it.
-- You can see the totals in the Supabase dashboard (Table Editor → usage_counts).
alter table public.usage_counts enable row level security;

create or replace function public.bump_usage(p_kind text, p_items text[])
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_city text := '';
  v_state text := '';
begin
  if p_kind not in ('stocked', 'viewed', 'favorited') then return; end if;
  if p_items is null or cardinality(p_items) = 0 or cardinality(p_items) > 50 then return; end if;
  if auth.uid() is not null then
    select coalesce(p.city, ''), coalesce(p.state, '') into v_city, v_state
    from public.profiles p where p.id = auth.uid();
  end if;
  insert into public.usage_counts as u (day, kind, item, city, state, count)
  select current_date, p_kind, left(i, 80), coalesce(v_city, ''), coalesce(v_state, ''), 1
  from unnest(p_items) as i
  where i ~ '^[a-z0-9_]+$'
  on conflict (day, kind, item, city, state) do update set count = u.count + 1;
end;
$$;

revoke all on function public.bump_usage(text, text[]) from public;
grant execute on function public.bump_usage(text, text[]) to anon, authenticated;

-- Signed-in users' bars, so they sync across devices (and you can see what an account has stocked).
create table if not exists public.bar_items (
  user_id uuid not null references auth.users (id) on delete cascade,
  ingredient_id text not null,
  primary key (user_id, ingredient_id)
);
alter table public.bar_items enable row level security;
drop policy if exists "own bar" on public.bar_items;
create policy "own bar" on public.bar_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── Ratings and private notes (added in v4) ─────────────────────────────────
-- Star ratings: one per person per drink. People can only see and change their own rows;
-- everyone (signed in or not) can read the anonymous average through recipe_rating() below.
create table if not exists public.ratings (
  user_id uuid not null references auth.users (id) on delete cascade,
  recipe_id text not null check (recipe_id ~ '^[a-z0-9_]+$' and recipe_id not like 'custom_%'),
  stars smallint not null check (stars between 1 and 5),
  updated_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);
alter table public.ratings enable row level security;
drop policy if exists "own ratings" on public.ratings;
create policy "own ratings" on public.ratings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Average and count for one drink. Returns no names or user ids.
create or replace function public.recipe_rating(p_recipe_id text)
returns table (average numeric, total bigint)
language sql stable security definer set search_path = '' as $$
  select round(avg(stars)::numeric, 1), count(*) from public.ratings where recipe_id = p_recipe_id;
$$;
revoke all on function public.recipe_rating(text) from public;
grant execute on function public.recipe_rating(text) to anon, authenticated;

-- Private tasting notes: only ever visible to their author.
create table if not exists public.notes (
  user_id uuid not null references auth.users (id) on delete cascade,
  recipe_id text not null,
  note text not null check (char_length(note) <= 2000),
  updated_at timestamptz not null default now(),
  primary key (user_id, recipe_id)
);
alter table public.notes enable row level security;
drop policy if exists "own notes" on public.notes;
create policy "own notes" on public.notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── Shopping list (added in v5) ─────────────────────────────────────────────
-- Synced for signed-in users so the list follows them across devices. Private to each user.
create table if not exists public.shopping_items (
  user_id uuid not null references auth.users (id) on delete cascade,
  ingredient_id text not null,
  checked boolean not null default false,
  primary key (user_id, ingredient_id)
);
alter table public.shopping_items enable row level security;
drop policy if exists "own shopping list" on public.shopping_items;
create policy "own shopping list" on public.shopping_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─── Ratings on drink cards (added in v6) ────────────────────────────────────
-- Every rated drink's average and count in one call, so lists can show "★ 4.6 (12)".
-- Returns no names or user ids.
create or replace function public.all_recipe_ratings()
returns table (recipe_id text, average numeric, total bigint)
language sql stable security definer set search_path = '' as $$
  select r.recipe_id, round(avg(r.stars)::numeric, 1), count(*)
  from public.ratings r
  group by r.recipe_id;
$$;
revoke all on function public.all_recipe_ratings() from public;
grant execute on function public.all_recipe_ratings() to anon, authenticated;
