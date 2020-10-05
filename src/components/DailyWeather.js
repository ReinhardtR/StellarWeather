import React from 'react';
import raindrop from '../images/raindrop.png';

const DailyWeather = ({ data }) => {

  const GetDates = (startDate) => {
    const tempDays = [];

    for (var j = 0; j <= 4; j++) {
        var date = new Date();
        date.setDate(startDate.getDate() + j);
        tempDays.push(DayAsString(date.getDay()))
    }

    return tempDays;
  }

  const DayAsString = (dayIndex) => {

      const weekdays = [
                        'Søndag',
                        'Mandag',
                        'Tirsdag',
                        'Onsdag',
                        'Torsdag',
                        'Fredag',
                        'Lørdag'
                      ];

      return weekdays[dayIndex];
  }

  const days = GetDates(new Date());
 
  const dwHTML = [];

  if (data.dwId) {
    for (var i = 0; i < 5; i++) {
      const iconClass = `wi wi-owm-${data.dwId[i]} wi-fw`;
      const windClass = `wi wi-wind towards-${data.dwWindDeg[i]}-deg`;
      dwHTML.push(
        <div className="dw-item">
          <div className="dw-weekday">
            {days[i]}
          </div>
          <div id="dw-temperature">
            {data.dwMaxTemp[i]}&deg;
          </div>
          <div id="dw-min-temp">
            ({data.dwMinTemp[i]}&deg;)
          </div>
          <div className={iconClass} id="weather-icon"/>
          <div className="dw-wind-speed">
            {data.dwWindSpeed[i]} m/s
            <i className={windClass} id="dw-wind-icon"/>
          </div>
          <div className="dw-rain-wrapper">
            {data.dwRain[i]}%
            <img src={raindrop} width="12" height="auto" alt=""id="dw-raindrop"/>
          </div>
        </div>
      )
    }
    return(
      <>
        <p className="container-title">Vejrudsigt for Ugen</p>
        <div className="dw-container">
          {dwHTML[0]}
          <hr className="dw-hr"/>
          {dwHTML[1]}
          <hr className="dw-hr"/>
          {dwHTML[2]}
          <hr className="dw-hr"/>
          {dwHTML[3]}
          <hr className="dw-hr"/>
          {dwHTML[4]}
        </div>
      </>
    )
  } else {
    return(<div>Loading...</div>)
  }
}

export default DailyWeather;