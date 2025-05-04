import { Preloader } from '@ui'; // Компонент-заглушка для загрузки
import { FeedUI } from '@ui-pages'; // UI-компонент ленты заказов
import { FC, useEffect } from 'react'; // Базовые хуки React
import { useSelector, useDispatch } from '@store'; // Redux хуки
import {
  getFeedState, // Селектор состояния ленты
  getFeeds // Экшен для получения заказов
} from '../../services/slices/feedSlice/feedSlice'; // Слайс ленты заказов

export const Feed: FC = () => {
  // Получаем данные из Redux store
  const { orders, loading } = useSelector(getFeedState);
  const dispatch = useDispatch();

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    dispatch(getFeeds()); // Отправляем экшен для получения заказов
  }, []); // Пустой массив зависимостей - только при монтировании

  // Показываем прелоадер во время загрузки
  if (loading) {
    return <Preloader />;
  }

  // Рендерим UI компонент с данными и функцией обновления
  return (
    <FeedUI
      orders={orders} // Список заказов
      handleGetFeeds={() => dispatch(getFeeds())} // Функция обновления данных
    />
  );
};
