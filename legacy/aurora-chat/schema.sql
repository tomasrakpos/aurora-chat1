-- ============================================================
--  AURORA CHAT — Supabase schema
--  اجرا کن این فایل رو داخل Supabase SQL Editor (پروژه‌ات)
--  این ساختار همون چیزیه که js/app.js انتظارش رو داره
-- ============================================================

-- پروفایل هر کاربر (تکمیل‌کننده‌ی auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  status text default 'آنلاین',
  last_seen timestamptz default now(),
  created_at timestamptz default now()
);

-- مکالمات (خصوصی یا گروهی)
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean default false,
  name text,
  created_at timestamptz default now()
);

-- اعضای هر مکالمه
create table if not exists public.conversation_members (
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (conversation_id, user_id)
);

-- پیام‌ها
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now(),
  edited_at timestamptz
);

-- فعال‌سازی Row Level Security
alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;

-- Policyهای پایه (نمونه — بسته به نیاز خودت تنظیم‌شون کن)
create policy "profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "members can view their conversations" on public.conversations
  for select using (
    id in (select conversation_id from public.conversation_members where user_id = auth.uid())
  );

create policy "members can view their membership" on public.conversation_members
  for select using (
    conversation_id in (select conversation_id from public.conversation_members where user_id = auth.uid())
  );

create policy "members can view messages" on public.messages
  for select using (
    conversation_id in (select conversation_id from public.conversation_members where user_id = auth.uid())
  );

create policy "members can send messages" on public.messages
  for insert with check (
    sender_id = auth.uid()
    and conversation_id in (select conversation_id from public.conversation_members where user_id = auth.uid())
  );

-- فعال‌سازی Realtime برای جدول پیام‌ها
alter publication supabase_realtime add table public.messages;
