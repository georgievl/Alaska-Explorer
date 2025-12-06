import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const guidesCollection = collection(db, "guides");

// Create a new guide
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

// Get all guides
export async function getAllGuides() {
  const q = query(guidesCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// Get one guide by id
export async function getGuideById(id) {
  const ref = doc(db, "guides", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error("Guide not found");
  }

  return { id: snapshot.id, ...snapshot.data() };
}

// Get guides by author
export async function getGuidesByAuthor(authorId) {
  const q = query(guidesCollection, where("authorId", "==", authorId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// Update a guide
export async function updateGuide(id, data) {
  const ref = doc(db, "guides", id);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete a guide
export async function deleteGuide(id) {
  const ref = doc(db, "guides", id);
  await deleteDoc(ref);
}
