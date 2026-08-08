-- SoundWave 数据库 Schema
-- 在 Supabase SQL Editor 中执行

-- 启用 UUID 扩展
create extension if not exists "uuid-ossp";

-- 用户配置表（扩展 Supabase auth.users）
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  avatar_url text,
  is_creator boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 采样包表
create table public.sample_packs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  cover_url text,
  creator_id uuid references public.profiles(id) on delete set null,
  bpm_min integer,
  bpm_max integer,
  tags text[] default '{}',
  price_cents integer default 0,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 采样表
create table public.samples (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  pack_id uuid references public.sample_packs(id) on delete cascade,
  creator_id uuid references public.profiles(id) on delete set null,
  type text not null check (type in ('Loop', 'One Shot', 'MIDI', 'Preset')),
  bpm integer,
  musical_key text,
  tags text[] default '{}',
  duration_seconds numeric,
  audio_url text not null,
  preview_url text,
  waveform_data jsonb,
  download_count integer default 0,
  like_count integer default 0,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 收藏表
create table public.likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  sample_id uuid references public.samples(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, sample_id)
);

-- 下载记录表
create table public.downloads (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  sample_id uuid references public.samples(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 订阅计划表
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan text not null check (plan in ('free', 'producer', 'team')),
  status text not null check (status in ('active', 'canceled', 'past_due')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 行级安全策略 (RLS)
alter table public.profiles enable row level security;
alter table public.sample_packs enable row level security;
alter table public.samples enable row level security;
alter table public.likes enable row level security;
alter table public.downloads enable row level security;

-- 所有人可读已发布采样
create policy "已发布采样对所有人可读" on public.samples
  for select using (is_published = true);

-- 登录用户可管理自己的采样
create policy "用户可管理自己的采样" on public.samples
  for all using (auth.uid() = creator_id) with check (auth.uid() = creator_id);

-- 用户可查看所有已发布采样包
create policy "已发布采样包对所有人可读" on public.sample_packs
  for select using (is_published = true);

-- 创建用户时自动创建 profile
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 全文搜索索引（可选）
alter table public.samples add column search_vector tsvector
  generated always as (to_tsvector('chinese', coalesce(title, '') || ' ' || coalesce(array_to_string(tags, ' '), ''))) stored;
create index samples_search_idx on public.samples using gin (search_vector);
