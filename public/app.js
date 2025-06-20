import { onAuthChange } from './auth.js';
import { renderLoginView } from './ui/login.js';
// import { renderChatList } from './ui/chatList.js'; // later

const appContainer = document.getElementById('app');

onAuthChange(user => {
  if (user) {
    // For now, let login.js handle logout UI too
    // Later: renderChatList(appContainer, user);
    renderLoginView(appContainer);
  } else {
    renderLoginView(appContainer);
  }
});
