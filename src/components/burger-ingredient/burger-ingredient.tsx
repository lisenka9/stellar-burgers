import { FC, memo } from 'react'; // Импорт FC и memo для оптимизации
import { useLocation } from 'react-router-dom'; // Хук для получения текущего пути
import { BurgerIngredientUI } from '@ui'; // UI-компонент ингредиента
import { TBurgerIngredientProps } from './type'; // Типы пропсов компонента
import { useDispatch } from 'react-redux'; // Хук для dispatch экшенов
import { addIngredient } from '../../services/slices/constructorSlice/constructorSlice'; // Экшен добавления ингредиента

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    // Принимаем пропсы: ингредиент и его количество
    const location = useLocation(); // Получаем текущий location
    const dispatch = useDispatch(); // Получаем функцию dispatch

    const handleAdd = () => {
      // Обработчик добавления ингредиента
      dispatch(addIngredient(ingredient)); // Диспатч экшена с текущим ингредиентом
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient} // Объект ингредиента
        count={count} // Количество данного ингредиента
        locationState={{ background: location }} // Состояние для модального окна
        handleAdd={handleAdd} // Обработчик добавления ингредиента
      />
    );
  }
);
