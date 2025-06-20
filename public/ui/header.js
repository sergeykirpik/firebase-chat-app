import { logout } from '../auth.js';

/**
 * Render top header bar with logout
 * @param {HTMLElement} container 
 * @param {firebase.User} user 
 */
export function renderHeader(container, user) {
  container.innerHTML = `
    <header class="app-header">
      <div class="user-info">
        <img class="avatar" src="${user.photoURL}" alt="${user.displayName}" />
        <span>${user.displayName}</span>
      </div>
      <button id="logoutBtn">Logout</button>
    </header>
  `;

  container.querySelector('#logoutBtn').addEventListener('click', async () => {
    try {
      await logout();
    } catch (err) {
      alert('Logout failed');
      console.error(err);
    }
  });
}
