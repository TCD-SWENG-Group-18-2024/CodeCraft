import Email from "../assets/email.png";
import Password from "../assets/password.png";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/ResetPasswordPage.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const userData = { email, password, confirm_password };
    try {
      const response = await fetch("http://backend.1f106c1j1agn.svc.cluster.local/reset-password", {
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
      toast.success("Reset Password Successfully");

      navigate("/"); // Navigate to the home page using react-router
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Please Enter Valid inputs");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Reset Password</div>
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

        <div className="input">
          <img src={Password} alt="New Password" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordEnter}
            ref={passwordRef}
          />
        </div>

        <div className="input">
          <img src={Password} alt="Confirm New Password" />
          <input
            type="password"
            placeholder="Confirm your Password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handlePasswordEnter}
            ref={passwordRef}
          />
        </div>
      </div>

      <div className="submitContainer">
        <div className="submit" onClick={handleSubmit}>
          Reset Password
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
