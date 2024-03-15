// src/pages/TeamPage.js
import React from 'react';
import TeamGrid from '../components/TeamGrid';
import '../styles/TeamPage.css';
import IBM_white from '../assets/IBM_white.PNG';

const TeamPage = () => {
  return (
    <div className="team-page-container">
      <div className="back-to-home">
  <a href="/">
    <img src={IBM_white} alt="IBM Logo" className="ibm-logo" />
  </a>
</div>

      <div className="team-page-header">
        <h1 className="team-page-title">Meet the Team</h1>
        <p className="team-page-description">
        We are a dynamic team of 2nd and 3rd-year college students collaborating with IBM, fueled by innovation and driven to push boundaries in every project we undertake.
        </p>
       
      </div>
      <TeamGrid />
    </div>
  );
};

export default TeamPage;
