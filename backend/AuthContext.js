import React, { createContext, useState } from 'react';
import email from "../pages/LoginSignUp";
// Create the context
export const AuthContext = createContext();

// Create the context provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const login = () => {
  //  console.log("Setting isLoggedIn to true");
//    setIsLoggedIn(true);
 // };

const login = async () => {
    setIsLoggedIn(true);
     const data = {isLoggedIn, email}
     try{
       const response = await fetch("http://localhost:8080/login", {
         method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
      });
    }
  catch(error){
    console.error("Error:", error.message);
    toast.error("Please Enter Valid inputs");
  }


  const logout = () => {
    console.log("Setting logged in to false");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

}