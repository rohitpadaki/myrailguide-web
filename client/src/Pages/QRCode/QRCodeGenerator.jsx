import React, { Component } from "react";
import QRCode from "qrcode.react";
import { Button } from "../../Components/Button/Button";
import "../../Components/NavBar/Login_reg.css";
import './qr.css'
class QRCodeGenerator extends Component {
  constructor(props) {
    super(props);
    this.downloadRef = React.createRef();
    this.download = this.download.bind(this);
  }
  download() {
    const canvas = document.querySelector(".HpQrcode > canvas");
    if (canvas) {
      this.downloadRef.current.href = canvas.toDataURL();
      this.downloadRef.current.download = "QRCode.png";
    } else {
      console.error("Canvas not found!");
    }
  }
  
  render() {
    console.log(this.props.combinedData);
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="HpQrcode">
          <QRCode value={this.props.combinedData} />
        </div>
        <h4>{this.props.qr}</h4>
        <a ref={this.downloadRef}>
          <div className="qr-button">
            <Button onClick={this.download} className='btns' buttonStyle="btns--primary">
              Download
            </Button>
          </div>
        </a>
      </div>
    );
  }
}
export default QRCodeGenerator;
