import userSlice, { initialState, getUser } from './userSlice';

const mockUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('Редьюсер userSlice', () => {
  describe('Асинхронные экшены', () => {
    describe('Получение данных пользователя', () => {
      const testActions = {
        pending: { type: getUser.pending.type },
        rejected: { 
          type: getUser.rejected.type,
          error: { message: 'Ошибка авторизации' } 
        },
        fulfilled: { 
          type: getUser.fulfilled.type, 
          payload: { user: mockUser } 
        }
      };

      it('должен обрабатывать состояние загрузки', () => {
        const state = userSlice(initialState, testActions.pending);
        expect(state).toEqual({
          ...initialState,
          isAuthenticated: true, 
          isAuthChecked: true,   
          loginUserRequest: true  
        });
      });

      it('должен обрабатывать ошибку запроса', () => {
        const state = userSlice(initialState, testActions.rejected);
        expect(state).toEqual({
          ...initialState,
          isAuthenticated: false,
          isAuthChecked: false,
          loginUserRequest: false,
        });
      });

      it('должен сохранять данные пользователя', () => {
        const state = userSlice(initialState, testActions.fulfilled);
        expect(state).toEqual({
          ...initialState,
          isAuthenticated: true,
          isAuthChecked: false,
          loginUserRequest: false,
          userData: mockUser
        });
      });
    });
  });
});