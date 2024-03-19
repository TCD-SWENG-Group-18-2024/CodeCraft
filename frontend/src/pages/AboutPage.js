import React, { useState } from 'react';
import HeroImage from '../assets/HeroImage.png';
import IBMWatson from '../assets/IBMWatson.jpg';
import Team from '../assets/Team.png';
import mentors from '../assets/mentors.png';
import Sidebar from '../components/Sidebar';
import '../styles/AboutPage.css';


const AboutPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //const [isLoggedIn, setIsLoggedInIn] = useState(false);
  //const [userID, setUserID] = useState(null);

  //const checkAuthentication = () => {
  //    const storedUserID = localStorage.getItem("userID")
  //    setIsLoggedInIn(!!storedUserID);
  //    setUserID(storedUserID);
 // };
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="about-page-container">
      <div className="back-to-home">
     {/* <Header isLoggedIn={isLoggedIn} /> */}
      </div>
      <div className="hero-section">
        <img src={HeroImage} alt="Hero" className="hero-image" />
        <div className="overlay-text">
          <h1>About Us</h1>
          <p>CodeCraft: Revolutionizing Software Engineering with AI</p>
        </div>
      </div>

      <div className="section reverse-section">
        <div className="text">
          <h2>Our Project</h2>
          <p>"CodeCraft" combines artificial intelligence with software engineering to improve code quality and streamline development. Utilising tools such as Python, LangChain, React and HuggingFace, alongside sophisticated Vector Databases, the project is the development of a new code analysis tool. This project presents an opportunity for cross-disciplinary teamwork, providing hands-on experience with AI  and modern development methodologies including GitOps and CI/CD. Our project "CodeCraft" with IBM contributes to the evolution of software engineering through practical innovation and teamwork.</p>
        </div>
        <div className="image-container">
          <img src={Team} alt="IBM" className="image-right" />
        </div>
      </div>

      <div className="section">
        <div className="text">
          <h2>About IBM</h2>
          <p>IBM (International Business Machines Corporation) is a leading technology and consulting company with a rich history of innovation. Headquartered in Armonk, New York, IBM specialises in cloud computing, artificial intelligence, blockchain, and quantum computing. Known for pioneering significant technological advancements such as the ATM and the floppy disk, IBM's mission is to empower organisations worldwide through cutting-edge technology solutions. Operating in over 170 countries, IBM is committed to driving progress and sustainability, leveraging data to address complex challenges and create smarter business solutions. </p>
        </div>
        <div className="image-container">
          <img src={IBMWatson} alt="Our Project" className="image-left" />
        </div>
      </div>

      <div className="section">
        <div className="image-container">
          <img src={mentors} alt="mentors" className="image-right" />
        </div>
        <div className="text">
          <h2>Meet Our Clients</h2>
          <p>Our two industry mentors, Mihai Criveti and Ronan Dalton will be guiding us throughout this project. Mihai has been working with IBM since 2008 and has been involved in different projects throughout his career there, ranging from IT Architect to his current position, IBM Consulting and Vice Chair. Ronan has been working with IBM since 2000, where he started off as a Business Analyst and Developer and has evolved into Technical Sales Leader and CTO.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPage;
