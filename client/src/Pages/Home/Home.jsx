import "../../index.css";
import Cards from "../../Components/Cards/Ai_chatbot";
import Generate_QRCode from "../../Components/Cards/Generate_QRCode";
import PNR_Status from "../../Components/Cards/PNR_Status";
import Train_shcedule from "../../Components/Cards/Train_shcedule";
import HeroSection from "../../Components/Hero-Section/HeroSection";
import About_us from "../../Components/Cards/About_us";
import Footer from "../../Components/Cards/Footer";
import React from "react";
function Home() {
  return (
    <>
      <div className="home_container">
        <HeroSection />
        <Cards />
        <PNR_Status />
        <Train_shcedule />
        <Generate_QRCode />
        <About_us />
        <Footer />
      </div>
    </>
  );
}

export default Home;
