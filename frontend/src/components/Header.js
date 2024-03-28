import React , {useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {AuthContext} from "../components/AuthContext"
import HeaderImage from '../assets/logo.png';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/loginSignUp";
  const isFeaturesPage = location.pathname ==="./features";
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <nav className={!isFeaturesPage ? "App-nav-default":"App-nav-features" }>
      <div className="App-nav-links" style={{ textAlign: "right" }}>
        {isLoggedIn ? (
          // Links to show when the user is logged in
          <div>
            <Link to="/account">Account</Link>
            {/* The logo will only show when not on the home page */}
            {!isHomePage && (
              <div className="logo-container">
                <img src={HeaderImage} alt="CodeCraft Logo" className="header-image" />
              </div>
            )}
          </div>
        ) : (
          // Links to show when the user is not logged in
          <div style={{display: "inline-flex",flexDirection:"row",alignItems:"center",margin: "2px " }}>
            {!isSignUpPage && (
              <Link to="/loginSignUp" className="App-sign-up" >Sign Up</Link>
            )}
            {/* The logo will only show when not on the home page */}
            {!isHomePage && (
              <div className="logo-container">
                <Link to="/">
                  <img src={HeaderImage} alt="CodeCraft Logo" className="header-image" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;