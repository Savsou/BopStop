// import React from "react";
import "./Footer.css"; // Optional: For custom styles
import logowhite from "../../../src/logo-white.png";

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
    </footer>
  );
};

export default Footer;
