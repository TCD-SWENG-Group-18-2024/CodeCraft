import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IBM_White from "../assets/IBM_white.PNG";
import Sidebar from '../components/Sidebar';
import HeaderImage from '../assets/logo.png';
import '../styles/Home.css';

function Home() {
    const [isLogoLoaded, setLogoLoaded] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setLogoLoaded(true);
        // Assuming you want to start the animation when the component mounts
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.classList.add('typing-animation');
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="App">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <a href='https://www.ibm.com/us-en' target='_blank' rel="noreferrer" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img src={IBM_White} alt="IBM Logo" className={`logo ${isLogoLoaded ? 'loaded' : ''}`} />
                    <img src={HeaderImage} alt="CodeCraft Logo" className="codecraft-logo"/>
                </a>
                <h3 className="welcome-message">Brought to you by Group 18</h3>
                <Link to="/SubmissionPage" className="tab-link">
                    <button className="StartAnalysisButton">
                        Start Analysis
                        <span className='icon-right'></span>
                        <span className='icon-right after'></span>
                    </button>
                </Link>
            </div>
            <div className="wave_container">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </>
    );
}

export default Home;
