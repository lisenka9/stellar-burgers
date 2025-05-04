import React, { FC, memo } from 'react'; // Базовый импорт React
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components'; // UI-компоненты

import styles from './order-info.module.css'; // Стили компонента

import { OrderInfoUIProps } from './type'; // Типы пропсов
import { OrderStatus } from '@components'; // Компонент статуса заказа

export const OrderInfoUI: FC<OrderInfoUIProps> = memo(({ orderInfo }) => (
  <div className={styles.wrap}>
    {/* Основной контейнер */}
    {/* Заголовок с названием заказа */}
    <h3 className={`text text_type_main-medium pb-3 pt-10 ${styles.header}`}>
      {orderInfo.name} {/* Название заказа */}
    </h3>

    {/* Статус заказа */}
    <OrderStatus status={orderInfo.status} />

    {/* Секция со списком ингредиентов */}
    <p className={`text text_type_main-medium pt-15 pb=6`}>Состав:</p>
    <ul className={`${styles.list} mb-8`}>
      {/* Список ингредиентов */}
      {Object.values(orderInfo.ingredientsInfo).map((item, index) => (
        <li className={`pb-4 pr-6 ${styles.item}`} key={index}>
          {/* Элемент списка */}
          <div className={styles.img_wrap}>
            {/* Контейнер для изображения */}
            <div className={styles.border}>
              {/* Обводка изображения */}
              <img
                className={styles.img}
                src={item.image_mobile} // Изображение ингредиента
                alt={item.name} // Альтернативный текст
              />
            </div>
          </div>
          <span className='text text_type_main-default pl-4'>{item.name}</span>
          {/* Название */}
          <span
            className={`text text_type_digits-default pl-4 pr-4 ${styles.quantity}`}
          >
            {item.count} x {item.price} {/* Количество и цена */}
          </span>
          <CurrencyIcon type={'primary'} /> {/* Иконка валюты */}
        </li>
      ))}
    </ul>

    {/* Нижний блок с датой и суммой */}
    <div className={styles.bottom}>
      <p className='text text_type_main-default text_color_inactive'>
        <FormattedDate date={orderInfo.date} /> {/* Форматированная дата */}
      </p>
      <span className={`text text_type_digits-default pr-4 ${styles.total}`}>
        {orderInfo.total} {/* Общая сумма */}
      </span>
      <CurrencyIcon type={'primary'} /> {/* Иконка валюты */}
    </div>
  </div>
));
