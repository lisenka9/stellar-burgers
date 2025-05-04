import { FC, memo } from 'react'; // Импорт FC и memo для оптимизации
import { BurgerConstructorElementUI } from '@ui'; // UI-компонент элемента конструктора
import { BurgerConstructorElementProps } from './type'; // Типы пропсов компонента
import { useDispatch } from 'react-redux'; // Хук для dispatch экшенов
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/constructorSlice/constructorSlice'; // Экшены конструктора

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    // Принимаем пропсы: ингредиент, индекс и общее количество
    const dispatch = useDispatch(); // Получаем функцию dispatch

    const handleMoveDown = () => {
      // Обработчик перемещения вниз
      dispatch(moveIngredientDown(index)); // Диспатч экшена с текущим индексом
    };

    const handleMoveUp = () => {
      // Обработчик перемещения вверх
      dispatch(moveIngredientUp(index)); // Диспатч экшена с текущим индексом
    };

    const handleClose = () => {
      // Обработчик удаления ингредиента
      dispatch(removeIngredient(ingredient.id)); // Диспатч экшена с ID ингредиента
    };

    return (
      <BurgerConstructorElementUI // Рендер UI-компонента
        ingredient={ingredient} // Передаем ингредиент
        index={index} // Передаем индекс
        totalItems={totalItems} // Передаем общее количество
        handleMoveUp={handleMoveUp} // Передаем обработчик перемещения вверх
        handleMoveDown={handleMoveDown} // Передаем обработчик перемещения вниз
        handleClose={handleClose} // Передаем обработчик удаления
      />
    );
  }
);
