export interface PartnerItem {
  id: string;
  name: string;
  logo_url: string;
  category: string;
  website_url?: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const DEFAULT_PARTNERS: PartnerItem[] = [
  {
    id: "partner-01",
    name: "Bog'ishamol Hotel",
    logo_url: "/partners/bogishamol-hotel.jpg",
    category: "Mehmonxona & Turizm",
    website_url: "",
    description: "Samarqanddagi shinam va zamonaviy mehmonxona majmuasi, yuqori darajadagi servis va mehmondo'stlik maskani.",
    sort_order: 1,
    is_active: true,
    created_at: "2026-01-08T10:00:00.000Z",
    updated_at: "2026-01-08T10:00:00.000Z",
  },
  {
    id: "partner-02",
    name: "Woodmax LDSP & MDF",
    logo_url: "/partners/woodmax.jpg",
    category: "Mebel & Yog'och sanoati",
    website_url: "",
    description: "Zamonaviy LDSP va MDF plitalari, mebel xomashyolari ishlab chiqaruvchi va yetkazib beruvchi yetakchi korxona.",
    sort_order: 2,
    is_active: true,
    created_at: "2026-01-09T10:00:00.000Z",
    updated_at: "2026-01-09T10:00:00.000Z",
  },
  {
    id: "partner-03",
    name: "Jahon Bobo Qandolatlari OK",
    logo_url: "/partners/jahon-bobo.png",
    category: "Qandolat & Oziq-ovqat",
    website_url: "",
    description: "Samarqand viloyatidagi eng yirik qandolat va shirinliklar ishlab chiqaruvchi yetakchi korxona.",
    sort_order: 3,
    is_active: true,
    created_at: "2026-01-10T10:00:00.000Z",
    updated_at: "2026-01-10T10:00:00.000Z",
  },
  {
    id: "partner-04",
    name: "Muzqaymoq-2",
    logo_url: "/partners/muzqaymoq-2.png",
    category: "Muzqaymoq & Sut mahsulotlari",
    website_url: "",
    description: "Zamonaviy texnologiyalar asosida tabiiy muzqaymoq va salqin mahsulotlar yetkazib beruvchi brend.",
    sort_order: 4,
    is_active: true,
    created_at: "2026-01-11T10:00:00.000Z",
    updated_at: "2026-01-11T10:00:00.000Z",
  },
  {
    id: "partner-05",
    name: "URG ISPANZA",
    logo_url: "/partners/urg-ispanza.png",
    category: "Xalqaro savdo & Eksport-Import",
    website_url: "",
    description: "Xalqaro darajadagi hamkorlik, logistika va tekstil-paxta sanoati bo'yicha yirik korxona.",
    sort_order: 5,
    is_active: true,
    created_at: "2026-01-12T10:00:00.000Z",
    updated_at: "2026-01-12T10:00:00.000Z",
  },
  {
    id: "partner-06",
    name: "UE Business Group",
    logo_url: "/partners/ue-business.png",
    category: "Biznes & Elektron savdo",
    website_url: "",
    description: "Savdo tarmoqlari, biznes strategiyasi va raqamli integratsiyalar bo'yicha ishonchli korxona.",
    sort_order: 6,
    is_active: true,
    created_at: "2026-01-13T10:00:00.000Z",
    updated_at: "2026-01-13T10:00:00.000Z",
  },
  {
    id: "partner-07",
    name: "AT Group Holding",
    logo_url: "/partners/at-holding.png",
    category: "Ishlab chiqarish & Investitsiya",
    website_url: "",
    description: "Ko'p tarmoqli ishlab chiqarish, sifatli servis va innovatsion xizmatlar ko'rsatish guruhi.",
    sort_order: 7,
    is_active: true,
    created_at: "2026-01-14T10:00:00.000Z",
    updated_at: "2026-01-14T10:00:00.000Z",
  },
];
