import React from 'react'
import '../styles/Home.css'
import './SubmissionPage'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import IBM_White from "../assets/IBM_white.PNG"


function Home() {
    return (

      
      <div className="App">
        
        <nav className="App-nav">
          <div className="App-nav-links">
            <a href="#features">Features</a>
            <a href="#team">Meet the team</a>
            <a href="#about">About</a>
            <button className="App-sign-up">Sign up</button>
          </div>
        </nav>
  
        <a href='https://www.ibm.com/us-en' target='blank_'><img src={IBM_White} alt="logo" className="logo" /></a>
        <h1 className="welcome-message"> Hello, SwEng Project Group 18</h1>
  
        <div className="tab">
          <Link to="/SubmissionPage" className="tab-link">
            Start Analysis <div className="circleRight"><FontAwesomeIcon icon={faCircleRight} /></div>
          </Link>
        </div>
  
      
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    );
  }

  export default Home;