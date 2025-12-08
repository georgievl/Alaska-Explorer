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
  arrayUnion,
  arrayRemove,
  increment,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

const guidesCollection = collection(db, "guides");
const commentsCollection = collection(db, "comments");

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

export async function getAllGuides() {
  const q = query(guidesCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function getGuideById(id) {
  const ref = doc(db, "guides", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error("Guide not found");
  }

  return { id: snapshot.id, ...snapshot.data() };
}

export async function getGuidesByAuthor(authorId) {
  const q = query(guidesCollection, where("authorId", "==", authorId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function updateGuide(id, data) {
  const ref = doc(db, "guides", id);

  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGuide(id) {
  const ref = doc(db, "guides", id);
  await deleteDoc(ref);
}

export async function toggleLike(guideId, userId, isCurrentlyLiked) {
  const ref = doc(db, "guides", guideId);

  if (isCurrentlyLiked) {
    await updateDoc(ref, {
      likedBy: arrayRemove(userId),
      likesCount: increment(-1),
    });
  } else {
    await updateDoc(ref, {
      likedBy: arrayUnion(userId),
      likesCount: increment(1),
    });
  }
}

export async function addComment(guideId, authorId, authorName, text) {
  const docRef = await addDoc(commentsCollection, {
    guideId,
    authorId,
    authorName,
    text,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getCommentsForGuide(guideId) {
  const q = query(
    commentsCollection,
    where("guideId", "==", guideId),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function deleteComment(commentId) {
  const ref = doc(db, "comments", commentId);
  await deleteDoc(ref);
}

export async function getCommentsByAuthor(authorId) {
  const q = query(commentsCollection, where("authorId", "==", authorId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function getTopGuidesByLikes(max = 3) {
  const q = query(
    guidesCollection,
    orderBy("likesCount", "desc"),
    limit(max)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}
