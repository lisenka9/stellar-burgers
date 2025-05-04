import { getFeedsApi } from '../../../utils/burger-api'; // API для получения ленты заказов
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Импорт из Redux Toolkit
import { TOrder } from '@utils-types'; // Тип заказа

// Тип состояния ленты заказов
type TFeedState = {
  orders: TOrder[]; // Список заказов
  total: number; // Общее количество заказов
  totalToday: number; // Количество заказов за сегодня
  loading: boolean; // Флаг загрузки
  error: string | null; // Ошибка
};

// Начальное состояние
export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

// Асинхронный экшен для получения ленты заказов
export const getFeeds = createAsyncThunk(
  'feeds/all', // Префикс для типов экшенов
  getFeedsApi // API-функция (без параметров)
);

// Создание слайса
export const feedSlice = createSlice({
  name: 'feed', // Имя слайса
  initialState, // Начальное состояние
  reducers: {}, // Синхронные редюсеры (пустой объект, так как нет синхронных экшенов)
  selectors: {
    getFeedState: (state) => state // Селектор всего состояния
  },
  // Обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        // Запрос начат
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        // Ошибка запроса
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        // Успешный запрос
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders; // Обновление списка заказов
        state.total = action.payload.total; // Общее количество
        state.totalToday = action.payload.totalToday; // Заказов за сегодня
      });
  }
});

// Экспорт селектора
export const { getFeedState } = feedSlice.selectors;

// Экспорт редюсера по умолчанию
export default feedSlice.reducer;
