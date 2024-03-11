import { faArrowCircleLeft, faBars, faDashboard, faChartBar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isExportPage = location.pathname === "/ExportPage";
  const isSubmissionPage = location.pathname === "/SubmissionPage";

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
          <>
          <Link to="/SubmissionPage" className="sidebar_link">
            <FontAwesomeIcon icon={faChartBar} /> Submission Page
          </Link>
          <Link to="/ExportPage" className="sidebar_link">
            <FontAwesomeIcon icon={faChartBar} />  Export
          </Link>
          </>
        )}
        {isExportPage && (
          <>
          <Link to="/" className="sidebar_link">
            <FontAwesomeIcon icon={faDashboard} /> Dashboard
          </Link>
          <Link to="/SubmissionPage" className="sidebar_link">
            <FontAwesomeIcon icon={faChartBar} />  Submission Page
          </Link>
          </>
        )}
        {isSubmissionPage && (
          <>
          <Link to="/" className="sidebar_link">
            <FontAwesomeIcon icon={faDashboard} /> Dashboard
          </Link>
          <Link to="/ExportPage" className="sidebar_link">
            <FontAwesomeIcon icon={faChartBar} />  Export Page
          </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
