import React,{useEffect} from 'react'
import './Cards.css';
import padaki from '../../assets/Images/photos/1676339551096.jpeg';
import anish from '../../assets/Images/photos/IMG-20231227-WA0001.jpg';
import viraj from '../../assets/Images/photos/IMG-20230723-WA0000-01.jpeg.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
function About_us() {
     useEffect(()=>{
    AOS.init({duration:1500})
  },[]);
  return (
    <>
        <div className="card-container">
            <div className="card-wrap">
                <div className="card-header">
                    <h1 style={{fontFamily:'UrbanistBlack'}}>The Team Behind MyRailGuide</h1>
                    <div className="card-underline"></div>
                </div>
                <div className="card-subtitle">
                In the realm of technology, innovation thrives.
                </div>
                <div className="card-mem">
                    <div className="card-animation" data-aos='flip-left' data-aos-duration='2000'>
                    <div className="card-items" >
                        <img src={viraj} className='team-img' alt='pic'/>
                                <h3 style={{fontFamily:'UrbanistBlack'}}>Viraj N Barge</h3>
                        <div className="team-info">
                        <div className="team-role"><p>Front-End React/Flutter App Developer</p></div>
                        <div className="team-underline"></div>
                        <div className="team-desc">
                            <p>I'm a developer with a passion for 
                                full-stack development. I leverage 
                                the MERN stack to build web applications 
                                and utilize Flutter to create engaging 
                                mobile experiences.</p>
                        </div>
                    </div>
                            
                        </div>
                    </div>
                    <div className="card-animation" data-aos='flip-up' data-aos-duration='2000'>
                    <div className="card-items">
                        <img src={padaki} className='team-img' alt='pic'/>
                        <h3 style={{fontFamily:'UrbanistBlack'}}>rohit b padaki</h3>
                        <div className="team-info">
                            <div className="team-role">
                                <p>MERN Stack/Flutter App Developer</p>
                            </div>
                            <div className="team-underline"></div>
                            <div className="team-desc">
                            <p>I'm a passionate developer with a strong foundation in MERN stack.
                                 Additionally, I've expanded my skillset to include Flutter app development, 
                                enabling me to craft seamless and engaging mobile experiences.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="card-animation" data-aos='flip-right' data-aos-duration='2000'>
                    <div className="card-items" >
                        <img src={anish} className='team-img' alt='pic'/>
                        <h3 style={{fontFamily:'UrbanistBlack'}}>Anish g hegde
                        </h3>
                        <div className="team-info">
                        <div className="team-role">
                            <p>Back-End Node-js/Flutter App Developer</p>
                        </div>
                        <div className="team-underline"></div>
                            <div className="team-desc">
                                <p>I'm Anish, the creator of this website/App. I have a passion for full stack development.
                                    I love using technology to make things better 
                                    for you. Let's make your experience here great!</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default About_us