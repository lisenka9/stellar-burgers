import { FC, memo, useEffect, useState } from 'react'; // Базовые хуки React
import { CenteringComponentUI } from '../ui/centering-component'; // UI-компонент
import { TCentering } from './type'; // Типы пропсов компонента
import { useLocation } from 'react-router-dom'; // Хук для получения текущего пути

export const CenteringComponent: FC<TCentering> = memo(
  ({ title, children }) => {
    // Принимаем пропсы: заголовок и дочерние элементы
    const location = useLocation(); // Получаем текущий route location
    const [titleStyle, setTitleStyle] = useState('text_type_main-large'); // Стиль заголовка по умолчанию

    // Эффект для изменения стиля заголовка на некоторых страницах
    useEffect(() => {
      if (/feed|profile/i.test(location.pathname)) {
        // Проверяем путь
        setTitleStyle('text_type_digits-default'); // Устанавливаем альтернативный стиль
      }
    }, []); // Пустой массив зависимостей - эффект только при монтировании

    return (
      <>
        <CenteringComponentUI
          title={title} // Передаем заголовок
          titleStyle={titleStyle} // Передаем стиль заголовка
          children={children} // Передаем дочерние элементы
        />
      </>
    );
  }
);
