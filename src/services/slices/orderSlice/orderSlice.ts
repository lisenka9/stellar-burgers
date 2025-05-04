import { getOrderByNumberApi } from '../../../utils/burger-api'; // API для получения заказа по номеру
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Импорт из Redux Toolkit
import { TOrder } from '@utils-types'; // Тип заказа

// Тип состояния заказов
type TOrderState = {
  orders: TOrder[]; // Список заказов
  orderByNumberResponse: TOrder | null; // Данные конкретного заказа
  request: boolean; // Флаг выполнения запроса
  responseOrder: null; // Зарезервировано для будущего использования
  error: string | null; // Ошибка
};

// Начальное состояние
export const initialState: TOrderState = {
  orders: [], // Пустой массив заказов
  orderByNumberResponse: null, // Нет данных о заказе
  request: false, // Запрос не выполняется
  responseOrder: null, // Не используется
  error: null // Ошибок нет
};

// Асинхронный экшен для получения заказа по номеру
export const getOrderByNumber = createAsyncThunk(
  'order/byNumber', // Префикс для типов экшенов
  async (number: number) => getOrderByNumberApi(number) // API-функция с параметром номера
);

// Создание слайса
export const orderSlice = createSlice({
  name: 'order', // Имя слайса
  initialState, // Начальное состояние
  reducers: {}, // Синхронные редюсеры (пока не используются)
  selectors: {
    getOrderState: (state) => state // Селектор всего состояния
  },
  // Обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        // Запрос начат
        state.error = null;
        state.request = true;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        // Ошибка запроса
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        // Успешный запрос
        state.error = null;
        state.request = false;
        // Сохраняем первый заказ из ответа (API возвращает массив)
        state.orderByNumberResponse = action.payload.orders[0];
      });
  }
});

// Экспорт селектора
export const { getOrderState } = orderSlice.selectors;

// Экспорт редюсера по умолчанию
export default orderSlice.reducer;
