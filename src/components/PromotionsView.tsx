import React from 'react';
import { PromoBanner, PosterEvent } from '../types';
import { Tag, Calendar, Clock, Sparkles, ArrowRight, User } from 'lucide-react';

interface PromotionsViewProps {
  promotions: PromoBanner[];
  events: PosterEvent[];
  mode: 'promos' | 'events';
}

export const PromotionsView: React.FC<PromotionsViewProps> = ({
  promotions,
  events,
  mode,
}) => {
  return (
    <div className="space-y-6 pb-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6DFD3] flex items-center justify-between shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            {mode === 'promos' ? (
              <Tag className="w-5 h-5 text-amber-700" />
            ) : (
              <Calendar className="w-5 h-5 text-amber-700" />
            )}
            <h2 className="text-lg font-extrabold text-stone-900 uppercase tracking-wide font-serif">
              {mode === 'promos' ? 'Специальные Акции KAIF' : 'Афиша и DJ Сеты'}
            </h2>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            {mode === 'promos'
              ? 'Эксклюзивные комбо-наборы и специальные цены для гостей заведения'
              : 'Предстоящие вечеринки, живые выступления и гастрономические вечера'}
          </p>
        </div>
      </div>

      {/* Promos Section */}
      {mode === 'promos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white border border-[#E6DFD3] hover:border-[#E86A33] rounded-2xl overflow-hidden shadow-xs hover:shadow-md flex flex-col group transition-all"
            >
              <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#E86A33] text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                  {promo.badge}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#E86A33] transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-amber-800 font-bold">
                    {promo.discountOrOffer}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2">
                    {promo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6DFD3] flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    {promo.validUntil}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Events Section */}
      {mode === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-[#E6DFD3] hover:border-[#E86A33] rounded-2xl overflow-hidden shadow-xs hover:shadow-md flex flex-col group transition-all"
            >
              <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-stone-900 border border-stone-800 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-md">
                  {event.genre}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-xs text-amber-800 font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#E86A33] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-stone-800 font-semibold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-700" />
                    {event.artistOrDJ}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6DFD3] flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-medium">
                    {event.entryFee}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
