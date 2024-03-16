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
          <div>
          <Link to="/Account">Account</Link>
          {!isHomePage && (
              <a href="https://www.ibm.com/us-en" target="_blank" rel="noopener noreferrer">
                <img src={HeaderImage} alt="IBM Logo" className="header-image" />
              </a>
            )}
          </div>
        ) : (
          <div>
          <Link to="/">Home</Link>
          <Link to="/LoginSignUp" className="App-sign-up">Sign up</Link>
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