import React from 'react';
import { NavSection } from '../types';
import { NAV_SECTIONS } from '../data/categories';
import {
  Tag,
  Sparkles,
  Wind,
  Utensils,
  Flame,
  Wine,
  Coffee,
  Pizza,
  Package,
} from 'lucide-react';

interface NavSectionsProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4 text-amber-600" />,
  Pizza: <Pizza className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
  Wine: <Wine className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  Tag: <Tag className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Wind: <Wind className="w-4 h-4" />,
};

export const NavSections: React.FC<NavSectionsProps> = ({
  activeSection,
  onSelectSection,
}) => {
  return (
    <nav className="bg-[#FAF6F0]/90 border-b border-[#E6DFD3] py-1.5 sm:py-2 px-2.5 sm:px-3 sticky top-[45px] sm:top-[74px] z-30 backdrop-blur-md shadow-2xs">
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scrollbar-none py-0.5 max-w-6xl mx-auto">
        {NAV_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                isActive
                  ? 'bg-[#E86A33] text-white border-[#E86A33] shadow-sm scale-[1.01]'
                  : 'bg-white text-stone-700 border-[#E2DACD] hover:border-[#E86A33]/50 hover:bg-[#F5EFE6]'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-amber-700'}>
                {SECTION_ICONS[sec.icon] || <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </span>
              <span>{sec.label}</span>
              {sec.badge && (
                <span
                  className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-stone-900 text-white'
                      : 'bg-[#EFE8DC] text-amber-800 border border-[#DCD3C1]'
                  }`}
                >
                  {sec.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
