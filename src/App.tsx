import React, { useState, useMemo } from 'react';
import { NavSection, CategoryId, MenuItem } from './types';
import { NAV_SECTIONS } from './data/categories';
import { MENU_ITEMS } from './data/menuData';
import { PROMOTIONS, POSTER_EVENTS } from './data/promotions';

import { Header } from './components/Header';
import { NavSections } from './components/NavSections';
import { CategoryTabs } from './components/CategoryTabs';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { HookahMixer } from './components/HookahMixer';
import { PromotionsView } from './components/PromotionsView';
import { PolicyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';

import { Utensils, Search, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('main_menu');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [language, setLanguage] = useState<'RU' | 'KZ' | 'EN'>('RU');

  // Modals visibility
  const [selectedItemForModal, setSelectedItemForModal] =
    useState<MenuItem | null>(null);
  const [policyModalConfig, setPolicyModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    type: 'privacy' | 'offer';
  }>({
    isOpen: false,
    title: '',
    type: 'privacy',
  });

  // Footer offer checkbox state
  const [acceptedOffer, setAcceptedOffer] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCallHookahMaster = (recipe: string) => {
    showToast('Вызван кальянщик с вашим миксом!');
  };

  // Filter items based on active section, category, search query
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Section match
      if (activeSection !== 'promos' && activeSection !== 'events') {
        if (item.section !== activeSection) return false;
      }

      // 2. Category match
      if (activeCategory !== 'all') {
        if (item.category !== activeCategory) return false;
      }

      // 3. Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchIng = item.fullIngredients?.toLowerCase().includes(q);
        return matchName || matchDesc || matchIng;
      }

      return true;
    });
  }, [activeSection, activeCategory, searchQuery]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MENU_ITEMS.forEach((item) => {
      if (item.section === activeSection) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-stone-900 font-sans selection:bg-[#E86A33] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-stone-800 text-xs flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Section Navigation Bar */}
      <NavSections
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          setActiveCategory('all');
        }}
      />

      {/* Anchor Category Sub-Tabs (for main/bar/tea/hookah) */}
      {activeSection !== 'promos' && activeSection !== 'events' && (
        <CategoryTabs
          activeSection={activeSection}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryCounts={categoryCounts}
        />
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 pt-3 sm:pt-5 space-y-4 sm:space-y-6">
        {/* Promos & Events View */}
        {activeSection === 'promos' || activeSection === 'events' ? (
          <PromotionsView
            promotions={PROMOTIONS}
            events={POSTER_EVENTS}
            mode={activeSection === 'promos' ? 'promos' : 'events'}
          />
        ) : (
          <>
            {/* Hookah Special Mixer (Interactive Hookah Builder) */}
            {(activeSection === 'hookah_special' || activeSection === 'hookah_menu') && (
              <div className="mb-6">
                <HookahMixer
                  onCallHookahMaster={handleCallHookahMaster}
                />
              </div>
            )}

            {/* Menu Items Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-stone-900 uppercase tracking-wider font-serif flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-700" />
                    {NAV_SECTIONS.find((s) => s.id === activeSection)?.label}
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Позиций доступно: {filteredMenuItems.length}
                  </p>
                </div>
              </div>

              {filteredMenuItems.length === 0 ? (
                <div className="py-12 text-center bg-white rounded-2xl border border-[#E6DFD3] space-y-3 shadow-2xs">
                  <Search className="w-10 h-10 text-stone-400 mx-auto" />
                  <h3 className="text-base font-bold text-stone-900">
                    Позиции не найдены
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Попробуйте сбросить фильтр или изменить поисковый запрос "{searchQuery}".
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-[#E86A33] hover:bg-[#d55923] text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Сбросить поиск
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMenuItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItemForModal}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        acceptedOffer={acceptedOffer}
        setAcceptedOffer={setAcceptedOffer}
        onOpenPrivacy={() =>
          setPolicyModalConfig({
            isOpen: true,
            title: 'Политика конфиденциальности KAIF',
            type: 'privacy',
          })
        }
        onOpenOffer={() =>
          setPolicyModalConfig({
            isOpen: true,
            title: 'Публичная оферта заведения',
            type: 'offer',
          })
        }
      />

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
      />

      {/* Policy & Offer Modal */}
      <PolicyModal
        isOpen={policyModalConfig.isOpen}
        onClose={() =>
          setPolicyModalConfig({ ...policyModalConfig, isOpen: false })
        }
        title={policyModalConfig.title}
        type={policyModalConfig.type}
      />
    </div>
  );
}
