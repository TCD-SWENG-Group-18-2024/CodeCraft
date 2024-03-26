import React from 'react';
import '../styles/Footer.css';
import { faHashtag} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Footer = () => {
    return(
        <div className='footer'>
            <hr />
            <p className="col-sm">
            &copy;          {new Date().getFullYear()}  CodeCraft | IBM 
          </p>
        </div>

    )
}

export default Footer;