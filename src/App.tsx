import React from 'react';
import { menuData } from './data';

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Шапка меню */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4 tracking-wide">
            KAIF Lounge
          </h1>
          <p className="text-neutral-400 text-lg">Официальное меню</p>
        </header>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuData.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col bg-neutral-900 rounded-2xl overflow-hidden shadow-xl border border-neutral-800 transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Фотография */}
              <div className="h-56 w-full bg-neutral-800 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Заглушка, если картинка не загрузится или имя файла не совпадает
                    e.target.src = "https://via.placeholder.com/400x300/333333/ffffff?text=KAIF+Lounge";
                  }}
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Информация о блюде */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {item.name}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>
                
                {/* Цена и кнопка */}
                <div className="flex justify-between items-end mt-auto">
                  <span className="text-2xl font-bold text-amber-500">
                    {item.price} <span className="text-lg">₸</span>
                  </span>
                  <button className="bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-neutral-950 border border-amber-500/50 px-5 py-2 rounded-xl font-bold transition-all duration-300">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
