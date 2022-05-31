import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContextProvider = createContext();
export const Context = () => {
  return useContext(AuthContextProvider);
};

const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  console.log(currentUser?.email);
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPaswword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(passsword) {
    return currentUser.updatePassword(passsword);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  });

  return (
    <AuthContextProvider.Provider
      value={{ currentUser, signup, login, logout, resetPaswword,updateEmail ,updatePassword}}
    >
      {!loading && children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
