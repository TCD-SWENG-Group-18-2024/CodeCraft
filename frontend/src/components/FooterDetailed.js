import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return(
        <div className='main-footer'>
            <div className='xxx'>
                <div className='row'>
                    {/* column 1 */}
                    <div className='col'>
                        <h4>CodeCraft</h4>
                        <ul className='list-unstyled'>
                            <li>627 9172 62</li>
                            <li>Dublin, Ireland</li>
                            <li>Trinity College Dublin</li>
                        </ul>
                    </div>
                    {/* column 2 */}
                    <div className='col'>
                        <h4>IBM</h4>
                        <ul className='list-unstyled'>
                            <li>729 6193 6378</li>
                            <li>Dublin, Ireland</li>
                            <li>Charlemont Exchange, WeWork Office Space, Saint Kevin's, Dublin</li>
                        </ul>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default Footer;