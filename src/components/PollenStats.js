import React from 'react';

// Pollen icons
import Alternaria from '../images/PollenIcons/Alternaria.png';
import Birk from '../images/PollenIcons/Birk.png';
import Bynke from '../images/PollenIcons/Bynke.png';
import Cladosporium from '../images/PollenIcons/Cladosporium.png';
import El from '../images/PollenIcons/El.png';
import Elm from '../images/PollenIcons/Elm.png';
import Græs from '../images/PollenIcons/Græs.png';
import Hassel from '../images/PollenIcons/Hassel.png';
import Gradient from '../images/PollenIcons/Gradient.png';

function PollenStats() {

  const pollenTypes = {
    Alternaria: Alternaria,
    Birk: Birk,
    Bynke: Bynke,
    Cladosporium: Cladosporium,
    El: El,
    Elm: Elm,
    Græs: Græs,
    Hassel: Hassel,
  };

  const pollenListHTML = [];

  for (const name of Object.keys(pollenTypes)) {
    pollenListHTML.push(
      <>
        <hr/>
        <div className="pollen-type-container">
          <div className="pollen-name">
            <p>{name}</p>
          </div>
          <img src={pollenTypes[name]} width="64" height="auto" alt="" className="pollen-icon"/>
        </div>
      </>
    )
  }

  return (
    <div id="pollen-wrapper">
      <div className="weather-item">
        <p id="pollen-title">Pollental</p>
        {pollenListHTML}
        <hr/>
        <div id="Gradient">
          <p id="Farve-Guide">Farve Guide</p>
          <img src={Gradient} width="128" height="auto" alt=""/>
        </div>
      </div>
    </div>
  )
}

export default PollenStats;