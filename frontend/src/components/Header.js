import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <nav className="App-nav">
      <div className="App-nav-links">
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