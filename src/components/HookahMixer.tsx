import React, { useState } from 'react';
import { Flame, Sparkles, Check } from 'lucide-react';
import { MenuItem } from '../types';

interface HookahMixerProps {
  onCallHookahMaster: (recipe: string) => void;
}

export const HookahMixer: React.FC<HookahMixerProps> = ({
  onCallHookahMaster,
}) => {
  const [bowl, setBowl] = useState({ name: 'Глиняная чаша', price: 12500 });
  const [liquid, setLiquid] = useState({ name: 'Ледяная вода + мята', price: 0 });
  const [strength, setStrength] = useState('Medium (6/10)');
  const [flavors, setFlavors] = useState<string[]>(['Маракуйя', 'Мята-Лёд']);
  const [specialNote, setSpecialNote] = useState('');
  const [added, setAdded] = useState(false);

  const BOWLS = [
    { name: 'Глиняная чаша', price: 12500, desc: 'Классическая равномерная передача вкуса' },
    { name: 'Чаша Грейпфрут 🍊', price: 15500, desc: 'Сочный цитрусовый аромат и продленная сессия' },
    { name: 'Чаша Ананас 🍍', price: 18500, desc: 'Экзотический фруктовый шлейф и густой дым' },
    { name: 'Чаша Кокос 🥥', price: 16500, desc: 'Сливочные тропические нотки' },
  ];

  const LIQUIDS = [
    { name: 'Ледяная вода + мята', price: 0 },
    { name: 'Молочно-сливочная база', price: 1500 },
    { name: 'Сок Маракуйя & Гранат', price: 2500 },
    { name: 'Игристое вино Prosecco Base', price: 3500 },
  ];

  const STRENGTHS = [
    { id: 'Light', label: 'Легкий (3/10)', brand: 'Daily Hookah / Element Air' },
    { id: 'Medium', label: 'Средний (6/10)', brand: 'Musthave / Darkside Soft' },
    { id: 'Strong', label: 'Крепкий (9/10)', brand: 'Tangiers / Darkside Core' },
  ];

  const FLAVOR_OPTIONS = [
    'Маракуйя',
    'Мята-Лёд',
    'Манго',
    'Дикая Малина',
    'Грейпфрут',
    'Черника',
    'Двойное Яблоко',
    'Ананас',
    'Пряный Чай',
    'Фисташка-Амаретто',
    'Кола-Лайм',
  ];

  const toggleFlavor = (fl: string) => {
    if (flavors.includes(fl)) {
      setFlavors(flavors.filter((f) => f !== fl));
    } else {
      if (flavors.length < 3) {
        setFlavors([...flavors, fl]);
      }
    }
  };

  const calculateTotal = () => {
    return bowl.price + liquid.price;
  };

  const handleCreateHookah = () => {
    const recipeString = `Кальян: ${bowl.name}. Колба: ${liquid.name}. Крепость: ${strength}. Вкусы: ${flavors.join(', ')}.${specialNote ? ' Примечание: ' + specialNote : ''}`;
    onCallHookahMaster(recipeString);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="bg-white border border-[#E6DFD3] rounded-3xl p-5 shadow-xs space-y-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#FAF6F0] rounded-lg border border-[#DCD3C1] text-[#E86A33]">
              <Flame className="w-5 h-5 fill-[#E86A33]" />
            </span>
            <h2 className="text-lg font-extrabold text-stone-900 uppercase tracking-wider font-serif">
              KAIF Hookah Master Builder
            </h2>
          </div>
          <p className="text-xs text-stone-600">
            Соберите ваш индивидуальный кальянный микс для стола
          </p>
        </div>
        <span className="bg-[#E86A33] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-xs">
          VIP Hookah
        </span>
      </div>

      {/* 1. Bowl Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
          <span>1. Выбор фруктовой или классической чаши:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {BOWLS.map((b) => {
            const isSelected = bowl.name === b.name;
            return (
              <button
                key={b.name}
                type="button"
                onClick={() => setBowl(b)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#E86A33] border-[#E86A33] text-white shadow-xs'
                    : 'bg-[#FAF6F0] border-[#DCD3C1] text-stone-800 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>{b.name}</span>
                  <span className={isSelected ? 'text-white' : 'text-amber-800'}>{b.price.toLocaleString('ru-RU')} ₸</span>
                </div>
                <p className={`text-[11px] mt-1 ${isSelected ? 'text-stone-100' : 'text-stone-600'}`}>{b.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Liquid Base */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          2. Наполнение колбы:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {LIQUIDS.map((l) => {
            const isSelected = liquid.name === l.name;
            return (
              <button
                key={l.name}
                type="button"
                onClick={() => setLiquid(l)}
                className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#E86A33] border-[#E86A33] text-white'
                    : 'bg-[#FAF6F0] border-[#DCD3C1] text-stone-800 hover:bg-stone-50'
                }`}
              >
                <div>{l.name}</div>
                {l.price > 0 ? (
                  <span className={isSelected ? 'text-white font-bold text-[10px]' : 'text-amber-800 font-bold text-[10px]'}>
                    +{l.price} ₸
                  </span>
                ) : (
                  <span className={`text-[10px] ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>Бесплатно</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Strength */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          3. Крепость табака:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {STRENGTHS.map((s) => {
            const isSelected = strength === s.label;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStrength(s.label)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white font-black border-stone-900'
                    : 'bg-[#FAF6F0] border-[#DCD3C1] text-stone-800 hover:bg-stone-50'
                }`}
              >
                <div className="text-xs font-bold">{s.label}</div>
                <div className="text-[9px] opacity-80 mt-0.5 truncate">{s.brand}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Flavor Mix (Up to 3) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            4. Выберите вкусы (до 3 миксов):
          </label>
          <span className="text-[11px] text-stone-600 font-mono">
            {flavors.length}/3
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FLAVOR_OPTIONS.map((fl) => {
            const isSelected = flavors.includes(fl);
            return (
              <button
                key={fl}
                type="button"
                onClick={() => toggleFlavor(fl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-[#E86A33] text-white border-[#E86A33]'
                    : 'bg-[#FAF6F0] text-stone-800 border-[#DCD3C1] hover:bg-stone-50'
                }`}
              >
                {fl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes for Hookah Master */}
      <div className="space-y-1">
        <label className="text-xs text-stone-700 font-semibold">
          Пожелания для кальянного мастера:
        </label>
        <input
          type="text"
          value={specialNote}
          onChange={(e) => setSpecialNote(e.target.value)}
          placeholder="Например: побольше льда, сделать помягче, подать с чаем..."
          className="w-full bg-[#FAF6F0] border border-[#DCD3C1] rounded-xl px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#E86A33]"
        />
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#E6DFD3] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase text-stone-500 font-bold">Итого кальян:</span>
          <div className="text-xl font-black text-stone-900">
            {calculateTotal().toLocaleString('ru-RU')} ₸
          </div>
        </div>

        <button
          onClick={handleCreateHookah}
          className={`py-3 px-5 rounded-2xl font-black text-xs flex items-center gap-2 transition-all shadow-xs active:scale-95 ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-[#E86A33] hover:bg-[#d55923] text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Кальянщик вызван!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Вызвать кальянщика с этим миксом</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
