import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app'; // Главный компонент приложения
import { Provider } from 'react-redux'; // Провайдер для Redux store
import store from './services/store'; // Redux store приложения
import { BrowserRouter } from 'react-router-dom'; // Роутер для навигации

const container = document.getElementById('root') as HTMLElement; // Получаем корневой DOM-элемент
const root = ReactDOMClient.createRoot(container!); // Создаём корневой рендер

root.render(
  <React.StrictMode>
    {/* Режим строгого контроля для разработки */}
    <Provider store={store}>
      {/* Подключаем Redux store */}
      <BrowserRouter basename='/'>
        {/* Настраиваем роутинг с базовым путём */}
        <App /> {/* Рендерим главный компонент */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
