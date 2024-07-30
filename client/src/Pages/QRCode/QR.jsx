import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCodeGenerator from "./QRCodeGenerator";
function QR() {
  const [tid, Data] = useState([]);
  const { ticket } = useParams();
  console.log(ticket);
  useEffect(() => {
    axios
      .get("http://localhost:5000/qrcode/" + ticket)
      .then((response) => {
        console.log(response.data);
        Data(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  function convertObjectToString(obj) {
    // Use JSON.stringify() to convert the object to a string
    return JSON.stringify(obj);
  }
  const combinedData = convertObjectToString(tid);
  return (
    <div>
      <QRCodeGenerator combinedData={combinedData} />
    </div>
  );
}
export default QR;
