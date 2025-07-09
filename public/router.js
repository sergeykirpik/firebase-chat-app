// public/router.js

import { renderChatList } from './ui/chatList.js';
import { renderChatView } from './ui/chatView.js';
import { renderLoginView } from './ui/login.js';
import { getCurrentUser, logout } from './auth.js';

let container = null;

/**
 * Initialize the router with the main view container.
 * The current user is retrieved internally from auth.
 * @param {HTMLElement} mainContainer - The main container to render views into
 */
export function initRouter(mainContainer) {
  container = mainContainer;

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // initial load
}

/**
 * Programmatically navigate to a route
 * @param {string} path - e.g. "#/chat/abc_def"
 */
export function navigateTo(path) {
  window.location.hash = path;
}

/**
 * Handle route change and render appropriate view
 */
function handleRoute() {
  const hash = window.location.hash || '#/';
  const user = getCurrentUser();

  if (!user && hash !== '#/login') {
    navigateTo('#/login');
  }

  if (hash === '#/login') {
    if (user) {
      navigateTo('#/');
    }
    renderLoginView(container);
    return;
  }

  if (hash === '#/logout') {
    logout().catch(console.error);
    navigateTo('#/login');
    return;
  }

  const match = hash.match(/^#\/?(chat\/([\w_]+))?/);
  const chatId = match?.[2];

  if (chatId) {
    renderChatView(container, chatId);  
  } else {
    renderChatList(container);
  }
} 