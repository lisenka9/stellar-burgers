import styles from './constructor-page.module.css'; // Стили страницы конструктора

import { BurgerIngredients } from '../../components'; // Компонент ингредиентов
import { BurgerConstructor } from '../../components'; // Компонент конструктора
import { Preloader } from '../../components/ui'; // Компонент-заглушка
import { FC } from 'react'; // Тип Functional Component
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice'; // Селектор ингредиентов

export const ConstructorPage: FC = () => {
  // Получаем статус загрузки ингредиентов из Redux store
  const isIngredientsLoading = useSelector(getIngredientState).loading;

  return (
    <>
      {isIngredientsLoading ? ( // Если данные загружаются
        <Preloader /> // Показываем индикатор загрузки
      ) : (
        // Иначе рендерим основную страницу
        <main className={styles.containerMain}>
          {/* Основной контейнер */}
          {/* Заголовок страницы */}
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          {/* Основное содержимое - два столбца */}
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients /> {/* Левая часть - список ингредиентов */}
            <BurgerConstructor /> {/* Правая часть - текущий конструктор */}
          </div>
        </main>
      )}
    </>
  );
};
