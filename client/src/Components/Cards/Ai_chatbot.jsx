import React, { useEffect } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import logo from "../../assets/Images/AI-robot-technology-brain-chip-512.png";
import aiss1 from "../../assets/Images/ss/white/ai-chatbot.png";
import aiss2 from "../../assets/Images/ss/white/ai-chatbot1.png";
import AOS from "aos";
import "aos/dist/aos.css";
function Cards() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <>
      <div className="card-container">
        <img
          id="s1"
          src={aiss1}
          data-aos="zoom-in-up"
          alt="ai-ss"
          data-aos-duration="1500"
        />
        <img
          id="s2"
          src={aiss2}
          alt="ai-ss"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        />
        <div
          className="card__wrapper"
          data-aos="zoom-in-up"
          data-aos-duration="1200"
        >
          <img id="ailogo" src={logo} alt="ai-logo" />
          <h1 style={{ fontFamily: "UrbanistBlack" }}>Revolutionizing</h1>
          <h1 style={{ fontFamily: "UrbanistBlack" }}>
            Artificial Intelligence
          </h1>
          <p>With use of AI Technology that is</p>
          <p>integrated with Gemini, the popular LLM</p>
          <p>from Google. It is fine-tuned to query database</p>
          <p>details and also to provide general information</p>
         {/* <div className="card-btn">
            <Button
              className="btns"
              buttonStyle="btn--primary"
              buttonSize="btn--medium"
            >
              Try our new AI Chatbot
          </Button>
          </div>*/}
        </div>
      </div>
    </>
  );
}

export default Cards;
