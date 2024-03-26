import React, { useState } from 'react';
import IBMWatson from '../assets/IBMWatson.jpg';
import Team from '../assets/Team.png';
import mentors from '../assets/mentors.png';
import macu from '../assets/macu.png';
import Sidebar from '../components/Sidebar';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="about-page-container">
        <div className="back-to-home">
        </div>
        <h1 className="about-title">About Us</h1>

        <div className="section reverse-section">
          <div className="text-container">
            <h2>Our Project</h2>
            <p>"CodeCraft" combines artificial intelligence with software engineering to improve code quality and streamline development. Utilising tools such as Python, LangChain, React and HuggingFace, alongside sophisticated Vector Databases, the project is the development of a new code analysis tool. This project presents an opportunity for cross-disciplinary teamwork, providing hands-on experience with AI  and modern development methodologies including GitOps and CI/CD. Our project "CodeCraft" with IBM contributes to the evolution of software engineering through practical innovation and teamwork.</p>
          </div>
          <div className="image-container">
            <img src={Team} alt="The CodeCraft Team" className="image-right" />
          </div>
        </div>

        <div className="section">
          <div className="text-container">
            <h2>About IBM</h2>
            <p>IBM (International Business Machines Corporation) is a leading technology and consulting company with a rich history of innovation. Headquartered in Armonk, New York, IBM specialises in cloud computing, artificial intelligence, blockchain, and quantum computing. Known for pioneering significant technological advancements such as the ATM and the floppy disk, IBM's mission is to empower organisations worldwide through cutting-edge technology solutions. Operating in over 170 countries, IBM is committed to driving progress and sustainability, leveraging data to address complex challenges and create smarter business solutions.</p>
          </div>
          <div className="image-container">
            <img src={IBMWatson} alt="IBM Watson" className="image-left" />
          </div>
        </div>

        <div className="section">
          <div className="image-container">
            <img src={mentors} alt="IBM Mentors" className="image-right" />
          </div>
          <div className="text-container">
            <h2>Meet Our Clients</h2>
            <p>Our two industry mentors, Mihai Criveti and Ronan Dalton will be guiding us throughout this project. Mihai has been working with IBM since 2008 and has been involved in different projects throughout his career there, ranging from IT Architect to his current position, IBM Consulting and Vice Chair. Ronan has been working with IBM since 2000, where he started off as a Business Analyst and Developer and has evolved into Technical Sales Leader and CTO.</p>
          </div>
        </div>

        {/* <div className="section">
          <div className="image-container">
            <img src={macu} alt="Dr. Inmaculada Arnedillo-Sanchez" className="image-left" />
          </div>
          <div className="text-container">
            <h2>Our SWENG Coordinator</h2>
            <p>Dr. Inmaculada Arnedillo-Sánchez, our module coordinator for Software Engineering Project I & II, brings a diverse educational background and over 24 years of experience at Trinity College Dublin. With degrees from Western Sydney University and the University of Granada in Interpreting and Translation, as well as a Higher Diploma in Education from the University of Cádiz, she offers invalulable expertise to our learning journey. Her Masters of Science and subsequent PhD in Philosophy from Trinity College Dublin further enrich her contributions to our academic experience. We're privileged to have her as our lecturer for this module, as her expertise facilitates valuable collaboration with industry businesses, providing us with an amazing opportunity to apply our skills in real-world settings.</p>
          </div>
        </div> */}

      </div>
    </>
  );
};

export default AboutPage;
