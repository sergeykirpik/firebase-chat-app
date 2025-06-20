# 🔄 Project Progress – Firebase 1:1 Chat App

## ✅ Phase 1: Setup & Auth

- [x] Firebase project created and initialized
- [x] Firestore database and Auth (Google) enabled
- [x] File structure scaffolded
- [x] `firebase-init.js` with modular CDN SDK
- [x] Login/logout UI + logic
- [x] Auth state listener integrated
- [x] User profile stored in Firestore on login
- [x] Basic styling for logged-in and logged-out screens

## ✅ Phase 2: Chat List View

- [x] Centralized Firestore access in `db.js`
- [x] Modular `getUserChats()` with participant info enrichment
- [x] Batched user lookup via `getUsers()`
- [x] UI module `chatList.js` with clean rendering
- [x] Manual test chats added to Firestore
- [x] Global app header with logout button
- [x] `login.js` refactored to pure login screen
- [x] `app.js` as the root view controller

---

## ⏭️ Next Phase: Chat View & Messaging

- [ ] Render full message history in `chatView.js`
- [ ] Add new messages with `messageInput.js`
- [ ] Edit/delete own messages
- [ ] Update `lastMessage` field in `chats/`
- [ ] Start new chats via email search (`newChatModal.js`)

---

## 📁 Repo Info

- Tech: Vanilla JS + Firebase Auth/Firestore
- Spec: `firebase_chat_spec.md`
