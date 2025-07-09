import { getUserChats } from '../db.js';
import { navigateTo } from '../router.js';
import { getCurrentUser } from '../auth.js';

/**
 * Render the chat list view for the logged-in user
 * @param {HTMLElement} container
 */
export async function renderChatList(container) {
  const user = getCurrentUser();
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
        <div class="chat-item" data-chat-id="${chat.id}">
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

    // Enable clicking to open chat view
    container.querySelectorAll('.chat-item').forEach(item => {
      item.addEventListener('click', () => {
        const chatId = item.dataset.chatId;
        if (chatId) {
          navigateTo(`#/chat/${chatId}`);
        }
      });
    });

  } catch (err) {
    console.error('Failed to load chat list:', err);
    container.innerHTML = `<p>Error loading chats.</p>`;
  }
}
