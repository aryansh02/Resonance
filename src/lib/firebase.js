import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

export const addDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const fetchCollection = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching collection: ", error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const queryCollection = async (
  collectionName,
  field,
  operator,
  value
) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error querying collection: ", error);
    throw error;
  }
};

export const authStateListener = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User successfully logged out.");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};

export { app, auth, googleProvider, db };
