import { faArrowCircleLeft, faBars, faDashboard, faChartBar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__title">CodeCraft</div>
      <div className="sidebar__menu-label">
        <hr className="sidebar__menu-line" />
        <span>Menu</span>
        <hr className="sidebar__menu-line" />
      </div>
      <div className="sidebar__toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faArrowCircleLeft : faBars} />
      </div>
      <nav className="sidebar__nav">
        
       {isHomePage && (
        <Link to="/SubmissionPage">
         <FontAwesomeIcon icon={faChartBar} />Submission Page
         </Link>
  )}
         {!isHomePage && (
        <Link to="/"className="sidebar_link">
         <FontAwesomeIcon icon={faDashboard} />Dashboard
         </Link>
  )}
       
      </nav>
    </div>
  );
};


export default Sidebar;
