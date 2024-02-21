// src/pages/TeamPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import TeamGrid from '../components/TeamGrid';
import '../styles/TeamPage.css';

const TeamPage = () => {
  return (
    <div className="team-page-container">
      <div className="team-page-header">
        <h1 className="team-page-title">Meet the Team</h1>
        <p className="team-page-description">
        We are a dynamic team of 2nd and 3rd-year college students collaborating with IBM, fueled by innovation and driven to push boundaries in every project we undertake.
        </p>
        <Link to="/" className="back-home-button">Back to Home</Link> 
      </div>
      <TeamGrid />
    </div>
  );
};

export default TeamPage;
