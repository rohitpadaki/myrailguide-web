import React,{useEffect} from 'react';
import trainlogo from '../../assets/Images/trainlogo.png';
import train1 from '../../assets/Images/ss/white/train-schedule.png';
import train2 from '../../assets/Images/ss/white/train-schedule1.png';
import { Button } from '../Button/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Cards.css';
function Train_shcedule() {
    useEffect(()=>{
        AOS.init({duration:1500})
      },[]);
      return (
        <>
            <div className="card-container">
                  <img id='s1'src={train1} data-aos='zoom-in-up' alt="ai-ss" data-aos-duration='1500'/>
                  <img id='s2'src={train2} alt="ai-ss" data-aos='zoom-in-up' data-aos-duration='1000'/> 
                  <div className="train-card__wrapper" data-aos='zoom-in-up' data-aos-duration='1200'>
                      <img id='trainlogo'src={trainlogo} alt="pnr-logo"/>
                      <h1 style={{fontFamily:"UrbanistBlack"}}>Rails and Whistles:</h1>
                      <h1 style={{fontFamily:"UrbanistBlack"}}>Daily Departures</h1>
                      <p>The Indian Railway operates an extensive network</p>
                      <p>of trains connecting various cities and towns</p>
                      <p>as MyRailGuide collects all the data and provides</p>
                      <p>essential information about train schedules.</p>
                     {/* <div className="card-btn">
                        <Button className='btns' buttonStyle='btn--primary'
                        buttonSize='btn--medium'>Check The Timings</Button>
      </div>*/}
                    </div>
                </div>
        </>
      );
}

export default Train_shcedule