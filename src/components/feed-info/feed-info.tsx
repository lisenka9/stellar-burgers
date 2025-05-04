import { FC } from 'react';
import { TOrder } from '@utils-types'; // Тип заказа
import { FeedInfoUI } from '../ui/feed-info'; // UI-компонент информации о ленте заказов
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { getFeedState } from '../../services/slices/feedSlice/feedSlice'; // Селектор ленты заказов

// Вспомогательная функция для фильтрации заказов по статусу
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status) // Фильтруем по статусу
    .map((item) => item.number) // Берем только номера заказов
    .slice(0, 20); // Ограничиваем 20 заказами

export const FeedInfo: FC = () => {
  // Получаем данные из Redux store
  const { orders, total, totalToday } = useSelector(getFeedState);

  // Формируем объект с данными для UI
  const feed = { orders, total, totalToday };

  // Готовые заказы (статус 'done')
  const readyOrders = getOrders(orders, 'done');

  // Заказы в работе (статус 'pending')
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders} // Передаем список готовых заказов
      pendingOrders={pendingOrders} // Передаем список заказов в работе
      feed={feed} // Передаем общую информацию о ленте заказов
    />
  );
};
