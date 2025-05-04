import { FC, SyntheticEvent, useState } from 'react'; // Базовые хуки React
import { LoginUI } from '@ui-pages'; // UI-компонент страницы входа
import { useDispatch, useSelector } from '@store'; // Redux хуки
import { Navigate } from 'react-router-dom'; // Компонент для редиректа
import {
  getError, // Селектор ошибки
  getUserState, // Селектор состояния пользователя
  loginUser // Экшен входа
} from '../../services/slices/userSlice/userSlice'; // Слайс пользователя

export const Login: FC = () => {
  // Локальное состояние формы
  const [email, setEmail] = useState(''); // Email пользователя
  const [password, setPassword] = useState(''); // Пароль пользователя
  // Получаем данные из Redux store
  const error = useSelector(getError); // Ошибка авторизации
  const { isAuthenticated } = useSelector(getUserState); // Флаг авторизации
  const dispatch = useDispatch(); // Хук для отправки экшенов

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    // Проверяем заполнение полей
    if (!email || !password) {
      return;
    }
    // Отправляем экшен входа
    dispatch(loginUser({ email, password }));
  };

  // Если пользователь уже авторизован - редирект на главную
  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  // Рендерим UI компонент с необходимыми пропсами
  return (
    <LoginUI
      errorText={error?.toString()} // Текст ошибки (если есть)
      email={email} // Текущий email
      setEmail={setEmail} // Функция обновления email
      password={password} // Текущий пароль
      setPassword={setPassword} // Функция обновления пароля
      handleSubmit={handleSubmit} // Обработчик отправки формы
    />
  );
};
