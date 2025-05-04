import { FC } from 'react'; // Импорт типа Functional Component
import { AppHeaderUI } from '@ui'; // Импорт UI-компонента шапки
import { useSelector } from '@store'; // Хук для доступа к состоянию Redux
import { getUserState } from '../../services/slices/userSlice/userSlice'; // Селектор данных пользователя

export const AppHeader: FC = () => {
  const data = useSelector(getUserState).userData; // Получаем данные пользователя из store
  // Рендер UI-компонента с именем пользователя (если есть) или пустой строкой
  return <AppHeaderUI userName={data?.name || ''} />;
};
