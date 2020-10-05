import React from 'react';
import './css/App.css';
import './css/weather-icons.css';
import './css/weather-icons-wind.css';
import UserLocation from './components/UserLocation';
import Logo from './images/Logo.png';

function App() {
  return (
    <div className="App">
      <header/>
      <div className="main-header-wrapper">
        <div id="title-logo">
          <img src={Logo} width="100" height="auto" alt="" id="logo"/>
          <div id="title-wrapper">
            <h1 id="Stellar">STELLAR</h1>
            <h1>WEATHER</h1>
          </div>
        </div>
      </div>
      <main>
        <UserLocation/>
      </main>
      <footer>
        © 2020, Weather Bois, Inc. All right reserved.
      </footer>
    </div>
  );
}

export default App;