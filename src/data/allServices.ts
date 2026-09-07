import type { Database } from "@/integrations/supabase/types";

export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];

export const ALL_CATEGORIES_DATA: CategoryRow[] = [
  {
    id: "cat-top53",
    slug: "top-53",
    name_uz: "TOP 53 Xizmatlar",
    name_ru: "ТОП 53 Услуги",
    description_uz: "Eng o'rgatilgan va eng ko'p talab qilinadigan top 53 ta xizmatlar ro'yxati hamda malaka darajalari.",
    icon: "Flame",
    sort_order: 0,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-level3",
    slug: "3-daraja",
    name_uz: "3-Daraja Xizmatlari (Boshlang'ich)",
    name_ru: "3-Уровень (Базовый)",
    description_uz: "Boshlang'ich bosqichdagi xodimlarga biriktirilgan va 100% o'rganilishi lozim bo'lgan xizmatlar.",
    icon: "Sparkles",
    sort_order: 0.1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-level2",
    slug: "2-daraja",
    name_uz: "2-Daraja Xizmatlari (O'rta)",
    name_ru: "2-Уровень (Средний)",
    description_uz: "O'rta bosqich xodimlarga biriktirilgan xizmatlar (3-darajani 100% o'tgach o'tiladi).",
    icon: "ShieldCheck",
    sort_order: 0.2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-level1",
    slug: "1-daraja",
    name_uz: "1-Daraja Xizmatlari (Yuqori)",
    name_ru: "1-Уровень (Высший)",
    description_uz: "Yuqori malakali mutaxassislarga biriktirilgan murakkab va mas'uliyatli xizmatlar ro'yxati.",
    icon: "Award",
    sort_order: 0.3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-01",
    slug: "biznes-ochish",
    name_uz: "Korxona ochish va biznes xizmatlari",
    name_ru: "Регистрация бизнеса и предприятий",
    description_uz: "Yuridik shaxslar va YaTTlarni davlat ro'yxatidan o'tkazish, ta'sis hujjatlarini o'zgartirish va qayta tashkil etish.",
    icon: "Building2",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-02",
    slug: "soliq-hisobot",
    name_uz: "Soliq va hisobot xizmatlari",
    name_ru: "Налоги и отчетность",
    description_uz: "Barcha turdagi soliq hisobotlarini tayyorlash, topshirish, QQS hisobi va soliq maslahatlari.",
    icon: "Receipt",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-03",
    slug: "buxgalteriya",
    name_uz: "Buxgalteriya xizmatlari",
    name_ru: "Бухгалтерские услуги",
    description_uz: "To'liq va masofaviy buxgalteriya yuritish, EHF, kassa, bank va ombor hujjatlari boshqaruvi.",
    icon: "Calculator",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-04",
    slug: "1c-elektron-hisob",
    name_uz: "1C va elektron hisob xizmatlari",
    name_ru: "1C и электронный учет",
    description_uz: "1C dasturini o'rnatish, sozlash, korxona bazasini ochish va xodimlar/kontragentlarni kiritish.",
    icon: "Database",
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-05",
    slug: "elektron-imzo",
    name_uz: "Elektron raqamli imzo",
    name_ru: "ЭЦП (Электронная цифровая подпись)",
    description_uz: "E-IMZO kalitlarini olish, o'rnatish, yangilash, parolni tiklash va hujjatlarni imzolash.",
    icon: "KeyRound",
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-06",
    slug: "davlat-xizmatlari-mygov",
    name_uz: "My.gov.uz va davlat xizmatlari",
    name_ru: "Госуслуги (My.gov.uz)",
    description_uz: "Yagona interaktiv davlat xizmatlari portali orqali ariza va barcha ma'lumotnomalarni olish.",
    icon: "Landmark",
    sort_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-07",
    slug: "mehnat-va-xodimlar",
    name_uz: "Mehnat va xodimlar",
    name_ru: "Труд и сотрудники",
    description_uz: "Xodimlarni ishga qabul qilish, YANMMT (mehnat.uz) tizimiga kiritish va mehnat shartnomalari.",
    icon: "Users",
    sort_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-08",
    slug: "kadrlar-xizmatlari",
    name_uz: "Kadrlar xizmatlari",
    name_ru: "Кадровые услуги",
    description_uz: "Shtat jadvali, buyruqlar, lavozim yo'riqnomalari va kadrlar hujjatlarini tartibga keltirish.",
    icon: "UserCheck",
    sort_order: 8,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-09",
    slug: "bank-tolov",
    name_uz: "Bank va to‘lov xizmatlari",
    name_ru: "Банковские и платежные услуги",
    description_uz: "Bank hisob raqamlari ochish, internet-banking sozlash va to'lov topshiriqnomalari.",
    icon: "CreditCard",
    sort_order: 9,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-10",
    slug: "kassa-xizmatlari",
    name_uz: "Kassa xizmatlari",
    name_ru: "Кассовые услуги",
    description_uz: "Onlayn kassa apparatlarini ro'yxatdan o'tkazish, sozlash, fiskal modul va chek sozlamalari.",
    icon: "ShoppingBag",
    sort_order: 10,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-11",
    slug: "patent-intellektual-mulk",
    name_uz: "Patent va intellektual mulk",
    name_ru: "Патенты и интеллектуальная собственность",
    description_uz: "Tovar belgilarini ro'yxatdan o'tkazish, brend himoyasi, patentlar va mualliflik huquqlari.",
    icon: "Award",
    sort_order: 11,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-12",
    slug: "litsenziya-ruxsatnomalar",
    name_uz: "Litsenziya va ruxsatnomalar",
    name_ru: "Лицензии и разрешения",
    description_uz: "Faoliyat turlari bo'yicha litsenziyalar, ruxsatnomalar, sanitariya va yong'in xulosalari.",
    icon: "FileCheck",
    sort_order: 12,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-13",
    slug: "sertifikat-standartlashtirish",
    name_uz: "Sertifikat va standartlashtirish",
    name_ru: "Сертификация и стандартизация",
    description_uz: "Mahsulot sertifikatlari, shtrix-kod (GS1) olish, markirovka va muvofiqlik deklaratsiyalari.",
    icon: "ShieldCheck",
    sort_order: 13,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-14",
    slug: "tashqi-iqtisodiy-faoliyat",
    name_uz: "Tashqi iqtisodiy faoliyat",
    name_ru: "ВЭД (Внешнеэкономическая деятельность)",
    description_uz: "Eksport va import shartnomalari, bojxona hujjatlari, TN VED va MXIK kodlarini aniqlash.",
    icon: "Globe",
    sort_order: 14,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-15",
    slug: "shartnoma-huquqiy-hujjatlar",
    name_uz: "Shartnoma va huquqiy hujjatlar",
    name_ru: "Договоры и юридические документы",
    description_uz: "Oldi-sotdi, ijara, xizmat ko'rsatish, pudrat va hamkorlik shartnomalarini tuzish va tahlil qilish.",
    icon: "FileText",
    sort_order: 15,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-16",
    slug: "korxona-hujjatlari",
    name_uz: "Korxona hujjatlari",
    name_ru: "Документы предприятия",
    description_uz: "Ustav, ta'sis shartnomasi, umumiy yig'ilish bayonnomalari, qarorlar va rasmiy xatlar.",
    icon: "FolderArchive",
    sort_order: 16,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-17",
    slug: "baholash-xizmatlari",
    name_uz: "Baholash xizmatlari",
    name_ru: "Оценочные услуги",
    description_uz: "Ko'chmas mulk, avtomobil, asbob-uskunalar, biznes va korxona aktivlarini professional baholash.",
    icon: "TrendingUp",
    sort_order: 17,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-18",
    slug: "kochmas-mulk",
    name_uz: "Ko‘chmas mulk xizmatlari",
    name_ru: "Услуги недвижимости",
    description_uz: "Kadastr hujjatlari, kadastr pasporti, mulk huquqini rasmiylashtirish va ko'chmas mulk maslahatlari.",
    icon: "Home",
    sort_order: 18,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-19",
    slug: "rieltorlik",
    name_uz: "Rieltorlik xizmatlari",
    name_ru: "Риелторские услуги",
    description_uz: "Uy, kvartira, yer va tijorat binolarini sotish, sotib olish hamda ijaraga berish xizmatlari.",
    icon: "Key",
    sort_order: 19,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-20",
    slug: "transport-xizmatlari",
    name_uz: "Transport xizmatlari",
    name_ru: "Транспортные услуги",
    description_uz: "Avtomobil hujjatlari, texnik ma'lumotlarni tekshirish, qayta rasmiylashtirish va transport maslahatlari.",
    icon: "Car",
    sort_order: 20,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-21",
    slug: "sugurta-xizmatlari",
    name_uz: "Sug‘urta xizmatlari",
    name_ru: "Страховые услуги",
    description_uz: "Avtomobil (KASKO, OSAGO), mol-mulk, hayot, korxona va sayohat sug'urta polislari.",
    icon: "Shield",
    sort_order: 21,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-22",
    slug: "poligrafiya-print",
    name_uz: "Poligrafiya va print xizmatlari",
    name_ru: "Полиграфия и печать",
    description_uz: "Hujjatlarni rangli va oq-qora chop etish, nusxa ko'chirish, skaner, laminatsiya, vizitka va bukletlar.",
    icon: "Printer",
    sort_order: 22,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-23",
    slug: "muhr-shtamp",
    name_uz: "Muhr va shtamp",
    name_ru: "Печати и штампы",
    description_uz: "Korxona va YaTTlar uchun muhr, shtamp, faksimile tayyorlash va muhr dizayni xizmatlari.",
    icon: "Stamp",
    sort_order: 23,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-24",
    slug: "dizayn-reklama",
    name_uz: "Dizayn va reklama",
    name_ru: "Дизайн и реклама",
    description_uz: "Logotip, brendbuk, vizitka, banner dizayni, Instagram postlar va reklama maketlari.",
    icon: "Palette",
    sort_order: 24,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-25",
    slug: "smm-marketing",
    name_uz: "SMM va raqamli marketing",
    name_ru: "SMM и цифровой маркетинг",
    description_uz: "Instagram, Telegram, Facebook sahifalarini professional yuritish, kontent reja va target reklama.",
    icon: "Share2",
    sort_order: 25,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "cat-26",
    slug: "google-onlayn-xizmatlar",
    name_uz: "Google va onlayn xizmatlar",
    name_ru: "Google и онлайн услуги",
    description_uz: "Google Business profil, Google xaritaga qo'shish, Telegram bot, domen va sayt yaratish xizmatlari.",
    icon: "Search",
    sort_order: 26,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const RAW_SERVICES = [
  // 1. Biznes
  { id: 1, cat: "cat-01", name: "MChJ ochish", price: 350000, duration: "1 ish kuni" },
  { id: 2, cat: "cat-01", name: "YaTT ochish", price: 150000, duration: "1 ish kuni" },
  { id: 3, cat: "cat-01", name: "Oilaviy korxona ochish", price: 300000, duration: "1-2 ish kuni" },
  { id: 4, cat: "cat-01", name: "Fermer xo‘jaligi ro‘yxatdan o‘tkazish", price: 450000, duration: "2-3 ish kuni" },
  { id: 5, cat: "cat-01", name: "Korxonani qayta ro‘yxatdan o‘tkazish", price: 300000, duration: "1-2 ish kuni" },
  { id: 6, cat: "cat-01", name: "Korxona nomini o‘zgartirish", price: 250000, duration: "1 ish kuni" },
  { id: 7, cat: "cat-01", name: "Direktorni almashtirish", price: 200000, duration: "1 ish kuni" },
  { id: 8, cat: "cat-01", name: "Ta’sischini almashtirish", price: 350000, duration: "1-2 ish kuni" },
  { id: 9, cat: "cat-01", name: "Ta’sischi qo‘shish", price: 300000, duration: "1-2 ish kuni" },
  { id: 10, cat: "cat-01", name: "Ta’sischini chiqarish", price: 300000, duration: "1-2 ish kuni" },
  { id: 11, cat: "cat-01", name: "Ustav fondini oshirish", price: 250000, duration: "1 ish kuni" },
  { id: 12, cat: "cat-01", name: "Ustav fondini kamaytirish", price: 250000, duration: "1-2 ish kuni" },
  { id: 13, cat: "cat-01", name: "Yuridik manzil o‘zgartirish", price: 200000, duration: "1 ish kuni" },
  { id: 14, cat: "cat-01", name: "Faoliyat turini qo‘shish", price: 150000, duration: "1 ish kuni" },
  { id: 15, cat: "cat-01", name: "Faoliyat turini o‘zgartirish", price: 150000, duration: "1 ish kuni" },
  { id: 16, cat: "cat-01", name: "Filial ochish", price: 400000, duration: "2-3 ish kuni" },
  { id: 17, cat: "cat-01", name: "Vakolatxona ochish", price: 500000, duration: "3-5 ish kuni" },
  { id: 18, cat: "cat-01", name: "Korxonani tugatish", price: 1500000, duration: "1-3 oy" },
  { id: 19, cat: "cat-01", name: "YaTT faoliyatini tugatish", price: 300000, duration: "3-5 ish kuni" },
  { id: 20, cat: "cat-01", name: "Korxonani qayta tashkil etish", price: 800000, duration: "5-10 ish kuni" },

  // 2. Soliq
  { id: 21, cat: "cat-02", name: "Soliq hisobotlarini topshirish", price: 200000, duration: "1 ish kuni" },
  { id: 22, cat: "cat-02", name: "QQS hisobotini topshirish", price: 350000, duration: "1-2 ish kuni" },
  { id: 23, cat: "cat-02", name: "Foyda solig‘i hisoboti", price: 300000, duration: "1-2 ish kuni" },
  { id: 24, cat: "cat-02", name: "Aylanmadan olinadigan soliq hisoboti", price: 200000, duration: "1 ish kuni" },
  { id: 25, cat: "cat-02", name: "JShDS hisoboti", price: 150000, duration: "1 ish kuni" },
  { id: 26, cat: "cat-02", name: "Ijtimoiy soliq hisoboti", price: 150000, duration: "1 ish kuni" },
  { id: 27, cat: "cat-02", name: "Yer solig‘i hisoboti", price: 200000, duration: "1 ish kuni" },
  { id: 28, cat: "cat-02", name: "Mol-mulk solig‘i hisoboti", price: 200000, duration: "1 ish kuni" },
  { id: 29, cat: "cat-02", name: "Suv solig‘i hisoboti", price: 150000, duration: "1 ish kuni" },
  { id: 30, cat: "cat-02", name: "Hisobotlarni qayta topshirish", price: 250000, duration: "1-2 ish kuni" },
  { id: 31, cat: "cat-02", name: "Soliq qarzdorligini tekshirish", price: 50000, duration: "30 daqiqa" },
  { id: 32, cat: "cat-02", name: "Soliq ma’lumotnomasi olish", price: 50000, duration: "1 soat" },
  { id: 33, cat: "cat-02", name: "Soliqdan qarzdorlik yo‘qligi haqida ma’lumotnoma", price: 50000, duration: "1 soat" },
  { id: 34, cat: "cat-02", name: "Soliq to‘lovchi maqomini tekshirish", price: 50000, duration: "30 daqiqa" },
  { id: 35, cat: "cat-02", name: "QQS to‘lovchisi sifatida ro‘yxatdan o‘tkazish", price: 400000, duration: "2-3 ish kuni" },
  { id: 36, cat: "cat-02", name: "QQS guvohnomasini olish", price: 300000, duration: "2-3 ish kuni" },
  { id: 37, cat: "cat-02", name: "QQSdan chiqarish", price: 350000, duration: "3-5 ish kuni" },
  { id: 38, cat: "cat-02", name: "Soliq imtiyozlarini aniqlash", price: 200000, duration: "1 ish kuni" },
  { id: 39, cat: "cat-02", name: "Soliq hisob-kitoblarini tekshirish", price: 250000, duration: "1-2 ish kuni" },
  { id: 40, cat: "cat-02", name: "Soliq organlariga murojaat yuborish", price: 100000, duration: "1 ish kuni" },

  // 3. Buxgalteriya
  { id: 41, cat: "cat-03", name: "Buxgalteriya yuritish", price: 1000000, duration: "Oylik xizmat" },
  { id: 42, cat: "cat-03", name: "Masofaviy buxgalteriya", price: 800000, duration: "Oylik xizmat" },
  { id: 43, cat: "cat-03", name: "Birlamchi hujjatlarni yuritish", price: 400000, duration: "Doimiy" },
  { id: 44, cat: "cat-03", name: "Hisob-faktura rasmiylashtirish", price: 30000, duration: "30 daqiqa" },
  { id: 45, cat: "cat-03", name: "EHF yuborish", price: 25000, duration: "15 daqiqa" },
  { id: 46, cat: "cat-03", name: "EHF qabul qilish", price: 20000, duration: "15 daqiqa" },
  { id: 47, cat: "cat-03", name: "Dalolatnoma tayyorlash", price: 50000, duration: "1 soat" },
  { id: 48, cat: "cat-03", name: "Ishonchnoma rasmiylashtirish", price: 30000, duration: "30 daqiqa" },
  { id: 49, cat: "cat-03", name: "To‘lov topshiriqnomasi tayyorlash", price: 30000, duration: "30 daqiqa" },
  { id: 50, cat: "cat-03", name: "Bank operatsiyalarini yuritish", price: 300000, duration: "Oylik" },
  { id: 51, cat: "cat-03", name: "Kassa hujjatlarini yuritish", price: 250000, duration: "Oylik" },
  { id: 52, cat: "cat-03", name: "Avans hisobotlarini yuritish", price: 200000, duration: "Oylik" },
  { id: 53, cat: "cat-03", name: "Tovar kirim hujjatlari", price: 150000, duration: "1 kun" },
  { id: 54, cat: "cat-03", name: "Tovar chiqim hujjatlari", price: 150000, duration: "1 kun" },
  { id: 55, cat: "cat-03", name: "Ombor hisobini yuritish", price: 500000, duration: "Oylik" },
  { id: 56, cat: "cat-03", name: "Ish haqi hisoblash", price: 200000, duration: "Oylik" },
  { id: 57, cat: "cat-03", name: "Ta’til pullarini hisoblash", price: 50000, duration: "1 soat" },
  { id: 58, cat: "cat-03", name: "Kasallik varaqasi hisoblash", price: 50000, duration: "1 soat" },
  { id: 59, cat: "cat-03", name: "Yakuniy moliyaviy natijani hisoblash", price: 400000, duration: "1-2 kun" },
  { id: 60, cat: "cat-03", name: "Buxgalteriya balansini tayyorlash", price: 600000, duration: "2-3 kun" },

  // 4. 1C
  { id: 61, cat: "cat-04", name: "1C o‘rnatish", price: 300000, duration: "2-3 soat" },
  { id: 62, cat: "cat-04", name: "1C sozlash", price: 400000, duration: "1 kun" },
  { id: 63, cat: "cat-04", name: "1C ma’lumotlar bazasi yaratish", price: 350000, duration: "1 kun" },
  { id: 64, cat: "cat-04", name: "1C yangilash", price: 250000, duration: "2 soat" },
  { id: 65, cat: "cat-04", name: "1Cda korxona ochish", price: 300000, duration: "1 kun" },
  { id: 66, cat: "cat-04", name: "1Cda tovarlar kiritish", price: 200000, duration: "1-2 kun" },
  { id: 67, cat: "cat-04", name: "1Cda kontragentlar kiritish", price: 150000, duration: "1 kun" },
  { id: 68, cat: "cat-04", name: "1Cda xodimlar kiritish", price: 150000, duration: "1 kun" },
  { id: 69, cat: "cat-04", name: "1Cda ish haqi hisoblash", price: 250000, duration: "1 kun" },
  { id: 70, cat: "cat-04", name: "1Cdan hisobot chiqarish", price: 150000, duration: "1 soat" },

  // 5. E-IMZO
  { id: 71, cat: "cat-05", name: "E-IMZO olish", price: 100000, duration: "30 daqiqa" },
  { id: 72, cat: "cat-05", name: "E-IMZO o‘rnatish", price: 50000, duration: "20 daqiqa" },
  { id: 73, cat: "cat-05", name: "E-IMZO yangilash", price: 80000, duration: "30 daqiqa" },
  { id: 74, cat: "cat-05", name: "E-IMZO sozlash", price: 50000, duration: "20 daqiqa" },
  { id: 75, cat: "cat-05", name: "E-IMZO bilan hujjat imzolash", price: 30000, duration: "15 daqiqa" },
  { id: 76, cat: "cat-05", name: "E-IMZO parolini tiklash", price: 70000, duration: "30 daqiqa" },
  { id: 77, cat: "cat-05", name: "E-IMZO sertifikatini tekshirish", price: 30000, duration: "15 daqiqa" },
  { id: 78, cat: "cat-05", name: "E-IMZO dasturini o‘rnatish", price: 40000, duration: "20 daqiqa" },
  { id: 79, cat: "cat-05", name: "Elektron kalit bilan ishlash", price: 60000, duration: "30 daqiqa" },
  { id: 80, cat: "cat-05", name: "Elektron hujjatlarni imzolash", price: 40000, duration: "20 daqiqa" },

  // 6. My.gov.uz
  { id: 81, cat: "cat-06", name: "my.gov.uz orqali ariza topshirish", price: 50000, duration: "30 daqiqa" },
  { id: 82, cat: "cat-06", name: "Davlat xizmatlariga ariza berish", price: 60000, duration: "1 soat" },
  { id: 83, cat: "cat-06", name: "Ma’lumotnoma olish", price: 40000, duration: "20 daqiqa" },
  { id: 84, cat: "cat-06", name: "JSHSHIR ma’lumotlarini tekshirish", price: 30000, duration: "15 daqiqa" },
  { id: 85, cat: "cat-06", name: "FHDYO xizmatlari bo‘yicha ariza", price: 70000, duration: "1 soat" },
  { id: 86, cat: "cat-06", name: "Nikoh bo‘yicha ariza", price: 80000, duration: "1 soat" },
  { id: 87, cat: "cat-06", name: "Tug‘ilganlik bo‘yicha xizmatlar", price: 70000, duration: "1 soat" },
  { id: 88, cat: "cat-06", name: "Yashash joyi bo‘yicha ma’lumotnoma", price: 40000, duration: "20 daqiqa" },
  { id: 89, cat: "cat-06", name: "Sudlanmaganlik ma’lumotnomasi", price: 50000, duration: "30 daqiqa" },
  { id: 90, cat: "cat-06", name: "Doimiy ro‘yxat ma’lumotnomasi", price: 40000, duration: "20 daqiqa" },

  // 7. Mehnat
  { id: 91, cat: "cat-07", name: "Xodimni ishga qabul qilish", price: 60000, duration: "1 soat" },
  { id: 92, cat: "cat-07", name: "Xodimni ishdan bo‘shatish", price: 60000, duration: "1 soat" },
  { id: 93, cat: "cat-07", name: "Mehnat shartnomasi tuzish", price: 100000, duration: "2 soat" },
  { id: 94, cat: "cat-07", name: "Mehnat shartnomasini bekor qilish", price: 80000, duration: "1 soat" },
  { id: 95, cat: "cat-07", name: "Yagona milliy mehnat tizimiga kiritish", price: 70000, duration: "1 soat" },
  { id: 96, cat: "cat-07", name: "Xodim ma’lumotlarini o‘zgartirish", price: 50000, duration: "30 daqiqa" },
  { id: 97, cat: "cat-07", name: "Lavozim ma’lumotlarini kiritish", price: 50000, duration: "30 daqiqa" },
  { id: 98, cat: "cat-07", name: "Ish haqi hisoblash", price: 150000, duration: "1 kun" },
  { id: 99, cat: "cat-07", name: "Ta’til hisoblash", price: 50000, duration: "1 soat" },
  { id: 100, cat: "cat-07", name: "Xodimlar tabelini yuritish", price: 200000, duration: "Oylik" },

  // 8. Kadrlar
  { id: 101, cat: "cat-08", name: "Shtat jadvali tayyorlash", price: 250000, duration: "1-2 kun" },
  { id: 102, cat: "cat-08", name: "Lavozim yo‘riqnomasi", price: 150000, duration: "1 kun" },
  { id: 103, cat: "cat-08", name: "Ichki mehnat tartibi", price: 300000, duration: "2 kun" },
  { id: 104, cat: "cat-08", name: "Mehnat shartnomasi namunasi", price: 100000, duration: "1 kun" },
  { id: 105, cat: "cat-08", name: "Buyruq tayyorlash", price: 50000, duration: "1 soat" },
  { id: 106, cat: "cat-08", name: "Ishga qabul qilish buyrug‘i", price: 50000, duration: "1 soat" },
  { id: 107, cat: "cat-08", name: "Ishdan bo‘shatish buyrug‘i", price: 50000, duration: "1 soat" },
  { id: 108, cat: "cat-08", name: "Ta’til buyrug‘i", price: 40000, duration: "30 daqiqa" },
  { id: 109, cat: "cat-08", name: "Xodimlar bo‘yicha hujjatlar", price: 200000, duration: "1-2 kun" },
  { id: 110, cat: "cat-08", name: "Kadrlar hujjatlarini tartibga keltirish", price: 600000, duration: "3-5 kun" },

  // 9. Bank
  { id: 111, cat: "cat-09", name: "Bank hisob raqami ochish", price: 150000, duration: "1 kun" },
  { id: 112, cat: "cat-09", name: "Bank hisob raqamini yopish", price: 150000, duration: "1-2 kun" },
  { id: 113, cat: "cat-09", name: "Bank mijozini ulash", price: 100000, duration: "1 kun" },
  { id: 114, cat: "cat-09", name: "Internet-banking sozlash", price: 100000, duration: "1 kun" },
  { id: 115, cat: "cat-09", name: "To‘lov topshiriqnomasi", price: 30000, duration: "30 daqiqa" },
  { id: 116, cat: "cat-09", name: "Bank ko‘chirmasini olish", price: 40000, duration: "30 daqiqa" },
  { id: 117, cat: "cat-09", name: "Bank rekvizitlarini tekshirish", price: 30000, duration: "15 daqiqa" },
  { id: 118, cat: "cat-09", name: "Valyuta hisob raqami", price: 200000, duration: "1-2 kun" },
  { id: 119, cat: "cat-09", name: "Plastik karta ochish", price: 80000, duration: "1 kun" },
  { id: 120, cat: "cat-09", name: "Korporativ karta xizmatlari", price: 120000, duration: "1 kun" },

  // 10. Kassa
  { id: 121, cat: "cat-10", name: "Onlayn kassa ro‘yxatdan o‘tkazish", price: 250000, duration: "1-2 kun" },
  { id: 122, cat: "cat-10", name: "Kassa apparatini ro‘yxatdan o‘tkazish", price: 250000, duration: "1-2 kun" },
  { id: 123, cat: "cat-10", name: "Kassa apparatini qayta ro‘yxatdan o‘tkazish", price: 200000, duration: "1 kun" },
  { id: 124, cat: "cat-10", name: "Kassa apparatini hisobdan chiqarish", price: 200000, duration: "1 kun" },
  { id: 125, cat: "cat-10", name: "Fiskal modul xizmatlari", price: 150000, duration: "1 kun" },
  { id: 126, cat: "cat-10", name: "Kassa dasturini sozlash", price: 200000, duration: "1 kun" },
  { id: 127, cat: "cat-10", name: "Chek chiqarish sozlamalari", price: 150000, duration: "2 soat" },
  { id: 128, cat: "cat-10", name: "Kassa operatorini ro‘yxatdan o‘tkazish", price: 100000, duration: "1 kun" },
  { id: 129, cat: "cat-10", name: "Kassa ma’lumotlarini tekshirish", price: 80000, duration: "1 soat" },
  { id: 130, cat: "cat-10", name: "Kassa bo‘yicha maslahat", price: 50000, duration: "1 soat" },

  // 11. Patent
  { id: 131, cat: "cat-11", name: "Patent olish", price: 1500000, duration: "1-3 oy" },
  { id: 132, cat: "cat-11", name: "Tovar belgisini ro‘yxatdan o‘tkazish", price: 1200000, duration: "1-2 oy" },
  { id: 133, cat: "cat-11", name: "Brend nomini ro‘yxatdan o‘tkazish", price: 1000000, duration: "1-2 oy" },
  { id: 134, cat: "cat-11", name: "Logotipni ro‘yxatdan o‘tkazish", price: 1000000, duration: "1-2 oy" },
  { id: 135, cat: "cat-11", name: "Tovar belgisi bo‘yicha qidiruv", price: 300000, duration: "2-3 kun" },
  { id: 136, cat: "cat-11", name: "Patent hujjatlarini tayyorlash", price: 800000, duration: "5-10 kun" },
  { id: 137, cat: "cat-11", name: "Mualliflik huquqi bo‘yicha xizmat", price: 600000, duration: "5-10 kun" },
  { id: 138, cat: "cat-11", name: "Brend himoyasi bo‘yicha maslahat", price: 200000, duration: "1 soat" },
  { id: 139, cat: "cat-11", name: "Tovar belgisi arizasini topshirish", price: 500000, duration: "2-3 kun" },
  { id: 140, cat: "cat-11", name: "Patent bo‘yicha konsultatsiya", price: 150000, duration: "1 soat" },

  // 12. Litsenziya
  { id: 141, cat: "cat-12", name: "Litsenziya olish", price: 800000, duration: "5-15 kun" },
  { id: 142, cat: "cat-12", name: "Litsenziyani yangilash", price: 500000, duration: "3-7 kun" },
  { id: 143, cat: "cat-12", name: "Litsenziyani qayta rasmiylashtirish", price: 500000, duration: "3-7 kun" },
  { id: 144, cat: "cat-12", name: "Ruxsatnoma olish", price: 600000, duration: "5-10 kun" },
  { id: 145, cat: "cat-12", name: "Sertifikat olish", price: 500000, duration: "3-7 kun" },
  { id: 146, cat: "cat-12", name: "Muvofiqlik sertifikati", price: 700000, duration: "5-10 kun" },
  { id: 147, cat: "cat-12", name: "Sanitariya xulosasi", price: 600000, duration: "5-10 kun" },
  { id: 148, cat: "cat-12", name: "Yong‘in xavfsizligi hujjatlari", price: 500000, duration: "3-5 kun" },
  { id: 149, cat: "cat-12", name: "Faoliyat uchun ruxsatnoma", price: 450000, duration: "3-7 kun" },
  { id: 150, cat: "cat-12", name: "Litsenziya bo‘yicha konsultatsiya", price: 100000, duration: "1 soat" },

  // 13. Sertifikat
  { id: 151, cat: "cat-13", name: "Mahsulot sertifikati", price: 800000, duration: "5-10 kun" },
  { id: 152, cat: "cat-13", name: "Muvofiqlik deklaratsiyasi", price: 600000, duration: "3-7 kun" },
  { id: 153, cat: "cat-13", name: "Sifat sertifikati", price: 700000, duration: "5-10 kun" },
  { id: 154, cat: "cat-13", name: "Sanitariya sertifikati", price: 600000, duration: "5-7 kun" },
  { id: 155, cat: "cat-13", name: "Veterinariya hujjatlari", price: 500000, duration: "3-5 kun" },
  { id: 156, cat: "cat-13", name: "Fitosanitariya hujjatlari", price: 500000, duration: "3-5 kun" },
  { id: 157, cat: "cat-13", name: "GS1 bo‘yicha xizmat", price: 400000, duration: "2-3 kun" },
  { id: 158, cat: "cat-13", name: "Shtrix-kod olish", price: 350000, duration: "1-2 kun" },
  { id: 159, cat: "cat-13", name: "Mahsulot markirovkasi", price: 450000, duration: "2-4 kun" },
  { id: 160, cat: "cat-13", name: "Standartlashtirish bo‘yicha maslahat", price: 150000, duration: "1 soat" },

  // 14. TIF
  { id: 161, cat: "cat-14", name: "Eksport hujjatlari", price: 600000, duration: "2-3 kun" },
  { id: 162, cat: "cat-14", name: "Import hujjatlari", price: 600000, duration: "2-3 kun" },
  { id: 163, cat: "cat-14", name: "Bojxona hujjatlari", price: 500000, duration: "2-3 kun" },
  { id: 164, cat: "cat-14", name: "TN VED kodini aniqlash", price: 150000, duration: "1 kun" },
  { id: 165, cat: "cat-14", name: "MXIK kodini aniqlash", price: 100000, duration: "1 kun" },
  { id: 166, cat: "cat-14", name: "Eksport shartnomasi", price: 400000, duration: "1-2 kun" },
  { id: 167, cat: "cat-14", name: "Import shartnomasi", price: 400000, duration: "1-2 kun" },
  { id: 168, cat: "cat-14", name: "Invoys tayyorlash", price: 150000, duration: "2 soat" },
  { id: 169, cat: "cat-14", name: "Qadoqlash ro‘yxati", price: 150000, duration: "2 soat" },
  { id: 170, cat: "cat-14", name: "Tashqi savdo bo‘yicha maslahat", price: 200000, duration: "1 soat" },

  // 15. Shartnoma
  { id: 171, cat: "cat-15", name: "Oldi-sotdi shartnomasi", price: 200000, duration: "1 kun" },
  { id: 172, cat: "cat-15", name: "Xizmat ko‘rsatish shartnomasi", price: 200000, duration: "1 kun" },
  { id: 173, cat: "cat-15", name: "Ijara shartnomasi", price: 200000, duration: "1 kun" },
  { id: 174, cat: "cat-15", name: "Pudrat shartnomasi", price: 250000, duration: "1-2 kun" },
  { id: 175, cat: "cat-15", name: "Mehnat shartnomasi", price: 150000, duration: "1 kun" },
  { id: 176, cat: "cat-15", name: "Yetkazib berish shartnomasi", price: 200000, duration: "1 kun" },
  { id: 177, cat: "cat-15", name: "Hamkorlik shartnomasi", price: 250000, duration: "1 kun" },
  { id: 178, cat: "cat-15", name: "Komissiya shartnomasi", price: 250000, duration: "1-2 kun" },
  { id: 179, cat: "cat-15", name: "Agentlik shartnomasi", price: 250000, duration: "1-2 kun" },
  { id: 180, cat: "cat-15", name: "Shartnomalarni tahlil qilish", price: 300000, duration: "1-2 kun" },

  // 16. Korxona hujjatlari
  { id: 181, cat: "cat-16", name: "Ustav tayyorlash", price: 300000, duration: "1-2 kun" },
  { id: 182, cat: "cat-16", name: "Ta’sis hujjatlari", price: 350000, duration: "1-2 kun" },
  { id: 183, cat: "cat-16", name: "Ta’sischilar qarori", price: 150000, duration: "1 kun" },
  { id: 184, cat: "cat-16", name: "Umumiy yig‘ilish bayonnomasi", price: 200000, duration: "1 kun" },
  { id: 185, cat: "cat-16", name: "Direktor tayinlash buyrug‘i", price: 80000, duration: "1 soat" },
  { id: 186, cat: "cat-16", name: "Ta’sischi qarori", price: 150000, duration: "1 kun" },
  { id: 187, cat: "cat-16", name: "Ishonchnoma", price: 50000, duration: "1 soat" },
  { id: 188, cat: "cat-16", name: "Dalolatnoma", price: 70000, duration: "1 soat" },
  { id: 189, cat: "cat-16", name: "Ariza tayyorlash", price: 50000, duration: "1 soat" },
  { id: 190, cat: "cat-16", name: "Rasmiy xat tayyorlash", price: 80000, duration: "1 soat" },

  // 17. Baholash
  { id: 191, cat: "cat-17", name: "Kvartirani baholash", price: 400000, duration: "1-2 kun" },
  { id: 192, cat: "cat-17", name: "Uy-joyni baholash", price: 500000, duration: "1-2 kun" },
  { id: 193, cat: "cat-17", name: "Noturar joyni baholash", price: 800000, duration: "2-3 kun" },
  { id: 194, cat: "cat-17", name: "Yer uchastkasini baholash", price: 600000, duration: "2-3 kun" },
  { id: 195, cat: "cat-17", name: "Avtomobilni baholash", price: 300000, duration: "1 kun" },
  { id: 196, cat: "cat-17", name: "Maxsus texnikani baholash", price: 500000, duration: "1-2 kun" },
  { id: 197, cat: "cat-17", name: "Uskunalarni baholash", price: 600000, duration: "2-3 kun" },
  { id: 198, cat: "cat-17", name: "Biznesni baholash", price: 2000000, duration: "5-10 kun" },
  { id: 199, cat: "cat-17", name: "Korxona aktivlarini baholash", price: 1500000, duration: "3-7 kun" },
  { id: 200, cat: "cat-17", name: "Mol-mulkni baholash", price: 500000, duration: "1-2 kun" },

  // 18. Ko'chmas mulk
  { id: 201, cat: "cat-18", name: "Ko‘chmas mulk hujjatlari", price: 300000, duration: "1-3 kun" },
  { id: 202, cat: "cat-18", name: "Kadastr hujjatlari", price: 350000, duration: "2-3 kun" },
  { id: 203, cat: "cat-18", name: "Kadastr ma’lumotlarini tekshirish", price: 100000, duration: "1 soat" },
  { id: 204, cat: "cat-18", name: "Kadastr pasporti bo‘yicha yordam", price: 400000, duration: "3-5 kun" },
  { id: 205, cat: "cat-18", name: "Yer hujjatlari", price: 450000, duration: "3-5 kun" },
  { id: 206, cat: "cat-18", name: "Uy-joy hujjatlari", price: 300000, duration: "2-3 kun" },
  { id: 207, cat: "cat-18", name: "Noturar bino hujjatlari", price: 600000, duration: "3-5 kun" },
  { id: 208, cat: "cat-18", name: "Ko‘chmas mulkni ro‘yxatdan o‘tkazish", price: 500000, duration: "3-5 kun" },
  { id: 209, cat: "cat-18", name: "Mulk huquqini rasmiylashtirish", price: 600000, duration: "5-7 kun" },
  { id: 210, cat: "cat-18", name: "Ko‘chmas mulk bo‘yicha maslahat", price: 100000, duration: "1 soat" },

  // 19. Rieltorlik
  { id: 211, cat: "cat-19", name: "Uy sotish", price: 1000000, duration: "Kelishuv asosida" },
  { id: 212, cat: "cat-19", name: "Uy sotib olish", price: 1000000, duration: "Kelishuv asosida" },
  { id: 213, cat: "cat-19", name: "Kvartira sotish", price: 800000, duration: "Kelishuv asosida" },
  { id: 214, cat: "cat-19", name: "Kvartira sotib olish", price: 800000, duration: "Kelishuv asosida" },
  { id: 215, cat: "cat-19", name: "Yer sotish", price: 1000000, duration: "Kelishuv asosida" },
  { id: 216, cat: "cat-19", name: "Yer sotib olish", price: 1000000, duration: "Kelishuv asosida" },
  { id: 217, cat: "cat-19", name: "Tijorat binolarini sotish", price: 2000000, duration: "Kelishuv asosida" },
  { id: 218, cat: "cat-19", name: "Tijorat binolarini ijaraga berish", price: 1000000, duration: "Kelishuv asosida" },
  { id: 219, cat: "cat-19", name: "Ijara obyektlarini topish", price: 500000, duration: "1-3 kun" },
  { id: 220, cat: "cat-19", name: "Rieltorlik konsultatsiyasi", price: 100000, duration: "1 soat" },

  // 20. Transport
  { id: 221, cat: "cat-20", name: "Avtomobil hujjatlari bo‘yicha yordam", price: 200000, duration: "1 kun" },
  { id: 222, cat: "cat-20", name: "Avtomobilni baholash", price: 300000, duration: "1 kun" },
  { id: 223, cat: "cat-20", name: "Avtomobilni qayta rasmiylashtirish", price: 400000, duration: "1-2 kun" },
  { id: 224, cat: "cat-20", name: "Transport sug‘urtasi", price: 150000, duration: "1 soat" },
  { id: 225, cat: "cat-20", name: "OSAGO bo‘yicha xizmat", price: 100000, duration: "30 daqiqa" },
  { id: 226, cat: "cat-20", name: "KASKO bo‘yicha xizmat", price: 300000, duration: "1 kun" },
  { id: 227, cat: "cat-20", name: "Avtomobil texnik hujjatlari", price: 200000, duration: "1 kun" },
  { id: 228, cat: "cat-20", name: "Transport vositasi ma’lumotlarini tekshirish", price: 80000, duration: "30 daqiqa" },
  { id: 229, cat: "cat-20", name: "Maxsus texnikani baholash", price: 500000, duration: "1-2 kun" },
  { id: 230, cat: "cat-20", name: "Transport bo‘yicha konsultatsiya", price: 80000, duration: "1 soat" },

  // 21. Sug'urta
  { id: 231, cat: "cat-21", name: "Avtomobil sug‘urtasi", price: 120000, duration: "30 daqiqa" },
  { id: 232, cat: "cat-21", name: "KASKO", price: 500000, duration: "1 kun" },
  { id: 233, cat: "cat-21", name: "OSAGO", price: 100000, duration: "30 daqiqa" },
  { id: 234, cat: "cat-21", name: "Hayot sug‘urtasi", price: 200000, duration: "1 kun" },
  { id: 235, cat: "cat-21", name: "Mol-mulk sug‘urtasi", price: 300000, duration: "1 kun" },
  { id: 236, cat: "cat-21", name: "Korxona sug‘urtasi", price: 500000, duration: "1-2 kun" },
  { id: 237, cat: "cat-21", name: "Sayohat sug‘urtasi", price: 150000, duration: "1 soat" },
  { id: 238, cat: "cat-21", name: "Baxtsiz hodisalardan sug‘urta", price: 150000, duration: "1 soat" },
  { id: 239, cat: "cat-21", name: "Sug‘urta polislarini rasmiylashtirish", price: 80000, duration: "30 daqiqa" },
  { id: 240, cat: "cat-21", name: "Sug‘urta bo‘yicha maslahat", price: 50000, duration: "1 soat" },

  // 22. Print
  { id: 241, cat: "cat-22", name: "Hujjat chop etish", price: 2000, duration: "5 daqiqa" },
  { id: 242, cat: "cat-22", name: "Rangli chop etish", price: 5000, duration: "5 daqiqa" },
  { id: 243, cat: "cat-22", name: "Qora-oq chop etish", price: 1500, duration: "5 daqiqa" },
  { id: 244, cat: "cat-22", name: "Nusxa ko‘chirish", price: 1500, duration: "5 daqiqa" },
  { id: 245, cat: "cat-22", name: "Skaner qilish", price: 3000, duration: "5 daqiqa" },
  { id: 246, cat: "cat-22", name: "Laminatsiya", price: 10000, duration: "10 daqiqa" },
  { id: 247, cat: "cat-22", name: "Vizitka tayyorlash", price: 150000, duration: "1 kun" },
  { id: 248, cat: "cat-22", name: "Buklet tayyorlash", price: 250000, duration: "1-2 kun" },
  { id: 249, cat: "cat-22", name: "Flyer tayyorlash", price: 200000, duration: "1-2 kun" },
  { id: 250, cat: "cat-22", name: "Tashrif qog‘ozi tayyorlash", price: 150000, duration: "1 kun" },

  // 23. Muhr
  { id: 251, cat: "cat-23", name: "Muhr tayyorlash", price: 250000, duration: "1 kun" },
  { id: 252, cat: "cat-23", name: "Shtamp tayyorlash", price: 200000, duration: "1 kun" },
  { id: 253, cat: "cat-23", name: "Korxona muhri", price: 250000, duration: "1 kun" },
  { id: 254, cat: "cat-23", name: "Korxona shtampi", price: 200000, duration: "1 kun" },
  { id: 255, cat: "cat-23", name: "Faksimile tayyorlash", price: 220000, duration: "1 kun" },
  { id: 256, cat: "cat-23", name: "Muhr dizayni", price: 100000, duration: "2 soat" },
  { id: 257, cat: "cat-23", name: "Muhrni qayta tayyorlash", price: 250000, duration: "1 kun" },
  { id: 258, cat: "cat-23", name: "Muhrni almashtirish", price: 250000, duration: "1 kun" },
  { id: 259, cat: "cat-23", name: "Muhr maketi", price: 80000, duration: "1 soat" },
  { id: 260, cat: "cat-23", name: "Muhr bo‘yicha maslahat", price: 30000, duration: "30 daqiqa" },

  // 24. Dizayn
  { id: 261, cat: "cat-24", name: "Logo dizayni", price: 500000, duration: "2-3 kun" },
  { id: 262, cat: "cat-24", name: "Brendbook", price: 2000000, duration: "5-10 kun" },
  { id: 263, cat: "cat-24", name: "Vizitka dizayni", price: 100000, duration: "1 kun" },
  { id: 264, cat: "cat-24", name: "Banner dizayni", price: 200000, duration: "1-2 kun" },
  { id: 265, cat: "cat-24", name: "Instagram post dizayni", price: 80000, duration: "1 kun" },
  { id: 266, cat: "cat-24", name: "Instagram Reels dizayni", price: 150000, duration: "1-2 kun" },
  { id: 267, cat: "cat-24", name: "Telegram reklama dizayni", price: 100000, duration: "1 kun" },
  { id: 268, cat: "cat-24", name: "Reklama banneri", price: 250000, duration: "1-2 kun" },
  { id: 269, cat: "cat-24", name: "SMM dizayn", price: 1500000, duration: "Oylik" },
  { id: 270, cat: "cat-24", name: "Reklama maketlari", price: 150000, duration: "1 kun" },

  // 25. SMM
  { id: 271, cat: "cat-25", name: "Instagram sahifa yuritish", price: 2500000, duration: "Oylik" },
  { id: 272, cat: "cat-25", name: "Telegram kanal yuritish", price: 1500000, duration: "Oylik" },
  { id: 273, cat: "cat-25", name: "Facebook sahifa yuritish", price: 1500000, duration: "Oylik" },
  { id: 274, cat: "cat-25", name: "Kontent reja", price: 500000, duration: "2-3 kun" },
  { id: 275, cat: "cat-25", name: "Post tayyorlash", price: 100000, duration: "1 kun" },
  { id: 276, cat: "cat-25", name: "Reels tayyorlash", price: 250000, duration: "1-2 kun" },
  { id: 277, cat: "cat-25", name: "Story tayyorlash", price: 50000, duration: "2 soat" },
  { id: 278, cat: "cat-25", name: "Reklama matni yozish", price: 100000, duration: "1 kun" },
  { id: 279, cat: "cat-25", name: "SMM konsultatsiyasi", price: 200000, duration: "1 soat" },
  { id: 280, cat: "cat-25", name: "Target reklama bo‘yicha xizmat", price: 1000000, duration: "Oylik" },

  // 26. Google
  { id: 281, cat: "cat-26", name: "Google Business profil ochish", price: 300000, duration: "1-2 kun" },
  { id: 282, cat: "cat-26", name: "Google xaritaga korxona qo‘shish", price: 250000, duration: "1 kun" },
  { id: 283, cat: "cat-26", name: "Google Business tasdiqlash", price: 350000, duration: "2-3 kun" },
  { id: 284, cat: "cat-26", name: "Google Maps ma’lumotlarini yangilash", price: 150000, duration: "1 kun" },
  { id: 285, cat: "cat-26", name: "Telegram bot yaratish", price: 1500000, duration: "3-7 kun" },
  { id: 286, cat: "cat-26", name: "Telegram kanal ochish", price: 100000, duration: "1 soat" },
  { id: 287, cat: "cat-26", name: "Elektron pochta ochish", price: 50000, duration: "30 daqiqa" },
  { id: 288, cat: "cat-26", name: "Domen olish bo‘yicha yordam", price: 100000, duration: "1 soat" },
  { id: 289, cat: "cat-26", name: "Sayt yaratish bo‘yicha yordam", price: 2500000, duration: "5-10 kun" },
  { id: 290, cat: "cat-26", name: "Onlayn xizmatlarni sozlash", price: 200000, duration: "1 kun" },
];

export interface Top53Item {
  rank: number;
  name: string;
  level: number;
  cat: string;
}

export const TOP_53_SERVICES_LIST: Top53Item[] = [
  { rank: 1, name: "My govdan ro'yxatdan o'tish  My gov login parolni tiklash", level: 3, cat: "cat-06" },
  { rank: 2, name: "STIR OLISH", level: 3, cat: "cat-02" },
  { rank: 3, name: "INPS MA'LUMOTNOMA OLISH", level: 3, cat: "cat-06" },
  { rank: 4, name: "DOIMIY YASHASH JOYIDAN MA'LUMOTNOMA OLISH", level: 3, cat: "cat-06" },
  { rank: 5, name: "AYOL DAFTARI, TEMIR DAFTAR, YOSHLAR DAFTARI VA IJTIMOIY HIMOYA REESTRIDA TURISH TO'G'RISIDA MA'LUMOTNOMA OLISH", level: 2, cat: "cat-06" },
  { rank: 6, name: "OYLIK ISH HAQQI MA'LUMOTNOMASI OLISH", level: 2, cat: "cat-02" },
  { rank: 7, name: "PENSIYA MA'LUMOTNOMASINI OLISH", level: 2, cat: "cat-06" },
  { rank: 8, name: "SUDLANMAGANLIK TO'G'RISIDA MA'LUMOTNOMA", level: 2, cat: "cat-06" },
  { rank: 9, name: "NARKALOGIYA DISPANSERIDA TURISH TURMASLIK  TO'G'RISIDA MA'LUMOTNOMA", level: 3, cat: "cat-06" },
  { rank: 10, name: "RUXIY KASALLIKLAR TO'G'RISIDA MA'LUMOTNOMA", level: 3, cat: "cat-06" },
  { rank: 11, name: "O'Z-O'ZINI BAND QILISH", level: 3, cat: "cat-01" },
  { rank: 12, name: "BOLALARNI BOG'CHAGA RO'YXATGA QO'YISH UCHUN ARIZA", level: 2, cat: "cat-06" },
  { rank: 13, name: "BOLALAR PULIGA ARIZA", level: 2, cat: "cat-06" },
  { rank: 14, name: "NOMIDA UY-JOY BOR-YO'QLIGI HAQIDA MA'LUMOTNOMA", level: 3, cat: "cat-18" },
  { rank: 15, name: "SIM KARTASIZ MY GOV MOBILE ILOVASI ORQALI MA'LUMOTMALAR OLISH", level: 3, cat: "cat-06" },
  { rank: 16, name: "IJTIMOIY HIMOYA MILLIY REESTRIGA QO'YISH UCHUN ARIZA", level: 1, cat: "cat-06" },
  { rank: 17, name: "O'QISH JOYIDAN MA'LUMOTNOMA OLISH", level: 3, cat: "cat-06" },
  { rank: 18, name: "SHAXODATNOMA DUBLIKATINI OLISH UCHUN ARIZA", level: 2, cat: "cat-06" },
  { rank: 19, name: "O'RTA MAXSUS VA OLIY TA'LIM OLGANLIK TO'G'RISIDA DIPLOM MA'LUMOTLARINI OLISH UCHUN ARIZA", level: 2, cat: "cat-06" },
  { rank: 20, name: "AVTOMABILLARNI SUG'URTA QILISH", level: 2, cat: "cat-21" },
  { rank: 21, name: "MEHNAT DAFTARCHADAN KO'CHIRMA OLISH", level: 1, cat: "cat-07" },
  { rank: 22, name: "NIKOHDA TURISH TURMASLIK TO'G'RISIDA MA'LUMOTNOMA OLISH", level: 2, cat: "cat-06" },
  { rank: 23, name: "TUG'ILGANLIK HAQIDAGI TAKRORIY GUVOHNOMA OLISH UCHUN ARIZA", level: 2, cat: "cat-06" },
  { rank: 24, name: "AVTOMABILLARNI BOSHQARISH UCHUN ONLINE ISHONCHNOMA BERISH", level: 1, cat: "cat-20" },
  { rank: 25, name: "ISH KIRISH UCHUN KERAKLI XUJJATLAR RO'YXATI", level: 2, cat: "cat-08" },
  { rank: 26, name: "YOLG'IZ ONA MA'LUMOTNOMASINI OLISH UCHUN ARIZA", level: 2, cat: "cat-06" },
  { rank: 27, name: "TAXI LITSENZIYA", level: 1, cat: "cat-12" },
  { rank: 28, name: "TANIROFKA RUXSATNOMASI OLISH UCHUN ARIZA", level: 2, cat: "cat-20" },
  { rank: 29, name: "SOVUQ SUVGA ULANISH UCHUN ARIZA YUBORISH", level: 1, cat: "cat-06" },
  { rank: 30, name: "ELEKTR ENERGIYASIGA ULANISH UCHUN ARIZA", level: 1, cat: "cat-06" },
  { rank: 31, name: "TABIIY GAZGA  ULANISH UCHUN ARIZA", level: 1, cat: "cat-06" },
  { rank: 32, name: "SHAXARLARDA UMUMIY YO'LOVCHILARNI TASHISH UCHUN TRANSPORTLARDAN BEPUL FOYDALANISH KARTOCHKASIGA ARIZA", level: 1, cat: "cat-20" },
  { rank: 33, name: "TEMIR YO'L CHIPTALARI XARID QILISH", level: 1, cat: "cat-20" },
  { rank: 34, name: "QAYTA JIXOZ UCHUN ARIZA BERISH", level: 1, cat: "cat-20" },
  { rank: 35, name: "AVTOMABILLARGA GAZ O'RNATISH UCHUN RUXSATNOMA OLISH", level: 2, cat: "cat-20" },
  { rank: 36, name: "OILA KEDITGA ARIZA BERISH", level: 2, cat: "cat-09" },
  { rank: 37, name: "TA'LIM KREDITGA ARIZA BERISH", level: 2, cat: "cat-09" },
  { rank: 38, name: "MAVZULI SO'ROVNOMA YUBORISH", level: 1, cat: "cat-06" },
  { rank: 39, name: "YAROQSIZ XOLATGA KELGAN PENSIYA DAFTARCHASINI OLISH UCHUN ARXIVGA ARIZA", level: 1, cat: "cat-06" },
  { rank: 40, name: "OYLIK ISH XAQQI VA ISH STAJINI TASDIQLASH UCHUN ARXIVGA ARIZA BERISH", level: 1, cat: "cat-07" },
  { rank: 41, name: "KO'CHMAS MULKKA BO'LGAN HUQUQNI TAHRIRLASH", level: 1, cat: "cat-18" },
  { rank: 42, name: "IPOTEKA KREDITINI OLISH UCHUN ARIZA BERISH", level: 1, cat: "cat-09" },
  { rank: 43, name: "FHDYO ORGANIGA ARIZA", level: 1, cat: "cat-06" },
  { rank: 44, name: "O'LIM RO'YXATGA OLINGANLIK TO'G'RISIDA MA'LUMOTNOMA", level: 1, cat: "cat-06" },
  { rank: 45, name: "OLIY TA'LIMGA O'QISHGA KIRISH UCHUN ARIZA BERISH", level: 2, cat: "cat-06" },
  { rank: 46, name: "TABIIY GAZGA  ULANISH UCHUN TEXNIK SHART OLISH", level: 1, cat: "cat-06" },
  { rank: 47, name: "MILLIY SERTIFIKAT OLISH UCHUN ARIZA", level: 1, cat: "cat-13" },
  { rank: 48, name: "TOIFA SERTIFIKAT OLISH UCHUN ARIZA YUBORISH(SHIFOKORLAR UCHUN )", level: 1, cat: "cat-13" },
  { rank: 49, name: "CHET TILINI BILISH DARAJASINI ANIQLASH UCHUN ARIZA", level: 2, cat: "cat-06" },
  { rank: 50, name: "TOIFA SERTIFIKAT OLISH UCHUN ARIZA YUBORISH(O'QITUVCHILAR UCHUN )", level: 1, cat: "cat-13" },
  { rank: 51, name: "ELEKTRON RAQAMLI IMZO OLISH VA MUZLATISH", level: 2, cat: "cat-05" },
  { rank: 52, name: "COVID-19 GA EMLANGANLIK TO'G'RISIDA SERTIFIKAT", level: 2, cat: "cat-06" },
  { rank: 53, name: "UZ AVTODAN SHARTNOMA OLISH", level: 1, cat: "cat-20" },
];

export const LEVEL_3_ADDITIONAL = [
  { name: "SOLIQDAN QARZI BOR YOKI YOQLIGI", cat: "cat-02" },
  { name: "KAM TAMINLANGANLIK TOGRISIDA MALUMOTNOMA", cat: "cat-06" },
  { name: "SHAXSIY JAMGARILIB BORILADIGAN PENSIYA", cat: "cat-06" },
  { name: "E-JARIMABALL", cat: "cat-20" },
  { name: "OBYEKTIVKA", cat: "cat-08" },
  { name: "REZYUME", cat: "cat-08" },
  { name: "PNG TO PDF", cat: "cat-22" },
  { name: "WORD TO PDF", cat: "cat-22" },
  { name: "FILELARNI HAR QANDAY BOSHQA FILE TURLARIGA OTKAZISH", cat: "cat-22" },
  { name: "KLYUCH SAQLASH VA U BILAN ISHLASH", cat: "cat-05" },
  { name: "JSHSHIRNI TOPA OLISH", cat: "cat-06" },
  { name: "STIR ANIQLASH", cat: "cat-02" },
  { name: "PRINTERGA PECHAT BERA OLISH", cat: "cat-22" },
  { name: "WORDDA MALUMOTLARNI TEZ YOZA OLISH", cat: "cat-22" },
  { name: "EXCELDA JADVAL BILAN ISHLAY OLISH VA UNDA HISOB KITOB QILA OLISH", cat: "cat-03" },
  { name: "KERAKLI SAYTLAR BILAN ISHLAY OLISH", cat: "cat-26" },
  { name: "ZED FILENI TUSHUNA OLISH", cat: "cat-26" },
  { name: "Elektron raqamli imzo tarixi", cat: "cat-05" },
];

export const LEVEL_2_ADDITIONAL = [
  { name: "Олий, ўрта махсус, касб-ҳунар ҳамда профессионал таълим олганлик тўғрисида давлат намунасидаги ҳужжатларнинг дубликатини олиш", cat: "cat-06" },
  { name: "Чет тили даражасини билиш тўғрисидаги сертификатни текшириш", cat: "cat-06" },
  { name: "Талабалар турар жойига жойлашиш учун ариза юбориш", cat: "cat-06" },
  { name: "Aбитуриентни онлайн рўйхатдан ўтказиш", cat: "cat-06" },
  { name: "Ижро ҳужжати бўйича қарздорликни текшириш", cat: "cat-06" },
  { name: "Паспортни ID картага алмаштириш учун ариза юбориш", cat: "cat-06" },
  { name: "Ўзбекистон Республикасидан чиқишига вақтинча чеклов қўйилганлиги ҳолатини текшириш", cat: "cat-06" },
  { name: "Мактабгача таълим ташкилоти учун амалга оширилган тўловлар тўғрисида маълумот", cat: "cat-06" },
  { name: "Оила маълумотларини таҳрирлаш учун ариза юбориш", cat: "cat-06" },
  { name: "Болаларни боғчага қабул навбатини текшириш", cat: "cat-06" },
  { name: "Санаторийга навбатни текшириш", cat: "cat-06" },
  { name: "Кексалар ва ногиронлиги бўлган шахсларга санаторийларда даволаниш учун йўлланмаlar бериш", cat: "cat-06" },
  { name: "Тўланган нафақаlar миқдори хақида маълумотнома", cat: "cat-06" },
  { name: "Dori vositalarining referent narxi va analoglari to‘g‘risida maʼlumot olish", cat: "cat-06" },
  { name: "Sport maktablari va ixtisoslashtirilgan sport maktablariga kirish uchun onlayn ariza berish", cat: "cat-06" },
  { name: "Aliment bo'yicha qarzni aniqlash", cat: "cat-06" },
  { name: "Hududdagi mahalla faollari to'g'risida ma'lumot olish", cat: "cat-06" },
  { name: "Manzil-ma’lumot axborotlari to‘g‘risida ma’lumotnoma berish", cat: "cat-06" },
  { name: "“Kredit tarixi” to‘g‘risida ma’lumotnoma berish", cat: "cat-09" },
  { name: "Kredit tarixini olishga cheklov o‘rnatish", cat: "cat-09" },
  { name: "Kredit tarixini olish bo‘yicha SMS-xabarnoma xizmatini yoqish", cat: "cat-09" },
  { name: "Ijara shartnomasini bekor qilish", cat: "cat-15" },
  { name: "Oilaviy shifokorlik punktlari, oilaviy poliklinikalar va ko‘p tarmoqli markaziy poliklinikalarda davlat tomonidan bepul beriladigan dori vositalari va tibbiyot buyumlari to‘g‘risida ma’lumot", cat: "cat-06" },
];

export const LEVEL_1_ADDITIONAL = [
  { name: "Умумтаълим фанлари ва Чет тилидан имтиҳон тўловини қайтариш учун ариза бериш", cat: "cat-06" },
  { name: "Магистратура қабули учун ариза юбориш", cat: "cat-06" },
  { name: "Педагог кадрларни аттестациядан ўтганлиги тўғрисидаги сертификатларини текшириш", cat: "cat-06" },
  { name: "Болани мактабнинг биринчи синфига жойлаштиришга ариза юбориш", cat: "cat-06" },
  { name: "Россиядан чиқишига вақтинча чеклов қўйилганлиги ҳолатини текшириш", cat: "cat-06" },
  { name: "Элчихона (консуллик) қабулига ёзилиш", cat: "cat-06" },
  { name: "Халқаро Work and Travel дастурларида иштирок этаётган талабаlarнинг харажатларини қоплаш учун ссуда ажратиshda кафиллик қилиш бўйича аризани тасдиқлаш", cat: "cat-06" },
  { name: "Автотранспорт бошқаруви учун жисмоний шахсларга тақдим қилинган электрон ишончномани бекор қилиш", cat: "cat-20" },
  { name: "Автомототранспорт ҳадя шартномаси", cat: "cat-20" },
  { name: "Ixtironi royhatdan otkazish", cat: "cat-11" },
  { name: "Franshizani royhatdan otkazish", cat: "cat-11" },
  { name: "Oilaviy mehmon uylari, xostellar, o'tovli va chodirli oromgohlar tashkil etish uchun ariza", cat: "cat-01" },
  { name: "Gid-tarjimon, ekskursiya yetakchisi va yo‘riqchi-yo‘l boshlovchilarga malaka sertifikatini berish", cat: "cat-13" },
  { name: "O‘zbekiston futbol assotsiatsiyasi futbol akademiyalariga nomzodlarni qabul qilish uchun ariza yuborish", cat: "cat-06" },
  { name: "“E-AUKSION” elektron savdo platformasida g‘oliblik uchun rasmiylashtirilgan bayonnomani olish", cat: "cat-01" },
  { name: "Kadastrning barcha turlari", cat: "cat-18" },
  { name: "Avtotransport sug‘urtasi amal qilinishini tekshirish", cat: "cat-21" },
  { name: "Avtotransport vositasi uchun reklama joyi pasportini rasmiylashtirish", cat: "cat-20" },
  { name: "Yo'l harakati qoidalarini buzganlik uchun jarima yuzasidan shikoyat qilish", cat: "cat-20" },
  { name: "Avtotransport vositalari haqida ma'lumot", cat: "cat-20" },
  { name: "Автотранспорт воситасини хавфли юкларни ташишга қўйиш тўғрисидаги гувоҳнома", cat: "cat-20" },
  { name: "Катта ҳажмли ва оғир вазнли юкларни автомобиль транспортида ташишга рухсатнома", cat: "cat-20" },
  { name: "Пиво маҳсулотлари билан чакана савдо қилишни бошлаганлик ёки тугатганлик ҳақида хабарнома", cat: "cat-12" },
  { name: "Тамаки маҳсулотлари билан чакана савдо қилишни бошлаганлик ёки тугатганлик ҳақида хабарнома", cat: "cat-12" },
  { name: "Onlayn kassa apparatlarini ro‘yxatdan o‘tkazish uchun ariza berish", cat: "cat-10" },
  { name: "UZTELECOM mobil aloqa tarmog‘ida SIM kartani eSIM texnologiyasiga o‘zgartirish", cat: "cat-26" },
  { name: "IMEI raqamni FaceID orqali ro‘yxatdan o‘tkazish", cat: "cat-26" },
];

function normalizeName(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9а-яўқғҳ]+/gi, "");
}

const top53Map = new Map<string, { rank: number; level: number }>();
TOP_53_SERVICES_LIST.forEach((item) => {
  top53Map.set(normalizeName(item.name), { rank: item.rank, level: item.level });
});

const levelMap = new Map<string, number>();
TOP_53_SERVICES_LIST.forEach((item) => {
  levelMap.set(normalizeName(item.name), item.level);
});
LEVEL_3_ADDITIONAL.forEach((item) => {
  const norm = normalizeName(item.name);
  if (!levelMap.has(norm)) levelMap.set(norm, 3);
});
LEVEL_2_ADDITIONAL.forEach((item) => {
  const norm = normalizeName(item.name);
  if (!levelMap.has(norm)) levelMap.set(norm, 2);
});
LEVEL_1_ADDITIONAL.forEach((item) => {
  const norm = normalizeName(item.name);
  if (!levelMap.has(norm)) levelMap.set(norm, 1);
});

function generateSlug(text: string, id: number | string) {
  const s = text
    .toLowerCase()
    .replace(/o‘|o'/g, "o")
    .replace(/g‘|g'/g, "g")
    .replace(/sh/g, "sh")
    .replace(/ch/g, "ch")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${s}-${id}`;
}

const existingAddedNorms = new Set<string>();

const baseServicesList: ServiceRow[] = RAW_SERVICES.map((s) => {
  const norm = normalizeName(s.name);
  existingAddedNorms.add(norm);
  const topInfo = top53Map.get(norm);
  const lvl = topInfo?.level ?? levelMap.get(norm) ?? null;
  const isPopular =
    !!topInfo ||
    s.id <= 10 ||
    [21, 22, 41, 44, 45, 61, 71, 81, 111, 121, 132, 171, 181, 191, 231, 241, 251, 261, 271, 281, 291].includes(
      s.id
    );

  return {
    id: `serv-${String(s.id).padStart(3, "0")}`,
    category_id: s.cat,
    slug: generateSlug(s.name, s.id),
    name_uz: s.name,
    name_ru: "",
    short_description: `21-ASR markazi orqali ${s.name} xizmatini tez va ishonchli rasmiylashtiring.`,
    description: `21-ASR Raqamli Xizmatlar Markazida ${s.name} xizmati eng yuqori sifat va tezkorlik bilan amalga oshiriladi. Mutaxassislarimiz barcha hujjatlarni qonuniy va to'g'ri tayyorlab berishadi.`,
    how_it_works: "1. Ariza yuborasiz\n2. Mutaxassis bog'lanadi\n3. Hujjatlar rasmiylashtiriladi",
    price: s.price,
    price_note: "",
    duration: s.duration,
    required_documents: ["Pasport / ID karta", "Guvohnoma (agar mavjud bo'lsa)"],
    icon: "FileText",
    image_url: null,
    is_active: true,
    is_popular: isPopular,
    level: lvl,
    top53_rank: topInfo?.rank ?? null,
    sort_order: topInfo ? topInfo.rank : s.id + 100,
    seo_title: `${s.name} — samarqand urgut | 21-ASR`,
    seo_description: `21-ASR markazi orqali ${s.name} xizmati tez va sifatli.`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
});

const extraServicesList: ServiceRow[] = [];
let extraIndex = 400;

TOP_53_SERVICES_LIST.forEach((item) => {
  const norm = normalizeName(item.name);
  if (!existingAddedNorms.has(norm)) {
    existingAddedNorms.add(norm);
    extraIndex++;
    extraServicesList.push({
      id: `serv-top-${String(item.rank).padStart(2, "0")}`,
      category_id: item.cat,
      slug: generateSlug(item.name, `top-${item.rank}`),
      name_uz: item.name,
      name_ru: "",
      short_description: `21-ASR TOP #${item.rank} xizmati: ${item.name}.`,
      description: `21-ASR markazi orqali ${item.name} xizmatini rasmiylashtiring. ${item.level}-darajali malakali hodimlarimiz tomonidan tezkor ijro etiladi.`,
      how_it_works: "1. Ariza qoldiring\n2. Boshqaruvchi tasdiqlaydi\n3. Hujjatlar tayyorlanadi",
      price: 50000,
      price_note: "Davlat boji bilan",
      duration: "30-60 daqiqa",
      required_documents: ["Pasport / ID karta", "Ariza (onlayn)"],
      icon: "Star",
      image_url: null,
      is_active: true,
      is_popular: true,
      level: item.level,
      top53_rank: item.rank,
      sort_order: item.rank,
      seo_title: `${item.name} — TOP #${item.rank} | 21-ASR`,
      seo_description: `${item.name} xizmati bo'yicha 21-ASR sifat va kafolat beradi.`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
});

const allExtraAddons = [
  ...LEVEL_3_ADDITIONAL.map((x) => ({ ...x, level: 3 })),
  ...LEVEL_2_ADDITIONAL.map((x) => ({ ...x, level: 2 })),
  ...LEVEL_1_ADDITIONAL.map((x) => ({ ...x, level: 1 })),
];

allExtraAddons.forEach((item) => {
  const norm = normalizeName(item.name);
  if (!existingAddedNorms.has(norm)) {
    existingAddedNorms.add(norm);
    extraIndex++;
    extraServicesList.push({
      id: `serv-lvl${item.level}-${extraIndex}`,
      category_id: item.cat,
      slug: generateSlug(item.name, extraIndex),
      name_uz: item.name,
      name_ru: "",
      short_description: `${item.level}-Darajali biriktirilgan xizmat: ${item.name}.`,
      description: `21-ASR markazida ${item.level}-darajali mutaxassislar tomonidan bajariluvchi ${item.name} xizmati.`,
      how_it_works: "1. Murojaat qiling\n2. Hujjat rasmiylashtiriladi",
      price: 40000,
      price_note: "",
      duration: "1 ish kuni",
      required_documents: ["Pasport / ID karta"],
      icon: "CheckCircle2",
      image_url: null,
      is_active: true,
      is_popular: false,
      level: item.level,
      top53_rank: null,
      sort_order: extraIndex,
      seo_title: `${item.name} — ${item.level}-Daraja | 21-ASR`,
      seo_description: `${item.name} xizmati 21-ASR markazida.`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
});

export const ALL_SERVICES_DATA: ServiceRow[] = [...baseServicesList, ...extraServicesList];

