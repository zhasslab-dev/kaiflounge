import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  Globe,
  Wifi,
  Bookmark,
  X,
  Check,
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  language: 'RU' | 'KZ' | 'EN';
  setLanguage: (lang: 'RU' | 'KZ' | 'EN') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  showSearch,
  setShowSearch,
  language,
  setLanguage,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);
  const [showWifiModal, setShowWifiModal] = useState(false);

  const copyWifi = () => {
    navigator.clipboard.writeText('kaif2026');
    setWifiCopied(true);
    setTimeout(() => setWifiCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E6DFD3] transition-all shadow-xs">
      {/* Top Venue Info Bar (Desktop / Tablet) */}
      <div className="hidden sm:flex bg-[#EFE8DC] px-4 py-1 text-xs text-stone-800 items-center justify-between border-b border-[#E0D5C3]">
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 animate-pulse" />
          <span className="font-semibold text-stone-800 tracking-wide">
            Лаундж-Бар KAIF • Астана, ул. Абая 63
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="desktop-wifi-btn"
            onClick={() => setShowWifiModal(true)}
            className="flex items-center gap-1 bg-white hover:bg-stone-100 text-stone-800 border border-[#DCD3C1] px-2 py-0.5 rounded-full transition-colors text-[11px] font-medium"
          >
            <Wifi className="w-3 h-3 text-amber-600" />
            <span>Wi-Fi</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              id="desktop-lang-btn"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 text-stone-800 hover:text-stone-900 px-2 py-0.5 rounded-full bg-white border border-[#DCD3C1] text-[11px] font-bold"
            >
              <Globe className="w-3 h-3 text-amber-600" />
              <span>{language}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E2DACD] rounded-xl shadow-xl py-1 z-50 text-xs w-20">
                {(['RU', 'KZ', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#F5EFE6] transition-colors flex items-center justify-between ${
                      language === lang ? 'text-amber-700 font-bold' : 'text-stone-700'
                    }`}
                  >
                    <span>{lang}</span>
                    {language === lang && <Check className="w-3 h-3 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2.5 flex items-center justify-between gap-2 max-w-6xl mx-auto">
        {/* Logo & Location */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black tracking-wider text-stone-900 uppercase font-serif drop-shadow-xs">
            KAIF
          </h1>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-amber-800 bg-[#EFE8DC] px-1.5 sm:px-2 py-0.5 rounded-full border border-[#DCD3C1]">
            Lounge
          </span>
          <div className="hidden md:flex items-center gap-1 text-[11px] text-stone-600 ml-2">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Астана, ул. Абая 63</span>
          </div>
        </div>

        {/* Action Buttons (Search + Mobile Wi-Fi/Lang) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Wi-Fi Button */}
          <button
            id="mobile-wifi-btn"
            onClick={() => setShowWifiModal(true)}
            className="sm:hidden flex items-center gap-1 bg-white hover:bg-stone-100 text-stone-800 border border-[#DCD3C1] px-2 py-1 rounded-lg transition-colors text-[11px] font-medium"
            title="Гостевой Wi-Fi"
          >
            <Wifi className="w-3 h-3 text-amber-600" />
            <span>Wi-Fi</span>
          </button>

          {/* Mobile Language Switcher */}
          <div className="sm:hidden relative">
            <button
              id="mobile-lang-btn"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 text-stone-800 hover:text-stone-900 px-2 py-1 rounded-lg bg-white border border-[#DCD3C1] text-[11px] font-bold"
            >
              <Globe className="w-3 h-3 text-amber-600" />
              <span>{language}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E2DACD] rounded-xl shadow-xl py-1 z-50 text-xs w-20">
                {(['RU', 'KZ', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#F5EFE6] transition-colors flex items-center justify-between ${
                      language === lang ? 'text-amber-700 font-bold' : 'text-stone-700'
                    }`}
                  >
                    <span>{lang}</span>
                    {language === lang && <Check className="w-3 h-3 text-amber-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Toggle */}
          <button
            id="search-toggle-btn"
            onClick={() => setShowSearch(!showSearch)}
            className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-colors ${
              showSearch
                ? 'bg-[#E86A33] text-white border-[#E86A33]'
                : 'bg-white text-stone-700 border-[#E2DACD] hover:border-amber-600 hover:text-stone-900'
            }`}
            title="Поиск блюд"
            aria-label="Поиск блюд"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearch && (
        <div className="px-4 pb-3 pt-1 border-t border-[#E6DFD3] bg-[#FAF6F0]">
          <div className="relative max-w-6xl mx-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по блюдам, напиткам или кальянам..."
              autoFocus
              className="w-full bg-white border border-[#DCD3C1] rounded-xl pl-9 pr-9 py-2 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#E86A33] focus:ring-1 focus:ring-[#E86A33]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Wi-Fi Info Modal */}
      {showWifiModal && (
        <div 
          id="wifi-modal-backdrop"
          onClick={() => setShowWifiModal(false)}
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            id="wifi-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-[#E2DACD] rounded-2xl p-5 w-full max-w-sm shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-amber-600" />
                Гостевой Wi-Fi в KAIF
              </h3>
              <button
                id="wifi-modal-close-icon-btn"
                onClick={() => setShowWifiModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E6DFD3] space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Сеть:</span>
                <strong className="text-stone-900 font-bold">KAIF_GUEST_5G</strong>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>Пароль:</span>
                <strong className="text-amber-700 font-mono text-sm">kaif2026</strong>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                id="wifi-copy-btn"
                onClick={copyWifi}
                className="flex-1 py-2.5 rounded-xl bg-[#E86A33] hover:bg-[#d55923] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                {wifiCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Пароль скопирован!</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-4 h-4" />
                    <span>Скопировать пароль</span>
                  </>
                )}
              </button>

              <button
                id="wifi-close-btn"
                onClick={() => setShowWifiModal(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
