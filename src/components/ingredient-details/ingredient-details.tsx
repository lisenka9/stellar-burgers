import { FC } from 'react';
import { Preloader } from '../ui/preloader'; // Компонент-заглушка для загрузки
import { IngredientDetailsUI } from '../ui/ingredient-details'; // UI-компонент деталей ингредиента
import { Params, useParams } from 'react-router-dom'; // Хуки для работы с параметрами URL
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice'; // Селектор ингредиентов

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector(getIngredientState); // Получаем список ингредиентов из store
  const { id } = useParams<Params>(); // Получаем ID ингредиента из URL

  // Находим ингредиент по ID
  const ingredientData = ingredients.find((i) => {
    if (i._id === id) {
      return i;
    }
  });

  // Если ингредиент не найден, показываем прелоадер
  if (!ingredientData) {
    return <Preloader />;
  }

  // Рендерим UI с данными ингредиента
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
