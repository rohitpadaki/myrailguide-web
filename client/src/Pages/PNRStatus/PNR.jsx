import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Arrow from "../../Components/Icons/arrow";
import Navbar from "../../Components/NavBar/Navbar";
import NotFound from "../../Components/NotFound/Notfound";

function PNR() {
  const [pnrdata, setPNRdata] = useState([]);
  const [status, setStatus] = useState(404);
  const { pnrno } = useParams();

  function mapClass(cls) {
    switch (cls) {
      case "SL":
        return "Sleeper";
    }
  }

  function mapChart(chrt) {
    switch (chrt) {
      case "NP":
        return "Not Prepared";
      case "P":
        return "Prepared";
    }
  }

  function mapStatus(sts) {
    switch (sts) {
      case "CNF":
        return "bg-green-300";
      case "WL":
        return "bg-orange-300";
      case "CAN":
        return "bg-red-300";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pnrstatus/" + pnrno
        );
        setPNRdata(response.data);
        setStatus(response.status);
      } catch (error) {
        setStatus(error.response.status);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(pnrdata);

  if (status === 200)
    return (
      <div className="flex flex-col justify-center items-center mx-auto my-5">
        <div className="flex flex-col bg-white py-10 rounded-xl text-black border-black border text-center">
          <h2 className="font-bold text-4xl">PNR: {pnrdata.pnrno}</h2>
          <h3 className="text-3xl px-12 py-3">
            {pnrdata.train_name} ({pnrdata.train_no})
          </h3>
          <hr className="border-gray-300 my-2" />
          <div className="flex justify-between px-9 items-center my-1">
            <div className="flex flex-col text-left">
              <h4 className="text-xl">{pnrdata.departure.date}</h4>
              <h1 className="text-3xl">{pnrdata.departure.time}</h1>
              <h4 className="text-xl">{pnrdata.source.station}</h4>
            </div>
            <Arrow color="text-black" />
            <div className="flex flex-col text-right">
              <h4 className="text-xl">{pnrdata.arrive.date}</h4>
              <h1 className="text-3xl">{pnrdata.arrive.time}</h1>
              <h4 className="text-xl">{pnrdata.destination.station}</h4>
            </div>
          </div>
          <hr className="border-gray-300 my-2" />
          {pnrdata.passengers.map((item, index) => (
            <div
              className={
                "flex items-center justify-between " +
                mapStatus(item.status) +
                " px-6 py-1 my-2 text-xl"
              }
            >
              <h1>{item.name}:</h1>
              <div className="flex flex-col">
                <h1 className="font-bold">{item.status}</h1>
                <h1>{item.seat}</h1>
              </div>
            </div>
          ))}

          <table className="table-fixed text-left my-3 mx-5 text-xl">
            <tr>
              <td>Class:</td>
              <td>{mapClass(pnrdata.class)}</td>
            </tr>
            <tr>
              <td>Charting Status:</td>
              <td>{mapChart(pnrdata.charting)}</td>
            </tr>
            <tr>
              <td>Total Fare:</td>
              <td>Rs. {pnrdata.fare}</td>
            </tr>
            <tr>
              <td>Remarks:</td>
              <td>{pnrdata.remarks}</td>
            </tr>
          </table>
          <h1 className="text-2xl font-semibold">Have a safe journey! 😊</h1>
        </div>
      </div>
    );
  else {
    return <NotFound />;
  }
}

export default PNR;
