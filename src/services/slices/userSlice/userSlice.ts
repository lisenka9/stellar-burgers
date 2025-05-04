// Импорт API-функций для работы с пользователем
import {
  TRegisterData,
  loginUserApi,
  TLoginData,
  getUserApi,
  TAuthResponse,
  getOrdersApi,
  logoutApi,
  updateUserApi,
  registerUserApi
} from '../../../utils/burger-api';
// Импорт инструментов Redux Toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Вспомогательные функции для работы с куками
import { deleteCookie, setCookie } from '../../../utils/cookie';
// Типы данных
import { TOrder, TUser } from '@utils-types';

// Тип состояния пользователя
type TUserState = {
  request: boolean; // Флаг выполнения запроса
  error: string | null; // Текст ошибки
  response: TUser | null; // Ответ сервера
  registerData: TRegisterData | null; // Данные регистрации
  userData: TUser | null; // Данные пользователя
  isAuthChecked: boolean; // Флаг проверки аутентификации
  isAuthenticated: boolean; // Флаг аутентификации
  loginUserRequest: boolean; // Флаг запроса входа
  userOrders: TOrder[]; // Заказы пользователя
};

// Начальное состояние
export const initialState: TUserState = {
  request: false,
  error: null,
  response: null,
  registerData: null,
  userData: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false,
  userOrders: []
};

// Асинхронный экшен для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/regUser', // Префикс для типов экшенов
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

// Асинхронный экшен для входа пользователя
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    if (!data.success) return data;
    // Устанавливаем токены при успешном входе
    setCookie('accessToken', data.accessToken); // accessToken в куки
    localStorage.setItem('refreshToken', data.refreshToken); // refreshToken в localStorage
    return data;
  }
);

// Асинхронный экшен для получения данных пользователя
export const getUser = createAsyncThunk('user/getUser', getUserApi);

// Асинхронный экшен для получения заказов пользователя
export const getOrdersAll = createAsyncThunk('user/ordersUser', getOrdersApi);

// Асинхронный экшен для обновления данных пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

// Асинхронный экшен для выхода пользователя
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi(); // Вызов API для выхода
  localStorage.clear(); // Очистка localStorage
  deleteCookie('accessToken'); // Удаление куки
});

// Создание слайса пользователя
export const userSlice = createSlice({
  name: 'user', // Имя слайса
  initialState, // Начальное состояние
  reducers: {
    // Редюсер для ручного выхода
    userLogout: (state) => {
      state.userData = null; // Сброс данных пользователя
    },
    // Редюсер для сброса ошибки
    resetError: (state) => {
      state.error = null; // Очистка ошибки
    }
  },
  selectors: {
    getUserState: (state) => state, // Селектор всего состояния
    getError: (state) => state.error // Селектор ошибки
  },
  // Обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      // Обработка состояний регистрации
      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.error = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message as string;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.request = false;
        state.error = null;
        state.response = action.payload.user;
        state.userData = action.payload.user;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
      })
      // Обработка состояний входа
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.loginUserRequest = false;
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      // Обработка состояний получения данных пользователя
      .addCase(getUser.pending, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loginUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.loginUserRequest = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loginUserRequest = false;
        state.userData = action.payload.user;
        state.isAuthChecked = false;
      })
      // Обработка состояний обновления данных
      .addCase(updateUser.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.request = false;
        state.error = null;
        state.response = action.payload.user;
      })
      // Обработка состояний выхода
      .addCase(logoutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.error = null;
        state.request = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.isAuthChecked = false;
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.error = null;
        state.request = false;
        state.userData = null;
      })
      // Обработка состояний получения заказов
      .addCase(getOrdersAll.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(getOrdersAll.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.error = null;
        state.request = false;
        state.userOrders = action.payload;
      });
  }
});

// Экспорт синхронных экшенов
export const { userLogout, resetError } = userSlice.actions;

// Экспорт селекторов
export const { getUserState, getError } = userSlice.selectors;

// Экспорт редюсера по умолчанию
export default userSlice.reducer;
