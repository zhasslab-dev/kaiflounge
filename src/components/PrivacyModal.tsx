import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'privacy' | 'offer';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  title,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E2DACD] rounded-3xl p-5 w-full max-w-lg shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <h3 className="text-base font-extrabold text-stone-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 text-xs text-stone-700 leading-relaxed pr-1">
          {type === 'privacy' ? (
            <>
              <h4 className="font-bold text-stone-900">1. Общие положения</h4>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей электронного меню лаундж-бара "KAIF" (Республика Казахстан, г. Астана, ул. Абая 63).
              </p>
              <h4 className="font-bold text-stone-900">2. Сбор и использование информации</h4>
              <p>
                Мы обрабатываем только данные, необходимые для корректного обслуживания столов, бронирования мест и вызова персонала (номер столика, имя, контактный телефон, состав заказа).
              </p>
              <h4 className="font-bold text-stone-900">3. Безопасность данных</h4>
              <p>
                Администрация лаундж-бара KAIF принимаем все необходимые технические и организационные меры для защиты персональной информации от несанкционированного доступа.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-stone-900">1. Предмет оферты</h4>
              <p>
                Настоящий документ является официальным предложением (публичной офертой) ТОО "KAIF Lounge Bar Astana" по предоставлению услуг общественного питания и сервисного обслуживания в соответствии со ст. 395 Гражданского Кодекса РК.
              </p>
              <h4 className="font-bold text-stone-900">2. Оформление заказа и оплата</h4>
              <p>
                Заказ, сформированный в интерактивном онлайн-меню для столика, передается на исполнение персоналу кухни и бара. Цены указаны в национальной валюте Тенге (₸) с учетом НДС. Оплата производится любым доступным способом (Kaspi QR, платежная карта, наличные средства).
              </p>
              <h4 className="font-bold text-stone-900">3. Обслуживание</h4>
              <p>
                Плата за сервисное обслуживание составляет 10% от общей суммы чека и включается в итоговый расчет.
              </p>
            </>
          )}
        </div>

        <div className="pt-2 border-t border-[#E6DFD3]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#E86A33] hover:bg-[#d55923] text-white font-bold text-xs shadow-xs"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
