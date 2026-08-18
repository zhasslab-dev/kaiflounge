import React from 'react';
import { MenuItem } from '../types';
import { Flame, Sparkles, Clock } from 'lucide-react';

interface ItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onSelect,
}) => {
  // Format price in Kazakhstani Tenge (e.g. 2 590 ₸)
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(item.price) + ' ₸';

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative bg-white border border-[#E6DFD3] hover:border-[#E86A33] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer active:scale-[0.99]"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={item.imageUrl}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            // Graceful fallback if any local image fails to load
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80" />

        {/* Tags / Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 max-w-[75%]">
          {item.tags?.includes('hit') && (
            <span className="bg-[#E86A33] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs flex items-center gap-0.5">
              <Flame className="w-3 h-3 text-white fill-white" />
              ХИТ
            </span>
          )}
          {item.tags?.includes('chef') && (
            <span className="bg-stone-900 text-amber-400 border border-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-md flex items-center gap-0.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              CHEF
            </span>
          )}
          {item.tags?.includes('new') && (
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              NEW
            </span>
          )}
          {item.tags?.includes('signature') && (
            <span className="bg-amber-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              KAIF
            </span>
          )}
          {item.spicinessLevel && item.spicinessLevel > 0 ? (
            <span className="bg-red-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              {'🌶️'.repeat(item.spicinessLevel)}
            </span>
          ) : null}
        </div>

        {/* Weight / Volume Badge */}
        {item.weightOrVolume && (
          <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white bg-stone-900/80 px-2 py-0.5 rounded-md border border-stone-700/60 backdrop-blur-md flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{item.weightOrVolume}</span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <h3 className="text-sm font-extrabold text-stone-900 group-hover:text-[#E86A33] transition-colors line-clamp-2 leading-snug">
            {item.name}
          </h3>
          <p className="text-[12px] text-stone-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price display only */}
        <div className="pt-2 border-t border-[#E6DFD3] flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
              Цена
            </span>
            <span className="text-base font-black text-stone-900 font-sans tracking-tight">
              {formattedPrice}
            </span>
          </div>
          
          <span className="text-[11px] font-bold text-[#E86A33] bg-[#FAF6F0] px-2.5 py-1 rounded-lg border border-[#DCD3C1]">
            Детали
          </span>
        </div>
      </div>
    </div>
  );
};
