import { login, logout, onAuthChange } from '../auth.js';

function renderLoggedOutView(container) {
  container.innerHTML = `
    <div class="login-screen">
      <h1>Welcome to Chat</h1>
      <p>Sign in with Google to start chatting privately with friends.</p>
      <button id="loginBtn">Sign in with Google</button>
    </div>
  `;

  container.querySelector('#loginBtn').addEventListener('click', async () => {
    try {
      await login();
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  });
}

function renderLoggedInView(container, user) {
  container.innerHTML = `
    <div class="user-header">
      <div class="user-info">
        <img class="avatar" src="${user.photoURL}" alt="${user.displayName}" />
        <p>${user.displayName}</p>
      </div>
      <button id="logoutBtn">Logout</button>
    </div>
  `;

  container.querySelector('#logoutBtn').addEventListener('click', async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
      alert('Logout failed');
    }
  });
}

export function renderLoginView(container) {
  onAuthChange(user => {
    if (user) {
      renderLoggedInView(container, user);
    } else {
      renderLoggedOutView(container);
    }
  });
}
