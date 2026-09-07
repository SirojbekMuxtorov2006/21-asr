-- ==============================================================================
-- 21-ASR Raqamli Xizmatlar Markazi — To'liq Supabase Database & Storage Schema
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'manager', 'employee', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.order_status AS ENUM (
        'yangi',
        'qabul_qilindi',
        'jarayonda',
        'mijozdan_kutilmoqda',
        'tayyor',
        'bekor_qilindi'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.payment_status AS ENUM (
        'kutilmoqda',
        'tolangan',
        'xatolik',
        'qaytarilgan'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. HELPER FUNCTIONS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    avatar_url TEXT,
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto create profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, phone)
    VALUES (
        NEW.id,
        COALESCE(NEW.email, ''),
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', '')
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = CASE WHEN profiles.full_name = '' THEN EXCLUDED.full_name ELSE profiles.full_name END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.app_role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT user_roles_user_id_role_unique UNIQUE (user_id, role)
);

-- Helper security functions
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role IN ('super_admin', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role IN ('super_admin', 'admin', 'manager', 'employee')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name_uz TEXT NOT NULL,
    name_ru TEXT NOT NULL DEFAULT '',
    description_uz TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT 'Folder',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    name_uz TEXT NOT NULL,
    name_ru TEXT NOT NULL DEFAULT '',
    short_description TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    how_it_works TEXT NOT NULL DEFAULT '',
    price BIGINT NOT NULL DEFAULT 0,
    price_note TEXT NOT NULL DEFAULT '',
    duration TEXT NOT NULL DEFAULT '1-3 ish kuni',
    required_documents TEXT[] NOT NULL DEFAULT '{}',
    icon TEXT NOT NULL DEFAULT 'FileText',
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    seo_title TEXT NOT NULL DEFAULT '',
    seo_description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_services_updated_at ON public.services;
CREATE TRIGGER trigger_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 8. TEAM MEMBERS TABLE (JAMOA)
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    position TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    image_url TEXT,
    instagram TEXT,
    telegram TEXT,
    linkedin TEXT,
    bio TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_team_members_updated_at ON public.team_members;
CREATE TRIGGER trigger_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. GALLERY TABLE (GALEREYA)
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Boshqa', -- 'Jamoa', 'Ofis', 'Tadbirlar', 'Xizmatlar', 'Boshqa'
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trigger_gallery_updated_at ON public.gallery;
CREATE TRIGGER trigger_gallery_updated_at
    BEFORE UPDATE ON public.gallery
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL DEFAULT '',
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    price BIGINT NOT NULL DEFAULT 0,
    status public.order_status NOT NULL DEFAULT 'yangi',
    notes TEXT NOT NULL DEFAULT '',
    internal_notes TEXT NOT NULL DEFAULT '',
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Buyurtma raqami avtomatik: 21ASR-YYYY-000001
CREATE SEQUENCE IF NOT EXISTS public.order_number_seq START 1;

CREATE OR REPLACE FUNCTION public.assign_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number := '21ASR-' || to_char(now(), 'YYYY') || '-' ||
            lpad(nextval('public.order_number_seq')::text, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_number ON public.orders;
CREATE TRIGGER orders_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.assign_order_number();

DROP TRIGGER IF EXISTS trigger_orders_updated_at ON public.orders;
CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 11. ORDER EVENTS / TIMELINE
CREATE TABLE IF NOT EXISTS public.order_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    status public.order_status NOT NULL,
    note TEXT NOT NULL DEFAULT '',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    amount BIGINT NOT NULL DEFAULT 0,
    method TEXT NOT NULL DEFAULT 'cash', -- 'payme', 'click', 'cash', 'bank'
    status public.payment_status NOT NULL DEFAULT 'kutilmoqda',
    transaction_id TEXT NOT NULL DEFAULT '',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    mime_type TEXT NOT NULL DEFAULT 'application/octet-stream',
    size_bytes BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. NEWS TABLE
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL DEFAULT '',
    cover_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. FAQ TABLE
CREATE TABLE IF NOT EXISTS public.faq (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    category TEXT NOT NULL DEFAULT 'Umumiy',
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    body TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 17. BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL DEFAULT '',
    image_url TEXT,
    link TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 18. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 19. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 19.1. PROFILES RLS
CREATE POLICY "Users can read own profile or staff can read all"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id OR public.is_admin(auth.uid()));

CREATE POLICY "Staff can insert or update profiles"
    ON public.profiles FOR ALL
    USING (public.is_staff(auth.uid()));

-- 19.2. USER ROLES RLS
CREATE POLICY "Allow users to read their own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Allow admins to manage roles"
    ON public.user_roles FOR ALL
    USING (public.is_admin(auth.uid()) OR auth.uid() = user_id);

-- 19.3. CATEGORIES RLS
CREATE POLICY "Public can view active categories"
    ON public.categories FOR SELECT
    USING (true);

CREATE POLICY "Staff can manage categories"
    ON public.categories FOR ALL
    USING (auth.role() = 'authenticated');

-- 19.4. SERVICES RLS
CREATE POLICY "Public can view active services"
    ON public.services FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage services"
    ON public.services FOR ALL
    USING (auth.role() = 'authenticated');

-- 19.5. TEAM MEMBERS RLS (JAMOA)
CREATE POLICY "Public can view active team members"
    ON public.team_members FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage team members"
    ON public.team_members FOR ALL
    USING (auth.role() = 'authenticated');

-- 19.6. GALLERY RLS (GALEREYA)
CREATE POLICY "Public can view active gallery items"
    ON public.gallery FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage gallery items"
    ON public.gallery FOR ALL
    USING (auth.role() = 'authenticated');

-- 19.7. ORDERS RLS
CREATE POLICY "Users can view own orders or staff can view all"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR public.is_staff(auth.uid()) OR auth.role() = 'anon');

CREATE POLICY "Public can insert orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Staff can update or delete orders"
    ON public.orders FOR ALL
    USING (auth.role() = 'authenticated');

-- 19.8. ORDER EVENTS RLS
CREATE POLICY "Staff or order owners can view order events"
    ON public.order_events FOR SELECT
    USING (
        public.is_staff(auth.uid()) OR
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_events.order_id AND orders.user_id = auth.uid())
    );

CREATE POLICY "Staff can insert order events"
    ON public.order_events FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- 19.9. PAYMENTS RLS
CREATE POLICY "Users view own payments or staff view all"
    ON public.payments FOR SELECT
    USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

CREATE POLICY "Staff can manage payments"
    ON public.payments FOR ALL
    USING (auth.role() = 'authenticated');

-- 19.10. DOCUMENTS RLS
CREATE POLICY "Users view own documents or staff view all"
    ON public.documents FOR SELECT
    USING (
        auth.uid() = user_id OR
        public.is_staff(auth.uid()) OR
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = documents.order_id AND orders.user_id = auth.uid())
    );

CREATE POLICY "Authenticated users or staff can upload documents"
    ON public.documents FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff can manage documents"
    ON public.documents FOR ALL
    USING (auth.role() = 'authenticated');

-- 19.11. NEWS, FAQ, REVIEWS, BANNERS, SETTINGS RLS
CREATE POLICY "Public can view published news"
    ON public.news FOR SELECT
    USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage news"
    ON public.news FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view active FAQ"
    ON public.faq FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage FAQ"
    ON public.faq FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view approved reviews"
    ON public.reviews FOR SELECT
    USING (is_approved = true OR auth.role() = 'authenticated');

CREATE POLICY "Public can insert reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Staff can manage reviews"
    ON public.reviews FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view active banners"
    ON public.banners FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Staff can manage banners"
    ON public.banners FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view settings"
    ON public.settings FOR SELECT
    USING (true);

CREATE POLICY "Staff can manage settings"
    ON public.settings FOR ALL
    USING (auth.role() = 'authenticated');

-- ==============================================================================
-- 20. SUPABASE STORAGE BUCKETS & STORAGE RLS POLICIES
-- ==============================================================================

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('team-images', 'team-images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']),
    ('service-images', 'service-images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']),
    ('gallery-images', 'gallery-images', true, 20971520, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']),
    ('documents', 'documents', true, 52428800, NULL)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS Policies
-- 20.1. Public Read Access for images
CREATE POLICY "Public can view team images"
    ON storage.objects FOR SELECT
    USING (bucket_id IN ('team-images', 'service-images', 'gallery-images', 'documents'));

-- 20.2. Authenticated Upload Access
CREATE POLICY "Authenticated users can upload team images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id IN ('team-images', 'service-images', 'gallery-images', 'documents') AND auth.role() = 'authenticated');

-- 20.3. Authenticated Update & Delete Access
CREATE POLICY "Authenticated users can update images"
    ON storage.objects FOR UPDATE
    USING (bucket_id IN ('team-images', 'service-images', 'gallery-images', 'documents') AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete images"
    ON storage.objects FOR DELETE
    USING (bucket_id IN ('team-images', 'service-images', 'gallery-images', 'documents') AND auth.role() = 'authenticated');

-- ==============================================================================
-- 21. INITIAL SAMPLE DATA
-- ==============================================================================

-- Sample Categories
INSERT INTO public.categories (slug, name_uz, name_ru, icon, sort_order) VALUES
('biznes', 'Biznes va tadbirkorlik', 'Бизнес и предпринимательство', 'Briefcase', 1),
('davlat-xizmatlari', 'Davlat xizmatlari', 'Госуслуги', 'Building2', 2),
('soliq-buxgalteriya', 'Soliq va buxgalteriya', 'Налоги и бухгалтерия', 'Calculator', 3),
('hujjatlar', 'Hujjatlar va litsenziyalar', 'Документы и лицензии', 'FileCheck', 4),
('it-marketing', 'IT va Marketing', 'IT и Маркетинг', 'Globe', 5)
ON CONFLICT (slug) DO NOTHING;

-- Sample Team Members
INSERT INTO public.team_members (first_name, last_name, position, phone, email, bio, instagram, telegram, sort_order) VALUES
('Azizbek', 'Qodirov', 'Bosh direktor (CEO)', '+998901234567', 'azizbek@21-asr.uz', '10 yildan ortiq biznes va raqamlashtirish sohasida tajribaga ega.', 'azizbek_ceo', 'azizbek_21asr', 1),
('Madina', 'Usmonova', 'Bosh buxgalter', '+998902345678', 'madina@21-asr.uz', 'Soliq va moliyaviy hisobotlar bo''yicha yetakchi mutaxassis.', 'madina_finance', 'madina_usm', 2),
('Javohir', 'Rustamov', 'Yurist / Huquqshunos', '+998903456789', 'javohir@21-asr.uz', 'Kompaniyalarni ro''yxatdan o''tkazish va litsenziyalash bo''yicha ekspert.', 'javohir_law', 'javohir_jurist', 3),
('Nilufar', 'Alimova', 'Mijozlar bilan ishlash menejeri', '+998904567890', 'nilufar@21-asr.uz', 'Har bir mijoz arizasini tezkor va sifatli ko''rib chiqishga mas''ul.', 'nilufar_crm', 'nilufar_21asr', 4)
ON CONFLICT DO NOTHING;

-- Sample Gallery Items
INSERT INTO public.gallery (title, description, image_url, category, sort_order) VALUES
('Zamonaviy Ofisimiz', 'samarqand urgut markazidagi qulay va shinam bosh ofisimiz.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 'Ofis', 1),
('Jamoaviy uchrashuv', 'Haftalik rejalashtirish va yangi xizmatlar taqdimoti.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', 'Jamoa', 2),
('Biznes Forum 2026', 'Raqamli xizmatlar va tadbirkorlik forumi ishtirokchilari.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', 'Tadbirlar', 3),
('Mijozlarga xizmat ko''rsatish', 'Front-desk va tezkor konsultatsiya jarayoni.', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80', 'Xizmatlar', 4)
ON CONFLICT DO NOTHING;

-- Sample Settings
INSERT INTO public.settings (key, value) VALUES
('stats', '{"clients": "30 000+", "services": "300+", "years": "10+", "support": "24/7"}'::jsonb),
('contact', '{"phone": "+998 (55) 701-21-00", "email": "info@21-asr.uz", "address": "samarqand urgut shahri, Chilonzor tumani", "telegram": "asr21_support"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
