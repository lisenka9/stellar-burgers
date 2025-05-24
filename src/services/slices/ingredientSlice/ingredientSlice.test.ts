import ingredientSlice, { getIngredients, initialState } from './ingredientSlice';

describe('Редьюсер ingredientSlice', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Булочка',
      type: 'bun',
      price: 100
    },
    {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      price: 200
    }
  ];

  const testCases = {
    pendingAction: {
      type: getIngredients.pending.type,
      payload: null
    },
    rejectedAction: {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    },
    fulfilledAction: {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    }
  };

  describe('Обработка состояния загрузки ингредиентов', () => {
    it('должен устанавливать флаг загрузки при начале запроса', () => {
      const newState = ingredientSlice(initialState, testCases.pendingAction);
      
      expect(newState).toMatchObject({
        loading: true,
        error: null,
        ingredients: []
      });
    });

    it('должен сохранять ошибку при неудачной загрузке', () => {
      const newState = ingredientSlice(initialState, testCases.rejectedAction);
      
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: testCases.rejectedAction.error.message
      });
    });

    it('должен сохранять список ингредиентов при успешной загрузке', () => {
      const newState = ingredientSlice(initialState, testCases.fulfilledAction);
      
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: null,
        ingredients: mockIngredients
      });
    });
  });

  describe('Пограничные случаи', () => {
    it('должен возвращать initialState для неизвестного действия', () => {
      const newState = ingredientSlice(initialState, { type: 'UNKNOWN_ACTION' });
      expect(newState).toBe(initialState);
    });

    it('должен корректно обрабатывать пустой массив ингредиентов', () => {
      const emptyAction = {
        type: getIngredients.fulfilled.type,
        payload: []
      };
      
      const newState = ingredientSlice(initialState, emptyAction);
      expect(newState.ingredients).toEqual([]);
    });
  });
});