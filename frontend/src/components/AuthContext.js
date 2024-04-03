import React, { createContext, useState,useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the context provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve value from local storage or default to false if not found
    return localStorage.getItem("isLoggedIn") === "true";
  });
  localStorage.setItem("isLoggedIn",isLoggedIn);
  // if its not logged in, set local userID to " "
  if(!isLoggedIn){
    localStorage.setItem("userID","");
  }
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    console.log("Setting logged in to false");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
