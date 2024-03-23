import React , {useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {AuthContext} from "../components/AuthContext"
import HeaderImage from '../assets/logo.png';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/loginSignUp";
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <nav className="App-nav" style={{height:"30px"}}>
      <div className="App-nav-links">
        {isLoggedIn ? (
          // Links to show when the user is logged in
          <div>
            <Link to="/account">Account</Link>
            {/* The IBM logo will only show when not on the home page */}
            {!isHomePage && (
                <img src={HeaderImage} alt="IBM Logo" className="header-image" />
            )}
          </div>
        ) : (
          // Links to show when the user is not logged in
          <div>
            
            {!isSignUpPage && (
              <Link to="/loginSignUp" className="App-sign-up">Sign up</Link>
            )}
            {/* The IBM logo will only show when not on the home page */}
            {!isHomePage && (
                <Link to="/">
                <img src={HeaderImage} alt="IBM Logo" className="header-image"/>
                </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
