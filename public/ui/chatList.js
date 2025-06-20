import { getUserChats } from '../db.js';

/**
 * Render the chat list view for the logged-in user
 * @param {HTMLElement} container
 * @param {firebase.User} user
 */
export async function renderChatList(container, user) {
  container.innerHTML = `<p>Loading chats...</p>`;

  try {
    const chats = await getUserChats(user.uid);

    if (chats.length === 0) {
      container.innerHTML = `<p>No chats yet. Start a new one!</p>`;
      return;
    }

    const listHtml = chats.map(chat => {
      const { participant, lastMessage } = chat;
      const preview = lastMessage?.text || '(no message)';
      const time = lastMessage?.timestamp?.toDate().toLocaleString() || '';

      return `
        <div class="chat-item">
          <img class="avatar" src="${participant.photoURL}" alt="${participant.displayName}" />
          <div class="chat-meta">
            <strong>${participant.displayName}</strong>
            <span class="preview">${preview}</span>
            <span class="time">${time}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `<div class="chat-list">${listHtml}</div>`;
  } catch (err) {
    console.error('Failed to load chat list:', err);
    container.innerHTML = `<p>Error loading chats.</p>`;
  }
}
