import { FC, useMemo } from 'react'; // Импорт хуков
import { TConstructorIngredient } from '@utils-types'; // Тип для ингредиента конструктора
import { BurgerConstructorUI } from '@ui'; // UI-компонент конструктора бургера
import { useDispatch, useSelector } from '@store'; // Redux хуки
import { useNavigate } from 'react-router-dom'; // Хук для навигации
import {
  getConstructorState,
  orderBurger,
  setRequest,
  resetModal
} from '../../services/slices/constructorSlice/constructorSlice'; // Экшены и селектор конструктора
import { getUserState } from '../../services/slices/userSlice/userSlice'; // Селектор пользователя

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate(); // Хук для программной навигации
  const { constructorItems, orderModalData, orderRequest } =
    useSelector(getConstructorState); // Данные конструктора из store
  const isAuth = useSelector(getUserState).isAuthenticated; // Флаг авторизации

  const dispatch = useDispatch(); // Хук для отправки экшенов

  // Формируем массив ID ингредиентов для заказа
  let arr: string[] = [];
  const ingredients: string[] | void = constructorItems.ingredients.map(
    (i) => i._id
  );
  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    arr = [bun, ...ingredients, bun]; // Добавляем булку в начало и конец
  }

  // Обработчик оформления заказа
  const onOrderClick = () => {
    if (isAuth && constructorItems.bun) {
      dispatch(setRequest(true)); // Устанавливаем флаг загрузки
      dispatch(orderBurger(arr)); // Отправляем заказ
    } else if (isAuth && !constructorItems.bun) {
      return; // Не делаем ничего если нет булки
    } else if (!isAuth) {
      navigate('/login'); // Перенаправляем на логин если не авторизованы
    }
  };

  // Закрытие модалки заказа
  const closeOrderModal = () => {
    dispatch(setRequest(false)); // Сбрасываем флаг загрузки
    dispatch(resetModal()); // Очищаем данные модалки
  };

  // Вычисляем общую стоимость
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) + // Цена булки (x2)
      constructorItems.ingredients.reduce(
        // Плюс сумма ингредиентов
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems] // Зависимости для пересчёта
  );

  return (
    <BurgerConstructorUI
      price={price} // Общая стоимость бургера
      orderRequest={orderRequest} // Флаг состояния заказа
      constructorItems={constructorItems} // Собранные ингредиенты и булка
      orderModalData={orderModalData} // Данные для модального окна заказа
      onOrderClick={onOrderClick} // Обработчик клика по кнопке заказа
      closeOrderModal={closeOrderModal} // Обработчик закрытия модального окна
    />
  );
};
