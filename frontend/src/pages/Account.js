import React from 'react';
import {Link, useNavigate} from 'react-router-dom'

function Account() {

    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.removeItem('userID');
        navigate('/');
    };

    return (
        <>
            <div className="back-to-home">
                    <a href="/">
                        Back to Home
                    </a>
            </div>
            <h1>Hello, User!</h1>
            <div>Manage Your Account Here</div>
            <button onClick={handleSignout}>Sign out</button>
        </>
    );
}

export default Account;
