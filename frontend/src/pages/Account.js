import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; 
import '../styles/Account.css';

function Account() {
    const navigate = useNavigate();
    const {logout } = useContext(AuthContext);
    const userEmail = localStorage.getItem("userEmail");
    const handleSignout = () => {
        localStorage.setItem("userID", "");
        logout();
        console.log("Signing out...");
        navigate('/');
    };

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div className="accountContainer">
                <div className="backToHome">
                    <Link to="/">Back to Home</Link>
                </div>
                <div className="userGreeting">
                    <p>You are signed in as</p>
                    <h1>{userEmail ? userEmail : "User"}</h1>
                </div>
                <button className="signOutButton" onClick={handleSignout}>Sign Out</button>
            </div>
        </div>
    );
}

export default Account;
