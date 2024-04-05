import React, { createContext, useState,useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the context provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  // if its not logged in, set local userID to " "
  if(!isLoggedIn){
    localStorage.setItem("userID","");
  }
  const login = () => {
    // can be set to any string
    localStorage.setItem("isLoggedIn","true");
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
