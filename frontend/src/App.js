import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import {AuthProvider} from './components/AuthContext'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import Account from './pages/Account';
import Features from './pages/Features';
import Home from "./pages/Home";
import LoginSignUp from './pages/LoginSignUp';
import SubmissionPage from './pages/SubmissionPage';
import TeamPage from './pages/TeamPage';
import Footer from './components/Footer'
import ResetPassword from './pages/ResetPasswordPage';

const backendURL = process.env.REACT_APP_BACKEND_URL;
console.log("backend URL: " + backendURL);

function App() {

  // Function to ping the backend
const pingBackend = () => {
  fetch(backendURL)
    .then(response => {
      if (response.ok) {
        console.log('Backend is Alive');
      } else {
        console.error('Error pinging backend: Error Code ', response.status);
      }
    })
    .catch(error => {
      console.error('Error pinging backend: ', error);
    });
  };

  // Interval to ping every 10 seconds (adjust as needed)
  const pingInterval = setInterval(pingBackend, 10 * 1000);

  // Function to stop the ping interval when frontend is closed
  const stopPing = () => {
    clearInterval(pingInterval);
  };

  // Call stopPing when the frontend is closed or unloaded
  window.addEventListener('beforeunload', stopPing);

  return (
    <div>
      <Router>
      <AuthProvider>
        <div className="App">
        <Toaster position='top-center'/>
        <Header /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/submissionPage" element={<SubmissionPage />} />
            <Route path="/loginSignUp" element={<LoginSignUp />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/reset" element={<ResetPassword/>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
    <Footer />
    </div>
    

  );
}

export default App;
