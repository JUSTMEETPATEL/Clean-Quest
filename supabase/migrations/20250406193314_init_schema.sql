-- Enable PostGIS extension for geolocation support
create extension if not exists postgis;

-- Profiles table, tied to Supabase Auth
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text check (role in ('citizen', 'ngo', 'funder', 'admin')),
  created_at timestamp default now()
);

-- Waste reports submitted by citizens
create table waste_reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text,
  image_url text not null,
  location geometry(Point, 4326),
  status text check (status in ('pending', 'assigned', 'cleaned')) default 'pending',
  assigned_ngo uuid references profiles(id) on delete set null,
  assigned_at timestamp,
  created_at timestamp default now()
);

-- Cleanup reports by NGOs
create table cleanups (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid not null references waste_reports(id) on delete cascade,
  ngo_id uuid not null references profiles(id) on delete cascade,
  image_after text not null,
  ai_score numeric check (ai_score >= 0 and ai_score <= 100),
  points_awarded integer,
  created_at timestamp default now()
);

-- Donations by funders to NGOs
create table donations (
  id uuid primary key default uuid_generate_v4(),
  donor_id uuid not null references profiles(id) on delete cascade,
  ngo_id uuid not null references profiles(id) on delete cascade,
  amount numeric not null check (amount >= 0),
  status text check (status in ('pending', 'completed', 'failed')) default 'pending',
  donated_at timestamp default now()
);

-- Comments on waste reports (social engagement layer)
create table comments (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid not null references waste_reports(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  created_at timestamp default now()
);

-- Leaderboard view with rank
create view leaderboard as
select
  p.id as ngo_id,
  p.full_name,
  sum(c.points_awarded) as total_points,
  rank() over (order by sum(c.points_awarded) desc) as rank
from profiles p
join cleanups c on c.ngo_id = p.id
where p.role = 'ngo'
group by p.id, p.full_name;

-- Indexes for better performance
create index idx_waste_reports_user_id on waste_reports(user_id);
create index idx_waste_reports_assigned_ngo on waste_reports(assigned_ngo);
create index idx_cleanups_report_id on cleanups(report_id);
create index idx_cleanups_ngo_id on cleanups(ngo_id);
create index idx_donations_ngo_id on donations(ngo_id);
create index idx_comments_report_id on comments(report_id);

-- Create functions and triggers for role validation instead of check constraints

-- Function to validate assigned NGO role
create or replace function check_assigned_ngo_role()
returns trigger as $$
begin
  if new.assigned_ngo is not null then
    if not exists (select 1 from profiles where id = new.assigned_ngo and role = 'ngo') then
      raise exception 'assigned_ngo must reference a profile with role = ngo';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

-- Function to validate NGO role for cleanups
create or replace function check_ngo_role()
returns trigger as $$
begin
  if not exists (select 1 from profiles where id = new.ngo_id and role = 'ngo') then
    raise exception 'ngo_id must reference a profile with role = ngo';
  end if;
  return new;
end;
$$ language plpgsql;

-- Function to validate donor role for donations
create or replace function check_donor_role()
returns trigger as $$
begin
  if not exists (select 1 from profiles where id = new.donor_id and role = 'funder') then
    raise exception 'donor_id must reference a profile with role = funder';
  end if;
  return new;
end;
$$ language plpgsql;

-- Create triggers
create trigger check_assigned_ngo_role_trigger
before insert or update on waste_reports
for each row execute function check_assigned_ngo_role();

create trigger check_ngo_role_trigger
before insert or update on cleanups
for each row execute function check_ngo_role();

create trigger check_donor_role_trigger
before insert or update on donations
for each row execute function check_donor_role();
