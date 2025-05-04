import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Хуки для навигации
import { ProfileMenuUI } from '@ui'; // UI-компонент меню профиля
import { useDispatch } from '@store'; // Хук для отправки экшенов
import { logoutUser } from '../../services/slices/userSlice/userSlice'; // Экшен выхода из системы

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation(); // Получаем текущий путь
  const dispatch = useDispatch(); // Получаем функцию dispatch
  const navigate = useNavigate(); // Получаем функцию навигации

  // Обработчик выхода из системы
  const handleLogout = () => {
    dispatch(logoutUser()); // Отправляем экшен выхода
    navigate('/'); // Перенаправляем на главную страницу
  };

  // Рендерим UI компонент меню профиля
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
