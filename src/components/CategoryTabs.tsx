import React from 'react';
import { CategoryId, NavSection } from '../types';
import { CATEGORIES } from '../data/categories';

interface CategoryTabsProps {
  activeSection: NavSection;
  activeCategory: CategoryId;
  onSelectCategory: (catId: CategoryId) => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeSection,
  activeCategory,
  onSelectCategory,
  categoryCounts = {},
}) => {
  // Filter categories relevant for current section
  const availableCategories = CATEGORIES.filter(
    (c) => c.section === activeSection
  );

  if (availableCategories.length === 0) return null;

  return (
    <div className="bg-[#FAF6F0] border-b border-[#E6DFD3] px-2.5 sm:px-3 py-1 sm:py-2 sticky top-[86px] sm:top-[122px] z-20 backdrop-blur-md">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none py-0.5 px-0.5 max-w-6xl mx-auto">
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                isActive
                  ? 'bg-[#E86A33] text-white border-[#E86A33] shadow-xs'
                  : 'bg-[#EFE8DC] text-stone-800 border-[#DCD3C1] hover:bg-white hover:border-[#E86A33]/40'
              }`}
            >
              <span>{cat.label}</span>
              {count > 0 && cat.id !== 'all' && (
                <span
                  className={`text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-800 border border-[#DCD3C1]'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
