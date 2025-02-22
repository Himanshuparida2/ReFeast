import React from "react";
import centerImg from "../image/centre-logo2.png";
import centreLogo from "../image/ReFeast Logo centre.png";

function Home() {
  return (
    <div className="home">
      <div className="home-first">
        <img className="centreLogo" src={centreLogo} alt="" />
        <img className="centreImg" src={centerImg} alt="" />
        <button className="add-item">Add Item</button>
        <button className="order-now">Order Now</button>
      </div>
    </div>
  );
}

export default Home;
