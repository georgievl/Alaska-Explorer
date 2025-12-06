// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // { uid, email, displayName }
  const [loading, setLoading] = useState(true); // while checking Firebase

  useEffect(() => {
    // Listen to Firebase auth changes (login/logout/refresh)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email, displayName } = firebaseUser;
        setUser({ uid, email, displayName });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const isAuthenticated = !!user;

  // Wrap service functions so components use context only
  const handleRegister = async (email, password, displayName) => {
    const newUser = await authService.register(email, password, displayName);
    const { uid, email: userEmail, displayName: name } = newUser;
    setUser({ uid, email: userEmail, displayName: name });
  };

  const handleLogin = async (email, password) => {
    const loggedInUser = await authService.login(email, password);
    const { uid, email: userEmail, displayName } = loggedInUser;
    setUser({ uid, email: userEmail, displayName });
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Optional: you can show a spinner while loading initial auth state */}
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
