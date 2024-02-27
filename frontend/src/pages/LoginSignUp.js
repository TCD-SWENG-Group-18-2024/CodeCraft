import React from "react";
import { useState } from "react";
import "../styles/LoginSignUp.css"
import Email from '../assets/email.png';
import User from '../assets/person.png';
import Password from '../assets/password.png';



const SignUp =() =>{

    const [userAction,setUserAction] = useState("Sign Up");



    return (
        <div className = "container">
            <div className = "header">
                <div className = "text">{userAction}</div>
                <div className = "underline"></div>
            </div>
            <div className ="inputs">
                {userAction==="Login"?<div></div>:<div className = "input">
                    <img src ={User}/>
                    <input type = "user" placeholder = "Name"/>
                </div>}
                    
                <div className = "input">
                    <img src ={Email}/>
                    <input type = "email" placeholder = "Email"/>
                </div>
                <div className = "input">
                    <img src ={Password}/>
                    <input type = "password" placeholder = "Password"/>
                </div>
            </div>
            <div className ="submitContainer">
                {/* {set user data, not yet implemented} */}
                <div className = "submit" >{userAction==="Login"?<>Login</>:<>Sign Up</>}</div>
            </div>
            <div className ="switch">
                {userAction === "Login" ? (
                    <>
                    <div>Don't have an Account?</div>
                    <div className="switchTab" onClick={() => setUserAction("Sign Up")}>Sign up</div>
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
