import React from "react";
import infographic from '../image/Infographic.gif'
import infographic_chart from '../image/infographic_chart.png'

function InfoGraphics() {
  return (
    <div className="infograph">
        <img src={infographic} alt="infographic" id="infographic"/>
        <img src={infographic_chart} alt="infographic_chart" id="infographic_chart" />
    </div>
  )
}

export default InfoGraphics

