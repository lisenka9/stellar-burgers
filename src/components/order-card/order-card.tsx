import { FC, memo, useMemo } from 'react'; // Базовые хуки React
import { useLocation } from 'react-router-dom'; // Хук для получения текущего пути
import { OrderCardProps } from './type'; // Типы пропсов компонента
import { TIngredient } from '@utils-types'; // Тип ингредиента
import { OrderCardUI } from '../ui/order-card'; // UI-компонент карточки заказа
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice'; // Селектор ингредиентов

const maxIngredients = 6; // Максимальное количество отображаемых ингредиентов

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation(); // Получаем текущий route location
  const { ingredients } = useSelector(getIngredientState); // Получаем список всех ингредиентов

  // Мемоизированный расчет данных для отображения
  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null; // Если ингредиенты не загружены

    // Собираем полную информацию об ингредиентах заказа
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item); // Находим ингредиент по ID
        if (ingredient) return [...acc, ingredient]; // Добавляем в аккумулятор если найден
        return acc;
      },
      [] // Начальное значение аккумулятора
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0); // Считаем общую сумму
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients); // Берем первые 6 ингредиентов
    const remains = // Считаем сколько ингредиентов не поместилось
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt); // Преобразуем дату
    return {
      // Возвращаем объект с данными для отображения
      ...order, // Все данные заказа
      ingredientsInfo, // Полный список ингредиентов
      ingredientsToShow, // Ингредиенты для отображения
      remains, // Количество скрытых ингредиентов
      total, // Общая сумма
      date // Дата заказа
    };
  }, [order, ingredients]); // Зависимости для пересчета

  if (!orderInfo) return null; // Не рендерим если нет данных

  return (
    <OrderCardUI
      orderInfo={orderInfo} // Данные для отображения
      maxIngredients={maxIngredients} // Максимальное число ингредиентов
      locationState={{ background: location }} // Состояние для модального окна
    />
  );
});
