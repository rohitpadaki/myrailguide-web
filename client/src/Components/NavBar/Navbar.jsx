import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import "./Navbar.css";
import "./Login_reg.css";
import Model from "react-modal";
import axios from "axios";
import QRCodeGenerator from "../../Pages/QRCode/QRCodeGenerator";
function Navbar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fgvisible, fgsetVisible] = useState(false);
  const [regvisible, regsetVisible] = useState(false);
  const [qrvisible, qrsetVisible] = useState(false);
  const [tkvisible, tksetVisible] = useState(false);
  const [pnrvisible, pnrsetVisible] = useState(false);
  const [trvisible, trsetVisible] = useState(false);

  const [goToPNR, setGoToPNR] = useState(0);
  const [goToTr, setGoToTr] = useState(0);

  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConf, setRegConf] = useState("");

  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");

  const [pnrVal, setPnrVal] = useState("");
  const [trainVal, setTrainVal] = useState("");
  const [ticketVal, setTicketVal] = useState("");
  const [showTicket, setShowTicket] = useState(false);

  const [logged, setLogged] = useState(false);

  const [logoutOpen, setLogoutOpen] = useState(false);

  const [tid, Data] = useState([]);
  const [ticket, setTicket] = useState("");
  const [qrData, setData] = useState(null);

  function openLogout() {
    setLogoutOpen(!logoutOpen);
  }

  useEffect(() => {
    if (logged != false) {
      setLogged(false);
    }
  }, [logged]);

  useEffect(() => {
    console.log(sessionStorage.getItem("email"));
    setTicket("");
    if (ticket != "")
      axios
        .get("http://localhost:5000/qrcode/" + ticket)
        .then((response) => {
          console.log(response.data);
          Data(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, [ticket]);
  const submitreg=()=>{
    if(document.getElementById("i1").value=="")
      {
          alert("enter the email");
          return false;
      }
    if(document.getElementById("i2").value=="")
    {
        alert("enter the password please");
        return false;
    }
    if(document.getElementById("i3").value=="")
    {
        alert("please re enter the password");
        return false;
    }
    if(document.getElementById("i2").value!=document.getElementById("i3").value)
    {
        alert("the password must be same in the both inboxes");
        return false;
    }
    return true;
}
const submitlog=()=>{
  if(document.getElementById("i4").value=="")
    {
        alert("enter the email");
        return false;
    }
  if(document.getElementById("i5").value=="")
  {
      alert("enter the password please");
      return false;
  }
  return true;
}
const validateQR=()=>{
  if(document.getElementById("i6").value=='')
    {
      console.log('hi');
      alert("please enter the QR Code");
      return false;
    }
  return true;
}
  function convertObjectToString(obj) {
    return JSON.stringify(obj);
  }

  function clearSession() {
    sessionStorage.removeItem("email");
  }

  function registerToDB() {
    if (regPass === regConf) {
      axios
        .post("http://localhost:5000/register/", {
          email: regEmail,
          pass: regPass,
        })
        .then((res) => {
          if (res.data.operation == "exists") alert("User already exists");
          else {
            alert("Welcome " + regEmail);
            setLogoutOpen(false);
            sessionStorage.setItem("email", regEmail);
          }
        });
    } else {
      alert("Passwords must be same");
    }
    console.log(sessionStorage.getItem("email"));
  }

  function loginDB() {
    axios
      .post("http://localhost:5000/login/", {
        email: logEmail,
        pass: logPass,
      })
      .then((res) => {
        console.log(res.data.login);
        if (res.data.login == "valid") {
          sessionStorage.setItem("email", logEmail);
          setLogged(true);
          setLogoutOpen(false);
        } else {
          alert("Invalid Email or Password!");
        }
      });
  }
  const validatePnr = () => {
    console.log("Fn entered");
    if (pnrVal.length != 10) {
      alert("NO");
      return;
    }
    setGoToPNR(pnrVal);
  };

  function render() {
    setTicket(ticketVal);
    const combinedData = convertObjectToString(tid);
    console.log(combinedData);
    if(combinedData!=null){
      
      setData(combinedData);
      setShowTicket(true);
    }
  }

  useEffect(() => {
    console.log("called");
    setPnrVal("");
    setGoToPNR(pnrVal);
    if (goToPNR != 0) {
      console.log("navigationg");
      navigate("/pnr-status/" + goToPNR);
    }
  }, [goToPNR]);

  const validateTr = () => {
    console.log("Fn entered");
    if (trainVal.length != 5 || isNaN(trainVal)) {
      alert("NO");
      return;
    }
    setGoToTr(trainVal);
  };

  useEffect(() => {
    console.log("called");
    setTrainVal("");
    setGoToTr(trainVal);
    if (goToTr != 0) {
      console.log("navigationg");
      navigate("/train-schedule/" + goToTr);
    }
  }, [goToTr]);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  window.addEventListener("resize", showButton);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <>
      <nav className={navbar ? "navbar active" : "navbar"}>
        <div className="navbar-container">
          <Link to="/home" className="navbar-logo">
            MyRailGuide
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faXmark : faBars} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/ai-chatbot"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                AI Chatbot
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links"
                onClick={() => {
                  closeMobileMenu;
                  pnrsetVisible(true);
                  trsetVisible(false);
                  qrsetVisible(false);
                  regsetVisible(false);
                  fgsetVisible(false);
                  setVisible(false);
                  tksetVisible(false);
                }}
              >
                PNR Status
              </Link>
              <Model
                style={{ overlay: { background: "transparent" } }}
                className="fixed inset-0 top-0 backdrop-blur-sm transition"
                isOpen={pnrvisible}
                onRequestClose={() => pnrsetVisible(false)}
              >
                <div className="qrcode">
                  <div className="qr-header">
                    <div
                      className="crossmark"
                      onClick={() => pnrsetVisible(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </div>

                    <div className="qr-text">
                      <h3 style={{ fontFamily: "UrbanistBlack" }}>
                        MyRailGuide
                      </h3>
                    </div>
                    <div className="qr-user">
                      <h4>PNR Status</h4>
                    </div>
                  </div>
                  <div className="qr-inputs">
                    <div className="qr-head-in">
                      <h3>PNR Number:</h3>
                    </div>
                    <div className="qr-input">
                      <input
                        type="number"
                        value={pnrVal}
                        onChange={(e) => {
                          setPnrVal(e.target.value);
                        }}
                        placeholder="Enter 10 digit PNR Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="qr-button">
                    <Button
                      onClick={() => {
                        pnrsetVisible(false);
                        validatePnr();
                      }}
                      className="btns"
                      buttonStyle="btn--primary"
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </Model>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links"
                onClick={() => {
                  closeMobileMenu;
                  trsetVisible(true);
                  pnrsetVisible(false);
                  qrsetVisible(false);
                  regsetVisible(false);
                  fgsetVisible(false);
                  setVisible(false);
                  tksetVisible(false);
                }}
              >
                Train Schedule
              </Link>
              <Model
                style={{ overlay: { background: "transparent" } }}
                className="fixed inset-0 top-0 backdrop-blur-sm transition"
                isOpen={trvisible}
                onRequestClose={() => trsetVisible(false)}
              >
                <div className="qrcode">
                  <div className="qr-header">
                    <div
                      className="crossmark"
                      onClick={() => trsetVisible(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </div>

                    <div className="qr-text">
                      <h3 style={{ fontFamily: "UrbanistBlack" }}>
                        MyRailGuide
                      </h3>
                    </div>
                    <div className="qr-user">
                      <h4>Train Schedule</h4>
                    </div>
                  </div>
                  <div className="qr-inputs">
                    <div className="qr-head-in">
                      <h3>Train Number:</h3>
                    </div>
                    <div className="qr-input">
                      <input
                        type="text"
                        value={trainVal}
                        onChange={(e) => {
                          setTrainVal(e.target.value);
                        }}
                        placeholder="Enter Train Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="qr-button">
                    <Button
                      onClick={() => {
                        trsetVisible(false);
                        validateTr();
                      }}
                      className="btns"
                      buttonStyle="btn--primary"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </Model>
            </li>
            <li className="nav-item">
              <Link
                className="nav-links"
                onClick={() => {
                  closeMobileMenu;
                  qrsetVisible(true);
                  trsetVisible(false);
                  pnrsetVisible(false);
                  regsetVisible(false);
                  fgsetVisible(false);
                  setVisible(false);
                  tksetVisible(false);
                }}
              >
                Generate QR Code
              </Link>
              <Model
                style={{ overlay: { background: "transparent" } }}
                className="fixed inset-0 top-0 backdrop-blur-sm transition"
                isOpen={qrvisible}
                onRequestClose={() => qrsetVisible(false)}
              >
                <form onSubmit={e=>e.preventDefault()}
              noValidate>
                <div className="qrcode">
                  <div className="qr-header">
                    <div
                      className="crossmark"
                      onClick={() => qrsetVisible(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </div>

                    <div className="qr-text">
                      <h3 style={{ fontFamily: "UrbanistBlack" }}>
                        MyRailGuide
                      </h3>
                    </div>
                    <div className="qr-user">
                      <h4>QR Ticket Generation</h4>
                    </div>
                  </div>
                  <div className="qr-inputs">
                    <div className="qr-head-in">
                      <h3>Ticket ID:</h3>
                    </div>
                    <div className="qr-input">
                      <input
                        id="i6"
                        type="text"
                        onChange={(e) => setTicketVal(e.target.value)}
                        placeholder="TX123456789"
                        required
                      />
                    </div>
                  </div>
                  <div className="qr-button">
                    <Button
                      onClick={async () => {
                        qrsetVisible(false);
                        if(validateQR()){
                          console.log('h');
                          render();
                          tksetVisible(true);}
                      }}
                      className="btns"
                      buttonStyle="btn--primary"
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                </form>
              </Model>
              <Model
                style={{ overlay: { background: "transparent" } }}
                className="fixed inset-0 top-0 backdrop-blur-sm transition"
                isOpen={tkvisible}
                onRequestClose={() => tksetVisible(false)}
              >
                <div className="qrcode">
                  <div className="qr-header">
                    <div
                      className="crossmark"
                      onClick={() => tksetVisible(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div
                      className="back"
                      onClick={() => {
                        qrsetVisible(true);
                        tksetVisible(false);
                        console.log(fgvisible);
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="qr-text">
                      <h3 style={{ fontFamily: "UrbanistBlack" }}>
                        MyRailGuide
                      </h3>
                    </div>
                    <div className="qr-user">
                      <h4>QR Ticket Generation</h4>
                    </div>
                  </div>
                  {showTicket ? (
                    <QRCodeGenerator combinedData={qrData} qr={tid.ticketId} />
                  ) : (
                    <>Loading...</>
                  )}
                </div>
              </Model>
            </li>
          </ul>

          <div className="button-class">
            {button &&
              (sessionStorage.getItem("email") == undefined ? (
                <Button
                  onClick={() => {
                    setVisible(true);
                    fgsetVisible(false);
                    regsetVisible(false);
                    trsetVisible(false);
                    pnrsetVisible(false);
                    qrsetVisible(false);
                    tksetVisible(false);
                  }}
                  buttonStyle="btn--primary"
                  src="/home"
                >
                  Login
                </Button>
              ) : (
                <></>
              ))}
            <Model
              style={{ overlay: { background: "transparent" } }}
              className="fixed inset-0 top-0 backdrop-blur-sm transition"
              isOpen={visible}
              onRequestClose={() => setVisible(false)}
            >
              <form onSubmit={e=>e.preventDefault()}
              noValidate>
              <div className="login">
                <div className="log-header">
                  <div className="crossmark" onClick={() => setVisible(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                  <div className="log-text">
                    <h3 style={{ fontFamily: "UrbanistBlack" }}>MyRailGuide</h3>
                  </div>
                  <div className="log-user">
                    <h4>User Login</h4>
                  </div>
                </div>
                <div className="log-inputs">
                  <div className="log-head-in">
                    <h3>Email Address</h3>
                  </div>

                  <div className="log-input">
                    <input
                      id="i4"
                      type="email"
                      onChange={(e) => setLogEmail(e.target.value)}
                      placeholder="Enter the Email"
                    />
                  </div>
                  <div className="log-head-in">
                    <h3>Password</h3>
                  </div>

                  <div className="log-input">
                    <input
                      id="i5"
                      type="password"
                      onChange={(e) => setLogPass(e.target.value)}
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>
                <div
                  className="log-fp"
                  onClick={() => {
                    setVisible(false);
                    fgsetVisible(true);
                  }}
                >
                  Forgot Password?
                </div>
                <div className="log-button">
                  <Button
                    onClick={() => {
                      setVisible(false);
                      if(submitlog())
                        loginDB();
                    }}
                    className="btns"
                    buttonStyle="btn--primary"
                  >
                    Login
                  </Button>
                </div>
                <div className="log-reg">
                  New Here?
                  <span
                    onClick={() => {
                      {
                        regsetVisible(true);
                        setVisible(false);
                      }
                    }}
                  >
                    {" "}
                    Register Here
                  </span>
                </div>
              </div>
              </form>
            </Model>
            <Model
              style={{ overlay: { background: "transparent" } }}
              className="fixed inset-0 top-0 backdrop-blur-sm transition"
              isOpen={fgvisible}
            >
              <div className="login">
                <div className="log-header">
                  <div
                    className="crossmark"
                    onClick={() => {
                      fgsetVisible(false);
                      console.log(fgvisible);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                  <div
                    className="back"
                    onClick={() => {
                      fgsetVisible(false);
                      setVisible(true);
                      console.log(fgvisible);
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                  <div className="log-text">
                    <h3 style={{ fontFamily: "UrbanistBlack" }}>MyRailGuide</h3>
                  </div>
                  <div className="log-user">
                    <h4>Forgot Password</h4>
                  </div>
                </div>
                <div className="log-inputs">
                  <div className="log-head-in">
                    <h3>New Password</h3>
                  </div>
                  <div className="log-input">
                    <input
                      type="password"
                      placeholder="Enter the New Password"
                    />
                  </div>
                  <div className="log-head-in">
                    <h3>Confirm Password</h3>
                  </div>
                  <div className="log-input">
                    <input type="password" placeholder="Re-Enter Password" />
                  </div>
                  <div className="log-button">
                    <Button
                      onClick={() => fgsetVisible(false)}
                      className="btns"
                      buttonStyle="btn--primary"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            </Model>
            {button &&
              (sessionStorage.getItem("email") == undefined ? (
                <Button
                  buttonStyle="btn--outline"
                  src="/home"
                  onClick={() => {
                    setVisible(false);
                    regsetVisible(true);
                    fgsetVisible(false);
                    trsetVisible(false);
                    pnrsetVisible(false);
                    qrsetVisible(false);
                    tksetVisible(false);
                  }}
                >
                  Register
                </Button>
              ) : (
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={openLogout}
                    className="inline-flex justify-center items-center px-4 py-2 rounded-md text-md font-medium bg-transparent text-white"
                  >
                    {sessionStorage.getItem("email")}
                    <svg
                      class="h-8 w-8 text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {logoutOpen && (
                    <div className="absolute text-base z-50 right-0 mt-0 rounded-md shadow-sm bg-transparent ">
                      <Button onClick={clearSession}>Logout</Button>
                    </div>
                  )}
                </div>
              ))}
            <Model
              style={{ overlay: { background: "transparent" } }}
              className="fixed inset-0 top-0 backdrop-blur-sm transition"
              isOpen={regvisible}
              onRequestClose={() => regsetVisible(false)}
            >
              <form onSubmit={e=>e.preventDefault()}
              noValidate>
              <div className="register">
                <div className="reg-header">
                  <div
                    className="crossmark"
                    onClick={() => regsetVisible(false)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                  <div className="reg-text">
                    <h3 style={{ fontFamily: "UrbanistBlack" }}>MyRailGuide</h3>
                  </div>
                  <div className="reg-user">
                    <h4>User Registeration</h4>
                  </div>
                </div>
                <div className="reg-inputs">
                  <div className="reg-head-in">
                    <h3>Email Address</h3>
                  </div>

                  <div className="reg-input">
                    <input
                      id="i1"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Enter the Email"
                    />
                  </div>
                  <div className="reg-head-in">
                    <h3>Password</h3>
                  </div>

                  <div className="reg-input">
                    <input
                      id="i2"
                      type="password"
                      value={regPass}
                      onChange={(e) => setRegPass(e.target.value)}
                      placeholder="Enter your Password"
                    />
                  </div>
                  <div className="reg-head-in">
                    <h3>Confirm Password</h3>
                  </div>

                  <div className="reg-input">
                    <input
                      id="i3"
                      type="password"
                      value={regConf}
                      onChange={(e) => setRegConf(e.target.value)}
                      placeholder="Re-Enter your Password"
                    />
                  </div>
                </div>

                <div className="reg-button">
                  <Button
                    onClick={() => {
                      regsetVisible(false);
                      if(submitreg()){
                        registerToDB();
                      }
                    }}
                    className="btns"
                    buttonStyle="btn--primary"
                  >
                    Register
                  </Button>
                </div>
                <div className="reg-log">
                  Already Registered?
                  <span
                    onClick={() => {
                      {
                        regsetVisible(false);
                        setVisible(true);
                      }
                    }}
                  >
                    {" "}
                    Login Here
                  </span>
                </div>
              </div>
              </form>
            </Model>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
