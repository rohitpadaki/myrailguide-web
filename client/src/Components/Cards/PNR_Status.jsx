import React, { useEffect } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import pnrlogo from "../../assets/Images/pnrlogo.png";
import pnr1 from "../../assets/Images/ss/white/pnr-status.png";
import pnr2 from "../../assets/Images/ss/white/pnr-status1.png";
import { Button } from "../Button/Button";
import AOS from "aos";
import "aos/dist/aos.css";
function PNR_Status() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  function abc() {}

  return (
    <>
      <div className="card-container">
        <img
          id="s3"
          src={pnr1}
          data-aos="zoom-in-up"
          alt="ai-ss"
          data-aos-duration="1500"
        />
        <img
          id="s4"
          src={pnr2}
          alt="ai-ss"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        />
        <div
          className="pnr-card__wrapper"
          data-aos="zoom-in-up"
          data-aos-duration="1200"
        >
          <img id="pnrlogo" src={pnrlogo} alt="pnr-logo" />
          <h1 style={{ fontFamily: "UrbanistBlack" }}>Track Your</h1>
          <h1 style={{ fontFamily: "UrbanistBlack" }}>Journey</h1>
          <p>The PNR (Passenger Name Record) status provides</p>
          <p>real-time information about seat and berth</p>
          <p>reservations in Indian Railways. The PNR number,</p>
          <p>typically found on the top left corner of printed tickets</p>
          {/*<div className="card-btn">
            <Button
              className="btns"
              buttonStyle="btn--primary"
              buttonSize="btn--medium"
            >
              Check Out Your PNR Status
            </Button>
  </div>*/}
        </div>
      </div>
    </>
  );
}

export default PNR_Status;
