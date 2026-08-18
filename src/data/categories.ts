import { CategoryOption, NavSection } from '../types';

export const NAV_SECTIONS: { id: NavSection; label: string; icon: string; badge?: string }[] = [
  { id: 'main_menu', label: 'Основное меню', icon: 'Utensils' },
  { id: 'shashlik_menu', label: 'Шашлыки & Гриль', icon: 'Flame', badge: 'HIT' },
  { id: 'fastfood', label: 'Фастфуд & Закуски', icon: 'Pizza' },
  { id: 'sets_menu', label: 'Сеты & Миксы', icon: 'Package' },
  { id: 'bar_menu', label: 'Барное меню', icon: 'Wine' },
  { id: 'coffee_tea', label: 'Кофе & Чай', icon: 'Coffee' },
  { id: 'promos', label: 'Акции', icon: 'Tag', badge: '-15%' },
  { id: 'events', label: 'Афиша', icon: 'Sparkles', badge: 'LIVE' },
  { id: 'hookah_special', label: 'Кальянная карта', icon: 'Wind', badge: 'VIP' },
];

export const CATEGORIES: CategoryOption[] = [
  // Основное меню
  { id: 'all', label: 'Все позиции', section: 'main_menu' },
  { id: 'salads', label: 'Салаты', section: 'main_menu' },
  { id: 'soups', label: 'Супы', section: 'main_menu' },
  { id: 'mains', label: 'Горячие блюда', section: 'main_menu' },

  // Шашлыки & Гриль
  { id: 'all', label: 'Весь гриль', section: 'shashlik_menu' },
  { id: 'shashlik', label: 'Шашлыки', section: 'shashlik_menu' },

  // Фастфуд & Закуски & Гарниры
  { id: 'all', label: 'Все закуски', section: 'fastfood' },
  { id: 'fastfood', label: 'Фаст фуд', section: 'fastfood' },
  { id: 'starters', label: 'Закуски', section: 'fastfood' },
  { id: 'sides', label: 'Гарниры', section: 'fastfood' },
  { id: 'sauces', label: 'Соусы', section: 'fastfood' },

  // Сеты
  { id: 'all', label: 'Все сеты', section: 'sets_menu' },
  { id: 'sets', label: 'Большие сеты', section: 'sets_menu' },
  { id: 'beer_sets', label: 'Пивные сеты', section: 'sets_menu' },
  { id: 'beer_snacks', label: 'Закуски к пиву', section: 'sets_menu' },

  // Барное меню
  { id: 'all', label: 'Весь бар', section: 'bar_menu' },
  { id: 'cocktails', label: 'Коктейли', section: 'bar_menu' },
  { id: 'beer', label: 'Пиво', section: 'bar_menu' },
  { id: 'spirits', label: 'Крепкий алкоголь', section: 'bar_menu' },
  { id: 'wines', label: 'Вина & Шампанское', section: 'bar_menu' },

  // Кофе, Чай, Безалкогольное
  { id: 'all', label: 'Все напитки', section: 'coffee_tea' },
  { id: 'coffee', label: 'Кофе', section: 'coffee_tea' },
  { id: 'lemonades', label: 'Лимонады & Ice Tea', section: 'coffee_tea' },
  { id: 'teas', label: 'Чай', section: 'coffee_tea' },
  { id: 'soft_drinks', label: 'Напитки & Соки', section: 'coffee_tea' },

  // Кальяны
  { id: 'all', label: 'Все кальяны', section: 'hookah_special' },
  { id: 'hookah_classic', label: 'Классические', section: 'hookah_special' },
  { id: 'hookah_premium', label: 'Премиум & Фруктовые', section: 'hookah_special' },
];
