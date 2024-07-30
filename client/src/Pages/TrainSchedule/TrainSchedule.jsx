import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Check from "../../Components/Icons/check";
import Arrow from "../../Components/Icons/arrow";
import NotFound from "../../Components/NotFound/Notfound";

function TrainSchedule() {
  const [traindata, setTraindata] = useState([]);
  const [status, setStatus] = useState(404);
  const { trainno } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/train/" + trainno
        );
        setTraindata(response.data);
        setStatus(response.status);
      } catch (error) {
        setStatus(error.response.status);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(traindata);

  if (status === 200)
    return (
      <div className="flex flex-col justify-center items-center mx-auto text-center my-5 text-white">
        <div className=" flex flex-col bg-white py-7 px-9 rounded-xl text-black">
          <h3 className="text-primary-color font-extrabold text-3xl">
            {traindata.trainname} ({traindata.trainno})
          </h3>
          <div className="flex py-3 justify-between">
            <div className="flex flex-col text-left pr-5">
              <h4 className="text-primary-color font-semibold text-2xl">
                {traindata.from.station}
              </h4>
              <h4 className="text-primary-color font-semibold text-2xl">
                ({traindata.from.sid})
              </h4>
            </div>
            <Arrow color="text-primary-color" />
            <div className="flex flex-col text-right pl-5">
              <h4 className="text-primary-color font-semibold text-2xl">
                {traindata.to.station}
              </h4>
              <h4 className="text-primary-color font-semibold text-2xl">
                ({traindata.to.sid})
              </h4>
            </div>
          </div>
          <hr className="border-primary-color" />
          <div className="flex justify-between py-3">
            <div className="flex flex-col">
              <h4 className="text-primary-color font-semibold text-2xl">Sun</h4>

              {traindata.week[0] ? <Check /> : <></>}
            </div>
            <div className="flex flex-col">
              <h4 className="text-primary-color font-semibold text-2xl">Mon</h4>
              {traindata.week[1] ? <Check /> : <></>}
            </div>
            <div className="flex flex-col">
              <h4 className="text-primary-color font-semibold text-2xl">Tue</h4>
              {traindata.week[2] ? <Check /> : <></>}
            </div>
            <div className="flex flex-col">
              <h4 className="text-primary-color font-semibold text-2xl">Wed</h4>
              {traindata.week[3] ? <Check /> : <></>}
            </div>
            <div className="flex flex-col">
              <h4 className="text-primary-color font-semibold text-2xl">Thu</h4>
              {traindata.week[4] ? <Check /> : <></>}
            </div>
            <div className="flex flex-col">
              <h4 className="text-primary-color font-semibold text-2xl">Fri</h4>
              {traindata.week[5] ? <Check /> : <></>}
            </div>
            <div className="flex flex-col">
              <h4 className="text-primary-color font-semibold text-2xl">Sat</h4>
              {traindata.week[6] ? <Check /> : <></>}
            </div>
          </div>
        </div>
        <div className="pt-6">
          <table className="table-auto w-[454px]">
            <tr>
              <th></th>
              <th className="underline">STATION</th>
              <th className="underline">ARRIVAL</th>
              <th className="underline">DEPARTURE</th>
            </tr>
            <tr>&nbsp;</tr>
            {traindata.schedule.map((item, index) => (
              <>
                <tr>
                  <td className="h-6 w-6 rounded-full bg-white"></td>
                  <th className="font-normal">{item.station}</th>
                  <th className="font-normal">{item.arrivalTime}</th>
                  <th className="font-normal">{item.departureTime}</th>
                </tr>
                {index !== traindata.schedule.length - 1 ? (
                  <tr>
                    <td className="font-bold">|</td>
                  </tr>
                ) : (
                  <></>
                )}
              </>
            ))}
          </table>
        </div>
      </div>
    );
  else {
    return <NotFound />;
  }
}

export default TrainSchedule;
