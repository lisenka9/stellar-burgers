import React, { FC } from 'react'; // Базовый импорт React
import { OrderStatusProps } from './type'; // Типы пропсов компонента
import { OrderStatusUI } from '@ui'; // UI-компонент статуса заказа

// Маппинг статусов на читаемые названия
const statusText: { [key: string]: string } = {
  pending: 'Готовится', // Статус "в процессе приготовления"
  done: 'Выполнен', // Статус "готов/выполнен"
  created: 'Создан' // Статус "создан/ожидает обработки"
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  // Определяем цвет текста в зависимости от статуса
  let textStyle = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A'; // Красный для "готовится"
      break;
    case 'done':
      textStyle = '#00CCCC'; // Бирюзовый для "выполнен"
      break;
    default:
      textStyle = '#F2F2F3'; // Светлый серый по умолчанию
  }

  // Рендерим UI компонент с нужным цветом и текстом
  return <OrderStatusUI textStyle={textStyle} text={statusText[status]} />;
};
