import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

export async function register(email, password, displayName) {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (displayName) {
    await updateProfile(result.user, { displayName });
  }

  return result.user;
}

export async function login(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logout() {
  await signOut(auth);
}
