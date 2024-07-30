import React from "react";
import Navbar from "./Components/NavBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Chatbot from "./Pages/AIChatbot/Chatbot";
import PNR from "./Pages/PNRStatus/PNR";
import { ReactSession } from "react-client-session";
import TrainSchedule from "./Pages/TrainSchedule/TrainSchedule";
function App() {
  ReactSession.setStoreType("localStorage");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/home" exact Component={Home} />
        <Route path="/ai-chatbot" exact Component={Chatbot} />
        <Route
          path="/train-schedule/:trainno"
          exact
          Component={TrainSchedule}
        />
        <Route path="/pnr-status/:pnrno" element={<PNR />} />
      </Routes>
    </Router>
  );
}

export default App;
