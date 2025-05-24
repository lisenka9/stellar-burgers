import feedSlice, { getFeeds, initialState } from './feedSlice';

describe('Тестирование редьюсера feedSlice', () => {
  const mockOrders = [
    { id: 1, ingredients: ['ing1', 'ing2'], status: 'created' },
    { id: 2, ingredients: ['ing3', 'ing4'], status: 'pending' }
  ];

  const testActions = {
    pending: {
      type: getFeeds.pending.type,
      payload: null
    },
    rejected: {
      type: getFeeds.rejected.type,
      error: { message: 'Server error' }
    },
    fulfilled: {
      type: getFeeds.fulfilled.type,
      payload: { 
        orders: mockOrders,
        total: 50,
        totalToday: 5
      }
    }
  };

  describe('Обработка асинхронного экшена getFeeds', () => {
    it('должен установить флаг loading при pending-состоянии', () => {
      const newState = feedSlice(initialState, testActions.pending);
      
      expect(newState).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('должен сохранить ошибку при rejected-состоянии', () => {
      const newState = feedSlice(initialState, testActions.rejected);
      
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: testActions.rejected.error.message
      });
    });

    it('должен сохранить данные заказов при fulfilled-состоянии', () => {
      const newState = feedSlice(initialState, testActions.fulfilled);
      
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: null,
        orders: mockOrders,
        total: 50,
        totalToday: 5
      });
    });
  });

  describe('Поведение в особых случаях', () => {
    it('должен возвращать initialState при неизвестном экшене', () => {
      const newState = feedSlice(initialState, { type: 'UNKNOWN_ACTION' });
      expect(newState).toBe(initialState);
    });

    it('должен корректно обрабатывать пустой payload', () => {
    const emptyPayloadAction = {
      type: getFeeds.fulfilled.type,
      payload: {
        orders: [], 
        total: 0,
        totalToday: 0
      }
    };
    
    const newState = feedSlice(initialState, emptyPayloadAction);
    expect(newState.orders).toEqual([]);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });
});
});