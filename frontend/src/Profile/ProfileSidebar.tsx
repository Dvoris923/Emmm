interface UserProps {
  user: {
    name: string;
    age: number;
    city: string;
    email: string;
    interests: string[];
  } | null; // може бути null, якщо дані ще не завантажені
}

export const ProfileSidebar: React.FC = ({ user }): UserProps => {
  if (!user) {
    return (
      <div className="p-6 bg-white rounded-3xl shadow-sm">Завантаження...</div>
    );
  }

  return (
    <div className="relative w-full bg-white rounded-3xl min-w-80 shadow-sm p-6 pt-16 flex flex-col items-start text-left">
      <div className="absolute w-full  -top-16 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0">
        <div className="relative">
          <img
            src="./../../public/icons/profile_icon_main.svg"
            className="w-32 h-32 rounded-full border-1 border-white shadow-lg object-cover bg-gray-200"
            alt="Avatar"
          />
        </div>
      </div>

      <h2 className="text-xl pt-6 font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-500 text-sm mb-4">{user.age} років • Хлопець</p>

      <div className="w-full space-y-2 text-left text-sm text-gray-600 mb-6">
        <div className="w-full flex items-center gap-2">
          <span>📍 {user.city}</span>
        </div>
        <div className="w-full flex items-center gap-2">
          <span>✉️ {user.email}</span>
        </div>
      </div>

      <div className="w-full text-left">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Захоплення</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map(item => (
            <span
              key={item}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-indigo-900/80 border border-gray-200 shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <button className="mt-10 text-purple-600 border border-purple-200 w-full py-2 rounded-xl hover:bg-purple-50 transition">
        Вийти з акаунту
      </button>
    </div>
  );
};
