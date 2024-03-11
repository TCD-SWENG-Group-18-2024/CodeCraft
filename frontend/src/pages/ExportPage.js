import React, { useState } from 'react';
import axios from 'axios';
import HeaderImage from '../assets/IBM_white.PNG';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/SubmissionPage.css';
import './LoginSignUp';
import './Home';

const ExportPage = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [llmResponse, setLlmResponse] = useState('');  // State to store llmResponse
  const [filename, setFilename] = useState('');        // State to store filename
  const [outputLanguage, setOutputLanguage] = useState('');  // State to store outputLanguage

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};
 
  const ExportHandling =  async () => {
    if (!outputLanguage) {
      alert('Please select an output language');
      return;
    }

      const response = await await fetch("http://localhost:8080/llm/text", { 
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        llm_response: llmResponse,
        filename: filename,
        output_language: outputLanguage,
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `exported.${outputLanguage}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      // Handle the case where the export request fails
      console.error('Export failed:', response.statusText);
    }
  };

return (
  <>
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
          <header className="submission-header">
              <h1 className="submission-title">Export</h1>

              <nav className="App-nav">
                  <div className="App-nav-links">
                      <Link to="/"><img src={HeaderImage} alt="Code Craft" className="header-image"/></Link>
                      <a href="#features">Features</a>
                      <Link to="/team">Meet the Team</Link>
                      <a href="#about">About</a>
                      <Link to="/LoginSignUp" className="App-sign-up">Sign up</Link>
                  </div>
              </nav>

          </header>
          <h2>Export Page Content</h2>




        </div>
      </> 
    );
};
    export default ExportPage;
