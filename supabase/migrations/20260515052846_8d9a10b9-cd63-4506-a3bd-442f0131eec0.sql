
-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "own profile select" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);

-- suppliers
create table public.suppliers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  contact_person text,
  phone text,
  alt_phone text,
  email text,
  address text,
  city text,
  product_categories text[] default '{}',
  gst_number text,
  bank_account text,
  ifsc text,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now()
);
alter table public.suppliers enable row level security;
create policy "own suppliers all" on public.suppliers for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create index on public.suppliers(owner_id);

-- branches
create table public.branches (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  location text,
  manager text,
  phone text,
  created_at timestamptz not null default now()
);
alter table public.branches enable row level security;
create policy "own branches all" on public.branches for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create index on public.branches(owner_id);

-- goods_received
create table public.goods_received (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  supplier_id uuid references public.suppliers(id) on delete set null,
  invoice_number text not null,
  received_date date not null default current_date,
  received_by text,
  notes text,
  total_amount numeric not null default 0,
  created_at timestamptz not null default now()
);
alter table public.goods_received enable row level security;
create policy "own gr all" on public.goods_received for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create index on public.goods_received(owner_id);

create table public.goods_received_items (
  id uuid primary key default gen_random_uuid(),
  goods_received_id uuid not null references public.goods_received(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  product_name text not null,
  category text,
  unit text,
  quantity numeric not null,
  rate numeric not null default 0,
  total numeric not null default 0,
  expiry_date date
);
alter table public.goods_received_items enable row level security;
create policy "own gri all" on public.goods_received_items for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create index on public.goods_received_items(owner_id);
create index on public.goods_received_items(product_name);

-- transfers
create table public.transfers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  transfer_date date not null default current_date,
  branch_id uuid not null references public.branches(id) on delete cascade,
  transferred_by text,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.transfers enable row level security;
create policy "own transfers all" on public.transfers for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create index on public.transfers(owner_id);

create table public.transfer_items (
  id uuid primary key default gen_random_uuid(),
  transfer_id uuid not null references public.transfers(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  branch_id uuid not null references public.branches(id) on delete cascade,
  product_name text not null,
  quantity numeric not null
);
alter table public.transfer_items enable row level security;
create policy "own ti all" on public.transfer_items for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create index on public.transfer_items(owner_id);
create index on public.transfer_items(branch_id);

-- adjustments
create table public.adjustments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  branch_id uuid not null references public.branches(id) on delete cascade,
  product_name text not null,
  quantity_change numeric not null,
  reason text,
  created_at timestamptz not null default now()
);
alter table public.adjustments enable row level security;
create policy "own adj all" on public.adjustments for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create index on public.adjustments(owner_id);

-- auto-create profile + 3 default branches on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)));

  insert into public.branches (owner_id, name, location) values
    (new.id, 'Branch 1', 'Main Branch'),
    (new.id, 'Branch 2', 'Second Branch'),
    (new.id, 'Branch 3', 'Third Branch');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
