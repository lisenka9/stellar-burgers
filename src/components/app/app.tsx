import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages'; // Импорт страниц
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components'; // Импорт компонентов
import { Route, Routes, useLocation } from 'react-router-dom'; // Импорт роутинга
import { ProtectedRoute } from '../protected-route/protected-route'; // Компонент защищённых маршрутов
import { useDispatch } from '@store'; // Хук для доступа к Redux store
import { useEffect } from 'react'; // React хук
import { getUser } from '../../services/slices/userSlice/userSlice'; // Экшен для получения пользователя
import { getIngredients } from '../../services/slices/ingredientSlice/ingredientSlice'; // Экшен для получения ингредиентов
import { CenteringComponent } from '../centering-component/centering-component'; // Компонент-обёртка

// Настройка всех маршрутов
const App = () => {
  const location = useLocation(); // Хук для получения текущего пути
  const dispatch = useDispatch(); // Хук для диспетчера Redux
  const background = location.state?.background; // Фон для модального окна

  useEffect(() => {
    dispatch(getUser()); // Запрос данных пользователя при монтировании
    dispatch(getIngredients()); // Запрос списка ингредиентов
  }, [dispatch]); // Зависимость от dispatch

  return (
    <div className={styles.app}>
      <AppHeader /> {/* Шапка приложения*/}
      <Routes location={background || location}>
        {/* Основные маршруты*/}
        <Route path='/' element={<ConstructorPage />} /> {/* Главная страница*/}
        <Route
          path='/ingredients/:id' // Страница деталей ингредиента
          element={
            <CenteringComponent title={'Детали ингредиента'}>
              {/* Обёртка с заголовком*/}
              <IngredientDetails /> {/* Компонент деталей*/}
            </CenteringComponent>
          }
        />
        <Route path='/feed' element={<Feed />} /> {/* Лента заказов*/}
        <Route
          path='/feed/:number' // Детали заказа из ленты
          element={
            <CenteringComponent title={`#${location.pathname.match(/\d+/)}`}>
              {/* Динамический заголовок*/}
              <OrderInfo /> {/* Информация о заказе*/}
            </CenteringComponent>
          }
        />
        <Route element={<ProtectedRoute onlyUnAuth />}>
          {/* Защищённые маршруты для неавторизованных*/}
          <Route path='/login' element={<Login />} /> {/* Страница входа*/}
          <Route path='/register' element={<Register />} /> {/* Регистрация*/}
          <Route path='/forgot-password' element={<ForgotPassword />} />
          {/* Восстановление пароля*/}
          <Route path='/reset-password' element={<ResetPassword />} />
          {/* Сброс пароля*/}
        </Route>
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          {/* Защищённые маршруты для авторизованных*/}
          <Route path='/profile' element={<Profile />} /> {/* Профиль*/}
          <Route path='/profile/orders' element={<ProfileOrders />} />
          {/* История заказов*/}
          <Route
            path='/profile/orders/:number' // Детали заказа из профиля
            element={
              <CenteringComponent title={`#${location.pathname.match(/\d+/)}`}>
                <OrderInfo />
              </CenteringComponent>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} /> {/* 404 страница*/}
      </Routes>
      {background && ( // Рендер модальных окон при наличии фона
        <Routes>
          <Route
            path='/ingredients/:id' // Модалка с деталями ингредиента
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  history.back(); // Закрытие модалки
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number' // Модалка с деталями заказа из ленты
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={() => {
                  history.back();
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number' // Модалка с деталями заказа из профиля
              element={
                <Modal
                  title={`#${location.pathname.match(/\d+/)}`}
                  onClose={() => {
                    history.back();
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App; // Экспорт компонента
