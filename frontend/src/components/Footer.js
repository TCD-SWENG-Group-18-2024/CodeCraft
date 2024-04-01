import React from "react";
import "../styles/Footer.css";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="footer">
      <a
        href="https://www.linkedin.com/in/tcd-sweng-group-eighteen-307115301/"
        target="_blank"
        alt="our LinkedIn Page"
      >
        <FontAwesomeIcon
          className="linkedInLink"
          icon={faLinkedin}
          size="3x"
          color="#0762C8"
        />
      </a>

      <a
        href="https://www.instagram.com/tcdswenggroup18/?igsh=MW5lbWR6ZmY5Znk4cw%3D%3D"
        target="_blank"
        alt="Our Instagram Page"
      >
        <FontAwesomeIcon
          className="instagramLink"
          icon={faInstagram}
          size="3x"
          color="purple"
        />
      </a>

      <p className="col-sm">
        &copy; {new Date().getFullYear()} CodeCraft | IBM
      </p>
    </div>
  );
};

export default Footer;
