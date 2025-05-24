import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('Тест для конструктора бургеров', () => {
  describe('Проверка добавления ингредиентов', () => {
    const cleanState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: []
      }
    };

    const sampleBun = {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    const sampleFilling = {
      _id: '60d3b41abdacab0026a733cc',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };

    test('Корректное добавление начинки', () => {
      const result = constructorSlice(
        cleanState,
        addIngredient(sampleFilling)
      );
      
      expect(result.constructorItems.ingredients).toHaveLength(1);
      expect(result.constructorItems.ingredients[0]).toMatchObject({
        ...sampleFilling,
        id: expect.any(String)
      });
    });

    test('Установка булки в конструктор', () => {
      const result = constructorSlice(
        cleanState,
        addIngredient(sampleBun)
      );

      expect(result.constructorItems.bun).toMatchObject({
        ...sampleBun,
        id: expect.any(String)
      });
    });

    test('Обновление булки при добавлении новой', () => {
      const stateWithBun = {
        ...cleanState,
        constructorItems: {
          ...cleanState.constructorItems,
          bun: {
            ...sampleBun,
            _id: 'old-bun-id',
            id: 'old-bun-uuid'
          }
        }
      };
      const newBun = {
        ...sampleBun,
        _id: 'new-bun-id',
        name: 'Краторная булка N-200i'
      };
      const result = constructorSlice(
        stateWithBun,
        addIngredient(newBun)
      );

      expect(result.constructorItems.bun).toMatchObject(newBun);
      expect(result.constructorItems.bun?.id).not.toBe('old-bun-uuid');
    });
  });

  describe('Тестирование удаления ингредиентов', () => {
  const stateWithIngredients = {
    ...initialState,
    constructorItems: {
      bun: null,
      ingredients: [
        {
          id: 'test-filling-id',
          _id: '60d3b41abdacab0026a733cd',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
        }
      ]
    }
  };

  test('Удаление элемента по ID', () => {
    const result = constructorSlice(
      stateWithIngredients,
      removeIngredient('test-filling-id')
    );

    expect(result.constructorItems.ingredients).toHaveLength(0);
  });
});

describe('Тесты изменения порядка ингредиентов', () => {
  const stateWithMultipleItems = {
    ...initialState,
    constructorItems: {
      bun: null,
      ingredients: [
        {
          id: 'item1',
          _id: '1',
          name: 'Ингредиент 1',
          type: 'main',
          proteins: 100,
          fat: 50,
          carbohydrates: 40,
          calories: 200,
          price: 300,
          image: 'image-url',
          image_mobile: 'image-mobile-url',
          image_large: 'image-large-url'
        },
        {
          id: 'item2',
          _id: '2',
          name: 'Ингредиент 2',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 10,
          calories: 50,
          price: 100,
          image: 'image-url',
          image_mobile: 'image-mobile-url',
          image_large: 'image-large-url'
        },
        {
          id: 'item3',
          _id: '3',
          name: 'Ингредиент 3',
          type: 'main',
          proteins: 80,
          fat: 40,
          carbohydrates: 30,
          calories: 180,
          price: 250,
          image: 'image-url',
          image_mobile: 'image-mobile-url',
          image_large: 'image-large-url'
        }
      ]
    }
  };

  test('Перемещение элемента вверх', () => {
    const result = constructorSlice(
      stateWithMultipleItems,
      moveIngredientUp(2)
    );

    expect(result.constructorItems.ingredients[1].id).toBe('item3');
    expect(result.constructorItems.ingredients[2].id).toBe('item2');
  });

  test('Перемещение элемента вниз', () => {
    const result = constructorSlice(
      stateWithMultipleItems,
      moveIngredientDown(0)
    );

    expect(result.constructorItems.ingredients[0].id).toBe('item2');
    expect(result.constructorItems.ingredients[1].id).toBe('item1');
  });
});

  describe('Тестирование создания заказа', () => {
    const orderTestCases = [
      {
        name: 'Начало создания заказа',
        action: { type: orderBurger.pending.type },
        expectLoading: true,
        expectError: null
      },
      {
        name: 'Ошибка при создании',
        action: { 
          type: orderBurger.rejected.type,
          error: { message: 'Test error' }
        },
        expectLoading: false,
        expectError: 'Test error'
      },
      {
        name: 'Успешное создание',
        action: { 
          type: orderBurger.fulfilled.type,
          payload: { order: { number: 12345 } }
        },
        expectLoading: false,
        expectError: null,
        expectOrderNumber: 12345
      }
    ];

    orderTestCases.forEach(({ name, action, expectLoading, expectError, expectOrderNumber }) => {
      test(name, () => {
        const result = constructorSlice(initialState, action);
        
        expect(result.loading).toBe(expectLoading);
        if (expectError !== undefined) {
          expect(result.error).toBe(expectError);
        }
        if (expectOrderNumber !== undefined) {
          expect(result.orderModalData?.number).toBe(expectOrderNumber);
        }
      });
    });
  });
});
