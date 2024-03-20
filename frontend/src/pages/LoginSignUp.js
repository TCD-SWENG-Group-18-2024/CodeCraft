import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../components/AuthContext'
import Email from '../assets/email.png';
import Password from '../assets/password.png';
import Sidebar from '../components/Sidebar';
import "../styles/LoginSignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
    const {login } = useContext(AuthContext);
    const [userAction, setUserAction] = useState("Sign Up");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignUp = async () => {
        const userData = { username, password };
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            // If sign up is successful:

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                login();
                // setIsLoggedIn(true); // Set global isLoggedIn state to true
                navigate('/'); // Navigate to the home page using react-router
            }, 1500);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogin = async () => {
        const userData = { username, password };
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            // If login is successful:
            console.log("Login Successful", data);
            localStorage.setItem("userID", data.id); // Save userID
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                login();
                // setIsLoggedIn(true); // Set global isLoggedIn state to true
                navigate('/'); // Navigate to the home page using react-router
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePressingButton = () => {
        if (userAction === "Sign Up") {
            handleSignUp();
        } else if (userAction === "Login") {
            handleLogin();
        }
    };

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="container">
            {!showMessage && (
                <>
                    <div className="header">
                        <div className="text">{userAction}</div>
                        <div className="underline"></div>
                    </div>

                    <div className="inputs">
                        <div className="input">
                            <img src={Email} alt="Email" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="input">
                            <img src={Password} alt="Password" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="submitContainer">
                        <div className="submit" onClick={handlePressingButton}>
                            {userAction === "Login" ? "Login" : "Sign Up"}
                        </div>
                    </div>

                    <div className="switch">
                        {userAction === "Login" ? (
                            <>
                                <div>Don't have an Account?</div>
                                <div className="switchTab" onClick={() => setUserAction("Sign Up")}>
                                    Sign up
                                </div>
                                {/* The forgot password link should lead somewhere */}
                                <div className="forgotPasswordLink">
                                    Forgot your password?
                                </div>
                            </>
                        ) : (
                            <>
                                <div>Already have an account?</div>
                                <div className="switchTab" onClick={() => setUserAction("Login")}>
                                    Login
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            
            {showMessage && <div className="popup-message">Successful, Redirecting to Home Page...</div>}
        </div>
        </>
    );
};

export default SignUp;
