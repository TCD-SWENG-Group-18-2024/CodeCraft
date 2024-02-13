import { faBars, faDashboard, faFileExport, faLanguage, faQuestionCircle, faVial } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';


const Sidebar = ({ isOpen, toggleSidebar }) => {
 return (
   <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
     <div className="sidebar__title">CodeCraft</div>
     <div className="sidebar__menu-label">
       <hr className="sidebar__menu-line" />
       <span>Menu</span>
       <hr className="sidebar__menu-line" />
     </div>
     <div className="sidebar__toggle" onClick={toggleSidebar}>
       <FontAwesomeIcon icon={faBars} />
     </div>
     <nav className="sidebar__nav">
     <Link to="/" className="sidebar__link">
       <FontAwesomeIcon icon={faDashboard} /> Dashboard </Link>
       <a href="#language"><FontAwesomeIcon icon={faLanguage} /> Language and Frameworks</a>
       <a href="#export"><FontAwesomeIcon icon={faFileExport} /> Export</a>
       <a href="#test"><FontAwesomeIcon icon={faVial} /> Test Code</a>
       <a href="#help"><FontAwesomeIcon icon={faQuestionCircle} /> Help & Support</a>
       {/* feel free to add other features, the ones above are also mainly placeholders*/}
     </nav>
   </div>
 );
};


export default Sidebar;
