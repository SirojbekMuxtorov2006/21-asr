-- ==============================================================================
-- 21-ASR — 300 TA XIZMATLAR VA 27 TA KATEGORIYA TO'LIQ BAZAGA YUKLASH
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('biznes-ochish', 'Korxona ochish va biznes xizmatlari', '', 'Yuridik shaxslar va YaTTlarni davlat ro''yxatidan o''tkazish, ta''sis hujjatlarini o''zgartirish va qayta tashkil etish xizmatlari.', 'Building2', 1, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('soliq-hisobot', 'Soliq va hisobot xizmatlari', '', 'Barcha turdagi soliq hisobotlarini tayyorlash, topshirish, QQS hisobi va soliq maslahatlari.', 'Receipt', 2, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('buxgalteriya', 'Buxgalteriya xizmatlari', '', 'To''liq va masofaviy buxgalteriya yuritish, EHF, kassa, bank va ombor hujjatlari boshqaruvi.', 'Calculator', 3, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('1c-elektron-hisob', '1C va elektron hisob xizmatlari', '', '1C dasturini o''rnatish, sozlash, korxona bazasini ochish va xodimlar/kontragentlarni kiritish.', 'Database', 4, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('elektron-imzo', 'Elektron raqamli imzo', '', 'E-IMZO kalitlarini olish, o''rnatish, yangilash, parolni tiklash va hujjatlarni imzolash.', 'KeyRound', 5, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('davlat-xizmatlari-mygov', 'My.gov.uz va davlat xizmatlari', '', 'Yagona interaktiv davlat xizmatlari portali orqali ariza va barcha ma''lumotnomalarni olish.', 'Landmark', 6, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('mehnat-va-xodimlar', 'Mehnat va xodimlar', '', 'Xodimlarni ishga qabul qilish, YANMMT (mehnat.uz) tizimiga kiritish va mehnat shartnomalari.', 'Users', 7, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('kadrlar-xizmatlari', 'Kadrlar xizmatlari', '', 'Shtat jadvali, buyruqlar, lavozim yo''riqnomalari va kadrlar hujjatlarini tartibga keltirish.', 'UserCheck', 8, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('bank-tolov', 'Bank va to‘lov xizmatlari', '', 'Bank hisob raqamlari ochish, internet-banking sozlash va to''lov topshiriqnomalari.', 'CreditCard', 9, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('kassa-xizmatlari', 'Kassa xizmatlari', '', 'Onlayn kassa apparatlarini ro''yxatdan o''tkazish, sozlash, fiskal modul va chek sozlamalari.', 'ShoppingBag', 10, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('patent-intellektual-mulk', 'Patent va intellektual mulk', '', 'Tovar belgilarini ro''yxatdan o''tkazish, brend himoyasi, patentlar va mualliflik huquqlari.', 'Award', 11, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('litsenziya-ruxsatnomalar', 'Litsenziya va ruxsatnomalar', '', 'Faoliyat turlari bo''yicha litsenziyalar, ruxsatnomalar, sanitariya va yong''in xulosalari.', 'FileCheck', 12, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('sertifikat-standartlashtirish', 'Sertifikat va standartlashtirish', '', 'Mahsulot sertifikatlari, shtrix-kod (GS1) olish, markirovka va muvofiqlik deklaratsiyalari.', 'ShieldCheck', 13, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('tashqi-iqtisodiy-faoliyat', 'Tashqi iqtisodiy faoliyat', '', 'Eksport va import shartnomalari, bojxona hujjatlari, TN VED va MXIK kodlarini aniqlash.', 'Globe', 14, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('shartnoma-huquqiy-hujjatlar', 'Shartnoma va huquqiy hujjatlar', '', 'Oldi-sotdi, ijara, xizmat ko''rsatish, pudrat va hamkorlik shartnomalarini tuzish va tahlil qilish.', 'FileText', 15, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('korxona-hujjatlari', 'Korxona hujjatlari', '', 'Ustav, ta''sis shartnomasi, umumiy yig''ilish bayonnomalari, qarorlar va rasmiy xatlar.', 'FolderArchive', 16, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('baholash-xizmatlari', 'Baholash xizmatlari', '', 'Ko''chmas mulk, avtomobil, asbob-uskunalar, biznes va korxona aktivlarini professional baholash.', 'TrendingUp', 17, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('kochmas-mulk', 'Ko‘chmas mulk xizmatlari', '', 'Kadastr hujjatlari, kadastr pasporti, mulk huquqini rasmiylashtirish va ko''chmas mulk maslahatlari.', 'Home', 18, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('rieltorlik', 'Rieltorlik xizmatlari', '', 'Uy, kvartira, yer va tijorat binolarini sotish, sotib olish hamda ijaraga berish xizmatlari.', 'Key', 19, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('transport-xizmatlari', 'Transport xizmatlari', '', 'Avtomobil hujjatlari, texnik ma''lumotlarni tekshirish, qayta rasmiylashtirish va transport maslahatlari.', 'Car', 20, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('sugurta-xizmatlari', 'Sug‘urta xizmatlari', '', 'Avtomobil (KASKO, OSAGO), mol-mulk, hayot, korxona va sayohat sug''urta polislari.', 'Shield', 21, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('poligrafiya-print', 'Poligrafiya va print xizmatlari', '', 'Hujjatlarni rangli va oq-qora chop etish, nusxa ko''chirish, skaner, laminatsiya, vizitka va bukletlar.', 'Printer', 22, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('muhr-shtamp', 'Muhr va shtamp', '', 'Korxona va YaTTlar uchun muhr, shtamp, faksimile tayyorlash va muhr dizayni xizmatlari.', 'Stamp', 23, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('dizayn-reklama', 'Dizayn va reklama', '', 'Logotip, brendbuk, vizitka, banner dizayni, Instagram postlar va reklama maketlari.', 'Palette', 24, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('smm-marketing', 'SMM va raqamli marketing', '', 'Instagram, Telegram, Facebook sahifalarini professional yuritish, kontent reja va target reklama.', 'Share2', 25, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('google-onlayn-xizmatlar', 'Google va onlayn xizmatlar', '', 'Google Business profil, Google xaritaga qo''shish, Telegram bot, domen va sayt yaratish xizmatlari.', 'Search', 26, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

INSERT INTO public.categories (slug, name_uz, name_ru, description_uz, icon, sort_order, is_active)
VALUES ('talim-oquv', 'Ta’lim va o‘quv xizmatlari', '', 'Kompyuter savodxonligi, 1C, buxgalteriya, Excel, Word, SMM va xorijiy tillar kurslari.', 'GraduationCap', 27, true)
ON CONFLICT (slug) DO UPDATE SET 
  name_uz = EXCLUDED.name_uz, 
  description_uz = EXCLUDED.description_uz, 
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;


-- 2. Insert 300 Services

-- Category: Korxona ochish va biznes xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'mchj-ochish-1',
  'MChJ ochish',
  '',
  '21-ASR markazi orqali MChJ ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida MChJ ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '1 ish kuni',
  1,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'yatt-ochish-2',
  'YaTT ochish',
  '',
  '21-ASR markazi orqali YaTT ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida YaTT ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 ish kuni',
  2,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'oilaviy-korxona-ochish-3',
  'Oilaviy korxona ochish',
  '',
  '21-ASR markazi orqali Oilaviy korxona ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Oilaviy korxona ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 ish kuni',
  3,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'fermer-xojaligi-royxatdan-otkazish-4',
  'Fermer xo‘jaligi ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Fermer xo‘jaligi ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Fermer xo‘jaligi ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  450000,
  '2-3 ish kuni',
  4,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'korxonani-qayta-royxatdan-otkazish-5',
  'Korxonani qayta ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Korxonani qayta ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxonani qayta ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 ish kuni',
  5,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'korxona-nomini-ozgartirish-6',
  'Korxona nomini o‘zgartirish',
  '',
  '21-ASR markazi orqali Korxona nomini o‘zgartirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxona nomini o‘zgartirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 ish kuni',
  6,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'direktorni-almashtirish-7',
  'Direktorni almashtirish',
  '',
  '21-ASR markazi orqali Direktorni almashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Direktorni almashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 ish kuni',
  7,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'ta-sischini-almashtirish-8',
  'Ta’sischini almashtirish',
  '',
  '21-ASR markazi orqali Ta’sischini almashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’sischini almashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '1-2 ish kuni',
  8,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'ta-sischi-qoshish-9',
  'Ta’sischi qo‘shish',
  '',
  '21-ASR markazi orqali Ta’sischi qo‘shish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’sischi qo‘shish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 ish kuni',
  9,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'ta-sischini-chiqarish-10',
  'Ta’sischini chiqarish',
  '',
  '21-ASR markazi orqali Ta’sischini chiqarish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’sischini chiqarish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 ish kuni',
  10,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'ustav-fondini-oshirish-11',
  'Ustav fondini oshirish',
  '',
  '21-ASR markazi orqali Ustav fondini oshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ustav fondini oshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 ish kuni',
  11,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'ustav-fondini-kamaytirish-12',
  'Ustav fondini kamaytirish',
  '',
  '21-ASR markazi orqali Ustav fondini kamaytirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ustav fondini kamaytirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 ish kuni',
  12,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'yuridik-manzil-ozgartirish-13',
  'Yuridik manzil o‘zgartirish',
  '',
  '21-ASR markazi orqali Yuridik manzil o‘zgartirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yuridik manzil o‘zgartirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 ish kuni',
  13,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'faoliyat-turini-qoshish-14',
  'Faoliyat turini qo‘shish',
  '',
  '21-ASR markazi orqali Faoliyat turini qo‘shish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Faoliyat turini qo‘shish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 ish kuni',
  14,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'faoliyat-turini-ozgartirish-15',
  'Faoliyat turini o‘zgartirish',
  '',
  '21-ASR markazi orqali Faoliyat turini o‘zgartirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Faoliyat turini o‘zgartirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 ish kuni',
  15,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'filial-ochish-16',
  'Filial ochish',
  '',
  '21-ASR markazi orqali Filial ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Filial ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '2-3 ish kuni',
  16,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'vakolatxona-ochish-17',
  'Vakolatxona ochish',
  '',
  '21-ASR markazi orqali Vakolatxona ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Vakolatxona ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-5 ish kuni',
  17,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'korxonani-tugatish-18',
  'Korxonani tugatish',
  '',
  '21-ASR markazi orqali Korxonani tugatish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxonani tugatish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500000,
  '1-3 oy',
  18,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'yatt-faoliyatini-tugatish-19',
  'YaTT faoliyatini tugatish',
  '',
  '21-ASR markazi orqali YaTT faoliyatini tugatish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida YaTT faoliyatini tugatish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '3-5 ish kuni',
  19,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'biznes-ochish' LIMIT 1),
  'korxonani-qayta-tashkil-etish-20',
  'Korxonani qayta tashkil etish',
  '',
  '21-ASR markazi orqali Korxonani qayta tashkil etish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxonani qayta tashkil etish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  '5-10 ish kuni',
  20,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Soliq va hisobot xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliq-hisobotlarini-topshirish-21',
  'Soliq hisobotlarini topshirish',
  '',
  '21-ASR markazi orqali Soliq hisobotlarini topshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliq hisobotlarini topshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 ish kuni',
  21,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'qqs-hisobotini-topshirish-22',
  'QQS hisobotini topshirish',
  '',
  '21-ASR markazi orqali QQS hisobotini topshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida QQS hisobotini topshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '1-2 ish kuni',
  22,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'foyda-soligi-hisoboti-23',
  'Foyda solig‘i hisoboti',
  '',
  '21-ASR markazi orqali Foyda solig‘i hisoboti xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Foyda solig‘i hisoboti xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 ish kuni',
  23,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'aylanmadan-olinadigan-soliq-hisoboti-24',
  'Aylanmadan olinadigan soliq hisoboti',
  '',
  '21-ASR markazi orqali Aylanmadan olinadigan soliq hisoboti xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Aylanmadan olinadigan soliq hisoboti xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 ish kuni',
  24,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'jshds-hisoboti-25',
  'JShDS hisoboti',
  '',
  '21-ASR markazi orqali JShDS hisoboti xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida JShDS hisoboti xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 ish kuni',
  25,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'ijtimoiy-soliq-hisoboti-26',
  'Ijtimoiy soliq hisoboti',
  '',
  '21-ASR markazi orqali Ijtimoiy soliq hisoboti xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ijtimoiy soliq hisoboti xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 ish kuni',
  26,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'yer-soligi-hisoboti-27',
  'Yer solig‘i hisoboti',
  '',
  '21-ASR markazi orqali Yer solig‘i hisoboti xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yer solig‘i hisoboti xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 ish kuni',
  27,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'mol-mulk-soligi-hisoboti-28',
  'Mol-mulk solig‘i hisoboti',
  '',
  '21-ASR markazi orqali Mol-mulk solig‘i hisoboti xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mol-mulk solig‘i hisoboti xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 ish kuni',
  28,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'suv-soligi-hisoboti-29',
  'Suv solig‘i hisoboti',
  '',
  '21-ASR markazi orqali Suv solig‘i hisoboti xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Suv solig‘i hisoboti xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 ish kuni',
  29,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'hisobotlarni-qayta-topshirish-30',
  'Hisobotlarni qayta topshirish',
  '',
  '21-ASR markazi orqali Hisobotlarni qayta topshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Hisobotlarni qayta topshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 ish kuni',
  30,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliq-qarzdorligini-tekshirish-31',
  'Soliq qarzdorligini tekshirish',
  '',
  '21-ASR markazi orqali Soliq qarzdorligini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliq qarzdorligini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '30 daqiqa',
  31,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliq-ma-lumotnomasi-olish-32',
  'Soliq ma’lumotnomasi olish',
  '',
  '21-ASR markazi orqali Soliq ma’lumotnomasi olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliq ma’lumotnomasi olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  32,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliqdan-qarzdorlik-yoqligi-haqida-ma-lumotnoma-33',
  'Soliqdan qarzdorlik yo‘qligi haqida ma’lumotnoma',
  '',
  '21-ASR markazi orqali Soliqdan qarzdorlik yo‘qligi haqida ma’lumotnoma xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliqdan qarzdorlik yo‘qligi haqida ma’lumotnoma xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  33,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliq-tolovchi-maqomini-tekshirish-34',
  'Soliq to‘lovchi maqomini tekshirish',
  '',
  '21-ASR markazi orqali Soliq to‘lovchi maqomini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliq to‘lovchi maqomini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '30 daqiqa',
  34,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'qqs-tolovchisi-sifatida-royxatdan-otkazish-35',
  'QQS to‘lovchisi sifatida ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali QQS to‘lovchisi sifatida ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida QQS to‘lovchisi sifatida ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '2-3 ish kuni',
  35,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'qqs-guvohnomasini-olish-36',
  'QQS guvohnomasini olish',
  '',
  '21-ASR markazi orqali QQS guvohnomasini olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida QQS guvohnomasini olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '2-3 ish kuni',
  36,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'qqsdan-chiqarish-37',
  'QQSdan chiqarish',
  '',
  '21-ASR markazi orqali QQSdan chiqarish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida QQSdan chiqarish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '3-5 ish kuni',
  37,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliq-imtiyozlarini-aniqlash-38',
  'Soliq imtiyozlarini aniqlash',
  '',
  '21-ASR markazi orqali Soliq imtiyozlarini aniqlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliq imtiyozlarini aniqlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 ish kuni',
  38,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliq-hisob-kitoblarini-tekshirish-39',
  'Soliq hisob-kitoblarini tekshirish',
  '',
  '21-ASR markazi orqali Soliq hisob-kitoblarini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliq hisob-kitoblarini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 ish kuni',
  39,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'soliq-hisobot' LIMIT 1),
  'soliq-organlariga-murojaat-yuborish-40',
  'Soliq organlariga murojaat yuborish',
  '',
  '21-ASR markazi orqali Soliq organlariga murojaat yuborish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Soliq organlariga murojaat yuborish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 ish kuni',
  40,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Buxgalteriya xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'buxgalteriya-yuritish-41',
  'Buxgalteriya yuritish',
  '',
  '21-ASR markazi orqali Buxgalteriya yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Buxgalteriya yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  'Oylik xizmat',
  41,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'masofaviy-buxgalteriya-42',
  'Masofaviy buxgalteriya',
  '',
  '21-ASR markazi orqali Masofaviy buxgalteriya xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Masofaviy buxgalteriya xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  'Oylik xizmat',
  42,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'birlamchi-hujjatlarni-yuritish-43',
  'Birlamchi hujjatlarni yuritish',
  '',
  '21-ASR markazi orqali Birlamchi hujjatlarni yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Birlamchi hujjatlarni yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  'Doimiy',
  43,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'hisob-faktura-rasmiylashtirish-44',
  'Hisob-faktura rasmiylashtirish',
  '',
  '21-ASR markazi orqali Hisob-faktura rasmiylashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Hisob-faktura rasmiylashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '30 daqiqa',
  44,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'ehf-yuborish-45',
  'EHF yuborish',
  '',
  '21-ASR markazi orqali EHF yuborish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida EHF yuborish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  25000,
  '15 daqiqa',
  45,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'ehf-qabul-qilish-46',
  'EHF qabul qilish',
  '',
  '21-ASR markazi orqali EHF qabul qilish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida EHF qabul qilish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  20000,
  '15 daqiqa',
  46,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'dalolatnoma-tayyorlash-47',
  'Dalolatnoma tayyorlash',
  '',
  '21-ASR markazi orqali Dalolatnoma tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Dalolatnoma tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  47,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'ishonchnoma-rasmiylashtirish-48',
  'Ishonchnoma rasmiylashtirish',
  '',
  '21-ASR markazi orqali Ishonchnoma rasmiylashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ishonchnoma rasmiylashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '30 daqiqa',
  48,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'tolov-topshiriqnomasi-tayyorlash-49',
  'To‘lov topshiriqnomasi tayyorlash',
  '',
  '21-ASR markazi orqali To‘lov topshiriqnomasi tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida To‘lov topshiriqnomasi tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '30 daqiqa',
  49,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'bank-operatsiyalarini-yuritish-50',
  'Bank operatsiyalarini yuritish',
  '',
  '21-ASR markazi orqali Bank operatsiyalarini yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Bank operatsiyalarini yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  'Oylik',
  50,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'kassa-hujjatlarini-yuritish-51',
  'Kassa hujjatlarini yuritish',
  '',
  '21-ASR markazi orqali Kassa hujjatlarini yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa hujjatlarini yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  'Oylik',
  51,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'avans-hisobotlarini-yuritish-52',
  'Avans hisobotlarini yuritish',
  '',
  '21-ASR markazi orqali Avans hisobotlarini yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Avans hisobotlarini yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  'Oylik',
  52,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'tovar-kirim-hujjatlari-53',
  'Tovar kirim hujjatlari',
  '',
  '21-ASR markazi orqali Tovar kirim hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tovar kirim hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  53,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'tovar-chiqim-hujjatlari-54',
  'Tovar chiqim hujjatlari',
  '',
  '21-ASR markazi orqali Tovar chiqim hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tovar chiqim hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  54,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'ombor-hisobini-yuritish-55',
  'Ombor hisobini yuritish',
  '',
  '21-ASR markazi orqali Ombor hisobini yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ombor hisobini yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  'Oylik',
  55,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'ish-haqi-hisoblash-56',
  'Ish haqi hisoblash',
  '',
  '21-ASR markazi orqali Ish haqi hisoblash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ish haqi hisoblash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  'Oylik',
  56,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'ta-til-pullarini-hisoblash-57',
  'Ta’til pullarini hisoblash',
  '',
  '21-ASR markazi orqali Ta’til pullarini hisoblash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’til pullarini hisoblash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  57,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'kasallik-varaqasi-hisoblash-58',
  'Kasallik varaqasi hisoblash',
  '',
  '21-ASR markazi orqali Kasallik varaqasi hisoblash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kasallik varaqasi hisoblash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  58,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'yakuniy-moliyaviy-natijani-hisoblash-59',
  'Yakuniy moliyaviy natijani hisoblash',
  '',
  '21-ASR markazi orqali Yakuniy moliyaviy natijani hisoblash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yakuniy moliyaviy natijani hisoblash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '1-2 kun',
  59,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'buxgalteriya' LIMIT 1),
  'buxgalteriya-balansini-tayyorlash-60',
  'Buxgalteriya balansini tayyorlash',
  '',
  '21-ASR markazi orqali Buxgalteriya balansini tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Buxgalteriya balansini tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '2-3 kun',
  60,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: 1C va elektron hisob xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1c-ornatish-61',
  '1C o‘rnatish',
  '',
  '21-ASR markazi orqali 1C o‘rnatish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1C o‘rnatish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '2-3 soat',
  61,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1c-sozlash-62',
  '1C sozlash',
  '',
  '21-ASR markazi orqali 1C sozlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1C sozlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '1 kun',
  62,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1c-ma-lumotlar-bazasi-yaratish-63',
  '1C ma’lumotlar bazasi yaratish',
  '',
  '21-ASR markazi orqali 1C ma’lumotlar bazasi yaratish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1C ma’lumotlar bazasi yaratish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '1 kun',
  63,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1c-yangilash-64',
  '1C yangilash',
  '',
  '21-ASR markazi orqali 1C yangilash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1C yangilash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '2 soat',
  64,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1cda-korxona-ochish-65',
  '1Cda korxona ochish',
  '',
  '21-ASR markazi orqali 1Cda korxona ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1Cda korxona ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1 kun',
  65,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1cda-tovarlar-kiritish-66',
  '1Cda tovarlar kiritish',
  '',
  '21-ASR markazi orqali 1Cda tovarlar kiritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1Cda tovarlar kiritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1-2 kun',
  66,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1cda-kontragentlar-kiritish-67',
  '1Cda kontragentlar kiritish',
  '',
  '21-ASR markazi orqali 1Cda kontragentlar kiritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1Cda kontragentlar kiritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  67,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1cda-xodimlar-kiritish-68',
  '1Cda xodimlar kiritish',
  '',
  '21-ASR markazi orqali 1Cda xodimlar kiritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1Cda xodimlar kiritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  68,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1cda-ish-haqi-hisoblash-69',
  '1Cda ish haqi hisoblash',
  '',
  '21-ASR markazi orqali 1Cda ish haqi hisoblash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1Cda ish haqi hisoblash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 kun',
  69,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = '1c-elektron-hisob' LIMIT 1),
  '1cdan-hisobot-chiqarish-70',
  '1Cdan hisobot chiqarish',
  '',
  '21-ASR markazi orqali 1Cdan hisobot chiqarish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1Cdan hisobot chiqarish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 soat',
  70,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Elektron raqamli imzo
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-olish-71',
  'E-IMZO olish',
  '',
  '21-ASR markazi orqali E-IMZO olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '30 daqiqa',
  71,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-ornatish-72',
  'E-IMZO o‘rnatish',
  '',
  '21-ASR markazi orqali E-IMZO o‘rnatish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO o‘rnatish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '20 daqiqa',
  72,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-yangilash-73',
  'E-IMZO yangilash',
  '',
  '21-ASR markazi orqali E-IMZO yangilash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO yangilash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '30 daqiqa',
  73,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-sozlash-74',
  'E-IMZO sozlash',
  '',
  '21-ASR markazi orqali E-IMZO sozlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO sozlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '20 daqiqa',
  74,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-bilan-hujjat-imzolash-75',
  'E-IMZO bilan hujjat imzolash',
  '',
  '21-ASR markazi orqali E-IMZO bilan hujjat imzolash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO bilan hujjat imzolash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '15 daqiqa',
  75,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-parolini-tiklash-76',
  'E-IMZO parolini tiklash',
  '',
  '21-ASR markazi orqali E-IMZO parolini tiklash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO parolini tiklash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  70000,
  '30 daqiqa',
  76,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-sertifikatini-tekshirish-77',
  'E-IMZO sertifikatini tekshirish',
  '',
  '21-ASR markazi orqali E-IMZO sertifikatini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO sertifikatini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '15 daqiqa',
  77,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'e-imzo-dasturini-ornatish-78',
  'E-IMZO dasturini o‘rnatish',
  '',
  '21-ASR markazi orqali E-IMZO dasturini o‘rnatish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida E-IMZO dasturini o‘rnatish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  40000,
  '20 daqiqa',
  78,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'elektron-kalit-bilan-ishlash-79',
  'Elektron kalit bilan ishlash',
  '',
  '21-ASR markazi orqali Elektron kalit bilan ishlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Elektron kalit bilan ishlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  60000,
  '30 daqiqa',
  79,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'elektron-imzo' LIMIT 1),
  'elektron-hujjatlarni-imzolash-80',
  'Elektron hujjatlarni imzolash',
  '',
  '21-ASR markazi orqali Elektron hujjatlarni imzolash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Elektron hujjatlarni imzolash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  40000,
  '20 daqiqa',
  80,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: My.gov.uz va davlat xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'my-gov-uz-orqali-ariza-topshirish-81',
  'my.gov.uz orqali ariza topshirish',
  '',
  '21-ASR markazi orqali my.gov.uz orqali ariza topshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida my.gov.uz orqali ariza topshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '30 daqiqa',
  81,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'davlat-xizmatlariga-ariza-berish-82',
  'Davlat xizmatlariga ariza berish',
  '',
  '21-ASR markazi orqali Davlat xizmatlariga ariza berish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Davlat xizmatlariga ariza berish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  60000,
  '1 soat',
  82,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'ma-lumotnoma-olish-83',
  'Ma’lumotnoma olish',
  '',
  '21-ASR markazi orqali Ma’lumotnoma olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ma’lumotnoma olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  40000,
  '20 daqiqa',
  83,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'jshshir-ma-lumotlarini-tekshirish-84',
  'JSHSHIR ma’lumotlarini tekshirish',
  '',
  '21-ASR markazi orqali JSHSHIR ma’lumotlarini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida JSHSHIR ma’lumotlarini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '15 daqiqa',
  84,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'fhdyo-xizmatlari-boyicha-ariza-85',
  'FHDYO xizmatlari bo‘yicha ariza',
  '',
  '21-ASR markazi orqali FHDYO xizmatlari bo‘yicha ariza xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida FHDYO xizmatlari bo‘yicha ariza xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  70000,
  '1 soat',
  85,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'nikoh-boyicha-ariza-86',
  'Nikoh bo‘yicha ariza',
  '',
  '21-ASR markazi orqali Nikoh bo‘yicha ariza xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Nikoh bo‘yicha ariza xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 soat',
  86,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'tugilganlik-boyicha-xizmatlar-87',
  'Tug‘ilganlik bo‘yicha xizmatlar',
  '',
  '21-ASR markazi orqali Tug‘ilganlik bo‘yicha xizmatlar xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tug‘ilganlik bo‘yicha xizmatlar xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  70000,
  '1 soat',
  87,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'yashash-joyi-boyicha-ma-lumotnoma-88',
  'Yashash joyi bo‘yicha ma’lumotnoma',
  '',
  '21-ASR markazi orqali Yashash joyi bo‘yicha ma’lumotnoma xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yashash joyi bo‘yicha ma’lumotnoma xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  40000,
  '20 daqiqa',
  88,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'sudlanmaganlik-ma-lumotnomasi-89',
  'Sudlanmaganlik ma’lumotnomasi',
  '',
  '21-ASR markazi orqali Sudlanmaganlik ma’lumotnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sudlanmaganlik ma’lumotnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '30 daqiqa',
  89,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'davlat-xizmatlari-mygov' LIMIT 1),
  'doimiy-royxat-ma-lumotnomasi-90',
  'Doimiy ro‘yxat ma’lumotnomasi',
  '',
  '21-ASR markazi orqali Doimiy ro‘yxat ma’lumotnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Doimiy ro‘yxat ma’lumotnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  40000,
  '20 daqiqa',
  90,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Mehnat va xodimlar
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'xodimni-ishga-qabul-qilish-91',
  'Xodimni ishga qabul qilish',
  '',
  '21-ASR markazi orqali Xodimni ishga qabul qilish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Xodimni ishga qabul qilish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  60000,
  '1 soat',
  91,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'xodimni-ishdan-boshatish-92',
  'Xodimni ishdan bo‘shatish',
  '',
  '21-ASR markazi orqali Xodimni ishdan bo‘shatish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Xodimni ishdan bo‘shatish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  60000,
  '1 soat',
  92,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'mehnat-shartnomasi-tuzish-93',
  'Mehnat shartnomasi tuzish',
  '',
  '21-ASR markazi orqali Mehnat shartnomasi tuzish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mehnat shartnomasi tuzish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '2 soat',
  93,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'mehnat-shartnomasini-bekor-qilish-94',
  'Mehnat shartnomasini bekor qilish',
  '',
  '21-ASR markazi orqali Mehnat shartnomasini bekor qilish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mehnat shartnomasini bekor qilish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 soat',
  94,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'yagona-milliy-mehnat-tizimiga-kiritish-95',
  'Yagona milliy mehnat tizimiga kiritish',
  '',
  '21-ASR markazi orqali Yagona milliy mehnat tizimiga kiritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yagona milliy mehnat tizimiga kiritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  70000,
  '1 soat',
  95,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'xodim-ma-lumotlarini-ozgartirish-96',
  'Xodim ma’lumotlarini o‘zgartirish',
  '',
  '21-ASR markazi orqali Xodim ma’lumotlarini o‘zgartirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Xodim ma’lumotlarini o‘zgartirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '30 daqiqa',
  96,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'lavozim-ma-lumotlarini-kiritish-97',
  'Lavozim ma’lumotlarini kiritish',
  '',
  '21-ASR markazi orqali Lavozim ma’lumotlarini kiritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Lavozim ma’lumotlarini kiritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '30 daqiqa',
  97,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'ish-haqi-hisoblash-98',
  'Ish haqi hisoblash',
  '',
  '21-ASR markazi orqali Ish haqi hisoblash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ish haqi hisoblash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  98,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'ta-til-hisoblash-99',
  'Ta’til hisoblash',
  '',
  '21-ASR markazi orqali Ta’til hisoblash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’til hisoblash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  99,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'mehnat-va-xodimlar' LIMIT 1),
  'xodimlar-tabelini-yuritish-100',
  'Xodimlar tabelini yuritish',
  '',
  '21-ASR markazi orqali Xodimlar tabelini yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Xodimlar tabelini yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  'Oylik',
  100,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Kadrlar xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'shtat-jadvali-tayyorlash-101',
  'Shtat jadvali tayyorlash',
  '',
  '21-ASR markazi orqali Shtat jadvali tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Shtat jadvali tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  101,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'lavozim-yoriqnomasi-102',
  'Lavozim yo‘riqnomasi',
  '',
  '21-ASR markazi orqali Lavozim yo‘riqnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Lavozim yo‘riqnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  102,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'ichki-mehnat-tartibi-103',
  'Ichki mehnat tartibi',
  '',
  '21-ASR markazi orqali Ichki mehnat tartibi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ichki mehnat tartibi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '2 kun',
  103,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'mehnat-shartnomasi-namunasi-104',
  'Mehnat shartnomasi namunasi',
  '',
  '21-ASR markazi orqali Mehnat shartnomasi namunasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mehnat shartnomasi namunasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  104,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'buyruq-tayyorlash-105',
  'Buyruq tayyorlash',
  '',
  '21-ASR markazi orqali Buyruq tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Buyruq tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  105,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'ishga-qabul-qilish-buyrugi-106',
  'Ishga qabul qilish buyrug‘i',
  '',
  '21-ASR markazi orqali Ishga qabul qilish buyrug‘i xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ishga qabul qilish buyrug‘i xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  106,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'ishdan-boshatish-buyrugi-107',
  'Ishdan bo‘shatish buyrug‘i',
  '',
  '21-ASR markazi orqali Ishdan bo‘shatish buyrug‘i xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ishdan bo‘shatish buyrug‘i xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  107,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'ta-til-buyrugi-108',
  'Ta’til buyrug‘i',
  '',
  '21-ASR markazi orqali Ta’til buyrug‘i xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’til buyrug‘i xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  40000,
  '30 daqiqa',
  108,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'xodimlar-boyicha-hujjatlar-109',
  'Xodimlar bo‘yicha hujjatlar',
  '',
  '21-ASR markazi orqali Xodimlar bo‘yicha hujjatlar xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Xodimlar bo‘yicha hujjatlar xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1-2 kun',
  109,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kadrlar-xizmatlari' LIMIT 1),
  'kadrlar-hujjatlarini-tartibga-keltirish-110',
  'Kadrlar hujjatlarini tartibga keltirish',
  '',
  '21-ASR markazi orqali Kadrlar hujjatlarini tartibga keltirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kadrlar hujjatlarini tartibga keltirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '3-5 kun',
  110,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Bank va to‘lov xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'bank-hisob-raqami-ochish-111',
  'Bank hisob raqami ochish',
  '',
  '21-ASR markazi orqali Bank hisob raqami ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Bank hisob raqami ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  111,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'bank-hisob-raqamini-yopish-112',
  'Bank hisob raqamini yopish',
  '',
  '21-ASR markazi orqali Bank hisob raqamini yopish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Bank hisob raqamini yopish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1-2 kun',
  112,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'bank-mijozini-ulash-113',
  'Bank mijozini ulash',
  '',
  '21-ASR markazi orqali Bank mijozini ulash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Bank mijozini ulash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  113,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'internet-banking-sozlash-114',
  'Internet-banking sozlash',
  '',
  '21-ASR markazi orqali Internet-banking sozlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Internet-banking sozlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  114,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'tolov-topshiriqnomasi-115',
  'To‘lov topshiriqnomasi',
  '',
  '21-ASR markazi orqali To‘lov topshiriqnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida To‘lov topshiriqnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '30 daqiqa',
  115,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'bank-kochirmasini-olish-116',
  'Bank ko‘chirmasini olish',
  '',
  '21-ASR markazi orqali Bank ko‘chirmasini olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Bank ko‘chirmasini olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  40000,
  '30 daqiqa',
  116,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'bank-rekvizitlarini-tekshirish-117',
  'Bank rekvizitlarini tekshirish',
  '',
  '21-ASR markazi orqali Bank rekvizitlarini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Bank rekvizitlarini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '15 daqiqa',
  117,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'valyuta-hisob-raqami-118',
  'Valyuta hisob raqami',
  '',
  '21-ASR markazi orqali Valyuta hisob raqami xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Valyuta hisob raqami xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1-2 kun',
  118,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'plastik-karta-ochish-119',
  'Plastik karta ochish',
  '',
  '21-ASR markazi orqali Plastik karta ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Plastik karta ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 kun',
  119,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'bank-tolov' LIMIT 1),
  'korporativ-karta-xizmatlari-120',
  'Korporativ karta xizmatlari',
  '',
  '21-ASR markazi orqali Korporativ karta xizmatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korporativ karta xizmatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  120000,
  '1 kun',
  120,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Kassa xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'onlayn-kassa-royxatdan-otkazish-121',
  'Onlayn kassa ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Onlayn kassa ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Onlayn kassa ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  121,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'kassa-apparatini-royxatdan-otkazish-122',
  'Kassa apparatini ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Kassa apparatini ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa apparatini ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  122,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'kassa-apparatini-qayta-royxatdan-otkazish-123',
  'Kassa apparatini qayta ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Kassa apparatini qayta ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa apparatini qayta ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  123,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'kassa-apparatini-hisobdan-chiqarish-124',
  'Kassa apparatini hisobdan chiqarish',
  '',
  '21-ASR markazi orqali Kassa apparatini hisobdan chiqarish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa apparatini hisobdan chiqarish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  124,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'fiskal-modul-xizmatlari-125',
  'Fiskal modul xizmatlari',
  '',
  '21-ASR markazi orqali Fiskal modul xizmatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Fiskal modul xizmatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  125,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'kassa-dasturini-sozlash-126',
  'Kassa dasturini sozlash',
  '',
  '21-ASR markazi orqali Kassa dasturini sozlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa dasturini sozlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  126,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'chek-chiqarish-sozlamalari-127',
  'Chek chiqarish sozlamalari',
  '',
  '21-ASR markazi orqali Chek chiqarish sozlamalari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Chek chiqarish sozlamalari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '2 soat',
  127,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'kassa-operatorini-royxatdan-otkazish-128',
  'Kassa operatorini ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Kassa operatorini ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa operatorini ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  128,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'kassa-ma-lumotlarini-tekshirish-129',
  'Kassa ma’lumotlarini tekshirish',
  '',
  '21-ASR markazi orqali Kassa ma’lumotlarini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa ma’lumotlarini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 soat',
  129,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kassa-xizmatlari' LIMIT 1),
  'kassa-boyicha-maslahat-130',
  'Kassa bo‘yicha maslahat',
  '',
  '21-ASR markazi orqali Kassa bo‘yicha maslahat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kassa bo‘yicha maslahat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  130,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Patent va intellektual mulk
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'patent-olish-131',
  'Patent olish',
  '',
  '21-ASR markazi orqali Patent olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Patent olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500000,
  '1-3 oy',
  131,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'tovar-belgisini-royxatdan-otkazish-132',
  'Tovar belgisini ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Tovar belgisini ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tovar belgisini ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1200000,
  '1-2 oy',
  132,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'brend-nomini-royxatdan-otkazish-133',
  'Brend nomini ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Brend nomini ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Brend nomini ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  '1-2 oy',
  133,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'logotipni-royxatdan-otkazish-134',
  'Logotipni ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Logotipni ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Logotipni ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  '1-2 oy',
  134,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'tovar-belgisi-boyicha-qidiruv-135',
  'Tovar belgisi bo‘yicha qidiruv',
  '',
  '21-ASR markazi orqali Tovar belgisi bo‘yicha qidiruv xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tovar belgisi bo‘yicha qidiruv xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '2-3 kun',
  135,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'patent-hujjatlarini-tayyorlash-136',
  'Patent hujjatlarini tayyorlash',
  '',
  '21-ASR markazi orqali Patent hujjatlarini tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Patent hujjatlarini tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  '5-10 kun',
  136,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'mualliflik-huquqi-boyicha-xizmat-137',
  'Mualliflik huquqi bo‘yicha xizmat',
  '',
  '21-ASR markazi orqali Mualliflik huquqi bo‘yicha xizmat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mualliflik huquqi bo‘yicha xizmat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '5-10 kun',
  137,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'brend-himoyasi-boyicha-maslahat-138',
  'Brend himoyasi bo‘yicha maslahat',
  '',
  '21-ASR markazi orqali Brend himoyasi bo‘yicha maslahat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Brend himoyasi bo‘yicha maslahat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 soat',
  138,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'tovar-belgisi-arizasini-topshirish-139',
  'Tovar belgisi arizasini topshirish',
  '',
  '21-ASR markazi orqali Tovar belgisi arizasini topshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tovar belgisi arizasini topshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '2-3 kun',
  139,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'patent-intellektual-mulk' LIMIT 1),
  'patent-boyicha-konsultatsiya-140',
  'Patent bo‘yicha konsultatsiya',
  '',
  '21-ASR markazi orqali Patent bo‘yicha konsultatsiya xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Patent bo‘yicha konsultatsiya xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 soat',
  140,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Litsenziya va ruxsatnomalar
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'litsenziya-olish-141',
  'Litsenziya olish',
  '',
  '21-ASR markazi orqali Litsenziya olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Litsenziya olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  '5-15 kun',
  141,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'litsenziyani-yangilash-142',
  'Litsenziyani yangilash',
  '',
  '21-ASR markazi orqali Litsenziyani yangilash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Litsenziyani yangilash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-7 kun',
  142,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'litsenziyani-qayta-rasmiylashtirish-143',
  'Litsenziyani qayta rasmiylashtirish',
  '',
  '21-ASR markazi orqali Litsenziyani qayta rasmiylashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Litsenziyani qayta rasmiylashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-7 kun',
  143,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'ruxsatnoma-olish-144',
  'Ruxsatnoma olish',
  '',
  '21-ASR markazi orqali Ruxsatnoma olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ruxsatnoma olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '5-10 kun',
  144,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'sertifikat-olish-145',
  'Sertifikat olish',
  '',
  '21-ASR markazi orqali Sertifikat olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sertifikat olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-7 kun',
  145,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'muvofiqlik-sertifikati-146',
  'Muvofiqlik sertifikati',
  '',
  '21-ASR markazi orqali Muvofiqlik sertifikati xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muvofiqlik sertifikati xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  700000,
  '5-10 kun',
  146,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'sanitariya-xulosasi-147',
  'Sanitariya xulosasi',
  '',
  '21-ASR markazi orqali Sanitariya xulosasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sanitariya xulosasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '5-10 kun',
  147,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'yongin-xavfsizligi-hujjatlari-148',
  'Yong‘in xavfsizligi hujjatlari',
  '',
  '21-ASR markazi orqali Yong‘in xavfsizligi hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yong‘in xavfsizligi hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-5 kun',
  148,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'faoliyat-uchun-ruxsatnoma-149',
  'Faoliyat uchun ruxsatnoma',
  '',
  '21-ASR markazi orqali Faoliyat uchun ruxsatnoma xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Faoliyat uchun ruxsatnoma xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  450000,
  '3-7 kun',
  149,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'litsenziya-ruxsatnomalar' LIMIT 1),
  'litsenziya-boyicha-konsultatsiya-150',
  'Litsenziya bo‘yicha konsultatsiya',
  '',
  '21-ASR markazi orqali Litsenziya bo‘yicha konsultatsiya xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Litsenziya bo‘yicha konsultatsiya xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 soat',
  150,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Sertifikat va standartlashtirish
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'mahsulot-sertifikati-151',
  'Mahsulot sertifikati',
  '',
  '21-ASR markazi orqali Mahsulot sertifikati xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mahsulot sertifikati xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  '5-10 kun',
  151,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'muvofiqlik-deklaratsiyasi-152',
  'Muvofiqlik deklaratsiyasi',
  '',
  '21-ASR markazi orqali Muvofiqlik deklaratsiyasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muvofiqlik deklaratsiyasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '3-7 kun',
  152,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'sifat-sertifikati-153',
  'Sifat sertifikati',
  '',
  '21-ASR markazi orqali Sifat sertifikati xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sifat sertifikati xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  700000,
  '5-10 kun',
  153,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'sanitariya-sertifikati-154',
  'Sanitariya sertifikati',
  '',
  '21-ASR markazi orqali Sanitariya sertifikati xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sanitariya sertifikati xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '5-7 kun',
  154,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'veterinariya-hujjatlari-155',
  'Veterinariya hujjatlari',
  '',
  '21-ASR markazi orqali Veterinariya hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Veterinariya hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-5 kun',
  155,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'fitosanitariya-hujjatlari-156',
  'Fitosanitariya hujjatlari',
  '',
  '21-ASR markazi orqali Fitosanitariya hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Fitosanitariya hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-5 kun',
  156,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'gs1-boyicha-xizmat-157',
  'GS1 bo‘yicha xizmat',
  '',
  '21-ASR markazi orqali GS1 bo‘yicha xizmat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida GS1 bo‘yicha xizmat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '2-3 kun',
  157,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'shtrix-kod-olish-158',
  'Shtrix-kod olish',
  '',
  '21-ASR markazi orqali Shtrix-kod olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Shtrix-kod olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '1-2 kun',
  158,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'mahsulot-markirovkasi-159',
  'Mahsulot markirovkasi',
  '',
  '21-ASR markazi orqali Mahsulot markirovkasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mahsulot markirovkasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  450000,
  '2-4 kun',
  159,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sertifikat-standartlashtirish' LIMIT 1),
  'standartlashtirish-boyicha-maslahat-160',
  'Standartlashtirish bo‘yicha maslahat',
  '',
  '21-ASR markazi orqali Standartlashtirish bo‘yicha maslahat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Standartlashtirish bo‘yicha maslahat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 soat',
  160,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Tashqi iqtisodiy faoliyat
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'eksport-hujjatlari-161',
  'Eksport hujjatlari',
  '',
  '21-ASR markazi orqali Eksport hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Eksport hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '2-3 kun',
  161,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'import-hujjatlari-162',
  'Import hujjatlari',
  '',
  '21-ASR markazi orqali Import hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Import hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '2-3 kun',
  162,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'bojxona-hujjatlari-163',
  'Bojxona hujjatlari',
  '',
  '21-ASR markazi orqali Bojxona hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Bojxona hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '2-3 kun',
  163,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'tn-ved-kodini-aniqlash-164',
  'TN VED kodini aniqlash',
  '',
  '21-ASR markazi orqali TN VED kodini aniqlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida TN VED kodini aniqlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  164,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'mxik-kodini-aniqlash-165',
  'MXIK kodini aniqlash',
  '',
  '21-ASR markazi orqali MXIK kodini aniqlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida MXIK kodini aniqlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  165,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'eksport-shartnomasi-166',
  'Eksport shartnomasi',
  '',
  '21-ASR markazi orqali Eksport shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Eksport shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '1-2 kun',
  166,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'import-shartnomasi-167',
  'Import shartnomasi',
  '',
  '21-ASR markazi orqali Import shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Import shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '1-2 kun',
  167,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'invoys-tayyorlash-168',
  'Invoys tayyorlash',
  '',
  '21-ASR markazi orqali Invoys tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Invoys tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '2 soat',
  168,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'qadoqlash-royxati-169',
  'Qadoqlash ro‘yxati',
  '',
  '21-ASR markazi orqali Qadoqlash ro‘yxati xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Qadoqlash ro‘yxati xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '2 soat',
  169,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'tashqi-iqtisodiy-faoliyat' LIMIT 1),
  'tashqi-savdo-boyicha-maslahat-170',
  'Tashqi savdo bo‘yicha maslahat',
  '',
  '21-ASR markazi orqali Tashqi savdo bo‘yicha maslahat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tashqi savdo bo‘yicha maslahat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 soat',
  170,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Shartnoma va huquqiy hujjatlar
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'oldi-sotdi-shartnomasi-171',
  'Oldi-sotdi shartnomasi',
  '',
  '21-ASR markazi orqali Oldi-sotdi shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Oldi-sotdi shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  171,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'xizmat-korsatish-shartnomasi-172',
  'Xizmat ko‘rsatish shartnomasi',
  '',
  '21-ASR markazi orqali Xizmat ko‘rsatish shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Xizmat ko‘rsatish shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  172,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'ijara-shartnomasi-173',
  'Ijara shartnomasi',
  '',
  '21-ASR markazi orqali Ijara shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ijara shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  173,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'pudrat-shartnomasi-174',
  'Pudrat shartnomasi',
  '',
  '21-ASR markazi orqali Pudrat shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Pudrat shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  174,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'mehnat-shartnomasi-175',
  'Mehnat shartnomasi',
  '',
  '21-ASR markazi orqali Mehnat shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mehnat shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  175,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'yetkazib-berish-shartnomasi-176',
  'Yetkazib berish shartnomasi',
  '',
  '21-ASR markazi orqali Yetkazib berish shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yetkazib berish shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  176,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'hamkorlik-shartnomasi-177',
  'Hamkorlik shartnomasi',
  '',
  '21-ASR markazi orqali Hamkorlik shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Hamkorlik shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 kun',
  177,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'komissiya-shartnomasi-178',
  'Komissiya shartnomasi',
  '',
  '21-ASR markazi orqali Komissiya shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Komissiya shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  178,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'agentlik-shartnomasi-179',
  'Agentlik shartnomasi',
  '',
  '21-ASR markazi orqali Agentlik shartnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Agentlik shartnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  179,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'shartnoma-huquqiy-hujjatlar' LIMIT 1),
  'shartnomalarni-tahlil-qilish-180',
  'Shartnomalarni tahlil qilish',
  '',
  '21-ASR markazi orqali Shartnomalarni tahlil qilish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Shartnomalarni tahlil qilish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 kun',
  180,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Korxona hujjatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'ustav-tayyorlash-181',
  'Ustav tayyorlash',
  '',
  '21-ASR markazi orqali Ustav tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ustav tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 kun',
  181,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'ta-sis-hujjatlari-182',
  'Ta’sis hujjatlari',
  '',
  '21-ASR markazi orqali Ta’sis hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’sis hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '1-2 kun',
  182,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'ta-sischilar-qarori-183',
  'Ta’sischilar qarori',
  '',
  '21-ASR markazi orqali Ta’sischilar qarori xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’sischilar qarori xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  183,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'umumiy-yigilish-bayonnomasi-184',
  'Umumiy yig‘ilish bayonnomasi',
  '',
  '21-ASR markazi orqali Umumiy yig‘ilish bayonnomasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Umumiy yig‘ilish bayonnomasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  184,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'direktor-tayinlash-buyrugi-185',
  'Direktor tayinlash buyrug‘i',
  '',
  '21-ASR markazi orqali Direktor tayinlash buyrug‘i xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Direktor tayinlash buyrug‘i xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 soat',
  185,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'ta-sischi-qarori-186',
  'Ta’sischi qarori',
  '',
  '21-ASR markazi orqali Ta’sischi qarori xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ta’sischi qarori xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  186,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'ishonchnoma-187',
  'Ishonchnoma',
  '',
  '21-ASR markazi orqali Ishonchnoma xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ishonchnoma xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  187,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'dalolatnoma-188',
  'Dalolatnoma',
  '',
  '21-ASR markazi orqali Dalolatnoma xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Dalolatnoma xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  70000,
  '1 soat',
  188,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'ariza-tayyorlash-189',
  'Ariza tayyorlash',
  '',
  '21-ASR markazi orqali Ariza tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ariza tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  189,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'korxona-hujjatlari' LIMIT 1),
  'rasmiy-xat-tayyorlash-190',
  'Rasmiy xat tayyorlash',
  '',
  '21-ASR markazi orqali Rasmiy xat tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Rasmiy xat tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 soat',
  190,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Baholash xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'kvartirani-baholash-191',
  'Kvartirani baholash',
  '',
  '21-ASR markazi orqali Kvartirani baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kvartirani baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '1-2 kun',
  191,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'uy-joyni-baholash-192',
  'Uy-joyni baholash',
  '',
  '21-ASR markazi orqali Uy-joyni baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Uy-joyni baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '1-2 kun',
  192,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'noturar-joyni-baholash-193',
  'Noturar joyni baholash',
  '',
  '21-ASR markazi orqali Noturar joyni baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Noturar joyni baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  '2-3 kun',
  193,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'yer-uchastkasini-baholash-194',
  'Yer uchastkasini baholash',
  '',
  '21-ASR markazi orqali Yer uchastkasini baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yer uchastkasini baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '2-3 kun',
  194,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'avtomobilni-baholash-195',
  'Avtomobilni baholash',
  '',
  '21-ASR markazi orqali Avtomobilni baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Avtomobilni baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1 kun',
  195,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'maxsus-texnikani-baholash-196',
  'Maxsus texnikani baholash',
  '',
  '21-ASR markazi orqali Maxsus texnikani baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Maxsus texnikani baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '1-2 kun',
  196,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'uskunalarni-baholash-197',
  'Uskunalarni baholash',
  '',
  '21-ASR markazi orqali Uskunalarni baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Uskunalarni baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '2-3 kun',
  197,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'biznesni-baholash-198',
  'Biznesni baholash',
  '',
  '21-ASR markazi orqali Biznesni baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Biznesni baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  2000000,
  '5-10 kun',
  198,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'korxona-aktivlarini-baholash-199',
  'Korxona aktivlarini baholash',
  '',
  '21-ASR markazi orqali Korxona aktivlarini baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxona aktivlarini baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500000,
  '3-7 kun',
  199,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'baholash-xizmatlari' LIMIT 1),
  'mol-mulkni-baholash-200',
  'Mol-mulkni baholash',
  '',
  '21-ASR markazi orqali Mol-mulkni baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mol-mulkni baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '1-2 kun',
  200,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Ko‘chmas mulk xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'kochmas-mulk-hujjatlari-201',
  'Ko‘chmas mulk hujjatlari',
  '',
  '21-ASR markazi orqali Ko‘chmas mulk hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ko‘chmas mulk hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-3 kun',
  201,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'kadastr-hujjatlari-202',
  'Kadastr hujjatlari',
  '',
  '21-ASR markazi orqali Kadastr hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kadastr hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '2-3 kun',
  202,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'kadastr-ma-lumotlarini-tekshirish-203',
  'Kadastr ma’lumotlarini tekshirish',
  '',
  '21-ASR markazi orqali Kadastr ma’lumotlarini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kadastr ma’lumotlarini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 soat',
  203,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'kadastr-pasporti-boyicha-yordam-204',
  'Kadastr pasporti bo‘yicha yordam',
  '',
  '21-ASR markazi orqali Kadastr pasporti bo‘yicha yordam xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kadastr pasporti bo‘yicha yordam xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '3-5 kun',
  204,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'yer-hujjatlari-205',
  'Yer hujjatlari',
  '',
  '21-ASR markazi orqali Yer hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yer hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  450000,
  '3-5 kun',
  205,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'uy-joy-hujjatlari-206',
  'Uy-joy hujjatlari',
  '',
  '21-ASR markazi orqali Uy-joy hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Uy-joy hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '2-3 kun',
  206,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'noturar-bino-hujjatlari-207',
  'Noturar bino hujjatlari',
  '',
  '21-ASR markazi orqali Noturar bino hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Noturar bino hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '3-5 kun',
  207,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'kochmas-mulkni-royxatdan-otkazish-208',
  'Ko‘chmas mulkni ro‘yxatdan o‘tkazish',
  '',
  '21-ASR markazi orqali Ko‘chmas mulkni ro‘yxatdan o‘tkazish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ko‘chmas mulkni ro‘yxatdan o‘tkazish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '3-5 kun',
  208,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'mulk-huquqini-rasmiylashtirish-209',
  'Mulk huquqini rasmiylashtirish',
  '',
  '21-ASR markazi orqali Mulk huquqini rasmiylashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mulk huquqini rasmiylashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  600000,
  '5-7 kun',
  209,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'kochmas-mulk' LIMIT 1),
  'kochmas-mulk-boyicha-maslahat-210',
  'Ko‘chmas mulk bo‘yicha maslahat',
  '',
  '21-ASR markazi orqali Ko‘chmas mulk bo‘yicha maslahat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ko‘chmas mulk bo‘yicha maslahat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 soat',
  210,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Rieltorlik xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'uy-sotish-211',
  'Uy sotish',
  '',
  '21-ASR markazi orqali Uy sotish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Uy sotish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  'Kelishuv asosida',
  211,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'uy-sotib-olish-212',
  'Uy sotib olish',
  '',
  '21-ASR markazi orqali Uy sotib olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Uy sotib olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  'Kelishuv asosida',
  212,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'kvartira-sotish-213',
  'Kvartira sotish',
  '',
  '21-ASR markazi orqali Kvartira sotish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kvartira sotish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  'Kelishuv asosida',
  213,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'kvartira-sotib-olish-214',
  'Kvartira sotib olish',
  '',
  '21-ASR markazi orqali Kvartira sotib olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kvartira sotib olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  'Kelishuv asosida',
  214,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'yer-sotish-215',
  'Yer sotish',
  '',
  '21-ASR markazi orqali Yer sotish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yer sotish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  'Kelishuv asosida',
  215,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'yer-sotib-olish-216',
  'Yer sotib olish',
  '',
  '21-ASR markazi orqali Yer sotib olish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Yer sotib olish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  'Kelishuv asosida',
  216,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'tijorat-binolarini-sotish-217',
  'Tijorat binolarini sotish',
  '',
  '21-ASR markazi orqali Tijorat binolarini sotish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tijorat binolarini sotish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  2000000,
  'Kelishuv asosida',
  217,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'tijorat-binolarini-ijaraga-berish-218',
  'Tijorat binolarini ijaraga berish',
  '',
  '21-ASR markazi orqali Tijorat binolarini ijaraga berish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tijorat binolarini ijaraga berish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  'Kelishuv asosida',
  218,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'ijara-obyektlarini-topish-219',
  'Ijara obyektlarini topish',
  '',
  '21-ASR markazi orqali Ijara obyektlarini topish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ijara obyektlarini topish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '1-3 kun',
  219,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'rieltorlik' LIMIT 1),
  'rieltorlik-konsultatsiyasi-220',
  'Rieltorlik konsultatsiyasi',
  '',
  '21-ASR markazi orqali Rieltorlik konsultatsiyasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Rieltorlik konsultatsiyasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 soat',
  220,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Transport xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'avtomobil-hujjatlari-boyicha-yordam-221',
  'Avtomobil hujjatlari bo‘yicha yordam',
  '',
  '21-ASR markazi orqali Avtomobil hujjatlari bo‘yicha yordam xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Avtomobil hujjatlari bo‘yicha yordam xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  221,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'avtomobilni-baholash-222',
  'Avtomobilni baholash',
  '',
  '21-ASR markazi orqali Avtomobilni baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Avtomobilni baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1 kun',
  222,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'avtomobilni-qayta-rasmiylashtirish-223',
  'Avtomobilni qayta rasmiylashtirish',
  '',
  '21-ASR markazi orqali Avtomobilni qayta rasmiylashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Avtomobilni qayta rasmiylashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  '1-2 kun',
  223,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'transport-sugurtasi-224',
  'Transport sug‘urtasi',
  '',
  '21-ASR markazi orqali Transport sug‘urtasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Transport sug‘urtasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 soat',
  224,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'osago-boyicha-xizmat-225',
  'OSAGO bo‘yicha xizmat',
  '',
  '21-ASR markazi orqali OSAGO bo‘yicha xizmat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida OSAGO bo‘yicha xizmat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '30 daqiqa',
  225,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'kasko-boyicha-xizmat-226',
  'KASKO bo‘yicha xizmat',
  '',
  '21-ASR markazi orqali KASKO bo‘yicha xizmat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida KASKO bo‘yicha xizmat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1 kun',
  226,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'avtomobil-texnik-hujjatlari-227',
  'Avtomobil texnik hujjatlari',
  '',
  '21-ASR markazi orqali Avtomobil texnik hujjatlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Avtomobil texnik hujjatlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  227,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'transport-vositasi-ma-lumotlarini-tekshirish-228',
  'Transport vositasi ma’lumotlarini tekshirish',
  '',
  '21-ASR markazi orqali Transport vositasi ma’lumotlarini tekshirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Transport vositasi ma’lumotlarini tekshirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '30 daqiqa',
  228,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'maxsus-texnikani-baholash-229',
  'Maxsus texnikani baholash',
  '',
  '21-ASR markazi orqali Maxsus texnikani baholash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Maxsus texnikani baholash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '1-2 kun',
  229,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'transport-xizmatlari' LIMIT 1),
  'transport-boyicha-konsultatsiya-230',
  'Transport bo‘yicha konsultatsiya',
  '',
  '21-ASR markazi orqali Transport bo‘yicha konsultatsiya xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Transport bo‘yicha konsultatsiya xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 soat',
  230,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Sug‘urta xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'avtomobil-sugurtasi-231',
  'Avtomobil sug‘urtasi',
  '',
  '21-ASR markazi orqali Avtomobil sug‘urtasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Avtomobil sug‘urtasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  120000,
  '30 daqiqa',
  231,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'kasko-232',
  'KASKO',
  '',
  '21-ASR markazi orqali KASKO xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida KASKO xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '1 kun',
  232,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'osago-233',
  'OSAGO',
  '',
  '21-ASR markazi orqali OSAGO xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida OSAGO xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '30 daqiqa',
  233,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'hayot-sugurtasi-234',
  'Hayot sug‘urtasi',
  '',
  '21-ASR markazi orqali Hayot sug‘urtasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Hayot sug‘urtasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  234,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'mol-mulk-sugurtasi-235',
  'Mol-mulk sug‘urtasi',
  '',
  '21-ASR markazi orqali Mol-mulk sug‘urtasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Mol-mulk sug‘urtasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1 kun',
  235,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'korxona-sugurtasi-236',
  'Korxona sug‘urtasi',
  '',
  '21-ASR markazi orqali Korxona sug‘urtasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxona sug‘urtasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '1-2 kun',
  236,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'sayohat-sugurtasi-237',
  'Sayohat sug‘urtasi',
  '',
  '21-ASR markazi orqali Sayohat sug‘urtasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sayohat sug‘urtasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 soat',
  237,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'baxtsiz-hodisalardan-sugurta-238',
  'Baxtsiz hodisalardan sug‘urta',
  '',
  '21-ASR markazi orqali Baxtsiz hodisalardan sug‘urta xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Baxtsiz hodisalardan sug‘urta xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 soat',
  238,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'sugurta-polislarini-rasmiylashtirish-239',
  'Sug‘urta polislarini rasmiylashtirish',
  '',
  '21-ASR markazi orqali Sug‘urta polislarini rasmiylashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sug‘urta polislarini rasmiylashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '30 daqiqa',
  239,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'sugurta-xizmatlari' LIMIT 1),
  'sugurta-boyicha-maslahat-240',
  'Sug‘urta bo‘yicha maslahat',
  '',
  '21-ASR markazi orqali Sug‘urta bo‘yicha maslahat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sug‘urta bo‘yicha maslahat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '1 soat',
  240,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Poligrafiya va print xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'hujjat-chop-etish-241',
  'Hujjat chop etish',
  '',
  '21-ASR markazi orqali Hujjat chop etish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Hujjat chop etish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  2000,
  '5 daqiqa',
  241,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'rangli-chop-etish-242',
  'Rangli chop etish',
  '',
  '21-ASR markazi orqali Rangli chop etish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Rangli chop etish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  5000,
  '5 daqiqa',
  242,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'qora-oq-chop-etish-243',
  'Qora-oq chop etish',
  '',
  '21-ASR markazi orqali Qora-oq chop etish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Qora-oq chop etish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500,
  '5 daqiqa',
  243,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'nusxa-kochirish-244',
  'Nusxa ko‘chirish',
  '',
  '21-ASR markazi orqali Nusxa ko‘chirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Nusxa ko‘chirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500,
  '5 daqiqa',
  244,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'skaner-qilish-245',
  'Skaner qilish',
  '',
  '21-ASR markazi orqali Skaner qilish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Skaner qilish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  3000,
  '5 daqiqa',
  245,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'laminatsiya-246',
  'Laminatsiya',
  '',
  '21-ASR markazi orqali Laminatsiya xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Laminatsiya xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  10000,
  '10 daqiqa',
  246,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'vizitka-tayyorlash-247',
  'Vizitka tayyorlash',
  '',
  '21-ASR markazi orqali Vizitka tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Vizitka tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  247,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'buklet-tayyorlash-248',
  'Buklet tayyorlash',
  '',
  '21-ASR markazi orqali Buklet tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Buklet tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  248,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'flyer-tayyorlash-249',
  'Flyer tayyorlash',
  '',
  '21-ASR markazi orqali Flyer tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Flyer tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1-2 kun',
  249,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'poligrafiya-print' LIMIT 1),
  'tashrif-qogozi-tayyorlash-250',
  'Tashrif qog‘ozi tayyorlash',
  '',
  '21-ASR markazi orqali Tashrif qog‘ozi tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Tashrif qog‘ozi tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  250,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Muhr va shtamp
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'muhr-tayyorlash-251',
  'Muhr tayyorlash',
  '',
  '21-ASR markazi orqali Muhr tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muhr tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 kun',
  251,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'shtamp-tayyorlash-252',
  'Shtamp tayyorlash',
  '',
  '21-ASR markazi orqali Shtamp tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Shtamp tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  252,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'korxona-muhri-253',
  'Korxona muhri',
  '',
  '21-ASR markazi orqali Korxona muhri xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxona muhri xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 kun',
  253,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'korxona-shtampi-254',
  'Korxona shtampi',
  '',
  '21-ASR markazi orqali Korxona shtampi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Korxona shtampi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  254,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'faksimile-tayyorlash-255',
  'Faksimile tayyorlash',
  '',
  '21-ASR markazi orqali Faksimile tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Faksimile tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  220000,
  '1 kun',
  255,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'muhr-dizayni-256',
  'Muhr dizayni',
  '',
  '21-ASR markazi orqali Muhr dizayni xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muhr dizayni xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '2 soat',
  256,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'muhrni-qayta-tayyorlash-257',
  'Muhrni qayta tayyorlash',
  '',
  '21-ASR markazi orqali Muhrni qayta tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muhrni qayta tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 kun',
  257,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'muhrni-almashtirish-258',
  'Muhrni almashtirish',
  '',
  '21-ASR markazi orqali Muhrni almashtirish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muhrni almashtirish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 kun',
  258,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'muhr-maketi-259',
  'Muhr maketi',
  '',
  '21-ASR markazi orqali Muhr maketi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muhr maketi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 soat',
  259,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'muhr-shtamp' LIMIT 1),
  'muhr-boyicha-maslahat-260',
  'Muhr bo‘yicha maslahat',
  '',
  '21-ASR markazi orqali Muhr bo‘yicha maslahat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Muhr bo‘yicha maslahat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  30000,
  '30 daqiqa',
  260,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Dizayn va reklama
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'logo-dizayni-261',
  'Logo dizayni',
  '',
  '21-ASR markazi orqali Logo dizayni xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Logo dizayni xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '2-3 kun',
  261,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'brendbook-262',
  'Brendbook',
  '',
  '21-ASR markazi orqali Brendbook xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Brendbook xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  2000000,
  '5-10 kun',
  262,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'vizitka-dizayni-263',
  'Vizitka dizayni',
  '',
  '21-ASR markazi orqali Vizitka dizayni xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Vizitka dizayni xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  263,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'banner-dizayni-264',
  'Banner dizayni',
  '',
  '21-ASR markazi orqali Banner dizayni xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Banner dizayni xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1-2 kun',
  264,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'instagram-post-dizayni-265',
  'Instagram post dizayni',
  '',
  '21-ASR markazi orqali Instagram post dizayni xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Instagram post dizayni xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  80000,
  '1 kun',
  265,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'instagram-reels-dizayni-266',
  'Instagram Reels dizayni',
  '',
  '21-ASR markazi orqali Instagram Reels dizayni xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Instagram Reels dizayni xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1-2 kun',
  266,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'telegram-reklama-dizayni-267',
  'Telegram reklama dizayni',
  '',
  '21-ASR markazi orqali Telegram reklama dizayni xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Telegram reklama dizayni xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  267,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'reklama-banneri-268',
  'Reklama banneri',
  '',
  '21-ASR markazi orqali Reklama banneri xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Reklama banneri xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  268,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'smm-dizayn-269',
  'SMM dizayn',
  '',
  '21-ASR markazi orqali SMM dizayn xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida SMM dizayn xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500000,
  'Oylik',
  269,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'dizayn-reklama' LIMIT 1),
  'reklama-maketlari-270',
  'Reklama maketlari',
  '',
  '21-ASR markazi orqali Reklama maketlari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Reklama maketlari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  270,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: SMM va raqamli marketing
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'instagram-sahifa-yuritish-271',
  'Instagram sahifa yuritish',
  '',
  '21-ASR markazi orqali Instagram sahifa yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Instagram sahifa yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  2500000,
  'Oylik',
  271,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'telegram-kanal-yuritish-272',
  'Telegram kanal yuritish',
  '',
  '21-ASR markazi orqali Telegram kanal yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Telegram kanal yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500000,
  'Oylik',
  272,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'facebook-sahifa-yuritish-273',
  'Facebook sahifa yuritish',
  '',
  '21-ASR markazi orqali Facebook sahifa yuritish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Facebook sahifa yuritish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500000,
  'Oylik',
  273,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'kontent-reja-274',
  'Kontent reja',
  '',
  '21-ASR markazi orqali Kontent reja xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kontent reja xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  500000,
  '2-3 kun',
  274,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'post-tayyorlash-275',
  'Post tayyorlash',
  '',
  '21-ASR markazi orqali Post tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Post tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  275,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'reels-tayyorlash-276',
  'Reels tayyorlash',
  '',
  '21-ASR markazi orqali Reels tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Reels tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1-2 kun',
  276,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'story-tayyorlash-277',
  'Story tayyorlash',
  '',
  '21-ASR markazi orqali Story tayyorlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Story tayyorlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '2 soat',
  277,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'reklama-matni-yozish-278',
  'Reklama matni yozish',
  '',
  '21-ASR markazi orqali Reklama matni yozish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Reklama matni yozish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 kun',
  278,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'smm-konsultatsiyasi-279',
  'SMM konsultatsiyasi',
  '',
  '21-ASR markazi orqali SMM konsultatsiyasi xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida SMM konsultatsiyasi xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 soat',
  279,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'smm-marketing' LIMIT 1),
  'target-reklama-boyicha-xizmat-280',
  'Target reklama bo‘yicha xizmat',
  '',
  '21-ASR markazi orqali Target reklama bo‘yicha xizmat xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Target reklama bo‘yicha xizmat xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1000000,
  'Oylik',
  280,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Google va onlayn xizmatlar
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'google-business-profil-ochish-281',
  'Google Business profil ochish',
  '',
  '21-ASR markazi orqali Google Business profil ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Google Business profil ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  300000,
  '1-2 kun',
  281,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'google-xaritaga-korxona-qoshish-282',
  'Google xaritaga korxona qo‘shish',
  '',
  '21-ASR markazi orqali Google xaritaga korxona qo‘shish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Google xaritaga korxona qo‘shish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  250000,
  '1 kun',
  282,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'google-business-tasdiqlash-283',
  'Google Business tasdiqlash',
  '',
  '21-ASR markazi orqali Google Business tasdiqlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Google Business tasdiqlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  '2-3 kun',
  283,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'google-maps-ma-lumotlarini-yangilash-284',
  'Google Maps ma’lumotlarini yangilash',
  '',
  '21-ASR markazi orqali Google Maps ma’lumotlarini yangilash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Google Maps ma’lumotlarini yangilash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  150000,
  '1 kun',
  284,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'telegram-bot-yaratish-285',
  'Telegram bot yaratish',
  '',
  '21-ASR markazi orqali Telegram bot yaratish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Telegram bot yaratish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  1500000,
  '3-7 kun',
  285,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'telegram-kanal-ochish-286',
  'Telegram kanal ochish',
  '',
  '21-ASR markazi orqali Telegram kanal ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Telegram kanal ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 soat',
  286,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'elektron-pochta-ochish-287',
  'Elektron pochta ochish',
  '',
  '21-ASR markazi orqali Elektron pochta ochish xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Elektron pochta ochish xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  50000,
  '30 daqiqa',
  287,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'domen-olish-boyicha-yordam-288',
  'Domen olish bo‘yicha yordam',
  '',
  '21-ASR markazi orqali Domen olish bo‘yicha yordam xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Domen olish bo‘yicha yordam xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  100000,
  '1 soat',
  288,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'sayt-yaratish-boyicha-yordam-289',
  'Sayt yaratish bo‘yicha yordam',
  '',
  '21-ASR markazi orqali Sayt yaratish bo‘yicha yordam xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Sayt yaratish bo‘yicha yordam xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  2500000,
  '5-10 kun',
  289,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'google-onlayn-xizmatlar' LIMIT 1),
  'onlayn-xizmatlarni-sozlash-290',
  'Onlayn xizmatlarni sozlash',
  '',
  '21-ASR markazi orqali Onlayn xizmatlarni sozlash xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Onlayn xizmatlarni sozlash xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  200000,
  '1 kun',
  290,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;

-- Category: Ta’lim va o‘quv xizmatlari
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'kompyuter-kurslari-291',
  'Kompyuter kurslari',
  '',
  '21-ASR markazi orqali Kompyuter kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kompyuter kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  'Oylik kurs',
  291,
  true,
  true
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'excel-kurslari-292',
  'Excel kurslari',
  '',
  '21-ASR markazi orqali Excel kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Excel kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  450000,
  'Oylik kurs',
  292,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'word-kurslari-293',
  'Word kurslari',
  '',
  '21-ASR markazi orqali Word kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Word kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  'Oylik kurs',
  293,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  '1c-kurslari-294',
  '1C kurslari',
  '',
  '21-ASR markazi orqali 1C kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida 1C kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  800000,
  'Oylik kurs',
  294,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'buxgalteriya-kurslari-295',
  'Buxgalteriya kurslari',
  '',
  '21-ASR markazi orqali Buxgalteriya kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Buxgalteriya kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  900000,
  'Oylik kurs',
  295,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'smm-kurslari-296',
  'SMM kurslari',
  '',
  '21-ASR markazi orqali SMM kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida SMM kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  700000,
  'Oylik kurs',
  296,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'grafik-dizayn-kurslari-297',
  'Grafik dizayn kurslari',
  '',
  '21-ASR markazi orqali Grafik dizayn kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Grafik dizayn kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  750000,
  'Oylik kurs',
  297,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'ingliz-tili-kurslari-298',
  'Ingliz tili kurslari',
  '',
  '21-ASR markazi orqali Ingliz tili kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Ingliz tili kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  'Oylik kurs',
  298,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'rus-tili-kurslari-299',
  'Rus tili kurslari',
  '',
  '21-ASR markazi orqali Rus tili kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Rus tili kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  400000,
  'Oylik kurs',
  299,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
INSERT INTO public.services (
  category_id,
  slug,
  name_uz,
  name_ru,
  short_description,
  description,
  price,
  duration,
  sort_order,
  is_active,
  is_popular
) VALUES (
  (SELECT id FROM public.categories WHERE slug = 'talim-oquv' LIMIT 1),
  'kompyuter-savodxonligi-kurslari-300',
  'Kompyuter savodxonligi kurslari',
  '',
  '21-ASR markazi orqali Kompyuter savodxonligi kurslari xizmatini tez va ishonchli rasmiylashtiring.',
  '21-ASR Raqamli Xizmatlar Markazida Kompyuter savodxonligi kurslari xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to''g''ri tayyorlab berishadi.',
  350000,
  'Oylik kurs',
  300,
  true,
  false
) ON CONFLICT (slug) DO UPDATE SET
  name_uz = EXCLUDED.name_uz,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  category_id = EXCLUDED.category_id,
  sort_order = EXCLUDED.sort_order,
  is_popular = EXCLUDED.is_popular;
