import { ProfileUI } from '@ui-pages'; // UI-компонент профиля
import { FC, SyntheticEvent, useEffect, useState } from 'react'; // Базовые хуки React
import { useSelector, useDispatch } from '@store'; // Redux хуки
import {
  getUser, // Экшен получения данных пользователя
  getUserState, // Селектор состояния пользователя
  updateUser // Экшен обновления данных
} from '../../services/slices/userSlice/userSlice'; // Слайс пользователя
import { Preloader } from '@ui'; // Компонент-заглушка

export const Profile: FC = () => {
  // Получаем данные из Redux store
  const data = useSelector(getUserState).userData; // Данные пользователя
  const loading = useSelector(getUserState).request; // Флаг загрузки
  const dispatch = useDispatch(); // Хук для отправки экшенов

  // Формируем объект с текущими данными пользователя
  const user = {
    name: data?.name || '', // Имя (или пустая строка)
    email: data?.email || '' // Email (или пустая строка)
  };

  // Локальное состояние формы
  const [formValue, setFormValue] = useState({
    name: user.name, // Имя из профиля
    email: user.email, // Email из профиля
    password: '' // Пароль (пустой по умолчанию)
  });

  // Эффект для синхронизации формы при изменении данных пользователя
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user.name || '', // Обновляем имя
      email: user.email || '' // Обновляем email
    }));
  }, [data]); // Зависимость от данных пользователя

  // Проверяем, были ли изменения в форме
  const isFormChanged =
    formValue.name !== user?.name || // Изменилось имя
    formValue.email !== user?.email || // Изменился email
    !!formValue.password; // Был введен пароль

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение
    dispatch(updateUser(formValue)); // Отправляем обновленные данные
    dispatch(getUser()); // Запрашиваем актуальные данные
  };

  // Показываем прелоадер во время загрузки
  if (loading) {
    return <Preloader />;
  }

  // Обработчик отмены изменений
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // Сбрасываем форму к исходным значениям
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value // Динамическое обновление поля
    }));
  };

  // Рендерим UI компонент с необходимыми пропсами
  return (
    <ProfileUI
      formValue={formValue} // Текущие значения формы
      isFormChanged={isFormChanged} // Флаг изменений
      handleCancel={handleCancel} // Обработчик отмены
      handleSubmit={handleSubmit} // Обработчик отправки
      handleInputChange={handleInputChange} // Обработчик изменений
    />
  );
};
