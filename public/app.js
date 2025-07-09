import { onAuthChange } from './auth.js';
import { renderHeader } from './ui/header.js';
import { initRouter } from './router.js';

const appContainer = document.getElementById('app');

onAuthChange(() => {
  appContainer.innerHTML = `
    <div id="header"></div>
    <div id="main"></div>
  `;

  const headerEl = document.getElementById('header');
  const mainEl = document.getElementById('main');

  renderHeader(headerEl);
  initRouter(mainEl);
});
