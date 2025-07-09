import { login } from '../auth.js';
import { navigateTo } from '../router.js';

/**
 * Render the login screen UI
 * @param {HTMLElement} container 
 */
export function renderLoginView(container) {
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
      navigateTo('#/');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  });
}
