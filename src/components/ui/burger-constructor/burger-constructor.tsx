import React, { FC } from 'react'; // Базовый импорт React
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components'; // UI-компоненты
import styles from './burger-constructor.module.css'; // Стили компонента
import { BurgerConstructorUIProps } from './type'; // Типы пропсов
import { TConstructorIngredient } from '@utils-types'; // Тип ингредиента конструктора
import { BurgerConstructorElement, Modal } from '@components'; // Компоненты приложения
import { Preloader, OrderDetailsUI } from '@ui'; // UI-компоненты

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems, // Ингредиенты конструктора
  orderRequest, // Флаг выполнения заказа
  price, // Общая стоимость
  orderModalData, // Данные заказа для модалки
  onOrderClick, // Обработчик оформления заказа
  closeOrderModal // Обработчик закрытия модалки
}) => (
  <section className={styles.burger_constructor}>
    {/* Основной контейнер */}
    {/* Верхняя булка */}
    {constructorItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type='top'
          isLocked // Фиксированная позиция
          text={`${constructorItems.bun.name} (верх)`} // Название с пометкой
          price={constructorItems.bun.price} // Цена булки
          thumbnail={constructorItems.bun.image} // Изображение
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки {/* Плейсхолдер при отсутствии булки */}
      </div>
    )}

    {/* Список начинок */}
    <ul className={styles.elements}>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map(
          (item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              ingredient={item} // Данные ингредиента
              index={index} // Позиция в списке
              totalItems={constructorItems.ingredients.length} // Общее количество
              key={item.id} // Уникальный ключ
            />
          )
        )
      ) : (
        <div
          className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите начинку {/* Плейсхолдер при отсутствии начинок */}
        </div>
      )}
    </ul>

    {/* Нижняя булка */}
    {constructorItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}

    {/* Блок итогов и кнопки */}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        {/* Общая сумма */}
        <CurrencyIcon type='primary' /> {/* Иконка валюты */}
      </div>
      <Button
        htmlType='button'
        type='primary' // Стиль кнопки
        size='large' // Размер
        children='Оформить заказ' // Текст
        onClick={onOrderClick} // Обработчик
        data-cy='order-button' // Атрибут для тестов
      />
    </div>

    {/* Модальное окно загрузки */}
    {orderRequest && (
      <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
        <Preloader /> {/* Индикатор загрузки */}
      </Modal>
    )}

    {/* Модальное окно с номером заказа */}
    {orderModalData && (
      <Modal
        onClose={closeOrderModal}
        title={orderRequest ? 'Оформляем заказ...' : ''} // Условный заголовок
      >
        <OrderDetailsUI orderNumber={orderModalData.number} />
        {/* Номер заказа */}
      </Modal>
    )}
  </section>
);
