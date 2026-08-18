import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  acceptedOffer: boolean;
  setAcceptedOffer: (accepted: boolean) => void;
  onOpenPrivacy: () => void;
  onOpenOffer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  acceptedOffer,
  setAcceptedOffer,
  onOpenPrivacy,
  onOpenOffer,
}) => {
  return (
    <footer className="bg-[#FAF6F0] border-t border-[#E6DFD3] text-stone-700 pt-8 pb-16 px-4 space-y-6 mt-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E6DFD3] pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-widest text-stone-900 font-serif uppercase flex items-center gap-2">
              KAIF
              <span className="text-xs font-sans font-bold text-amber-800 bg-[#EFE8DC] px-2.5 py-0.5 rounded-full border border-[#DCD3C1]">
                Lounge Bar
              </span>
            </h2>
            <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
              Премиальное пространство расслабления и вкуса в самом центре Астаны. Авторские кальяны, фьюжн кухня и живая музыка.
            </p>
          </div>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-[#E6DFD3] space-y-1 shadow-2xs">
            <span className="text-amber-800 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <MapPin className="w-3.5 h-3.5" />
              Локация:
            </span>
            <p className="text-stone-900 font-bold">Астана, ул. Абая 63</p>
            <p className="text-stone-500 text-[11px]">Удобная парковка вблизи</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#E6DFD3] space-y-1 shadow-2xs">
            <span className="text-amber-800 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Clock className="w-3.5 h-3.5" />
              График работы:
            </span>
            <p className="text-stone-900 font-bold">12:00 — 04:00 Ежедневно</p>
            <p className="text-stone-500 text-[11px]">Кухня и бар до 03:30</p>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#E6DFD3] space-y-1 shadow-2xs">
            <span className="text-amber-800 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Phone className="w-3.5 h-3.5" />
              Контакты & Wi-Fi:
            </span>
            <p className="text-stone-900 font-bold">+7 (777) 777-63-63</p>
            <p className="text-stone-500 text-[11px]">Wi-Fi: KAIF_GUEST_5G</p>
          </div>
        </div>

        {/* Public Offer Checkbox & Legal Links */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6DFD3] space-y-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <label className="flex items-center gap-2 cursor-pointer mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={acceptedOffer}
                onChange={(e) => setAcceptedOffer(e.target.checked)}
                className="w-4 h-4 accent-[#E86A33] rounded border-[#DCD3C1] bg-[#FAF6F0] cursor-pointer"
              />
            </label>
            <div className="text-xs text-stone-700">
              <span
                onClick={() => setAcceptedOffer(!acceptedOffer)}
                className="cursor-pointer font-medium hover:text-stone-900"
              >
                Принимаю условия{' '}
              </span>
              <button
                type="button"
                onClick={onOpenOffer}
                className="text-[#E86A33] hover:underline font-bold"
              >
                публичной оферты
              </button>{' '}
              и соглашаюсь с правилами обслуживания лаундж-бара KAIF.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E6DFD3] text-xs">
            <button
              onClick={onOpenPrivacy}
              className="text-stone-600 hover:text-[#E86A33] flex items-center gap-1 transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
              <span>Политика конфиденциальности</span>
            </button>

            <button
              onClick={onOpenOffer}
              className="text-stone-600 hover:text-[#E86A33] transition-colors font-medium"
            >
              Условия оферты
            </button>
          </div>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 pt-2">
          <span>© 2026 KAIF Lounge Bar Astana (ул. Абая 63). Все права защищены.</span>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white hover:bg-[#FAF6F0] text-stone-700 hover:text-[#E86A33] border border-[#DCD3C1] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white hover:bg-[#FAF6F0] text-stone-700 hover:text-[#E86A33] border border-[#DCD3C1] transition-colors"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
