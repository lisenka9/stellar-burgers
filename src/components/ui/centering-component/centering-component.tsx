import { FC, memo } from 'react'; // Базовый импорт React и memo для оптимизации
import { TCenteringComponentUI } from './type'; // Типы пропсов компонента
import styles from './centering-component.module.css'; // Стили компонента

export const CenteringComponentUI: FC<TCenteringComponentUI> = memo(
  ({ title, titleStyle, children }) => (
    // Деструктуризация пропсов
    <>
      {/* Основной контейнер для центрирования */}
      <div className={styles.center}>
        {/* Заголовочная часть с центрированием */}
        <div className={styles.headerCenter}>
          {/* Заголовок с динамическим стилем */}
          <h3 className={`text ${titleStyle}`}>{title}</h3>
        </div>
        {/* Дочерние элементы (основное содержимое) */}
        <div>{children}</div>
      </div>
    </>
  )
);
