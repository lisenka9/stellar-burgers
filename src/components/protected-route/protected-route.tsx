import { Navigate, Outlet, useLocation } from 'react-router-dom'; // Компоненты и хуки роутинга
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { Preloader } from '../ui/preloader'; // Компонент-заглушка для загрузки
import { getUserState } from '../../services/slices/userSlice/userSlice'; // Селектор пользователя

type ProtectedRouteProps = {
  onlyUnAuth?: boolean; // Флаг маршрута только для неавторизованных
};

export const ProtectedRoute = ({
  onlyUnAuth // Деструктуризация пропсов
}: ProtectedRouteProps) => {
  const location = useLocation(); // Получаем текущий маршрут

  // Получаем данные пользователя из Redux store
  const data = useSelector(getUserState).userData; // Данные пользователя
  const isAuthChecked = useSelector(getUserState).isAuthChecked; // Флаг проверки авторизации
  const isAuthenticated = useSelector(getUserState).isAuthenticated; // Флаг авторизации

  // Если маршрут защищен и пользователь не авторизован
  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />; // Редирект на логин
  }

  // Если маршрут только для неавторизованных и пользователь авторизован
  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' }; // Получаем предыдущий маршрут или главную
    return <Navigate replace to={from} />; // Редирект обратно
  }

  // Если проверка авторизации еще не завершена
  if (isAuthChecked) {
    return <Preloader />; // Показываем прелоадер
  }

  return <Outlet />; // Рендерим дочерние маршруты
};
