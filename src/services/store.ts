import { combineReducers, configureStore } from '@reduxjs/toolkit'; // Импорт Redux Toolkit
import constructorSlice from './slices/constructorSlice/constructorSlice'; // Слайс конструктора бургеров
import orderSlice from './slices/orderSlice/orderSlice'; // Слайс заказов
import feedSlice from './slices/feedSlice/feedSlice'; // Слайс ленты заказов
import userSlice from './slices/userSlice/userSlice'; // Слайс пользователя
import ingredientSlice from './slices/ingredientSlice/ingredientSlice'; // Слайс ингредиентов
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux'; // Типизированные хуки Redux

// Объединение всех редюсеров в корневой
export const rootReducer = combineReducers({
  ingredient: ingredientSlice, // Состояние ингредиентов
  order: orderSlice, // Состояние заказов
  constructorBurger: constructorSlice, // Состояние конструктора
  feed: feedSlice, // Состояние ленты заказов
  user: userSlice // Состояние пользователя
});

// Создание хранилища Redux
const store = configureStore({
  reducer: rootReducer, // Корневой редюсер
  devTools: process.env.NODE_ENV !== 'production' // Инструменты разработчика только не в production
});

// Тип для всего состояния приложения
export type RootState = ReturnType<typeof rootReducer>;

// Тип для dispatch хранилища
export type AppDispatch = typeof store.dispatch;

// Типизированные хуки для работы с Redux
export const useDispatch: () => AppDispatch = () => dispatchHook(); // Хук useDispatch с типизацией
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; // Хук useSelector с типизацией

export default store; // Экспорт хранилища по умолчанию
