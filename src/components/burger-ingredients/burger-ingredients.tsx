import { useState, useRef, useEffect, FC } from 'react'; // Базовые хуки React
import { useInView } from 'react-intersection-observer'; // Хук для отслеживания видимости элементов
import { TTabMode } from '@utils-types'; // Тип для табов
import { BurgerIngredientsUI } from '../ui/burger-ingredients'; // UI-компонент
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice'; // Селектор ингредиентов

export const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector(getIngredientState); // Получаем все ингредиенты из store

  // Фильтруем ингредиенты по категориям
  const buns = ingredients.filter((i) => i.type === 'bun'); // Булки
  const mains = ingredients.filter((i) => i.type === 'main'); // Начинки
  const sauces = ingredients.filter((i) => i.type === 'sauce'); // Соусы

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun'); // Текущий активный таб

  // Рефы для заголовков секций
  const titleBunRef = useRef<HTMLHeadingElement>(null); // Реф для секции булок
  const titleMainRef = useRef<HTMLHeadingElement>(null); // Реф для секции начинок
  const titleSaucesRef = useRef<HTMLHeadingElement>(null); // Реф для секции соусов

  // Хуки для отслеживания видимости секций
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 }); // Видимость булок
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 }); // Видимость начинок
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 }); // Видимость соусов

  // Эффект для автоматического переключения табов при скролле
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun'); // Активируем таб булок
    } else if (inViewSauces) {
      setCurrentTab('sauce'); // Активируем таб соусов
    } else if (inViewFilling) {
      setCurrentTab('main'); // Активируем таб начинок
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  // Обработчик клика по табу
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode); // Устанавливаем активный таб
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' }); // Скролл к булкам
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' }); // Скролл к начинкам
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' }); // Скролл к соусам
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab} // Активный таб
      buns={buns} // Список булок
      mains={mains} // Список начинок
      sauces={sauces} // Список соусов
      titleBunRef={titleBunRef} // Реф заголовка булок
      titleMainRef={titleMainRef} // Реф заголовка начинок
      titleSaucesRef={titleSaucesRef} // Реф заголовка соусов
      bunsRef={bunsRef} // Реф для отслеживания видимости булок
      mainsRef={mainsRef} // Реф для отслеживания видимости начинок
      saucesRef={saucesRef} // Реф для отслеживания видимости соусов
      onTabClick={onTabClick} // Обработчик клика по табам
    />
  );
};
