import { ProfileOrdersUI } from '@ui-pages'; // UI-компонент истории заказов
import { FC, useEffect } from 'react'; // Базовые хуки React
import { useSelector, useDispatch } from '@store'; // Redux хуки
import {
  getOrdersAll, // Экшен получения заказов пользователя
  getUserState // Селектор состояния пользователя
} from '../../services/slices/userSlice/userSlice'; // Слайс пользователя
import { getFeeds } from '../../services/slices/feedSlice/feedSlice'; // Экшен получения ленты заказов
import { Preloader } from '@ui'; // Компонент-заглушка

export const ProfileOrders: FC = () => {
  // Получаем данные из Redux store
  const { userOrders, request } = useSelector(getUserState); // Заказы пользователя и статус запроса
  const dispatch = useDispatch(); // Хук для отправки экшенов

  // Эффект для загрузки данных при монтировании
  useEffect(() => {
    dispatch(getOrdersAll()); // Загружаем заказы пользователя
    dispatch(getFeeds()); // Загружаем общую ленту заказов
  }, []); // Пустой массив зависимостей - только при монтировании

  // Показываем прелоадер во время загрузки
  if (request === true) {
    return <Preloader />;
  }

  // Рендерим UI компонент с заказами пользователя
  return <ProfileOrdersUI orders={userOrders} />;
};
