import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../components/AuthContext";
import Email from "../assets/email.png";
import Password from "../assets/password.png";
import Sidebar from "../components/Sidebar";
import "../styles/LoginSignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { login,logout,isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [userAction, setUserAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignUp = async () => {
    const userData = { email, password, confirm_password };
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.error);
        throw new Error(errorData.error);
      }

      const data = await response.json();
      // If sign up is successful:
      console.log(data);

      login();
      navigate("/"); // Navigate to the home page using react-router
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Please Enter Valid inputs");
    }
  };

  const handleLogin = async () => {
    login();
    const userData = { email, password,isLoggedIn };
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.error);
        throw new Error(errorData.error);
      }
      const data = await response.json();
      // If login is successful:
      console.log("Login Successful", data);
        localStorage.setItem("userID", data.id); // Save userID

      login();
      navigate("/"); // Navigate to the home page using react-router
    } catch (error) {
      logout();
      console.error("Error:", error);
    }
  };
  const handleForgotPassword = async () => {
    console.log("Forgot Password Pressed");

    const userEmail = { email };
    try {
      const response = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userEmail),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.error);
        throw new Error(errorData.error);
      } else {
        toast.success("Reset password link sent to your email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    if (userAction === "Sign Up") {
      handleSignUp();
    } else if (userAction === "Login") {
      handleLogin();
    } else if (userAction === "Forgot your Password") {
      handleForgotPassword();
    }
  };

  const handleEmailEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handlePasswordEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="container">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailEnter}
              ref={emailRef}
            />
          </div>

          {userAction !== "Forgot your Password" && (
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
          )}

          {userAction === "Sign Up" ? (
            <div className="input">
              <img src={Password} alt="Confirm your Password" />
              <input
                type="password"
                placeholder="Confirm your Password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handlePasswordEnter}
                ref={passwordRef}
              />
            </div>
          ) : null}
        </div>

        <div className="submitContainer">
          <div className="submit" onClick={handleSubmit}>
            {userAction === "Login"
              ? "Login"
              : userAction === "Sign Up"
              ? "Sign Up"
              : "Reset Password"}
          </div>
        </div>

        <div className="switch">
          {userAction === "Login" ? (
            <>
              <div>Don't have an Account?</div>
              <div
                className="switchTab"
                onClick={() => setUserAction("Sign Up")}
              >
                Sign up
              </div>

              <div
                className="forgotPassword"
                onClick={() => setUserAction("Forgot your Password")}
              >
                Forgot your password?
              </div>
            </>
          ) : userAction === "Forgot your Password" ? (
            <>
              <div className="switchTab" onClick={() => setUserAction("Login")}>
                Back To Login
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
      </div>
    </>
  );
};

export default SignUp;