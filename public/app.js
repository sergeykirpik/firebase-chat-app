import { onAuthChange } from './auth.js';
import { renderLoginView } from './ui/login.js';
import { renderChatList } from './ui/chatList.js';
import { renderHeader } from './ui/header.js';

const appContainer = document.getElementById('app');

onAuthChange(user => {
  if (user) {
    appContainer.innerHTML = `
      <div id="header"></div>
      <div id="main"></div>
    `;

    const headerEl = document.getElementById('header');
    const mainEl = document.getElementById('main');

    renderHeader(headerEl, user);
    renderChatList(mainEl, user);
  } else {
    renderLoginView(appContainer);
  }
});
