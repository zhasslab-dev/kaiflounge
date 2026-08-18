import React, { useState } from 'react';
import { MenuItem } from '../types';
import {
  X,
  Clock,
  Check,
  AlertCircle,
  Utensils,
  Share2,
} from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  const [copiedLink, setCopiedLink] = useState(false);

  const formattedPrice =
    new Intl.NumberFormat('ru-RU').format(item.price) + ' ₸';

  const shareItem = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 overflow-y-auto">
      <div className="bg-white border border-[#E2DACD] rounded-t-3xl md:rounded-3xl w-full max-w-lg md:max-w-4xl max-h-[92vh] md:max-h-[85vh] shadow-2xl relative overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom duration-300">
        {/* Sticky Close & Actions Header */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          <button
            onClick={shareItem}
            className="p-2 rounded-full bg-white/90 text-stone-700 border border-stone-200/80 backdrop-blur-md hover:text-stone-900 shadow-xs transition-colors"
            title="Поделиться"
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 text-stone-700 border border-stone-200/80 backdrop-blur-md hover:text-stone-900 shadow-xs transition-colors"
            title="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Left Column: Image & Badges */}
        <div className="relative w-full md:w-1/2 min-h-[220px] md:min-h-[380px] bg-stone-100 shrink-0">
          <img
            src={item.imageUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center absolute inset-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent md:bg-gradient-to-t md:from-stone-900/50 md:via-transparent md:to-transparent" />

          {/* Quick Badges overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2 z-10">
            {item.weightOrVolume && (
              <span className="bg-stone-900/90 text-amber-400 border border-stone-800 px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                {item.weightOrVolume}
              </span>
            )}
            {item.preparationTime && (
              <span className="bg-stone-900/80 text-white border border-stone-700 px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {item.preparationTime}
              </span>
            )}
            {item.calories && (
              <span className="bg-stone-900/80 text-stone-200 border border-stone-700 px-2.5 py-1 rounded-lg text-xs backdrop-blur-md font-medium">
                {item.calories} ккал
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Details, Description, Ingredients, Footer */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-white">
          <div className="p-5 md:p-6 space-y-4 text-stone-800">
            <div className="pr-12 md:pr-14">
              <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug font-serif">
                {item.name}
              </h2>
              <p className="text-sm md:text-base text-stone-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Full Ingredients Breakdown */}
            {item.fullIngredients && (
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E6DFD3] space-y-1">
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  Состав и ингредиенты:
                </span>
                <p className="text-xs text-stone-700 leading-normal">
                  {item.fullIngredients}
                </p>
              </div>
            )}

            {/* Customization Options as Info */}
            {item.customizationOptions && item.customizationOptions.length > 0 && (
              <div className="space-y-3 pt-1">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                  Доступные вариации:
                </span>
                <div className="space-y-2.5">
                  {item.customizationOptions.map((optGroup, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF6F0] p-3 rounded-xl border border-[#E6DFD3] space-y-1.5"
                    >
                      <span className="text-xs font-bold text-stone-700">
                        {optGroup.title}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {optGroup.choices.map((choice) => (
                          <span
                            key={choice.name}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#DCD3C1] text-stone-800 text-[11px] font-semibold"
                          >
                            {choice.name}{' '}
                            {choice.priceExtra > 0
                              ? `(+${choice.priceExtra} ₸)`
                              : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions (Price) */}
          <div className="p-4 md:p-5 bg-[#FAF6F0] border-t border-[#E6DFD3] flex items-center justify-between gap-3 shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Стоимость
              </span>
              <span className="text-xl md:text-2xl font-black text-stone-900">
                {formattedPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
