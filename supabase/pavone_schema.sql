create extension if not exists "pgcrypto";

create sequence if not exists pavone_order_number_seq start 1001;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Pavone Owner',
  role text not null default 'owner' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  description text not null default '',
  image text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  category text not null references public.categories(slug) on update cascade,
  price numeric(10,2) not null check (price >= 0),
  sale_price numeric(10,2) check (sale_price is null or sale_price >= 0),
  images jsonb not null default '[]'::jsonb,
  sizes jsonb not null default '[]'::jsonb,
  colors jsonb not null default '[]'::jsonb,
  in_stock boolean not null default true,
  badge text check (badge is null or badge in ('New', 'Bestseller', 'Sale', 'Limited')),
  tags jsonb not null default '[]'::jsonb,
  pieces jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('PVN-' || nextval('pavone_order_number_seq'::regclass)),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  city text not null,
  address text not null,
  notes text,
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'canceled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  channel text not null default 'web' check (channel in ('web')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  product_name text not null,
  product_slug text,
  product_image text,
  quantity integer not null check (quantity > 0),
  price numeric(10,2) not null check (price >= 0),
  size text,
  color text,
  created_at timestamptz not null default now()
);

create table if not exists public.outfit_inspirations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  note text not null default '',
  product_ids jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint outfit_inspirations_min_items check (jsonb_array_length(product_ids) >= 3)
);

create table if not exists public.pavone_settings (
  id text primary key default 'home',
  hero_main_image text not null default '',
  hero_mobile_image text not null default '',
  hero_gallery_images jsonb not null default '[]'::jsonb,
  hero_badge text not null default 'Spring / Summer ''26 Collection',
  hero_title text not null default 'Modern modest fashion, made to bloom.',
  hero_subtitle text not null default 'Flowing abayas, coordinated sets and signature scarves - curated for the woman who dresses with intention and a love of color.',
  featured_look_label text not null default 'Blossom Knit - $89',
  featured_product_slug text not null default 'blossom-knit-dress',
  updated_at timestamptz not null default now(),
  constraint pavone_settings_singleton check (id = 'home')
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists categories_updated_at on public.categories;
create trigger categories_updated_at before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists outfit_inspirations_updated_at on public.outfit_inspirations;
create trigger outfit_inspirations_updated_at before update on public.outfit_inspirations
for each row execute function public.set_updated_at();

drop trigger if exists pavone_settings_updated_at on public.pavone_settings;
create trigger pavone_settings_updated_at before update on public.pavone_settings
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.outfit_inspirations enable row level security;
alter table public.pavone_settings enable row level security;

drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
for select to authenticated using (auth.uid() = id);

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "public category read" on public.categories;
create policy "public category read" on public.categories
for select to anon, authenticated using (true);

drop policy if exists "admin category write" on public.categories;
create policy "admin category write" on public.categories
for all to authenticated using (true) with check (true);

drop policy if exists "public product read" on public.products;
create policy "public product read" on public.products
for select to anon, authenticated using (true);

drop policy if exists "admin product write" on public.products;
create policy "admin product write" on public.products
for all to authenticated using (true) with check (true);

drop policy if exists "public order insert" on public.orders;
create policy "public order insert" on public.orders
for insert to anon, authenticated with check (true);

drop policy if exists "admin order read" on public.orders;
create policy "admin order read" on public.orders
for select to authenticated using (true);

drop policy if exists "admin order update" on public.orders;
create policy "admin order update" on public.orders
for update to authenticated using (true) with check (true);

drop policy if exists "admin order delete" on public.orders;
create policy "admin order delete" on public.orders
for delete to authenticated using (true);

drop policy if exists "public order item insert" on public.order_items;
create policy "public order item insert" on public.order_items
for insert to anon, authenticated with check (true);

drop policy if exists "admin order item read" on public.order_items;
create policy "admin order item read" on public.order_items
for select to authenticated using (true);

drop policy if exists "admin order item write" on public.order_items;
create policy "admin order item write" on public.order_items
for all to authenticated using (true) with check (true);

drop policy if exists "public outfit inspiration read" on public.outfit_inspirations;
create policy "public outfit inspiration read" on public.outfit_inspirations
for select to anon, authenticated using (is_active = true or auth.role() = 'authenticated');

drop policy if exists "admin outfit inspiration write" on public.outfit_inspirations;
create policy "admin outfit inspiration write" on public.outfit_inspirations
for all to authenticated using (true) with check (true);

drop policy if exists "public pavone settings read" on public.pavone_settings;
create policy "public pavone settings read" on public.pavone_settings
for select to anon, authenticated using (true);

drop policy if exists "admin pavone settings write" on public.pavone_settings;
create policy "admin pavone settings write" on public.pavone_settings
for all to authenticated using (true) with check (true);

grant usage on schema public to anon, authenticated;
grant usage, select on sequence pavone_order_number_seq to anon, authenticated;

grant select on public.categories to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.outfit_inspirations to anon, authenticated;
grant select on public.pavone_settings to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant insert on public.order_items to anon, authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, insert, update, delete on public.orders to authenticated;
grant select, insert, update, delete on public.order_items to authenticated;
grant select, insert, update, delete on public.outfit_inspirations to authenticated;
grant select, insert, update, delete on public.pavone_settings to authenticated;

insert into public.pavone_settings (id)
values ('home')
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('pavone-images', 'pavone-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public pavone image read" on storage.objects;
create policy "public pavone image read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'pavone-images');

drop policy if exists "admin pavone image upload" on storage.objects;
create policy "admin pavone image upload" on storage.objects
for insert to authenticated
with check (bucket_id = 'pavone-images');

drop policy if exists "admin pavone image update" on storage.objects;
create policy "admin pavone image update" on storage.objects
for update to authenticated
using (bucket_id = 'pavone-images')
with check (bucket_id = 'pavone-images');

drop policy if exists "admin pavone image delete" on storage.objects;
create policy "admin pavone image delete" on storage.objects
for delete to authenticated
using (bucket_id = 'pavone-images');
