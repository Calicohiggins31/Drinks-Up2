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
