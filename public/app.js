import { onAuthChange } from './auth.js';
import { renderLoginView } from './ui/login.js';
import { renderChatList } from './ui/chatList.js';
import { renderChatView } from './ui/chatView.js';
import { renderHeader } from './ui/header.js';

const appContainer = document.getElementById('app');

onAuthChange(user => {
  if (user) {
    appContainer.innerHTML = `
      <div id="header"></div>
      <div id="main">
        <div id="chat-list-view">
          <div id="chat-list"></div>
        </div>
        <div id="chat-view" style="display: none;"></div>
      </div>
    `;

    const headerEl = document.getElementById('header');
    const chatListView = document.getElementById('chat-list-view');
    const chatListEl = document.getElementById('chat-list');
    const chatViewEl = document.getElementById('chat-view');

    renderHeader(headerEl, user);

    renderChatList(chatListEl, user, (chatId) => {
      // Hide list, show chat
      chatListView.style.display = 'none';
      chatViewEl.style.display = 'block';

      renderChatView(chatViewEl, chatId);
    });
  } else {
    renderLoginView(appContainer);
  }
});
