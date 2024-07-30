import React from "react";
import "../../index.css";
import { Button } from "../Button/Button";
import "./HeroSection.css";
import videoBg from "../../assets/Videos/Myrailguide.mp4";
function HeroSection() {
  return (
    <div className="hero-container">
      <video src={videoBg} autoPlay loop muted />
      <div className="hero-box">
        <p style={{ fontFamily: "UrbanistBlack" }}>
          Your one-stop solution for{" "}
        </p>
        <h1 style={{ fontFamily: "UrbanistBlack" }}>RAILWAY INQUIRIES</h1>
        <div className="hero-btns">
          <Button
            className="btns"
            src={"/ai-chatbot"}
            buttonStyle="btn--primary"
            buttonSize="btn--medium"
          >
            Try our new AI Chatbot
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
