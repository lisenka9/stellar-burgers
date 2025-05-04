import React, { FC } from 'react'; // Базовый импорт
import styles from './app-header.module.css'; // Стили компонента
import { TAppHeaderUIProps } from './type'; // Типы пропсов
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components'; // UI-иконки
import { Link, NavLink, useLocation } from 'react-router-dom'; // Компоненты роутинга

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation().pathname; // Получаем текущий путь
  let ref = '/'; // Дефолтная ссылка для конструктора
  // Определяем активную ссылку для конструктора
  if (location.match(`/ingredients/`)) {
    ref = location; // Если находимся на странице ингредиента
  } else if (location === '/') {
    ref = location; // Если на главной странице
  }

  return (
    <header className={styles.header}>
      {/* Основной контейнер шапки */}
      <nav className={`${styles.menu} p-4`}>
        {/* Навигационное меню */}
        <div className={styles.menu_part_left}>
          {/* Левая часть меню */}
          <NavLink
            to={ref} // Динамическая ссылка для конструктора
            className={({ isActive }) =>
              // Динамические классы для активного состояния
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end={false} // Не точное совпадение пути
          >
            <BurgerIcon type={'primary'} /> {/* Иконка конструктора */}
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>

          <NavLink
            to={'/feed'} // Ссылка на ленту заказов
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <ListIcon type={'primary'} /> {/* Иконка ленты заказов */}
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>

        {/* Центральная часть - логотип */}
        <div className={styles.logo}>
          <NavLink
            to={'/'} // Ссылка на главную
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <Logo className='' /> {/* Логотип приложения */}
          </NavLink>
        </div>

        {/* Правая часть - личный кабинет */}
        <div className={styles.link_position_last}>
          {userName ? ( // Если пользователь авторизован
            <NavLink
              to={'/profile'} // Ссылка на профиль
              className={({ isActive }) =>
                `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                  styles.link
                } ${isActive ? styles.link_active : ''}`
              }
              end={false}
            >
              <ProfileIcon type={'primary'} /> {/* Иконка профиля */}
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </NavLink>
          ) : (
            // Если не авторизован
            <NavLink
              to={'/login'} // Ссылка на страницу входа
              className={({ isActive }) =>
                `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                  styles.link
                } ${isActive ? styles.link_active : ''}`
              }
              end={false}
            >
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
