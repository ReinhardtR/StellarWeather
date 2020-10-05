import React from 'react';
import raindrop from '../images/raindrop.png';

const HourlyWeather = ({ data }) =>  {

  // Hour of the day
  let hour = new Date().getHours();

  // Change background based on hour of the day
  document.getElementById("body").className = `sky-gradient-${hour}`;

  const hwHTML = [];

  if (data.hwId) {
    for (var i = 0; i < 5; i++) {
      const iconClass = `wi wi-owm-${data.hwId[i]} wi-fw`;
      const windClass = `wi wi-wind towards-${data.hwWindDeg[i]}-deg`;

      // Makes sure the time doesnt go above 24
      if (hour+i >= 24) {
        hour = hour - 24;
      }

      hwHTML.push(
        <div className="dw-item">
          <div className="dw-weekday">
            {hour+i}:00
          </div>
          <div id="dw-temperature">
            {data.hwTemp[i]}&deg;
          </div>
          <div className={iconClass} id="weather-icon"/>
          <div className="dw-wind-speed">
            {data.hwWindSpeed[i]} m/s
            <i className={windClass} id="dw-wind-icon"/>
          </div>
          <div className="dw-rain-wrapper">
            {data.hwRain[i]} mm
            <img src={raindrop} width="12" height="auto" alt=""id="dw-raindrop"/>
          </div>
        </div>
      )
    }
    return(
      <>
        <p className="container-title">Vejrudsigt for Dagen</p>
        <div className="dw-container">
          {hwHTML[0]}
          <hr className="dw-hr"/>
          {hwHTML[1]}
          <hr className="dw-hr"/>
          {hwHTML[2]}
          <hr className="dw-hr"/>
          {hwHTML[3]}
          <hr className="dw-hr"/>
          {hwHTML[4]}
        </div>
      </>
    )
  } else {
    return(<div>Loading...</div>)
  }
}

export default HourlyWeather;