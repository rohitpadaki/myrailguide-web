import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import "./Cards.css";
function Footer() {
  return (
    <div className="footer">
      <div className="body-div"></div>
      <div className="dark">
        <div className="dark-footer">
          <div className="footer-header">
            <h2 style={{ fontFamily: "UrbanistBlack" }}>Contact Us</h2>
            <h4>
              We will be glad to build contacts with you. feel free to contact
              us.
            </h4>
          </div>
          <div className="footer-links">
            <div className="footer-links-info">
              <h4>Contact Info</h4>
              <p>SDM College of Engineering & Technology, ISE Branch</p>
              <p style={{ color: "grey" }}>
                Kalaghatagi Road,Dharwad 580002,
                <br />
                Karnataka,India
              </p>
            </div>
            <div className="footer-links-div">
              <div className="footer-call">
                <FontAwesomeIcon className="text-white" icon={faPhone} />
                <a
                  className="text-white hover:text-primary-color"
                  href="tel:+91 7483463968"
                >
                  +91 7483463968 (Viraj N Barge)
                </a>
              </div>
              <div className="footer-call">
                <FontAwesomeIcon className="text-white" icon={faPhone} />
                <a
                  className="text-white hover:text-primary-color"
                  href="tel:+91 9481541885"
                >
                  +91 9481541885 (Rohit B Padaki)
                </a>
              </div>
              <div className="footer-call">
                <FontAwesomeIcon className="text-white" icon={faPhone} />
                <a
                  className="text-white hover:text-primary-color"
                  href="tel:+91 7304797304"
                >
                  +91 7304797304 (Anish G Hegde)
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-below">
          <div className="footer_underline"></div>
          <div className="footer_copyright">
            <p>
              © 2024 MyRailGuide,All rights reserved | Powered by Team
              MyRailGuide
            </p>
          </div>
          <div className="footer_underline"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
