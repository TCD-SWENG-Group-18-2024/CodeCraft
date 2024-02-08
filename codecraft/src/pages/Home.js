import React from 'react'
import '../styles/Home.css'
import './SubmissionPage'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

function Home(){
    return(
        <div>
            <p style={{ fontSize: '50px' }}>Hello, SwEng Project Group 18</p>
            <div className="tab">
            <Link to="/SubmissionPage" className="tab-link">
                Start Analysis<div className='circleRight'><FontAwesomeIcon icon = {faCircleRight}/></div>
            </Link>
    </div>
            
        </div>
    )
    
}




export default Home;