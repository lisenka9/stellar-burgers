import { orderBurgerApi } from '../../../utils/burger-api'; // API для оформления заказа
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit'; // Импорт из Redux Toolkit
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types'; // Типы данных

// Тип состояния конструктора
export type TConsturctorState = {
  loading: boolean; // Флаг загрузки
  constructorItems: {
    bun: TConstructorIngredient | null; // Булки
    ingredients: TConstructorIngredient[]; // Начинки
  };
  orderRequest: boolean; // Флаг запроса заказа
  orderModalData: TOrder | null; // Данные для модального окна заказа
  error: string | null; // Ошибка
};

// Начальное состояние
export const initialState: TConsturctorState = {
  loading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Асинхронный экшен для оформления заказа
export const orderBurger = createAsyncThunk(
  'user/order', // Префикс для типов экшенов
  async (data: string[]) => orderBurgerApi(data) // API-запрос
);

// Создание слайса
export const constructorSlice = createSlice({
  name: 'constructorBurger', // Имя слайса
  initialState, // Начальное состояние
  selectors: {
    getConstructorState: (state) => state // Селектор всего состояния
  },
  reducers: {
    // Добавление ингредиента
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload; // Установка булки
        } else {
          state.constructorItems.ingredients.push(action.payload); // Добавление начинки
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid(); // Генерация уникального ID
        return { payload: { ...ingredient, id } }; // Подготовка payload
      }
    },
    // Удаление ингредиента
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload // Фильтрация по ID
        );
    },
    // Перемещение ингредиента вверх
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload,
        0,
        state.constructorItems.ingredients.splice(action.payload - 1, 1)[0] // Обмен позициями
      );
    },
    // Перемещение ингредиента вниз
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload,
        0,
        state.constructorItems.ingredients.splice(action.payload + 1, 1)[0] // Обмен позициями
      );
    },
    // Установка флага запроса
    setRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    // Сброс модального окна
    resetModal: (state) => {
      state.orderModalData = null;
    }
  },
  // Обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state, action) => {
        // Запрос начат
        state.loading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        // Ошибка запроса
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        // Успешный запрос
        state.loading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order; // Сохранение данных заказа
        state.constructorItems = {
          // Сброс конструктора
          bun: null,
          ingredients: []
        };
      });
  }
});

// Экспорт экшенов
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setRequest,
  resetModal
} = constructorSlice.actions;

// Экспорт селектора
export const { getConstructorState } = constructorSlice.selectors;

// Экспорт редюсера по умолчанию
export default constructorSlice.reducer;
