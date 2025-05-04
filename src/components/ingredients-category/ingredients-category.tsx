import { forwardRef, useMemo } from 'react'; // Импорт хуков
import { TIngredientsCategoryProps } from './type'; // Типы пропсов компонента
import { TIngredient } from '@utils-types'; // Тип ингредиента
import { IngredientsCategoryUI } from '../ui/ingredients-category'; // UI-компонент категории ингредиентов
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { getConstructorState } from '../../services/slices/constructorSlice/constructorSlice'; // Селектор конструктора

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorItems = useSelector(getConstructorState).constructorItems; // Получаем текущие ингредиенты конструктора

  // Считаем количество каждого ингредиента в конструкторе
  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = constructorItems;
    const counters: { [key: string]: number } = {}; // Объект для хранения счетчиков
    ingredients.forEach((ingredient: TIngredient) => {
      // Считаем начинки
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2; // Булки всегда учитываются как 2 штуки
    return counters; // Возвращаем объект с количеством каждого ингредиента
  }, [constructorItems]); // Зависимость от constructorItems

  return (
    <IngredientsCategoryUI
      title={title} // Название категории
      titleRef={titleRef} // Реф для заголовка категории
      ingredients={ingredients} // Список ингредиентов категории
      ingredientsCounters={ingredientsCounters} // Количество каждого ингредиента в конструкторе
      ref={ref} // Реф для списка ингредиентов
    />
  );
});
