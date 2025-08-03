<<<<<<< HEAD
import React from "react";
import "./Footer.css";

import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintrest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icons">
        {[instagram_icon, pintrest_icon, whatsapp_icon].map((icon, index) => (
          <div key={index} className="footer-icons-container">
            <img src={icon} alt="social-icon" />
          </div>
        ))}
      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright © 2025 - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
=======
import React from 'react'
import './Footer.css'

import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintrest_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pintrest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2023 - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
