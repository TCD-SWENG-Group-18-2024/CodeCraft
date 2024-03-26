import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import TeamGrid from '../components/TeamGrid';
import '../styles/TeamPage.css';

const TeamPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control Sidebar visibility

    // Function to toggle the Sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="team-page-container">
                {/* Removed the back-to-home div as it's no longer necessary with the global Header */}

                <div className="team-page-header">
                    <h1 className="team-page-title">Meet the Team</h1>
                    <p className="team-page-description">
                        We are a dynamic team of 2nd and 3rd-year college students collaborating with IBM, fueled by innovation and driven to push boundaries in every project we undertake.
                    </p>
                </div>
                <TeamGrid />
            </div>
        </>
    );
};

export default TeamPage;
