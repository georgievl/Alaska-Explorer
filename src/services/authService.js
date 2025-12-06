import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

// Register a new user
export async function register(email, password, displayName) {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  // Optional: set displayName
  if (displayName) {
    await updateProfile(result.user, { displayName });
  }

  return result.user; // contains uid, email, displayName
}

// Login existing user
export async function login(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

// Logout current user
export async function logout() {
  await signOut(auth);
}
