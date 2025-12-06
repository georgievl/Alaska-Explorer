import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const guidesCollection = collection(db, "guides");

// Create
export async function createGuide(data, authorId, authorName) {
  const docRef = await addDoc(guidesCollection, {
    ...data,
    authorId,
    authorName,
    likesCount: 0,
    likedBy: [],
    createdAt: serverTimestamp(),
    updatedAt: null,
  });

  return docRef.id;
}

// Read all guides
export async function getAllGuides() {
  const snapshot = await getDocs(guidesCollection);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Read one guide
export async function getGuideById(id) {
  const ref = doc(db, "guides", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    throw new Error("Guide not found");
  }
  return { id: snapshot.id, ...snapshot.data() };
}

// Read guides by current user
export async function getGuidesByAuthor(authorId) {
  const q = query(guidesCollection, where("authorId", "==", authorId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Update
export async function updateGuide(id, data) {
  const ref = doc(db, "guides", id);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete
export async function deleteGuide(id) {
  const ref = doc(db, "guides", id);
  await deleteDoc(ref);
}
