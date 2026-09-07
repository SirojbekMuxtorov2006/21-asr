-- ==============================================================================
-- FIX ALL ADMIN PERMISSIONS AND STORAGE FOR 21-ASR.UZ
-- Run this in Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Create all necessary storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('team-images', 'team-images', true),
    ('service-images', 'service-images', true),
    ('gallery-images', 'gallery-images', true),
    ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Objects RLS (Full Public Read / Write)
DROP POLICY IF EXISTS "Public view images" ON storage.objects;
DROP POLICY IF EXISTS "Public insert images" ON storage.objects;
DROP POLICY IF EXISTS "Public update images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view team images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload team images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "storage_public_select" ON storage.objects;
DROP POLICY IF EXISTS "storage_public_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_public_update" ON storage.objects;
DROP POLICY IF EXISTS "storage_public_delete" ON storage.objects;

CREATE POLICY "storage_public_select" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "storage_public_insert" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "storage_public_update" ON storage.objects FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "storage_public_delete" ON storage.objects FOR DELETE USING (true);

-- 3. Table Permissions & RLS Policies

-- ==================== NEWS TABLE ====================
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "news_public_read" ON public.news;
DROP POLICY IF EXISTS "news_anon_read" ON public.news;
DROP POLICY IF EXISTS "news_auth_read" ON public.news;
DROP POLICY IF EXISTS "news_staff_write" ON public.news;
DROP POLICY IF EXISTS "Staff can manage news" ON public.news;
DROP POLICY IF EXISTS "Public can view published news" ON public.news;
DROP POLICY IF EXISTS "news_admin_all" ON public.news;
DROP POLICY IF EXISTS "news_all_access" ON public.news;

CREATE POLICY "news_all_access" ON public.news FOR ALL USING (true) WITH CHECK (true);

-- ==================== SERVICES TABLE ====================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "services_public_read" ON public.services;
DROP POLICY IF EXISTS "services_anon_read" ON public.services;
DROP POLICY IF EXISTS "services_auth_read" ON public.services;
DROP POLICY IF EXISTS "services_staff_write" ON public.services;
DROP POLICY IF EXISTS "Staff can manage services" ON public.services;
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
DROP POLICY IF EXISTS "services_admin_all" ON public.services;
DROP POLICY IF EXISTS "services_all_access" ON public.services;

CREATE POLICY "services_all_access" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- ==================== CATEGORIES TABLE ====================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "categories_public_read" ON public.categories;
DROP POLICY IF EXISTS "categories_staff_write" ON public.categories;
DROP POLICY IF EXISTS "Staff can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
DROP POLICY IF EXISTS "categories_admin_all" ON public.categories;
DROP POLICY IF EXISTS "categories_all_access" ON public.categories;

CREATE POLICY "categories_all_access" ON public.categories FOR ALL USING (true) WITH CHECK (true);

-- ==================== TEAM MEMBERS TABLE ====================
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "team_public_read" ON public.team_members;
DROP POLICY IF EXISTS "team_staff_write" ON public.team_members;
DROP POLICY IF EXISTS "Staff can manage team members" ON public.team_members;
DROP POLICY IF EXISTS "Public can view active team members" ON public.team_members;
DROP POLICY IF EXISTS "team_admin_all" ON public.team_members;
DROP POLICY IF EXISTS "team_all_access" ON public.team_members;

CREATE POLICY "team_all_access" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

-- ==================== GALLERY TABLE ====================
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_public_read" ON public.gallery;
DROP POLICY IF EXISTS "gallery_staff_write" ON public.gallery;
DROP POLICY IF EXISTS "Staff can manage gallery items" ON public.gallery;
DROP POLICY IF EXISTS "Public can view active gallery items" ON public.gallery;
DROP POLICY IF EXISTS "gallery_admin_all" ON public.gallery;
DROP POLICY IF EXISTS "gallery_all_access" ON public.gallery;

CREATE POLICY "gallery_all_access" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

-- ==================== ORDERS TABLE ====================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "orders_public_read" ON public.orders;
DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
DROP POLICY IF EXISTS "orders_insert" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_guest" ON public.orders;
DROP POLICY IF EXISTS "orders_staff_update" ON public.orders;
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Staff can update or delete orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders or staff can view all" ON public.orders;
DROP POLICY IF EXISTS "orders_admin_all" ON public.orders;
DROP POLICY IF EXISTS "orders_all_access" ON public.orders;

CREATE POLICY "orders_all_access" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- ==================== ORDER EVENTS TABLE ====================
ALTER TABLE public.order_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "order_events_select" ON public.order_events;
DROP POLICY IF EXISTS "order_events_insert" ON public.order_events;
DROP POLICY IF EXISTS "order_events_insert_guest" ON public.order_events;
DROP POLICY IF EXISTS "Staff or order owners can view order events" ON public.order_events;
DROP POLICY IF EXISTS "Staff can insert order events" ON public.order_events;
DROP POLICY IF EXISTS "order_events_all_access" ON public.order_events;

CREATE POLICY "order_events_all_access" ON public.order_events FOR ALL USING (true) WITH CHECK (true);

-- ==================== PAYMENTS TABLE ====================
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "payments_public_read" ON public.payments;
DROP POLICY IF EXISTS "payments_select" ON public.payments;
DROP POLICY IF EXISTS "payments_staff_write" ON public.payments;
DROP POLICY IF EXISTS "Users view own payments or staff view all" ON public.payments;
DROP POLICY IF EXISTS "Staff can manage payments" ON public.payments;
DROP POLICY IF EXISTS "payments_admin_all" ON public.payments;
DROP POLICY IF EXISTS "payments_all_access" ON public.payments;

CREATE POLICY "payments_all_access" ON public.payments FOR ALL USING (true) WITH CHECK (true);

-- ==================== SETTINGS TABLE ====================
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_public_read" ON public.settings;
DROP POLICY IF EXISTS "settings_admin_write" ON public.settings;
DROP POLICY IF EXISTS "Public can view settings" ON public.settings;
DROP POLICY IF EXISTS "Staff can manage settings" ON public.settings;
DROP POLICY IF EXISTS "settings_admin_all" ON public.settings;
DROP POLICY IF EXISTS "settings_all_access" ON public.settings;

CREATE POLICY "settings_all_access" ON public.settings FOR ALL USING (true) WITH CHECK (true);

-- ==================== FAQ TABLE ====================
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "faq_public_read" ON public.faq;
DROP POLICY IF EXISTS "faq_staff_write" ON public.faq;
DROP POLICY IF EXISTS "Public can view active FAQ" ON public.faq;
DROP POLICY IF EXISTS "Staff can manage FAQ" ON public.faq;
DROP POLICY IF EXISTS "faq_admin_all" ON public.faq;
DROP POLICY IF EXISTS "faq_all_access" ON public.faq;

CREATE POLICY "faq_all_access" ON public.faq FOR ALL USING (true) WITH CHECK (true);

-- ==================== REVIEWS TABLE ====================
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_public_read" ON public.reviews;
DROP POLICY IF EXISTS "reviews_anon_read" ON public.reviews;
DROP POLICY IF EXISTS "reviews_auth_read" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_own" ON public.reviews;
DROP POLICY IF EXISTS "reviews_staff_write" ON public.reviews;
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Staff can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "reviews_admin_all" ON public.reviews;
DROP POLICY IF EXISTS "reviews_all_access" ON public.reviews;

CREATE POLICY "reviews_all_access" ON public.reviews FOR ALL USING (true) WITH CHECK (true);

-- ==================== BANNERS TABLE ====================
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "banners_public_read" ON public.banners;
DROP POLICY IF EXISTS "banners_staff_write" ON public.banners;
DROP POLICY IF EXISTS "Public can view active banners" ON public.banners;
DROP POLICY IF EXISTS "Staff can manage banners" ON public.banners;
DROP POLICY IF EXISTS "banners_admin_all" ON public.banners;
DROP POLICY IF EXISTS "banners_all_access" ON public.banners;

CREATE POLICY "banners_all_access" ON public.banners FOR ALL USING (true) WITH CHECK (true);

-- ==================== USER ROLES & PROFILES ====================
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "roles_select" ON public.user_roles;
DROP POLICY IF EXISTS "roles_admin_manage" ON public.user_roles;
DROP POLICY IF EXISTS "Allow users to read their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow admins to manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_all_access" ON public.user_roles;

CREATE POLICY "user_roles_all_access" ON public.user_roles FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile or staff can read all" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Staff can insert or update profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_all_access" ON public.profiles;

CREATE POLICY "profiles_all_access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

-- 4. Grant full table and sequence permissions to anon, authenticated, service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

