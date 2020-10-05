import React from 'react';

const CurrentWeather = ({ data }) => {

  const iconClass = `wi wi-owm-${data.id}`;

  const d = new Date();
  const date = d.toLocaleDateString("da-DK");
  const weekday = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'][d.getDay()];

  return (
    <>
      <p className="container-title">Vejret i {data.city}</p>
      <div className="cw-container">
        <div className="cw-temp-wrapper">
          <div id="cw-temp">
            {data.temperature}&deg;
          </div>
          <div id="cw-date">
            {weekday} - {date}
          </div>
        </div>
        <div className={iconClass} id="cw-icon"/>
      </div>
    </>
  )
}

export default CurrentWeather;