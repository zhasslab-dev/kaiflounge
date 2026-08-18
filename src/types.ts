export type NavSection =
  | 'promos'
  | 'events'
  | 'hookah_special'
  | 'main_menu'
  | 'shashlik_menu'
  | 'fastfood'
  | 'beer_snacks'
  | 'bar_menu'
  | 'coffee_tea'
  | 'sets_menu'
  | 'hookah_menu';

export type CategoryId =
  | 'all'
  | 'salads'
  | 'soups'
  | 'mains'
  | 'shashlik'
  | 'fastfood'
  | 'starters'
  | 'sides'
  | 'sets'
  | 'beer_sets'
  | 'sauces'
  | 'beer_snacks'
  | 'coffee'
  | 'lemonades'
  | 'teas'
  | 'soft_drinks'
  | 'cocktails'
  | 'spirits'
  | 'beer'
  | 'wines'
  | 'hookah_classic'
  | 'hookah_premium';

export interface CategoryOption {
  id: CategoryId;
  label: string;
  icon?: string;
  section: NavSection;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  section: NavSection;
  price: number; // In Kazakhstani Tenge (₸)
  priceNote?: string; // e.g. "за 1 л", "за 50 мл", "за 1 кг"
  description: string;
  fullIngredients?: string;
  weightOrVolume?: string; // e.g. "350 г", "1 л", "50 мл"
  calories?: number;
  imageUrl: string;
  tags?: ('hit' | 'spicy' | 'chef' | 'new' | 'veg' | 'signature')[];
  spicinessLevel?: number; // 0 to 3
  isAvailable?: boolean;
  preparationTime?: string;
  customizationOptions?: {
    title: string;
    choices: { name: string; priceExtra: number }[];
  }[];
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: string[];
  notes?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discountOrOffer: string;
  imageUrl: string;
  validUntil: string;
  description: string;
  code?: string;
}

export interface PosterEvent {
  id: string;
  title: string;
  artistOrDJ: string;
  date: string;
  time: string;
  genre: string;
  imageUrl: string;
  description: string;
  entryFee?: string;
}
