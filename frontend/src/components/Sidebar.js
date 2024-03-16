import { faArrowCircleLeft, faBars, faDashboard, faChartBar, faLayerGroup, faPeopleGroup, faBook, faHouse} from '@fortawesome/free-solid-svg-icons';
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
          <div>
          <Link to="/SubmissionPage">
            <FontAwesomeIcon icon={faChartBar} /> Submission Page
          </Link>
          <Link to="/Features">
            <FontAwesomeIcon icon={faLayerGroup} /> Features
          </Link>
          <Link to="/team">
            <FontAwesomeIcon icon={faPeopleGroup} /> Meet the Team
          </Link>
          <Link to="/about">
            <FontAwesomeIcon icon={faBook} /> About us
          </Link>
        </div>
        )}
        {!isHomePage && (
          <div>
          <Link to="/" className="sidebar_link">
            <FontAwesomeIcon icon={faHouse} /> Home
          </Link>
          <Link to="/Features">
            <FontAwesomeIcon icon={faLayerGroup} /> Features
          </Link>
          <Link to="/team">
            <FontAwesomeIcon icon={faPeopleGroup} /> Meet the Team
          </Link>
          <Link to="/about">
            <FontAwesomeIcon icon={faBook} /> About us
          </Link>
        </div>
          
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
