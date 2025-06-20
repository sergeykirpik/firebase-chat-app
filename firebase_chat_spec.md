---

# Firebase 1:1 Chat App – Specification

## 📌 Purpose

A lightweight, serverless web chat application for private 1:1 messaging between friends or family members. Built with Firebase and deployed as a responsive single-page web app.

---

## ✅ Core Features

- Google Sign-In via Firebase Auth
- 1:1 real-time messaging (no groups)
- Chat list with last message preview
- Edit/delete own messages
- Message history
- Responsive UI for desktop and mobile
- No presence, typing indicators, or notifications

---

## 🧱 Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML, CSS
- **Backend**: Firebase (Auth, Firestore, Hosting)

---

## 🔢 Firestore Data Model

### `users/{userId}`

```json
{
  "displayName": "string",
  "photoURL": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

### `chats/{chatId}`

```json
{
  "participants": ["userId1", "userId2"],
  "createdAt": "timestamp",
  "lastMessage": {
    "text": "string",
    "timestamp": "timestamp",
    "senderId": "string"
  }
}
```

### `chats/{chatId}/messages/{messageId}`

```json
{
  "senderId": "string",
  "text": "string",
  "createdAt": "timestamp",
  "editedAt": "timestamp (optional)",
  "deleted": "boolean"
}
```

### Chat ID Convention

- Deterministic: `chatId = userA_userB` (sorted alphabetically)

---

## 🧭 App Flow

### 1. Login

- Google sign-in
- Store user profile in `users/{userId}`

### 2. Chat List

- Display all chats where `participants` contains `currentUserId`
- Last message preview and timestamp
- New chat: search user by email → open or create chat

### 3. Chat View

- Stream messages from `messages` subcollection
- Edit/delete own messages
- Input box to send new messages

---

## 🔐 Firestore Security Rules (Minimal, Dev-Ready)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🧩 Frontend File Structure

```
/public
  ├── index.html
  ├── styles.css
  ├── app.js
  ├── auth.js
  ├── db.js
  ├── ui/
  │   ├── login.js
  │   ├── chatList.js
  │   ├── chatView.js
  │   ├── newChatModal.js
  │   └── messageInput.js
  └── utils/
      ├── firebase-init.js
      └── helpers.js
```

---

## 🔧 Key Modules

### `firebase-init.js`

- Firebase app, auth, firestore init

### `auth.js`

- Google login/logout
- Track auth state

### `db.js`

- Fetch/create chats
- Fetch/send/edit/delete messages

### `/ui/*.js`

- Render and manage each view/component

---

## 🏁 Status

- ✅ Planning complete
- ✅ Spec complete
- 🚧 Ready to begin development

