import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IBM_White from "../assets/IBM_white.PNG";
import '../styles/Home.css';
import './LoginSignUp';
import './SubmissionPage';
import Sidebar from '../components/Sidebar';


function Home() {
  const [isLogoLoaded, setLogoLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
      setLogoLoaded(true);

      const welcomeMessage = document.querySelector('.welcome-message');
      welcomeMessage.classList.add('typing-animation');
  }, []);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="App">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
          {/* Optional: Button to toggle sidebar */}
          <button onClick={toggleSidebar} className="toggle-sidebar-button">Menu</button>
          
        <nav className="App-nav">
          <div className="App-nav-links">
            <a href="#features">Features</a>
            <Link to="/team">Meet the Team</Link>
            <a href="#about">About</a>
            <Link to="/LoginSignUp" className="App-sign-up">Sign up</Link>
          </div>
        </nav>
  
        <a href='https://www.ibm.com/us-en' target='blank_'><img src={IBM_White} alt="logo" className={`logo ${isLogoLoaded ? `loaded`: ''}`} /></a>
        <h1 className="ProjectName">CodeCraft</h1>
        
        <h3 className="welcome-message">Brought to you by Group 18</h3>
        
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