# Project Progress – Firebase Chat App

## ✅ Completed

### 1. Firebase Setup
- Firebase project created
- Firestore initialized
- Authentication enabled

### 2. Authentication
- Login implemented with `signInWithEmailAndPassword`
- Logout with `signOut`
- Auth state persistence via `onAuthStateChanged`

### 3. Routing
- Hash-based router loads `login`, `chatList`, and `chatView` pages

### 4. Chat List
- Displays threads from `chatThreads` collection
- Filters by user participation

### 5. Chat View
- Displays real-time messages via Firestore `onSnapshot`
- Allows sending messages to Firestore

### 6. Firebase Abstraction Layer
- `db.js` encapsulates Firestore access logic

### 7. App Shell and Header
- `header.js` displays user and logout button
- `app.js` initializes router and sets up app

### 8. Basic Styling
- Core layout and UI responsiveness styled in `styles.css`

---

## 🚧 In Progress / To Do

### 1. User Registration
- Not yet implemented in UI or logic

### 2. Chat Creation
- No interface or backend logic to create new chat threads

### 3. Manage Chat Participants
- No UI for selecting or displaying chat participants

### 4. Error Handling
- Minimal error messaging outside login view
- Needs centralized user-friendly error handling

---

## 🔜 Next Steps
- [ ] Build registration form and hook to Firebase Auth
- [ ] Create UI for new chat creation (name + participants)
- [ ] Add support for chat participants display & selection
- [ ] Add alert/toast notifications for error feedback
- [ ] (Optional) Improve visual styling and UX polish

