-- 1. Profiles (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  subscription_status text default 'inactive', -- active, past_due, canceled
  plan_tier text default 'free', -- basic, starter, growth, pro
  credits_monthly int default 0, -- Total credits for the month
  credits_used int default 0, -- Credits used this billing cycle
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- 2. Campaigns (Groups of contacts)
create table public.campaigns (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  name text not null,
  status text default 'draft', -- draft, running, paused, completed
  voice_id text, -- AI Voice ID (from provider)
  language text default 'en-US',
  script_template text, -- "Hi {name}, this is Sarah..."
  created_at timestamp with time zone default now()
);

alter table public.campaigns enable row level security;

create policy "Users can CRUD own campaigns" on public.campaigns
  for all using (auth.uid() = user_id);

-- 3. Contacts (The people to call)
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  user_id uuid references public.profiles(id),
  full_name text,
  phone_number text not null,
  company_name text,
  service_interest text,
  custom_notes text,
  status text default 'pending', -- pending, queued, calling, completed, failed, no-answer
  call_sid text, -- External Call ID from Voice Provider
  call_duration int,
  call_recording_url text,
  call_transcript text,
  last_called_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

alter table public.contacts enable row level security;

create policy "Users can CRUD own contacts" on public.contacts
  for all using (auth.uid() = user_id);

-- 4. Call Logs (For analytics)
create table public.call_logs (
  id uuid default gen_random_uuid() primary key,
  contact_id uuid references public.contacts(id),
  user_id uuid references public.profiles(id),
  status text,
  duration int,
  cost_credits int default 1,
  provider_response jsonb,
  created_at timestamp with time zone default now()
);

alter table public.call_logs enable row level security;

create policy "Users can view own call logs" on public.call_logs
  for select using (auth.uid() = user_id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
