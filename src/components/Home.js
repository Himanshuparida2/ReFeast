import React, { useState } from "react";
import centreLogo from "../image/ReFeast Logo centre.png";
import refeastimg from "../image/centre-logo2.png";
import infographic from "../image/Infographic.gif";
import infographic_chart from "../image/infographic_chart.png";
import ordernow from "../image/purchase-order.png";
import animatedordernow from "../image/purchase-order-animated.gif";
import additem from "../image/add.png";
import animatedadditem from "../image/add-animated.gif";

function Home() {
  const [OrderHover, setOrderHover] = useState(false);
  const [AddHover, setAddHover] = useState(false);

  return (
    <div className="home">
      <div className="home-first">
        <img className="centreLogo" src={centreLogo} alt="" />
        <img src={refeastimg} alt="" className="centreImg" />
        <button
          className="add-item"
          onMouseEnter={() => {
            setAddHover(true);
          }}
          onMouseLeave={() => {
            setAddHover(false);
          }}
        >
          {AddHover ? (
            <img src={animatedadditem} alt="" className="animated" />
          ) : (
            <img src={additem} alt="" className="default" />
          )}
          <h4>Add Item</h4>
        </button>
        <button
          className="order-now"
          onMouseEnter={() => {
            setOrderHover(true);
          }}
          onMouseLeave={() => {
            setOrderHover(false);
          }}
        >
          {OrderHover ? (
            <img src={animatedordernow} className="animated" alt="" />
          ) : (
            <img src={ordernow} className="default" alt="" />
          )}
          <h4>Order Now</h4>
        </button>
      </div>
      <div className="home-second">
        <div className="infograph">
        <img
              src={infographic_chart}
              alt="infographic_chart"
              id="infographic_chart"
            />
          <div>
            <h2>Reclaim, Share, REPEAT</h2>
            <p id="info-description">
              At ReFeast, our mission is simple: reduce food waste and build a
              sustainable future by connecting surplus food with those in need.
              This cycle ensures that food is shared, safety is maintained, and
              communities thrive.
            </p>
            <ul>
              <h2>How It Works:</h2>
              <li>
                <h3>List Surplus Food</h3>
                <p>
                  If you have extra food—whether you're a restaurant, household,
                  or business—you can list it on our platform for others to
                  claim.
                </p>
              </li>
              <li>
                <h3>Find & Claim Food</h3>
                <p>
                  Individuals and NGOs can browse available food listings and
                  claim what they need, reducing waste and feeding more people.
                </p>
              </li>
              <li>
                <h3>Food Safety Measures</h3>
                <p>
                  We prioritize food safety by ensuring that only fresh,
                  consumable food is shared, following best practices for
                  hygiene and distribution.
                </p>
              </li>
              <li>
                <h3>Community Impact</h3>
                <p>
                  By participating in food-sharing, you're directly impacting
                  lives, reducing hunger, and strengthening community bonds.
                </p>
              </li>
              <li>
                <h3>Sustainable Future</h3>
                <p>
                  Every meal saved from waste contributes to a greener planet by
                  reducing food waste and carbon footprint.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="home-third">
          <div className="infograph">
          <img src={infographic} alt="infographic" id="infographic" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
