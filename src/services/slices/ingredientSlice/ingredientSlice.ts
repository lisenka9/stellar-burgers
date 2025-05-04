import { getIngredientsApi } from '../../../utils/burger-api'; // API для получения ингредиентов
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Импорт из Redux Toolkit
import { TIngredient } from '@utils-types'; // Тип ингредиента

// Тип состояния ингредиентов
export type TIngredientState = {
  ingredients: TIngredient[]; // Список ингредиентов
  loading: boolean; // Флаг загрузки
  error: string | null; // Ошибка
};

// Начальное состояние
export const initialState: TIngredientState = {
  ingredients: [], // Пустой массив ингредиентов
  loading: false, // Загрузка не начата
  error: null // Ошибок нет
};

// Асинхронный экшен для получения ингредиентов
export const getIngredients = createAsyncThunk(
  'ingredient/get', // Префикс для типов экшенов
  getIngredientsApi // API-функция (без параметров)
);

// Создание слайса
export const ingredientSlice = createSlice({
  name: 'ingredient', // Имя слайса
  initialState, // Начальное состояние
  reducers: {}, // Синхронные редюсеры (пока не используются)
  selectors: {
    getIngredientState: (state) => state // Селектор всего состояния
  },
  // Обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        // Запрос начат
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        // Ошибка запроса
        state.loading = false;
        state.error = action.error.message as string; // Сохраняем текст ошибки
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        // Успешный запрос
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload; // Сохраняем полученные ингредиенты
      });
  }
});

// Экспорт селектора
export const { getIngredientState } = ingredientSlice.selectors;

// Экспорт редюсера по умолчанию
export default ingredientSlice.reducer;
