import { FC, useEffect, useMemo } from 'react'; // Базовые хуки React
import { Preloader } from '../ui/preloader'; // Компонент-заглушка для загрузки
import { OrderInfoUI } from '../ui/order-info'; // UI-компонент информации о заказе
import { TIngredient } from '@utils-types'; // Тип ингредиента
import { useSelector, useDispatch } from '@store'; // Redux хуки
import { useParams } from 'react-router-dom'; // Хук для работы с параметрами URL
import {
  getOrderByNumber,
  getOrderState
} from '../../services/slices/orderSlice/orderSlice'; // Экшены и селектор заказов
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice'; // Селектор ингредиентов

export const OrderInfo: FC = () => {
  const number = Number(useParams().number); // Получаем номер заказа из URL
  const { ingredients } = useSelector(getIngredientState); // Получаем список ингредиентов
  const { orderByNumberResponse, request } = useSelector(getOrderState); // Данные заказа и статус запроса
  const dispatch = useDispatch(); // Хук для отправки экшенов

  // Загружаем данные заказа при монтировании
  useEffect(() => {
    dispatch(getOrderByNumber(number)); // Отправляем запрос на получение заказа
  }, []); // Пустой массив зависимостей - эффект только при монтировании

  // Мемоизированный расчет данных для отображения
  const orderInfo = useMemo(() => {
    if (!orderByNumberResponse || !ingredients.length) return null; // Проверка наличия данных

    const date = new Date(orderByNumberResponse.createdAt); // Преобразуем дату заказа

    // Тип для ингредиентов с учетом их количества в заказе
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    // Собираем информацию об ингредиентах с подсчетом количества
    const ingredientsInfo = orderByNumberResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          // Если ингредиента еще нет в аккумуляторе
          const ingredient = ingredients.find((ing) => ing._id === item); // Находим ингредиент
          if (ingredient) {
            acc[item] = {
              // Добавляем в аккумулятор
              ...ingredient,
              count: 1 // Начальное количество
            };
          }
        } else {
          acc[item].count++; // Увеличиваем счетчик если ингредиент уже есть
        }
        return acc;
      },
      {} // Начальное значение аккумулятора
    );

    // Считаем общую стоимость заказа
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count, // Умножаем цену на количество
      0 // Начальное значение
    );

    return {
      // Возвращаем объект с данными для отображения
      ...orderByNumberResponse, // Все данные заказа
      ingredientsInfo, // Ингредиенты с количеством
      date, // Дата заказа
      total // Общая стоимость
    };
  }, [orderByNumberResponse, ingredients]); // Зависимости для пересчета

  // Показываем прелоадер если данные загружаются или отсутствуют
  if (!orderInfo || request) {
    return <Preloader />;
  }

  // Рендерим UI с данными заказа
  return <OrderInfoUI orderInfo={orderInfo} />;
};
