import { getCurrentUser } from '../auth.js';
import { navigateTo } from '../router.js';

/**
 * Render top header bar with logout
 * @param {HTMLElement} container 
 */
export function renderHeader(container) {
  const user = getCurrentUser();
  if (!user) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <header class="app-header">
      <div class="user-info">
        <img class="avatar" src="${user.photoURL}" alt="${user.displayName}" />
        <span>${user.displayName}</span>
      </div>
      <button id="logoutBtn">Logout</button>
    </header>
  `;

  container.querySelector('#logoutBtn').addEventListener('click', () => {
    navigateTo('#/logout');
  });
}
