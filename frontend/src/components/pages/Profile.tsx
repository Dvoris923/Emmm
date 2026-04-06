import React, { useEffect, useState } from 'react';
import { ProfileSidebar } from '../../Profile/ProfileSidebar';
import { AssessmentBlock } from '../../Profile/AssessmentCard';
import { RecommendationCards } from '../Test/RecommendationCards';
import { quizResultsData } from '../Test/quizResultsData';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const [resultKey, setResultKey] = useState<string | null>(null);
  const userDataa = {
    name: 'Олег Річардсон',
    age: 15,
    city: 'Хмельницький',
    email: 'example@gmail.com',
    interests: ['Музика', 'Фільми/серіали', 'Спорт', 'YouTube', 'Відео-ігри'],
    isTestCompleted: false, // Стан тесту
  };

  const navigate = useNavigate();

  const updateTestData = () => {
    const savedKey = localStorage.getItem('quiz_result_key');

    setResultKey(savedKey);
  };

  useEffect(() => {
    updateTestData();

    // Слухаємо зміни в інших вкладках
    window.addEventListener('storage', updateTestData);

    return () => window.removeEventListener('storage', updateTestData);
  }, []);
  // 1. Перевіряємо, чи є ключ результату в пам'яті
  const currentResults = resultKey
    ? quizResultsData[resultKey as keyof typeof quizResultsData]
    : undefined;

  return (
    <div>
      <img
        className="w-full h-30 mt-10 object-cover"
        src="./../../../public/icons/profile_bg.svg"
        alt=""
      />
      <div
        className="min-h-screen pl-4 pr-4 md:pl-6
     md:pr-6 lg:pl-15
      lg:pr-15 xl:pl-20 xl:pr-20"
      >
        <div className="max-w-400 mx-auto px-6  pb-20">
          <div
            className="flex flex-col md:flex-row justify-between
  items-start gap-10 relative z-10"
          >
            {/* Ліва колонка - Сайдбар */}
            <aside className="w-full md:w-1/4 lg:w-1/5">
              <ProfileSidebar user={userDataa} />
            </aside>

            {/* Права колонка - Картки (буде притиснута до правого краю) */}
            <main className="w-full md:w-2/3 lg:w-4/6 space-y-3">
              <AssessmentBlock
                isCompleted={!!resultKey}
                resultsData={currentResults}
                onRetry={() => {
                  // Очищаємо результат і відправляємо на тест
                  localStorage.removeItem('quiz_result_key');
                  setResultKey(null);
                  navigate('/quiz'); // Шлях до вашого нового компонента тесту
                }}
                onStart={() => {
                  navigate('/quiz'); // Перехід на початок тесту
                }}
              />

              {/* Показуємо рекомендації тільки якщо тест пройдено */}
              <RecommendationCards />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
