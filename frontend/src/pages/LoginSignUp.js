import React, { useContext, useState, useRef } from "react";
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
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

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

            
            if (!response.ok){
                const errorData = await response.json();
                // console.log(errorData);
                throw new Error(errorData.error);
            }

            const data = await response.json();
            // If sign up is successful:
            console.log(data);

            setShowMessage(true);
            login();
            navigate('/'); // Navigate to the home page using react-router

        } catch (error) {
            console.error('Error:', error.message);
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

            if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();
            // If login is successful:
            console.log("Login Successful", data);
            localStorage.setItem("userID", data.id); // Save userID

            setShowMessage(true);
            login();
            // setIsLoggedIn(true); // Set global isLoggedIn state to true
            navigate('/'); // Navigate to the home page using react-router
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = () => {
        if (userAction === "Sign Up") {
            handleSignUp();
        } else if (userAction === "Login") {
            handleLogin();
        }
    };

    const handleEmailEnter = (e) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            passwordRef.current.focus();
        }
    }

    const handlePasswordEnter = (e) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    }

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
                                onKeyDown={handleEmailEnter}
                                ref={emailRef}
                            />
                        </div>

                        <div className="input">
                            <img src={Password} alt="Password" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handlePasswordEnter}
                                ref={passwordRef}
                            />
                        </div>
                    </div>

                    <div className="submitContainer">
                        <div className="submit" onClick={handleSubmit}>
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
