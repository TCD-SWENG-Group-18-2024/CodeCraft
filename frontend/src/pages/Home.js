import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IBM_White from "../assets/IBM_white.PNG";
import '../styles/Home.css';
import './LoginSignUp';
import './SubmissionPage';


function Home() {
    const [isLogoLoaded, setLogoLoaded] = useState(false);

    useEffect(() =>{
      setLogoLoaded(true);
    },[]);


    return (
      <div className="App">
        {/* <a href='https://www.ibm.com/us-en' target='blank_'><img src={IBM_White} alt="logo" className="logo" /></a> */}
        <nav className="App-nav">
          <div className="App-nav-links">
            <a href="#features">Features</a>
            <Link to="/team">Meet the Team</Link>
            <a href="#about">About</a>
            <Link to="/LoginSignUp" className="App-sign-up">Sign up</Link>
          </div>
        </nav>
  
        <a href='https://www.ibm.com/us-en' target='blank_'><img src={IBM_White} alt="logo" className={`logo ${isLogoLoaded ? `loaded`: ''}`} /></a>
        <h1 className="welcome-message">CodeCraft by: SwEng Project Group 18</h1>
  

    
        
          <Link to="/SubmissionPage" className="tab-link">
            <button className="StartAnalysisButton" >
              Start Analysis
              <span className='icon-right'></span>
              <span className='icon-right after'></span>
            </button>
          </Link>
        
  
      
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    );
  }

  export default Home;