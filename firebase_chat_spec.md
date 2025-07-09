# Firebase Chat App Specification (Updated)

## ✅ Completed Features

### 🔐 Authentication
- **Login**: Implemented via Firebase `signInWithEmailAndPassword`
- **Logout**: Via Firebase `signOut`
- **Session Persistence**: `onAuthStateChanged` used to maintain session

### 🗺️ Routing
- Hash-based routing with views: `login`, `chatList`, `chatView`
- Dynamically loads page-specific JS and sets header

### 🧱 App Bootstrap
- Firebase initialized via `firebaseConfig`
- DOMContentLoaded initializes routing

### 💬 Chat Functionality
- **Chat List**: Lists threads user is part of from `chatThreads`
- **Chat View**: Loads thread messages in real-time using `onSnapshot`
- **Send Message**: User can send messages; stored in Firestore under `messages` collection

### 📁 Firebase Abstraction
- `db.js` abstracts Firestore interaction: getChats, listenToMessages, sendMessage

### 🧭 Header
- Displays current user
- Logout button included

### 🎨 Styling
- Core layout and basic responsive styles

## 🔧 Features In Progress / Not Implemented

### 👤 User Registration
- Not yet implemented
- Planned via `createUserWithEmailAndPassword`

### ➕ Chat Creation
- No UI or logic to create a new chat thread
- Spec target: allow naming chat + selecting users

### 👥 Chat Participants Management
- No support for managing participants in chat threads

### ⚠️ Error Handling
- Basic login error messages only
- Need user-friendly error display across app

## 🔜 Next Steps
1. Implement user registration
2. Add UI and logic for creating a new chat
3. Implement participant selection and updates
4. Improve error messages and feedback

