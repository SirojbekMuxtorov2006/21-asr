export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = 'super_admin' | 'admin' | 'manager' | 'employee' | 'customer';

export type OrderStatus =
  | 'yangi'
  | 'qabul_qilindi'
  | 'jarayonda'
  | 'mijozdan_kutilmoqda'
  | 'tayyor'
  | 'bekor_qilindi';

export type PaymentStatus = 'kutilmoqda' | 'tolangan' | 'xatolik' | 'qaytarilgan';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  avatar_url: string | null;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  phone: string | null;
  email: string | null;
  image_url: string | null;
  instagram: string | null;
  telegram: string | null;
  linkedin: string | null;
  bio: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type TeamMemberInsert = Omit<TeamMember, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type TeamMemberUpdate = Partial<TeamMemberInsert>;

export interface Service {
  id: string;
  category_id: string | null;
  slug: string;
  name_uz: string;
  name_ru: string;
  short_description: string;
  description: string;
  how_it_works: string;
  price: number;
  price_note: string;
  duration: string;
  required_documents: string[];
  icon: string;
  image_url: string | null;
  is_active: boolean;
  is_popular: boolean;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

export type ServiceInsert = Omit<Service, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ServiceUpdate = Partial<ServiceInsert>;

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string; // 'Jamoa' | 'Ofis' | 'Tadbirlar' | 'Xizmatlar' | 'Boshqa'
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type GalleryItemInsert = Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type GalleryItemUpdate = Partial<GalleryItemInsert>;

export interface Category {
  id: string;
  slug: string;
  name_uz: string;
  name_ru: string;
  description_uz: string;
  icon: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  service_id: string | null;
  service_name: string;
  customer_name: string;
  phone: string;
  email: string;
  price: number;
  status: OrderStatus;
  notes: string;
  internal_notes: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string | null;
  user_id: string | null;
  amount: number;
  method: string;
  status: PaymentStatus;
  transaction_id: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export interface FAQItem {
  id: string;
  service_id: string | null;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ReviewItem {
  id: string;
  service_id: string | null;
  user_id: string | null;
  author_name: string;
  rating: number;
  body: string;
  is_approved: boolean;
  created_at: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  image_url: string | null;
  link: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}
