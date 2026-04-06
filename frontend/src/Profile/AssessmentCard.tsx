import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Check,
  Clock,
  Sparkles,
  Brain,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import Icon_strong from './../../public/icons/rezalt_icon_strong.svg';
import Icon_stats from './../../public/icons/rezalt_icon_stats.svg';

interface AssessmentBlockProps {
  isCompleted: boolean;
  resultsData?: {
    titleKey: string;
    descriptionKey: string;
    strengthsKey: string;
    growthKey: string;
  };
  onRetry?: () => void;
  onStart?: () => void; // Додано пропс для початку тесту
}

export const AssessmentBlock: React.FC<AssessmentBlockProps> = ({
  isCompleted,
  resultsData,
  onRetry,
  onStart,
}) => {
  const { t } = useTranslation('quiz');

  console.log('Status:', { isCompleted, hasData: !!resultsData });

  // Відображаємо результати ТІЛЬКИ якщо тест пройдено і є дані
  if (isCompleted && resultsData) {
    const strengths = t(resultsData.strengthsKey, { returnObjects: true });
    const growth = t(resultsData.growthKey, { returnObjects: true });

    const strengthsList = Array.isArray(strengths) ? strengths : [];
    const growthList = Array.isArray(growth) ? growth : [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full">
        {/* 1. Статус тесту */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
              <Check size={22} strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {t('results.badge')}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('results.status_completed')}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('results.description_p2')}
            </p>
          </div>
          <button
            onClick={onRetry}
            className="mt-6 flex items-center gap-2 text-purple-600 font-semibold hover:opacity-70 transition w-fit"
          >
            <RefreshCw size={18} /> {t('results.retry_button')}
          </button>
        </div>

        {/* 2. Тип особистості */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-50">
          <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
            <Brain size={22} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {t('results.type_title', { title: t(resultsData.titleKey) })}
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {t('results.type_subtitle')}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {t(resultsData.descriptionKey)}
          </p>
        </div>

        {/* 3. Сильні сторони */}

        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-50">
          <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
            <div
              className="w-12 h-12 bg-green-50 rounded-full
             flex items-center justify-center"
            >
              <img src={Icon_strong} alt="Strengths icon" className="w-6 h-6" />
            </div>

            {t('results.strengths_title')}
          </h4>
          <p className="text-xs text-gray-400 mb-4">
            {t('results.strengths_subtitle')}
          </p>
          <ul className="space-y-3">
            {strengthsList.slice(0, 3).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-700"
              >
                <Check
                  size={16}
                  className="text-green-500 shrink-0 mt-0.5"
                  strokeWidth={3}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Зони росту */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-50">
          <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-1">
            <div
              className="w-12 h-12 bg-warning/10 rounded-full
             flex items-center justify-center"
            >
              <img src={Icon_stats} alt="Strengths icon" className="w-6 h-6" />
            </div>
            {t('results.growth_title')}
          </h4>
          <p className="text-xs text-gray-400 mb-4">
            {t('results.growth_subtitle')}
          </p>
          <ul className="space-y-3">
            {growthList.slice(0, 3).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-700"
              >
                <Clock size={16} className="text-orange-300 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Стан за замовчуванням: ТЕСТ НЕ ПРОЙДЕНО
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
        <div className="bg-purple-100 p-4 rounded-2xl text-purple-600">
          <Sparkles size={28} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Початковий тест
          </h2>
          <p className="text-gray-400 text-sm mb-4 font-medium">
            Не завершено!
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xl">
            Пройди коротку психологічну оцінку, щоб краще зрозуміти себе. Ти
            дізнаєшся свій тип особистості та отримаєш план розвитку.
          </p>
          <button
            onClick={onStart}
            className="bg-purple-500 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-purple-600 transition flex items-center gap-3 shadow-lg shadow-purple-100"
          >
            Розпочати Тест <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
