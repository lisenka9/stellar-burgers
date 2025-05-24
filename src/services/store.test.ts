import store, { rootReducer } from '../services/store';

test('проверка работы rootReducer', () => {
  const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(state).toEqual(expect.objectContaining({
    user: expect.any(Object),
    ingredient: expect.any(Object),
    order: expect.any(Object),
    constructorBurger: expect.any(Object),
    feed: expect.any(Object)
  }));
});
