import React from "react";
import { useState } from "react";
import "../styles/LoginSignUp.css"
import Email from '../assets/email.png';
import User from '../assets/person.png';
import Password from '../assets/password.png';
import IBM_white from '../assets/IBM_white.PNG';
import { Link } from 'react-router-dom';

const SignUp =() =>{

    const [userAction,setUserAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleSignUp = () => {

        const userData = {
            name: name,
            email: email,
            password: password
        }

        fetch( "http://localhost:8080/register",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        
    }

    const HandleLogin = () => {

    }

    const HandlePressingButton = () =>{
    if (userAction === "Sign Up") {
      HandleSignUp();
    } else if (userAction === "Login") {
      HandleLogin();
    }
    }
    return (
        <div className = "container">

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

                {userAction==="Login"?<div></div>:<div className = "input">
                    <img src ={User}/>
                    <input type = "user" 
                    placeholder = "Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}/>
                </div>}
                    
                <div className = "input">
                    <img src ={Email}/>
                    <input type = "email" 
                    placeholder = "Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
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
                    <div >
                        <a>
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

        </div>


    );
}

export default SignUp;
