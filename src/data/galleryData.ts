export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-01",
    title: "21-ASR Raqamli Xizmatlar Markazi Asosiy Binosi",
    description: "Mijozlarimiz uchun zamonaviy, qulay va keng qabul zali.",
    category: "Ofis",
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    sort_order: 1,
    is_active: true,
    created_at: "2026-01-10T10:00:00.000Z",
  },
  {
    id: "gallery-02",
    title: "Mijozlar bilan ishlash va konsultatsiya jarayoni",
    description: "Malakali mutaxassislarimiz har bir mijozga individual yondashadi.",
    category: "Xizmatlar",
    image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    sort_order: 2,
    is_active: true,
    created_at: "2026-01-11T10:00:00.000Z",
  },
  {
    id: "gallery-03",
    title: "Buxgalteriya va huquqshunoslar jamoamiz",
    description: "Soha bo'yicha 10 yillik tajribaga ega professionallar jamoasi.",
    category: "Jamoa",
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    sort_order: 3,
    is_active: true,
    created_at: "2026-01-12T10:00:00.000Z",
  },
  {
    id: "gallery-04",
    title: "Tadbirkorlar forumi va biznes uchrashuv",
    description: "Samarqand viloyati tadbirkorlari bilan o'tkazilgan ochiq muloqot tadbiri.",
    category: "Tadbirlar",
    image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    sort_order: 4,
    is_active: true,
    created_at: "2026-01-13T10:00:00.000Z",
  },
  {
    id: "gallery-05",
    title: "Zamonaviy IT va texnik ta'minot bo'limi",
    description: "Raqamli tizimlar, elektron hisobot va server infratuzilmasi.",
    category: "Ofis",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    sort_order: 5,
    is_active: true,
    created_at: "2026-01-14T10:00:00.000Z",
  },
  {
    id: "gallery-06",
    title: "Elektron raqamli imzo va ro'yxatdan o'tkazish xizmati",
    description: "Tezkor va xavfsiz davlat xizmatlari ko'rsatish jarayoni.",
    category: "Xizmatlar",
    image_url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    sort_order: 6,
    is_active: true,
    created_at: "2026-01-15T10:00:00.000Z",
  },
];
