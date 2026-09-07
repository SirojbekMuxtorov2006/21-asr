
-- ===== ENUMS =====
CREATE TYPE public.app_role AS ENUM ('super_admin','admin','manager','employee','customer');
CREATE TYPE public.order_status AS ENUM ('yangi','qabul_qilindi','jarayonda','mijozdan_kutilmoqda','tayyor','bekor_qilindi');
CREATE TYPE public.payment_status AS ENUM ('kutilmoqda','tolangan','xatolik','qaytarilgan');

-- ===== UTIL =====
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ===== PROFILES =====
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  is_blocked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id
    AND role IN ('super_admin','admin','manager','employee'));
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id
    AND role IN ('super_admin','admin'));
$$;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid() OR public.is_admin(auth.uid()))
  WITH CHECK (id = auth.uid() OR public.is_admin(auth.uid()));
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "roles_select" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "roles_admin_manage" ON public.user_roles FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''))
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===== CATEGORIES / SERVICES =====
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL DEFAULT '',
  description_uz TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Layers',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories_staff_write" ON public.categories FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  how_it_works TEXT NOT NULL DEFAULT '',
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  price_note TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
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
GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_public_read" ON public.services FOR SELECT TO anon, authenticated
  USING (is_active OR public.is_staff(auth.uid()));
CREATE POLICY "services_staff_write" ON public.services FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== ORDERS =====
CREATE SEQUENCE public.order_number_seq START 1;
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL DEFAULT '',
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  internal_notes TEXT NOT NULL DEFAULT '',
  status public.order_status NOT NULL DEFAULT 'yangi',
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  assigned_to UUID REFERENCES auth.users ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT INSERT ON public.orders TO anon;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.assign_order_number() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := '21ASR-' || to_char(now(), 'YYYY') || '-' ||
      lpad(nextval('public.order_number_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER orders_number BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.assign_order_number();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "orders_select_own" ON public.orders FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "orders_insert" ON public.orders FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "orders_insert_guest" ON public.orders FOR INSERT TO anon
  WITH CHECK (user_id IS NULL);
CREATE POLICY "orders_staff_update" ON public.orders FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE public.order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status public.order_status NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_by UUID REFERENCES auth.users ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.order_events TO authenticated;
GRANT INSERT ON public.order_events TO anon;
GRANT ALL ON public.order_events TO service_role;
ALTER TABLE public.order_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order_events_select" ON public.order_events FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()) OR EXISTS (
    SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));
CREATE POLICY "order_events_insert" ON public.order_events FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()) OR EXISTS (
    SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));
CREATE POLICY "order_events_insert_guest" ON public.order_events FOR INSERT TO anon
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id IS NULL));

-- ===== PAYMENTS =====
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  method TEXT NOT NULL DEFAULT 'naqd',
  transaction_id TEXT NOT NULL DEFAULT '',
  status public.payment_status NOT NULL DEFAULT 'kutilmoqda',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payments_select" ON public.payments FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "payments_staff_write" ON public.payments FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===== DOCUMENTS =====
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT '',
  size_bytes BIGINT NOT NULL DEFAULT 0,
  uploaded_by UUID REFERENCES auth.users ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "documents_select" ON public.documents FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "documents_insert" ON public.documents FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "documents_delete" ON public.documents FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

-- ===== MESSAGES =====
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  body TEXT NOT NULL DEFAULT '',
  attachment_path TEXT,
  attachment_name TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_select" ON public.messages FOR SELECT TO authenticated
  USING (customer_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "messages_insert" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid() AND (customer_id = auth.uid() OR public.is_staff(auth.uid())));
CREATE POLICY "messages_update" ON public.messages FOR UPDATE TO authenticated
  USING (customer_id = auth.uid() OR public.is_staff(auth.uid()))
  WITH CHECK (customer_id = auth.uid() OR public.is_staff(auth.uid()));

-- ===== NOTIFICATIONS =====
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'info',
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_select" ON public.notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "notifications_insert" ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "notifications_delete_own" ON public.notifications FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ===== REVIEWS =====
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT '',
  rating INT NOT NULL DEFAULT 5,
  body TEXT NOT NULL DEFAULT '',
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT TO anon, authenticated
  USING (is_approved OR user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "reviews_insert_own" ON public.reviews FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "reviews_staff_write" ON public.reviews FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- ===== CONTENT =====
CREATE TABLE public.news (
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
GRANT SELECT ON public.news TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "news_public_read" ON public.news FOR SELECT TO anon, authenticated
  USING (is_published OR public.is_staff(auth.uid()));
CREATE POLICY "news_staff_write" ON public.news FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE public.faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'umumiy',
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faq TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faq TO authenticated;
GRANT ALL ON public.faq TO service_role;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "faq_public_read" ON public.faq FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "faq_staff_write" ON public.faq FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.banners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.banners TO authenticated;
GRANT ALL ON public.banners TO service_role;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "banners_public_read" ON public.banners FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "banners_staff_write" ON public.banners FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings_admin_write" ON public.settings FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- ===== SEED CATEGORIES =====
INSERT INTO public.categories (slug, name_uz, name_ru, icon, sort_order, description_uz) VALUES
 ('biznes','Biznes xizmatlari','Бизнес услуги','Building2',1,'Biznesni ochish, ro''yxatdan o''tkazish va yuritish'),
 ('hujjatlar','Hujjat xizmatlari','Документы','FileText',2,'Hujjatlarni tayyorlash, tarjima va rasmiylashtirish'),
 ('soliq','Soliq va buxgalteriya','Налоги и бухгалтерия','Calculator',3,'Soliq hisobotlari va buxgalteriya yuritish'),
 ('davlat','Davlat xizmatlari','Госуслуги','Landmark',4,'Davlat organlari bilan bog''liq barcha xizmatlar'),
 ('e-imzo','E-IMZO','E-IMZO','ShieldCheck',5,'Elektron raqamli imzo olish va yangilash'),
 ('patent','Patent va brend','Патент и бренд','BadgeCheck',6,'Tovar belgisi, patent va mualliflik huquqi'),
 ('marketing','SMM va marketing','SMM и маркетинг','Megaphone',7,'Ijtimoiy tarmoqlar va reklama xizmatlari'),
 ('print','Print xizmatlari','Полиграфия','Printer',8,'Vizitka, banner, buklet va bosma mahsulotlar'),
 ('it','IT xizmatlari','IT услуги','Laptop',9,'Sayt, dastur va texnik yechimlar'),
 ('konsalting','Konsalting','Консалтинг','GraduationCap',10,'Yuridik va biznes maslahatlar');

-- ===== SEED SERVICES =====
INSERT INTO public.services (slug, category_id, name_uz, name_ru, short_description, description, how_it_works, price, duration, required_documents, icon, is_popular, sort_order, seo_title, seo_description)
SELECT v.slug, c.id, v.name_uz, v.name_ru, v.short_description, v.description, v.how_it_works, v.price, v.duration, v.docs, v.icon, v.pop, v.sort,
       v.name_uz || ' — 21-ASR raqamli xizmatlar markazi', v.short_description
FROM (VALUES
 ('yatt-ochish','biznes','YATT ochish','Открытие ИП','Yakka tartibdagi tadbirkorlikni 1 kunda ro''yxatdan o''tkazamiz.','YATT (yakka tartibdagi tadbirkor) sifatida ro''yxatdan o''tish uchun barcha hujjatlarni biz tayyorlaymiz va topshiramiz. Siz faqat pasport nusxasini berasiz.','Ariza qoldirasiz → hujjatlarni yig''amiz → davlat portalida ro''yxatdan o''tkazamiz → guvohnomani topshiramiz.',350000,'1 ish kuni',ARRAY['Pasport nusxasi','JSHSHIR','Telefon raqam'],'Briefcase',true,1),
 ('mchj-ochish','biznes','MCHJ ochish','Открытие ООО','Mas''uliyati cheklangan jamiyatni to''liq rasmiylashtiramiz.','MCHJ tashkil etish: ustav, ta''sis shartnomasi, ro''yxatdan o''tkazish va bank hisob raqami ochish.','Konsultatsiya → ustav tayyorlash → ro''yxatdan o''tkazish → bank hisobi va E-IMZO.',750000,'2-3 ish kuni',ARRAY['Ta''sischilar pasporti','Ustav kapitali ma''lumoti','Yuridik manzil'],'Building2',true,2),
 ('e-imzo','e-imzo','E-IMZO olish','Получение ЭЦП','Elektron raqamli imzoni tez va ishonchli rasmiylashtiramiz.','E-IMZO kaliti jismoniy va yuridik shaxslar uchun. Barcha davlat portallarida ishlaydi.','Ariza → shaxsni tasdiqlash → kalit generatsiyasi → o''rnatish va sinov.',250000,'1-2 soat',ARRAY['Pasport','JSHSHIR','STIR (yuridik shaxs uchun)'],'ShieldCheck',true,3),
 ('soliq-hisoboti','soliq','Soliq hisoboti','Налоговая отчётность','Oylik va choraklik soliq hisobotlarini topshiramiz.','Barcha turdagi soliq hisobotlari: aylanmadan soliq, QQS, daromad solig''i va boshqalar.','Ma''lumot yig''ish → hisobot tayyorlash → soliq.uz orqali topshirish → tasdiqnoma.',300000,'1-3 ish kuni',ARRAY['STIR','Bank ko''chirmalari','Hisob-fakturalar'],'Calculator',true,4),
 ('buxgalteriya','soliq','Buxgalteriya xizmati','Бухгалтерия','Autsorsing buxgalteriya — oylik to''liq xizmat.','Sizning kompaniyangiz buxgalteriyasini to''liq yuritamiz: hisobotlar, ish haqi, bank, kadrlar.','Shartnoma → hujjatlarni qabul qilish → oylik yuritish → hisobotlar.',1200000,'Oylik',ARRAY['Ta''sis hujjatlari','Bank ma''lumotlari','Xodimlar ro''yxati'],'BookOpen',true,5),
 ('qqs-xizmatlari','soliq','QQS xizmatlari','НДС услуги','QQS ro''yxati, hisoboti va qaytarilishi.','Qo''shilgan qiymat solig''i bo''yicha ro''yxatga olish, hisobotlar va qaytarish jarayoni.','Tahlil → ro''yxatga olish → hisobot → nazorat.',400000,'2-5 ish kuni',ARRAY['STIR','Hisob-fakturalar'],'Percent',false,6),
 ('soliq-konsultatsiyasi','konsalting','Soliq konsultatsiyasi','Налоговая консультация','Tajribali mutaxassisdan soliq bo''yicha maslahat.','Soliq yuki optimallashtirish, imtiyozlar va nizolarni hal qilish bo''yicha maslahat.','Savol → tahlil → yozma xulosa va tavsiyalar.',150000,'1 soat',ARRAY['Savol tavsifi'],'GraduationCap',false,7),
 ('patent','patent','Patent olish','Патент','Ixtiro va foydali modelni patentlash.','Patent uchun ariza tayyorlash, ekspertiza va guvohnoma olish.','Tekshiruv → ariza → ekspertiza → patent.',2500000,'3-6 oy',ARRAY['Ixtiro tavsifi','Chizmalar','Pasport'],'BadgeCheck',true,8),
 ('tovar-belgisi','patent','Tovar belgisi','Товарный знак','Brendingizni rasmiy himoya qiling.','Tovar belgisini ro''yxatdan o''tkazish: tekshiruv, ariza va guvohnoma.','Belgi tekshiruvi → ariza → ekspertiza → guvohnoma.',3500000,'6-12 oy',ARRAY['Logotip fayli','Tovar toifalari','Ta''sis hujjatlari'],'Stamp',true,9),
 ('kassa-xizmatlari','biznes','Kassa xizmatlari','Кассовые услуги','Onlayn kassa va virtual kassani ulaymiz.','Onlayn nazorat-kassa mashinasi ro''yxati, sozlash va o''qitish.','Ariza → ro''yxatdan o''tkazish → sozlash → o''qitish.',450000,'1-2 ish kuni',ARRAY['STIR','Manzil','E-IMZO'],'Receipt',true,10),
 ('smm','marketing','SMM xizmati','SMM','Instagram va Telegram sahifalarini yuritamiz.','Kontent-reja, dizayn, postlar, reklama va statistika — to''liq SMM paketi.','Brif → strategiya → kontent → e''lon va tahlil.',2000000,'Oylik',ARRAY['Brend materiallari','Sahifaga kirish'],'Megaphone',true,11),
 ('print-xizmatlari','print','Print xizmatlari','Полиграфия','Vizitka, banner, buklet va boshqalar.','Har qanday bosma mahsulot: dizayn va chop etish bir joyda.','Buyurtma → dizayn → tasdiq → chop etish.',100000,'1-2 ish kuni',ARRAY['Matn va logotip'],'Printer',true,12),
 ('sayt-yaratish','it','Sayt yaratish','Создание сайта','Biznesingiz uchun zamonaviy veb-sayt.','Landing, korporativ sayt yoki onlayn do''kon — dizayn va dasturlash.','Brif → dizayn → dasturlash → ishga tushirish.',5000000,'10-20 ish kuni',ARRAY['Kompaniya ma''lumotlari','Logotip'],'Laptop',false,13),
 ('litsenziya','davlat','Litsenziya olish','Лицензия','Faoliyat turi bo''yicha litsenziya rasmiylashtiramiz.','Litsenziya va ruxsatnomalarni olishda to''liq yordam.','Tahlil → hujjatlar → topshirish → litsenziya.',1500000,'10-30 kun',ARRAY['Ta''sis hujjatlari','Faoliyat turi'],'Landmark',false,14),
 ('hujjat-tarjima','hujjatlar','Hujjat tarjimasi','Перевод документов','Notarial tasdiqlangan tarjima.','Pasport, diplom, shartnoma va boshqa hujjatlarni tarjima qilamiz.','Hujjat → tarjima → notarial tasdiq.',80000,'1 ish kuni',ARRAY['Hujjat nusxasi'],'Languages',false,15),
 ('shartnoma','hujjatlar','Shartnoma tayyorlash','Договоры','Yuridik jihatdan to''g''ri shartnomalar.','Har qanday turdagi shartnoma loyihasini tayyorlaymiz va tekshiramiz.','Brif → loyiha → tahrir → yakuniy hujjat.',250000,'1-2 ish kuni',ARRAY['Tomonlar ma''lumoti','Shartlar'],'FileSignature',false,16),
 ('yatt-yopish','biznes','YATT yopish','Закрытие ИП','Tadbirkorlikni to''g''ri tugatamiz.','YATT faoliyatini tugatish: hisobotlar, qarzlarni yopish va ro''yxatdan chiqarish.','Tekshiruv → hisobotlar → tugatish → ma''lumotnoma.',500000,'5-10 ish kuni',ARRAY['Guvohnoma','STIR','E-IMZO'],'Briefcase',false,17),
 ('bank-hisob','biznes','Bank hisob raqami ochish','Открытие счёта','Bank hisob raqamini masofadan ochamiz.','Kompaniya uchun hisob raqami ochish va internet-bankni sozlash.','Bank tanlash → hujjatlar → ochish → internet-bank.',200000,'1 ish kuni',ARRAY['Ta''sis hujjatlari','E-IMZO'],'Landmark',false,18),
 ('xodim-rasmiylashtirish','hujjatlar','Xodimni rasmiylashtirish','Оформление сотрудника','Mehnat shartnomasi va buyruqlar.','Xodimni ishga qabul qilish hujjatlarini to''liq rasmiylashtiramiz.','Ma''lumot → hujjatlar → yagona portalda ro''yxat.',150000,'1 ish kuni',ARRAY['Xodim pasporti','Lavozim va maosh'],'Users',false,19),
 ('reklama-dizayn','marketing','Reklama dizayni','Рекламный дизайн','Banner, post va kreativ dizayn.','Ijtimoiy tarmoq va tashqi reklama uchun professional dizayn.','Brif → konsept → tahrir → tayyor fayllar.',300000,'2-3 ish kuni',ARRAY['Logotip','Matn'],'Palette',false,20)
) AS v(slug, cat, name_uz, name_ru, short_description, description, how_it_works, price, duration, docs, icon, pop, sort)
JOIN public.categories c ON c.slug = v.cat;

-- ===== SEED CONTENT =====
INSERT INTO public.faq (question, answer, category, sort_order) VALUES
 ('21-ASR qanday xizmatlar ko''rsatadi?','Biz biznes ochish, hujjatlar, soliq va buxgalteriya, davlat xizmatlari, E-IMZO, patent, marketing, print va IT yo''nalishlarida 100 dan ortiq xizmat ko''rsatamiz.','umumiy',1),
 ('Buyurtma qanday beriladi?','Kerakli xizmatni tanlab "Buyurtma berish" tugmasini bosing, ism va telefon raqamingizni qoldiring. Menejerimiz 15 daqiqa ichida bog''lanadi.','buyurtma',2),
 ('To''lovni qanday amalga oshiraman?','To''lovni naqd, plastik karta yoki bank o''tkazmasi orqali amalga oshirishingiz mumkin. Har bir buyurtma uchun hisob-faktura beriladi.','tolov',3),
 ('Xizmat qancha vaqt oladi?','Har bir xizmatning taxminiy bajarilish muddati sahifasida ko''rsatilgan. Ko''pchilik xizmatlar 1-3 ish kunida tayyor bo''ladi.','umumiy',4),
 ('Hujjatlarimni qanday yuboraman?','Shaxsiy kabinetdagi "Hujjatlar" bo''limiga PDF, JPG, PNG, DOCX yoki XLSX formatida yuklashingiz mumkin.','hujjatlar',5),
 ('Buyurtmam holatini qayerdan bilaman?','Shaxsiy kabinetingizdagi "Mening buyurtmalarim" bo''limida har bir buyurtma holati va vaqt jadvali ko''rsatiladi.','buyurtma',6);

INSERT INTO public.news (slug, title, excerpt, body) VALUES
 ('21-asr-yangi-platforma','21-ASR yangi raqamli platformasi ishga tushdi','Endi barcha xizmatlarni onlayn buyurtma qilish va kuzatib borish mumkin.','21-ASR Raqamli Xizmatlar Markazi yangi onlayn platformasini ishga tushirdi. Endi mijozlar 100 dan ortiq xizmatni onlayn buyurtma qilishlari, hujjat yuklashlari va buyurtma holatini real vaqtda kuzatishlari mumkin.'),
 ('yatt-royxat-yangilik','YATT ro''yxatdan o''tkazish yanada tezlashdi','Yangi tartibga ko''ra ro''yxatdan o''tish 1 ish kunida yakunlanadi.','Yakka tartibdagi tadbirkorlarni ro''yxatga olish jarayoni soddalashtirildi. 21-ASR orqali murojaat qilsangiz, barcha hujjatlar biz tomonidan tayyorlanadi.'),
 ('e-imzo-muddati','E-IMZO muddatini o''z vaqtida yangilang','Kalit muddati tugashidan oldin yangilash tavsiya etiladi.','E-IMZO kaliti amal qilish muddati 1 yil. Muddati tugagach davlat portallariga kirish imkoni yo''qoladi. 21-ASR orqali yangilash 1 soat ichida amalga oshiriladi.');

INSERT INTO public.reviews (author_name, rating, body, is_approved) VALUES
 ('Sardor Aliyev',5,'YATT ni bir kunda ochib berishdi. Juda tez va tushunarli xizmat.',true),
 ('Nilufar Karimova',5,'Buxgalteriya xizmatidan 1 yildan beri foydalanaman. Hisobotlar hech qachon kechikmagan.',true),
 ('Jasur Toshmatov',5,'E-IMZO ni 30 daqiqada rasmiylashtirib berishdi. Rahmat!',true);

INSERT INTO public.settings (key, value) VALUES
 ('contacts','{"phone":"+998 71 200 21 21","phone2":"+998 90 123 21 21","email":"info@21asr.uz","address":"samarqand urgut shahri, Amir Temur ko''chasi 21","work_hours":"Dush-Shan: 09:00 - 18:00","telegram":"https://t.me/21asr","instagram":"https://instagram.com/21asr","facebook":"https://facebook.com/21asr","map":"samarqand urgut"}'::jsonb),
 ('about','{"title":"21-ASR Raqamli Xizmatlar Markazi","text":"21-ASR — O''zbekistondagi tadbirkorlar, jismoniy shaxslar va kompaniyalar uchun 100 dan ortiq raqamli va davlat xizmatlarini bir joyda taqdim etuvchi markaz. 5 yildan ortiq tajriba, 1000 dan ortiq mamnun mijoz."}'::jsonb),
 ('stats','{"services":"100+","clients":"1000+","years":"5+","support":"24/7"}'::jsonb);
