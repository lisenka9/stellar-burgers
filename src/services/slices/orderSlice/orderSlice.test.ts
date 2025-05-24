import orderSlice, { initialState, getOrderByNumber } from './orderSlice';
import type { TOrder, TOrdersData } from '../../../utils/types';

describe('Редьюсер orderSlice', () => {
  const mockOrder: TOrder = {
    _id: '643d69a5c3f7b9001cfa093c',
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c7'],
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2023-04-18T08:58:45.102Z',
    updatedAt: '2023-04-18T08:58:45.102Z',
    number: 12345
  };

  const testPayload: TOrdersData = {
    orders: [mockOrder],
    total: 100,
    totalToday: 1
  };

  describe('Асинхронные экшены', () => {
    it('должен корректно обрабатывать состояние pending', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = orderSlice(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        request: true,
        error: null
      });
    });

    it('должен корректно обрабатывать состояние rejected', () => {
      const errorMessage = 'Ошибка получения заказа';
      const action = {
        type: getOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderSlice(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        request: false,
        error: errorMessage,
        orderByNumberResponse: null
      });
    });

    it('должен корректно обрабатывать состояние fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [mockOrder] }
      };
      const state = orderSlice(initialState, action);
      
      expect(state).toEqual({
        ...initialState,
        request: false,
        error: null,
        orderByNumberResponse: mockOrder
      });
    });
  });

  describe('Крайние случаи', () => {
    it('должен возвращать initialState для неизвестного экшена', () => {
      const state = orderSlice(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
    });

    it('должен обрабатывать отсутствие заказов в ответе', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [] }
    };
    const state = orderSlice(initialState, action);
    expect(state.orderByNumberResponse).toBeFalsy();
  });

    it('должен обрабатывать частично заполненные данные заказа', () => {
    const partialOrder: TOrder = {
      _id: '123',
      number: 123,
      ingredients: [],
      status: 'pending',
      name: 'Тестовый бургер',
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString()
    };
    
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [partialOrder] }
    };
    const state = orderSlice(initialState, action);
    
    expect(state.orderByNumberResponse).toEqual(partialOrder);
  });
});
});