import React from 'react'
import '../styles/Home.css'
import './SubmissionPage'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

// just added 3 divs to make the wave on the background
function Home(){
    return(
        <div>
            <p style={{ fontSize: '50px' }}>Hello, SwEng Project Group 18</p>
            <div className="tab">
            <Link to="/SubmissionPage" className="tab-link">
                Start Analysis<div className='circleRight'><FontAwesomeIcon icon = {faCircleRight}/></div>
            </Link>
            </div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
    )
    
}




export default Home;