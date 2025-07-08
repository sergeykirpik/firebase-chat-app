// public/auth.js

import { auth } from './utils/firebase-init.js';
import { ensureUserProfile } from './db.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const provider = new GoogleAuthProvider();

/**
 * Sign in with Google via popup and ensure user profile is stored in Firestore.
 * @returns {Promise<void>}
 */
export async function login() {
  const result = await signInWithPopup(auth, provider);
  await ensureUserProfile(result.user);
}

/**
 * Sign out the current user
 */
export function logout() {
  return signOut(auth);
}

/**
 * Listen for auth state changes
 * @param {(user: FirebaseUser|null) => void} callback
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get the current authenticated user
 * @returns {firebase.User|null}
 */
export function getCurrentUser() {
  return auth.currentUser;
}

