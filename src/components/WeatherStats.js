import React from 'react';

// Icons
import feelsLike from '../images/StatsIcons/feelsLike.png';
import humidity from '../images/StatsIcons/humidity.png';
import minmax from '../images/StatsIcons/minmax.png';
import wind from '../images/StatsIcons/wind.png';

const WeatherStats = ({ stats }) => {

  const windIcon = `wi wi-wind towards-${stats.windDeg}-deg`;

  return(
    <div className="weather-stats-container">
      <p className="container-title">Yderligere vejrdata</p>
      <div className="wrapper">
        <div>
          <img src={feelsLike} width="40" height="auto" alt=""/>
          Føles som
        </div>
        <div>
          {stats.feelsLike}&deg;
        </div>
      </div>
      <hr/>
      <div className="wrapper">
        <div>
          <img src={minmax} width="40" height="auto" alt=""/>
          Min / Max
        </div>
        <div>
          {stats.minTemp}&deg; / {stats.maxTemp}&deg;
        </div>
      </div>
      <hr/>
      <div className="wrapper">
        <div>
          <img src={humidity} width="40" height="auto" alt=""/>
          Fugtighed
        </div>
        <div>
          {stats.humidity}%
        </div>
      </div>
      <hr/>
      <div className="wrapper">
        <div>
          <img src={wind} width="40" height="auto" alt=""/>
          Vindhastighed
        </div>
        <div>
          {stats.windSpeed} m/s
          <i className={windIcon} id="wind-direction-icon"/>
        </div>
      </div>
    </div>
  )
}

export default WeatherStats;