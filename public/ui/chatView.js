// public/ui/chatView.js

import { getCurrentUser } from '../auth.js';
import { getChatMessages } from '../db.js';

/**
 * Render the chat view for a specific chatId
 * @param {HTMLElement} container - Target DOM element
 * @param {string} chatId
 */
export async function renderChatView(container, chatId) {
  container.innerHTML = `<p>Loading messages...</p>`;

  try {
    const messages = await getChatMessages(chatId);
    const currentUserId = getCurrentUser()?.uid;

    if (messages.length === 0) {
      container.innerHTML = `<p>No messages yet.</p>`;
      return;
    }

    const messagesHtml = messages.map(msg => {
      const isCurrentUser = msg.senderId === currentUserId;
      const time = formatTimestamp(msg.createdAt?.toDate());

      return `
        <div class="message ${isCurrentUser ? 'sent' : 'received'}">
          <div class="message-text">${msg.text}</div>
          <div class="message-time">${time}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="chat-view-wrapper">
        <div class="messages">${messagesHtml}</div>
      </div>
    `;

    const messagesEl = container.querySelector('.messages');
    messagesEl.scrollTop = messagesEl.scrollHeight;
  } catch (err) {
    console.error('Failed to load messages:', err);
    container.innerHTML = `<p>Error loading messages.</p>`;
  }
}

/**
 * Format a JS Date to HH:mm
 * @param {Date} date
 * @returns {string}
 */
function formatTimestamp(date) {
  if (!date) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
