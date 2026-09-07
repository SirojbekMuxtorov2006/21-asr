import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uz" | "ru";

type Dict = Record<string, { uz: string; ru: string }>;

export const dict: Dict = {
  "nav.home": { uz: "Bosh sahifa", ru: "Главная" },
  "nav.services": { uz: "Xizmatlar", ru: "Услуги" },
  "nav.team": { uz: "Jamoamiz", ru: "Команда" },
  "nav.about": { uz: "Biz haqimizda", ru: "О нас" },
  "nav.pricing": { uz: "Narxlar", ru: "Цены" },
  "nav.news": { uz: "Yangiliklar", ru: "Новости" },
  "nav.faq": { uz: "Savol-javob", ru: "Вопросы" },
  "nav.contact": { uz: "Aloqa", ru: "Контакты" },
  "cta.login": { uz: "Kirish", ru: "Войти" },
  "cta.logout": { uz: "Chiqish", ru: "Выйти" },
  "cta.register": { uz: "Ro'yxatdan o'tish", ru: "Регистрация" },
  "cta.order": { uz: "Xizmat buyurtma qilish", ru: "Заказать услугу" },
  "cta.orderShort": { uz: "Buyurtma berish", ru: "Заказать" },
  "cta.details": { uz: "Batafsil", ru: "Подробнее" },
  "cta.findService": { uz: "Xizmat topish", ru: "Найти услугу" },
  "cta.contactUs": { uz: "Bog'lanish", ru: "Связаться" },
  "cta.cabinet": { uz: "Shaxsiy kabinet", ru: "Личный кабинет" },
  "search.title": { uz: "Qanday xizmat kerak?", ru: "Какая услуга нужна?" },
  "search.placeholder": {
    uz: "Masalan: YATT ochish, E-IMZO, soliq...",
    ru: "Например: открытие ИП, ЭЦП, налоги...",
  },
  "search.empty": { uz: "Hech narsa topilmadi", ru: "Ничего не найдено" },
  "hero.title": { uz: "Barcha xizmatlar — bir joyda", ru: "Все услуги — в одном месте" },
  "hero.subtitle": {
    uz: "21-ASR orqali biznes, davlat xizmatlari, hujjatlar, soliq, buxgalteriya va boshqa 300+ xizmatlarni tez va qulay hal qiling.",
    ru: "Решайте вопросы бизнеса, госуслуг, документов, налогов, бухгалтерии и более 300+ услуг быстро и удобно через 21-ASR.",
  },
  "stats.services": { uz: "Xizmatlar", ru: "Услуги" },
  "stats.clients": { uz: "Mijozlar", ru: "Клиенты" },
  "stats.years": { uz: "Yillik tajriba", ru: "Лет опыта" },
  "stats.support": { uz: "Murojaat", ru: "Поддержка" },
  "cat.title": { uz: "Sizga qanday xizmat kerak?", ru: "Какая услуга вам нужна?" },
  "popular.title": { uz: "Eng ko'p tanlanadigan xizmatlar", ru: "Самые популярные услуги" },
  "filter.all": { uz: "Barchasi", ru: "Все" },
  "service.price": { uz: "Narxi", ru: "Цена" },
  "service.duration": { uz: "Muddat", ru: "Срок" },
  "service.docs": { uz: "Kerakli hujjatlar", ru: "Необходимые документы" },
  "service.how": { uz: "Xizmat qanday ishlaydi", ru: "Как работает услуга" },
  "service.related": { uz: "O'xshash xizmatlar", ru: "Похожие услуги" },
  "order.title": { uz: "Buyurtma berish", ru: "Оформить заказ" },
  "order.name": { uz: "Ism familiya", ru: "Имя и фамилия" },
  "order.phone": { uz: "Telefon", ru: "Телефон" },
  "order.email": { uz: "Email", ru: "Email" },
  "order.service": { uz: "Xizmat", ru: "Услуга" },
  "order.notes": { uz: "Qo'shimcha ma'lumot", ru: "Дополнительно" },
  "order.file": { uz: "Fayl yuklash", ru: "Загрузить файл" },
  "order.submit": { uz: "Buyurtma yuborish", ru: "Отправить заказ" },
  "order.success": {
    uz: "Buyurtmangiz muvaffaqiyatli qabul qilindi.",
    ru: "Ваш заказ успешно принят.",
  },
  "partners.title": {
    uz: "Bizga ishonch bildirgan kompaniyalar",
    ru: "Компании, которые нам доверяют",
  },
  "partners.subtitle": {
    uz: "O'zbekiston bo'ylab 100 dan ortiq yirik korxona, tashkilot va tadbirkorlik subyektlari 21-ASR xizmatlaridan foydalanib kelmoqda.",
    ru: "Более 100 ведущих предприятий, организаций и предпринимателей по всему Узбекистану успешно сотрудничают с 21-ASR.",
  },
  "partners.badge": {
    uz: "Biznes Hamkorlarimiz",
    ru: "Наши бизнес-партнёры",
  },
  "footer.rights": { uz: "Barcha huquqlar himoyalangan", ru: "Все права защищены" },
  "common.loading": { uz: "Yuklanmoqda...", ru: "Загрузка..." },
  "common.save": { uz: "Saqlash", ru: "Сохранить" },
  "common.cancel": { uz: "Bekor qilish", ru: "Отмена" },
  "common.search": { uz: "Qidirish", ru: "Поиск" },
  "common.status": { uz: "Holat", ru: "Статус" },
  "common.date": { uz: "Sana", ru: "Дата" },
  "common.actions": { uz: "Amallar", ru: "Действия" },
  "common.all": { uz: "Barchasi", ru: "Все" },
};

export const statusLabels: Record<string, { uz: string; ru: string }> = {
  yangi: { uz: "Yangi", ru: "Новый" },
  qabul_qilindi: { uz: "Qabul qilindi", ru: "Принят" },
  jarayonda: { uz: "Jarayonda", ru: "В процессе" },
  mijozdan_kutilmoqda: { uz: "Mijozdan ma'lumot kutilmoqda", ru: "Ожидание данных" },
  tayyor: { uz: "Tayyor", ru: "Готово" },
  bekor_qilindi: { uz: "Bekor qilindi", ru: "Отменён" },
};

export const paymentStatusLabels: Record<string, { uz: string; ru: string }> = {
  kutilmoqda: { uz: "Kutilmoqda", ru: "Ожидается" },
  tolangan: { uz: "To'langan", ru: "Оплачено" },
  xatolik: { uz: "Xatolik", ru: "Ошибка" },
  qaytarilgan: { uz: "Qaytarilgan", ru: "Возврат" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const I18nContext = createContext<Ctx>({ lang: "uz", setLang: () => {}, t: (k) => k });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const stored = window.localStorage.getItem("21asr-lang");
    if (stored === "ru" || stored === "uz") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("21asr-lang", l);
  }, []);

  const t = useCallback((key: string) => dict[key]?.[lang] ?? key, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export function localized(lang: Lang, uz: string, ru?: string | null) {
  return lang === "ru" && ru ? ru : uz;
}
