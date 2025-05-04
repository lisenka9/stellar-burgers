import { FC, SyntheticEvent, useState } from 'react'; // Базовые хуки React
import { RegisterUI } from '@ui-pages'; // UI-компонент страницы регистрации
import { useDispatch, useSelector } from '@store'; // Redux хуки
import {
  getError, // Селектор ошибки
  registerUser // Экшен регистрации
} from '../../services/slices/userSlice/userSlice'; // Слайс пользователя
import { useNavigate } from 'react-router-dom'; // Хук для навигации

export const Register: FC = () => {
  // Локальное состояние формы
  const [userName, setUserName] = useState(''); // Имя пользователя
  const [email, setEmail] = useState(''); // Email пользователя
  const [password, setPassword] = useState(''); // Пароль пользователя

  const navigate = useNavigate(); // Хук для программной навигации
  const dispatch = useDispatch(); // Хук для отправки экшенов
  const error = useSelector(getError); // Ошибка регистрации

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    dispatch(registerUser({ email, password, name: userName })); // Отправляем данные регистрации
    navigate('/login'); // Перенаправляем на страницу входа
  };

  // Рендерим UI компонент с необходимыми пропсами
  return (
    <RegisterUI
      errorText={error?.toString()} // Текст ошибки (если есть)
      email={email} // Текущий email
      userName={userName} // Текущее имя пользователя
      password={password} // Текущий пароль
      setEmail={setEmail} // Функция обновления email
      setPassword={setPassword} // Функция обновления пароля
      setUserName={setUserName} // Функция обновления имени
      handleSubmit={handleSubmit} // Обработчик отправки формы
    />
  );
};
