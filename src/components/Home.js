import React from "react";
import centreLogo from "../image/ReFeast Logo centre.png";
import refeastimg from '../image/refeast-logo.gif'
import InfoGraphics from "./InfoGraphics";

function Home() {
  return (
    <div className="home">
      <div className="home-first">
        <img className="centreLogo" src={centreLogo} alt="" />
        <img src={refeastimg} alt="" className="centreImg"/>
        <button className="add-item">Add Item</button>
        <button className="order-now">Order Now</button>
      </div>
      <div className="home-second">
        <InfoGraphics/>
      </div>
    </div>
  );
}

export default Home;
