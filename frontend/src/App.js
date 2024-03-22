import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import {AuthProvider} from './components/AuthContext'
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import Account from './pages/Account';
import Features from './pages/Features';
import Home from "./pages/Home";
import LoginSignUp from './pages/LoginSignUp';
import SubmissionPage from './pages/SubmissionPage';
import TeamPage from './pages/TeamPage';
// move the logo to the indivdual pages
// import IBM from "./assets/IBM.PNG"
// import IBM_White from "./assets/IBM_white.PNG"

function App() {

    // State for managing login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for user authentication status when the app loads
    useEffect(() => {
      const storedUserID = localStorage.getItem('userID');
      setIsLoggedIn(!!storedUserID);
    }, []);

     // Function to handle logout
     const handleLogout = () => {
      // Clear any authentication tokens or user IDs
      localStorage.removeItem('userID');
      setIsLoggedIn(false);
      // Additional logout logic if needed
    };


  return (
    <Router>
      <AuthProvider>
        <div className="App">
        <Header isLoggedIn={isLoggedIn} /> {/*pass islogged in as prop*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/submissionPage" element={<SubmissionPage />} />
            <Route path="/loginSignUp" element={<LoginSignUp />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/account" element={<Account />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;