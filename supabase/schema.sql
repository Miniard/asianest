-- ============================================
-- AsiaNest Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'agent', 'admin')),
  verified boolean default false,
  rating numeric(2,1) default 0,
  deals_closed integer default 0,
  bio text,
  languages text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- PROPERTIES
-- ============================================
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  location text not null,
  country text not null check (country in ('Thailand', 'Vietnam')),
  city text not null,
  type text not null check (type in ('Villa', 'Apartment', 'Condo', 'House', 'Penthouse', 'Land')),
  listing_type text not null check (listing_type in ('buy', 'rent')),
  price bigint not null,
  currency text not null default 'THB',
  price_label text,
  beds integer default 0,
  baths integer default 0,
  area integer not null,
  images text[] default '{}',
  amenities text[] default '{}',
  verified boolean default false,
  featured boolean default false,
  status text default 'pending' check (status in ('pending', 'active', 'sold', 'rented', 'inactive')),
  views integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- FAVORITES
-- ============================================
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, property_id)
);

-- ============================================
-- INQUIRIES (contact messages)
-- ============================================
create table public.inquiries (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  inquiry_type text not null default 'buy',
  message text,
  status text default 'new' check (status in ('new', 'contacted', 'resolved')),
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Properties
alter table public.properties enable row level security;

create policy "Active properties are viewable by everyone"
  on public.properties for select using (status = 'active' or owner_id = auth.uid());

create policy "Authenticated users can create properties"
  on public.properties for insert with check (auth.uid() = owner_id);

create policy "Owners can update their properties"
  on public.properties for update using (auth.uid() = owner_id);

create policy "Owners can delete their properties"
  on public.properties for delete using (auth.uid() = owner_id);

-- Favorites
alter table public.favorites enable row level security;

create policy "Users can view own favorites"
  on public.favorites for select using (auth.uid() = user_id);

create policy "Users can add favorites"
  on public.favorites for insert with check (auth.uid() = user_id);

create policy "Users can remove favorites"
  on public.favorites for delete using (auth.uid() = user_id);

-- Inquiries
alter table public.inquiries enable row level security;

create policy "Anyone can create inquiries"
  on public.inquiries for insert with check (true);

create policy "Users can view own inquiries"
  on public.inquiries for select using (auth.uid() = user_id);

create policy "Admins can view all inquiries"
  on public.inquiries for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- INDEXES
-- ============================================
create index idx_properties_country on public.properties(country);
create index idx_properties_city on public.properties(city);
create index idx_properties_type on public.properties(type);
create index idx_properties_listing_type on public.properties(listing_type);
create index idx_properties_status on public.properties(status);
create index idx_properties_featured on public.properties(featured) where featured = true;
create index idx_favorites_user on public.favorites(user_id);
create index idx_inquiries_property on public.inquiries(property_id);

-- ============================================
-- SEED DATA (12 properties)
-- ============================================
-- We'll insert these without an owner_id so they show as "platform listings"
-- In production, assign real agent user IDs

insert into public.properties (title, description, location, country, city, type, listing_type, price, currency, price_label, beds, baths, area, images, amenities, verified, featured, status) values
(
  'Luxury Beachfront Villa with Infinity Pool',
  'Stunning beachfront villa with panoramic ocean views, private infinity pool, and direct beach access. Fully furnished with premium materials throughout. Perfect for luxury living or high-yield vacation rental investment.',
  'Koh Samui, Surat Thani', 'Thailand', 'Koh Samui', 'Villa', 'buy',
  12500000, 'THB', '฿12,500,000', 4, 5, 450,
  ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
  ARRAY['Infinity Pool','Ocean View','Beach Access','Smart Home','Private Garden','Gym','Wine Cellar'],
  true, true, 'active'
),
(
  'Modern Condo in Sukhumvit with Sky Garden',
  'Beautifully designed 2-bedroom condo in the heart of Sukhumvit. Walking distance to BTS Phrom Phong. Building features rooftop sky garden, co-working space, and 24/7 security.',
  'Sukhumvit Soi 24, Bangkok', 'Thailand', 'Bangkok', 'Condo', 'rent',
  45000, 'THB', '฿45,000/mo', 2, 2, 85,
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  ARRAY['Sky Garden','Co-working Space','24/7 Security','BTS Nearby','Fitness Center','Pool'],
  true, true, 'active'
),
(
  'Heritage Penthouse with Saigon River Views',
  'Exclusive penthouse in the most prestigious building of District 1. 360° views of the Saigon River and city skyline. Premium Italian marble finishes and Bulthaup kitchen. Includes 2 parking spots.',
  'District 1, Ho Chi Minh City', 'Vietnam', 'Ho Chi Minh City', 'Penthouse', 'buy',
  8500000000, 'VND', '₫8.5B', 3, 3, 220,
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'],
  ARRAY['River View','Rooftop Terrace','Private Elevator','Concierge','Wine Room','Spa'],
  true, true, 'active'
),
(
  'Charming French Colonial Apartment in Old Quarter',
  'Beautifully restored French colonial apartment with original hardwood floors and high ceilings. Located steps from Hoan Kiem Lake. Perfect blend of heritage charm and modern comfort.',
  'Hoan Kiem, Hanoi', 'Vietnam', 'Hanoi', 'Apartment', 'rent',
  18000000, 'VND', '₫18M/mo', 2, 1, 95,
  ARRAY['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80','https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80'],
  ARRAY['Lake View','Heritage Building','Furnished','Balcony','Air Conditioning'],
  true, false, 'active'
),
(
  'Tropical Pool Villa in Chiang Mai Hills',
  'Serene hillside villa surrounded by lush tropical gardens. Features a private salt water pool, outdoor sala, and mountain views. Ideal retreat for digital nomads or retirees.',
  'Hang Dong, Chiang Mai', 'Thailand', 'Chiang Mai', 'Villa', 'buy',
  8900000, 'THB', '฿8,900,000', 3, 3, 280,
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
  ARRAY['Private Pool','Mountain View','Garden','Outdoor Sala','Parking','Maid Quarter'],
  true, false, 'active'
),
(
  'Oceanfront Resort Villa in Da Nang',
  'Magnificent oceanfront villa on the famous My Khe Beach. Resort-style living with private pool, tropical garden, and direct beach access. Excellent rental income potential.',
  'My Khe Beach, Da Nang', 'Vietnam', 'Da Nang', 'Villa', 'buy',
  15000000000, 'VND', '₫15B', 5, 6, 520,
  ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80','https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
  ARRAY['Beachfront','Private Pool','Tropical Garden','Home Theater','Staff Quarters','Garage'],
  true, true, 'active'
),
(
  'Luxury Penthouse at The Ritz-Carlton Residences',
  'Ultra-luxury penthouse at one of Bangkok''s most iconic addresses. Floor-to-ceiling windows with unobstructed city views. Ritz-Carlton hotel services including butler, spa, and fine dining.',
  'Mahanakhon, Bangkok', 'Thailand', 'Bangkok', 'Penthouse', 'buy',
  95000000, 'THB', '฿95,000,000', 4, 5, 380,
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
  ARRAY['City View','Butler Service','Spa Access','Fine Dining','Private Elevator','Valet Parking'],
  true, true, 'active'
),
(
  'Modern Studio in Thao Dien Expat Area',
  'Stylish fully-furnished studio in the heart of Thao Dien, the most popular expat neighborhood. Walking distance to international restaurants, cafes, and the riverside promenade.',
  'Thao Dien, District 2, HCMC', 'Vietnam', 'Ho Chi Minh City', 'Apartment', 'rent',
  12000000, 'VND', '₫12M/mo', 1, 1, 48,
  ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  ARRAY['Fully Furnished','Pool','Gym','Security','Near Restaurants','Laundry'],
  true, false, 'active'
),
(
  'Beachfront Land Plot in Phuket',
  'Rare beachfront land plot with Chanote title. 1,600 sqm with 40m beach frontage. Ideal for luxury villa development or boutique resort project. All utilities available.',
  'Natai Beach, Phang Nga', 'Thailand', 'Phuket', 'Land', 'buy',
  25000000, 'THB', '฿25,000,000', 0, 0, 1600,
  ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
  ARRAY['Beachfront','Chanote Title','Utilities Available','Road Access'],
  true, false, 'active'
),
(
  'Luxury Apartment in Vinhomes Central Park',
  'Premium 3-bedroom apartment in Vinhomes Central Park, the most sought-after residential complex in HCMC. Includes access to Vincom Mega Mall, international school, and Central Park.',
  'Binh Thanh, Ho Chi Minh City', 'Vietnam', 'Ho Chi Minh City', 'Condo', 'rent',
  25000000, 'VND', '₫25M/mo', 3, 2, 120,
  ARRAY['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'],
  ARRAY['Park View','Mall Access','International School','Pool','Tennis Court','BBQ Area'],
  true, false, 'active'
),
(
  'Sea View Condo in Pattaya',
  'Fully furnished sea view condo on Wongamat Beach. Modern design with high-end appliances. Building features infinity pool, gym, and direct beach access. Great rental yield.',
  'Wongamat Beach, Pattaya', 'Thailand', 'Pattaya', 'Condo', 'rent',
  25000, 'THB', '฿25,000/mo', 1, 1, 52,
  ARRAY['https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80'],
  ARRAY['Sea View','Furnished','Pool','Beach Access','Gym','24/7 Security'],
  true, false, 'active'
),
(
  'Traditional House with Garden in Hoi An',
  'Beautifully restored traditional Vietnamese house near the iconic Hoi An Ancient Town. Lush garden with mature fruit trees, koi pond, and outdoor dining area. Perfect as a boutique homestay or private residence.',
  'Cam Thanh, Hoi An', 'Vietnam', 'Hoi An', 'House', 'buy',
  3200000000, 'VND', '₫3.2B', 3, 2, 200,
  ARRAY['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'],
  ARRAY['Garden','Koi Pond','Near Ancient Town','Furnished','Parking','Kitchen Garden'],
  true, false, 'active'
);

-- ============================================
-- RPC: Increment property views
-- ============================================
create or replace function public.increment_views(prop_id uuid)
returns void as $$
begin
  update public.properties set views = views + 1 where id = prop_id;
end;
$$ language plpgsql security definer;
