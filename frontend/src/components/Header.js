import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <nav className="App-nav">
      <div className="App-nav-links">
        <Link to="/features">Features</Link>
        <Link to="/team">Meet the Team</Link>
        <Link to="/about">About</Link>
        {isLoggedIn ? (
          <Link to="/Account">Account</Link>
        ) : (
          <Link to="/LoginSignUp" className="App-sign-up">Sign up</Link>
        )}
      </div>
    </nav>
  );
}

export default Header;