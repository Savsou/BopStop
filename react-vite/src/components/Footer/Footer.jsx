// import React from "react";
import "./Footer.css";
import logowhite from "../../../src/logo-white.png";
import linkedinLogo from "../../../../logos/linkedin-logo.png";
import githubLogo from "../../../../logos/github-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logowhite} alt="Logo" className="logo" />
        <div className="links">
          <p className="link">About</p>
          <p className="link">Help</p>
          <p className="link">Term of Use</p>
          <p className="link">Privacy</p>
          <p className="link">Copyright</p>
          <p className="link">Acceptable Use & Moderation Policy</p>
        </div>
      </div>
      <div className="social-medias">
        <a href="https://github.com/Savsou/BopStop">
          <img src={githubLogo} alt="github-logo" className="social-icon github-icon" />
        </a>
        <p className="socials">Connect with Team BopStop:</p>
        {/* </div>
      <div className="social-medias"> */}
        <div className="socials">
          <p>Pristine Shin</p>
          <a
            href="https://www.linkedin.com/in/pristine-shin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="pristine-linkedin" className="social-icon" />
          </a>
        </div>
        <div className="socials">
          <p>Tiffany Tseng</p>
          <a
            href="https://www.linkedin.com/in/ittseng/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="tiffany-linkedin" className="social-icon" />
          </a>
        </div>
        <div className="socials">
          <p>Zechariah Dominguez</p>
          <a
            href="https://www.linkedin.com/in/zechariah-dominguez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="zechariah-linkedin" className="social-icon" />
          </a>
        </div>
        <div className="socials">
          <p>Savannah Sou</p>
          <a
            href="https://www.linkedin.com/in/savannah-sou/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="savannah-linkedin" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
