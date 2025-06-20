// public/utils/firebase-init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADh2FOKhBxpoHxrB4xLc64grNZtpf-D4o",
  authDomain: "fir-chat-d2bc4.firebaseapp.com",
  projectId: "fir-chat-d2bc4",
  storageBucket: "fir-chat-d2bc4.firebasestorage.app",
  messagingSenderId: "1059417158139",
  appId: "1:1059417158139:web:0113cc83c3b650f2a59b5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
