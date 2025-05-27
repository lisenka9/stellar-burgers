const SELECTORS = {
  userApi: '/api/auth/user',
  ingredientsApi: '/api/ingredients',
  orderApi: '/api/orders',
  profileUrlPart: '/profile',
  testUserName: 'User_test',
  account: 'Личный кабинет',
  NameInput: 'input[name="name"]',
  constructorTitle: 'Соберите бургер',
  bunPlaceholder: 'Выберите булки',
  fillingPlaceholder: 'Выберите начинку',
  bun: 'Флюоресцентная булка R2-D3',
  filling: 'Биокотлета из марсианской Магнолии',
  orderConfirmation: 'идентификатор заказа',
  orderButton: 'Оформить заказ',
  homeUrl: 'http://localhost:4000/',
  bunOption: 'Краторная булка'
};

describe('Проверка аккаунта пользователя', () => {
  beforeEach(() => {
    cy.intercept('GET', SELECTORS.userApi, {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'mail@example.com',
          name: SELECTORS.testUserName,
        }
      }
    }).as('getUser');
  });

  it('Должен переходить в профиль после авторизации', () => {
    cy.loginByApi();
    cy.visit('/');
    cy.contains(SELECTORS.account).click();
    cy.wait('@getUser');
    cy.contains(SELECTORS.testUserName).click();
    cy.location('pathname').should('include', SELECTORS.profileUrlPart);
    cy.get('form', { timeout: 10000 }).should('exist');
    cy.get(SELECTORS.NameInput).should('have.value', SELECTORS.testUserName);
  });
});

describe('Проверка конструктора бургеров', () => {
  beforeEach(() => {
    cy.fixture('ingredients.json').as('ingredientsData');
    cy.fixture('user.json').as('userData');
    cy.intercept('GET', SELECTORS.ingredientsApi, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', SELECTORS.userApi, { fixture: 'user.json' }).as('getUser');
    cy.setCookie('accessToken', 'mockToken');
    cy.window().then(win => win.localStorage.setItem('refreshToken', 'mockToken'));
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains(SELECTORS.constructorTitle, { timeout: 10000 }).should('exist');
  });

  it('Не должно быть булки в начале', () => {
    cy.contains(SELECTORS.bunPlaceholder).should('exist');
    cy.contains(SELECTORS.fillingPlaceholder).should('exist');
  });

  it('Должна добавиться начинка', () => {
    cy.contains('Начинки').scrollIntoView().click({ force: true });
    cy.contains(SELECTORS.filling).parent().find('button').click();
    cy.contains(SELECTORS.filling).should('exist');
  });

  it('Должна добавиться булка', () => {
    cy.contains(SELECTORS.bun).parent().find('button').click();
    cy.contains(SELECTORS.bun, { timeout: 10000 }).should('exist');
  });

  it('Должны добавиться ингредиенты в заказ и очиститься конструктор', () => {
    cy.intercept('POST', SELECTORS.orderApi, {
      fixture: 'makeOrder.json',
      statusCode: 200
    }).as('newOrder');

    cy.contains(SELECTORS.bun).parent().find('button').click();
    cy.contains('Начинки').scrollIntoView();
    cy.contains(SELECTORS.filling).parent().find('button').click();

    cy.contains(SELECTORS.orderButton).should('not.be.disabled').click();
    cy.wait('@newOrder', { timeout: 30000 }).its('response.statusCode').should('eq', 200);

    cy.contains(SELECTORS.orderConfirmation).should('be.visible');
    cy.get('body').type('{esc}');
    cy.contains(SELECTORS.bunPlaceholder).should('exist');
  });

  it('Должно открываться и закрываться модальное окно ингредиента', () => {
    cy.contains(SELECTORS.bunOption).click();
    cy.location('pathname').should('include', '/ingredients/');
    cy.get('body').type('{esc}');
    cy.location('href').should('eq', SELECTORS.homeUrl);
  });

it('Должно закрываться модальное окно через клик на оверлей', () => {
  cy.contains(SELECTORS.bunOption).click();
  cy.url().should('include', '/ingredients/');
  cy.contains('Детали ингредиента').should('exist');
  cy.go('back');
  cy.url().should('eq', SELECTORS.homeUrl);
});
});