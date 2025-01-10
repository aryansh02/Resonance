import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const docRef = doc(db, "roles", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRoles(data.roles || []);
        } else {
          setRoles([]);
        }
      } else {
        setUser(null);
        setRoles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const passwordlessSignIn = (email) => {
    const actionCodeSettings = {
      url: "http://localhost:3000",
      handleCodeInApp: true,
    };
    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        loading,
        login,
        signup,
        logout,
        passwordlessSignIn,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
