// public/db.js
import { db } from './utils/firebase-init.js';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,

  collection,
  query,
  where,
  orderBy,
  getDocs,
  
  documentId,

} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

/**
 * Ensure user profile exists in Firestore
 * @param {firebase.User} user 
 */
export async function ensureUserProfile(user) {
  const existing = await getUserById(user.uid);
  if (!existing) {
    await createUser(user);
  }
}

/**
 * Fetch a user document by ID
 * @param {string} userId
 * @returns {Promise<Object|null>} user data or null if not found
 */
export async function getUserById(userId) {
  const userRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
}

/**
 * Fetch multiple users by ID in a single query (max 10)
 * @param {string[]} userIds
 * @returns {Promise<Object<string, Object>>} Map of userId → userData
 */
export async function getUsers(userIds) {
  if (userIds.length === 0) return {};

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where(documentId(), 'in', userIds.slice(0, 10)));
  const snapshot = await getDocs(q);

  const usersMap = {};
  snapshot.forEach(doc => {
    usersMap[doc.id] = doc.data();
  });

  return usersMap;
}

/**
 * Create a user document in Firestore
 * @param {firebase.User} user
 * @returns {Promise<void>}
 */
export async function createUser(user) {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    createdAt: serverTimestamp()
  });
}

/**
 * Extract unique other participant user IDs from chat docs
 * @param {Array} chats 
 * @param {string} currentUserId 
 * @returns {string[]}
 */
function extractOtherUserIds(chats, currentUserId) {
  return [...new Set(
    chats.map(chat =>
      chat.participants.find(id => id !== currentUserId)
    ).filter(Boolean)
  )];
}

/**
 * Merge user profile data into each chat object
 * @param {Array} chats 
 * @param {Object} usersMap 
 * @param {string} currentUserId 
 * @returns {Array}
 */
function enrichChatsWithUsers(chats, usersMap, currentUserId) {
  return chats.map(chat => {
    const otherUserId = chat.participants.find(id => id !== currentUserId);
    return {
      id: chat.id,
      lastMessage: chat.lastMessage,
      participant: usersMap[otherUserId] || { displayName: 'Unknown User' }
    };
  });
}

/**
 * Get all chat documents for a given user, enriched with participant info
 * @param {string} userId
 * @returns {Promise<Array>} Enriched chat objects
 */
export async function getUserChats(userId) {
  const chatsRef = collection(db, 'chats');

  const q = query(
    chatsRef,
    where('participants', 'array-contains', userId),
    orderBy('lastMessage.timestamp', 'desc')
  );

  const snapshot = await getDocs(q);
  const chatDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const otherUserIds = extractOtherUserIds(chatDocs, userId);
  const usersMap = await getUsers(otherUserIds);

  return enrichChatsWithUsers(chatDocs, usersMap, userId);
}

/**
 * Fetch messages for a chat, sorted by createdAt
 * @param {string} chatId
 * @returns {Promise<Array>} array of message objects
 */
export async function getChatMessages(chatId) {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('createdAt'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

