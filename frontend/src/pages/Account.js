import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; 
import '../styles/Account.css';

function Account() {
    const navigate = useNavigate();
    const {logout } = useContext(AuthContext);

    const handleSignout = () => {
        logout();
        console.log("Signing out...");
        navigate('/');
    };

    return (
        <div className="container">
            <div className="backToHome">
                <Link to="/">Back to Home</Link>
            </div>
            <div className="userGreeting">
                <h1>Hello, User!</h1>
                <p> Welcome back!</p>
                <p> Manage Your Account Here </p>
            </div>
            <ul className="featureList">
                <li><Link to="/edit-profile">Edit Profile</Link></li>
                <li><Link to="/messages">Messages</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/security-settings">Security Settings</Link></li>
                <li><Link to="/support">Support</Link></li>
            </ul>
            <button className="signOutButton" onClick={handleSignout}>Sign out</button>
        </div>
    );
}

export default Account;

