// seed-tools/seed.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccount.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const chatId = '5nzLqnMG5ncRsDjKJDam1wvq5ff2_dVUa3cByLkhm76P1xnmIzkKWaKO2';
const chatRef = db.collection('chats').doc(chatId);
const messagesRef = chatRef.collection('messages');

const userA = '5nzLqnMG5ncRsDjKJDam1wvq5ff2'; // GF
const userB = 'dVUa3cByLkhm76P1xnmIzkKWaKO2'; // You

const baseTime = new Date('2025-06-18T20:00:00Z');
const minutes = m => new Date(baseTime.getTime() + m * 60 * 1000);

// Messages for the conversation
const messages = [
  { senderId: userB, text: "Hey! How was your day?", createdAt: minutes(1) },
  { senderId: userA, text: "Really good! I had a surprise coffee with Emma 🍵", createdAt: minutes(2.5) },
  { senderId: userB, text: "That sounds lovely. Did you two talk about the trip?", createdAt: minutes(3.5) },
  { senderId: userA, text: "Yes, and she gave me great ideas for our weekend getaway 😍", createdAt: minutes(4.25) },
  { senderId: userA, text: "You always know how to make me smile 😊", createdAt: minutes(5) }
];

// 🔁 Single batch for delete + insert
const batch = db.batch();

// 1. Delete existing messages
const existingMessages = await messagesRef.listDocuments();
for (const docRef of existingMessages) {
  batch.delete(docRef);
}

// 2. Delete chat doc
batch.delete(chatRef);

// 3. Recreate chat doc
batch.set(chatRef, {
  participants: [userA, userB],
  createdAt: Timestamp.fromDate(minutes(0)),
  lastMessage: {
    text: messages[messages.length - 1].text,
    timestamp: Timestamp.fromDate(messages[messages.length - 1].createdAt),
    senderId: messages[messages.length - 1].senderId
  }
});

// 4. Recreate messages
for (const msg of messages) {
  const msgRef = messagesRef.doc(); // Auto-ID
  batch.set(msgRef, {
    senderId: msg.senderId,
    text: msg.text,
    createdAt: Timestamp.fromDate(msg.createdAt)
  });
}

// 5. Commit
await batch.commit();
console.log('✅ Chat and messages seeded successfully in a single batch.');
