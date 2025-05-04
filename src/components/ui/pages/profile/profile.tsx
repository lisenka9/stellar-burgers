import { FC } from 'react'; // Базовый импорт React
import { Button, Input } from '@zlden/react-developer-burger-ui-components'; // UI-компоненты
import styles from './profile.module.css'; // Локальные стили
import commonStyles from '../common.module.css'; // Общие стили

import { ProfileUIProps } from './type'; // Типы пропсов
import { ProfileMenu } from '@components'; // Компонент меню профиля

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue, // Значения формы
  isFormChanged, // Флаг изменений формы
  updateUserError, // Ошибка обновления
  handleSubmit, // Обработчик отправки
  handleCancel, // Обработчик отмены
  handleInputChange // Обработчик изменений
}) => (
  <main className={`${commonStyles.container}`}>
    {/* Основной контейнер */}
    {/* Боковое меню профиля */}
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>

    {/* Форма редактирования профиля */}
    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit} // Обработчик отправки формы
    >
      <>
        {/* Поле ввода имени */}
        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleInputChange} // Обработчик изменений
            value={formValue.name} // Текущее значение
            name={'name'} // Имя поля
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'} // Иконка редактирования
          />
        </div>

        {/* Поле ввода email */}
        <div className='pb-6'>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleInputChange}
            value={formValue.email}
            name={'email'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
          />
        </div>

        {/* Поле ввода пароля */}
        <div className='pb-6'>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleInputChange}
            value={formValue.password}
            name={'password'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
          />
        </div>

        {/* Кнопки действий (показываются при изменении формы) */}
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type='secondary' // Стиль кнопки
              htmlType='button' // Тип кнопки
              size='medium'
              onClick={handleCancel} // Обработчик отмены
            >
              Отмена
            </Button>
            <Button
              type='primary'
              size='medium'
              htmlType='submit' // Тип submit для формы
            >
              Сохранить
            </Button>
          </div>
        )}

        {/* Блок отображения ошибок */}
        {updateUserError && (
          <p
            className={`${commonStyles.error} pt-5 text text_type_main-default`}
          >
            {updateUserError}
          </p>
        )}
      </>
    </form>
  </main>
);
