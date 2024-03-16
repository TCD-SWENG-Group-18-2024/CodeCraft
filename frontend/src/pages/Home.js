import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IBM_White from "../assets/IBM_white.PNG";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; 
import UserIcon from "../assets/person.png";
import '../styles/Home.css';
import './LoginSignUp';
import './SubmissionPage';

function Home() {

  const [isLogoLoaded, setLogoLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedInIn] = useState(false);
  const [userID, setUserID] = useState(null);


  useEffect(() => {
      setLogoLoaded(true);
      checkAuthentication();
      const welcomeMessage = document.querySelector('.welcome-message');
      welcomeMessage.classList.add('typing-animation');
  }, []);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  const checkAuthentication = () => {
    const storedUserID = localStorage.getItem("userID")
    setIsLoggedInIn(!!storedUserID);
    setUserID(storedUserID);
  };

  return (
    <>
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
          {/* Optional: Button to toggle sidebar */}
          {/* <button onClick={toggleSidebar} className="toggle-sidebar-button">Menu</button> */}
          
        <Header isLoggedIn={isLoggedIn} /> 
  
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
        

        
      </div>
        <div className='wave_container'>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

      </>
    );
  }

export default Home;