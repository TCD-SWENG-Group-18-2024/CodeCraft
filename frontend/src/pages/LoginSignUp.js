import React from "react";
import { useState } from "react";
import "../styles/LoginSignUp.css"
import Email from '../assets/email.png';
import Password from '../assets/password.png';
import IBM_white from '../assets/IBM_white.PNG';
import { Link} from 'react-router-dom';


const SignUp = () => {

    const [userAction,setUserAction] = useState("Sign Up");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const HandleSignUp = () => {

        const userData = {
            username: username, // username is the email
            password: password
        }

        fetch( "http://localhost:8080/register",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server if needed
            console.log(data);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                window.location.href = "/"
            }, 2500);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });

        
    }

    const HandleLogin = () => {

        const userData = {
            username: username, // username is the email
            password: password
        }
        fetch( "http://localhost:8080/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server if needed
            console.log("Login Successful")
            console.log(data);

            localStorage.setItem("userID", data.id);

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                window.location.href="/"; 
            }, 2500);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });

    }

    const HandlePressingButton = () =>{
        if (userAction === "Sign Up") {
            HandleSignUp();
        } else if (userAction === "Login") {
            HandleLogin();
        }
    }

    return (
        <>
        <div className = "container">

            
           {!showMessage && 
           <>
            <div className="back-to-home">
                    <a href="/">
                        <img src={IBM_white} alt="IBM Logo" className="ibm-logo" />
                    </a>
            </div>

            <div className = "header">
                <div className = "text">{userAction}</div>
                <div className = "underline"></div>
            </div>

            <div className ="inputs">

                <div className = "input">
                    <img src ={Email}/>
                    <input type = "user" 
                    placeholder = "Email" 
                    value={username} 
                    onChange={(e) => setUserName(e.target.value)}/>
                </div>

                <div className = "input">
                    <img src ={Password}/>
                    <input type = "password" 
                    placeholder = "Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>

                </div>

                <div className ="submitContainer">
                    {/* {set user data, not yet implemented} */}
                    <div className = "submit" onClick={HandlePressingButton}>{userAction==="Login"?<>Login</>:<>Sign Up</>} </div>
                </div>

                <div className ="switch">
                    {userAction === "Login" ? (
                        <>
                        <div>Don't have an Account?</div>
                        <div className="switchTab" onClick={() => setUserAction("Sign Up")}>Sign up</div>
                        <div className="forgotPasswordLink">
                            <a href="">
                                {/* route to a another page*/ }
                                Forgot your password?
                            </a>
                        </div>
                        </>
                        ) : (
                        <>
                        <div>Already have an account?</div>
                        <div className = "switchTab" onClick={() => setUserAction("Login")}>Login</div>
                        </>
                    )}
                </div> 
            </>}
            {showMessage && <div className="popup-message">Successful, Redirecting to Home Page...</div>}
        </div>
        </>
    );
}

export default SignUp;
