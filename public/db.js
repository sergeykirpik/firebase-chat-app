// public/db.js
import { db } from './utils/firebase-init.js';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

/**
 * Ensure user profile exists in Firestore
 * @param {firebase.User} user 
 */
export async function ensureUserProfile(user) {
  const userRef = doc(db, 'users', user.uid);
  const existing = await getDoc(userRef);

  if (!existing.exists()) {
    await setDoc(userRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      createdAt: serverTimestamp()
    });
  }
}
