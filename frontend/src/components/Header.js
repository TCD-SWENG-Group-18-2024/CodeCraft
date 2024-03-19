import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderImage from '../assets/IBM_white.PNG';
import '../styles/Header.css';

const Header = ({ isLoggedIn }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="App-nav">
      <div className="App-nav-links">
        {isLoggedIn ? (
          // Links to show when the user is logged in
          <div>
            <Link to="/account">Account</Link>
            {/* The IBM logo will only show when not on the home page */}
            {!isHomePage && (
              <a href="https://www.ibm.com/us-en" target="_blank" rel="noopener noreferrer">
                <img src={HeaderImage} alt="IBM Logo" className="header-image" />
              </a>
            )}
          </div>
        ) : (
          // Links to show when the user is not logged in
          <div>
            <Link to="/">Home</Link>
            <Link to="/loginSignUp" className="App-sign-up">Sign up</Link>
            {/* The IBM logo will only show when not on the home page */}
            {!isHomePage && (
              <a href="https://www.ibm.com/us-en" target="_blank" rel="noopener noreferrer">
                <img src={HeaderImage} alt="IBM Logo" className="header-image" />
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
