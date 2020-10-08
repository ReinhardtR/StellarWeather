import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather';
import WeatherStats from './WeatherStats';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';

class WeatherAPI extends Component {
  constructor({location}) {
    super({location});
    this.state = {
      city: location.city,
      latitude: location.latitude,
      longitude: location.longitude
    }
  }

  state = {
    // Current Weather Data
    temperature: undefined,
    id: undefined,
    feelsLike: undefined,
    maxTemp: undefined,
    minTemp: undefined,
    humidity: undefined,
    windSpeed: undefined,
    windDeg: undefined,
    // Hourly Weather Forecast
    hwTemp: undefined,
    hwId: undefined,
    hwWindSpeed: undefined,
    hwWindDeg: undefined,
    hwRain: undefined,
    // Daily Weather Forecast
    dwMaxTemp: undefined,
    dwMinTemp: undefined,
    dwId: undefined,
    dwWindSpeed: undefined,
    dwWindDeg: undefined,
    dwRain: undefined,
  }

  getWeather = async (latitude, longitude) => {
    const apiKey = process.env.REACT_APP_OWM_API_KEY;
    const apiURL = "https://api.openweathermap.org/data/2.5";

    // Weather Data API
    const apiCall = await fetch(`${apiURL}/onecall?lat=${latitude}&lon=${longitude}&lang=da&appid=${apiKey}&units=metric`);
    const data = await apiCall.json();

    // Loop through data 5 times and store in array
    const hwTemp = [];
    const hwId = [];
    const hwWindSpeed = [];
    const hwWindDeg = [];
    const hwRain = [];
    const dwMaxTemp = [];
    const dwMinTemp = [];
    const dwId = [];
    const dwWindSpeed = [];
    const dwWindDeg = [];
    const dwRain = [];
    for (var i = 0; i < 5; i++) {
      // Hourly Weather Forecast
      hwTemp.push(Math.round(data.hourly[i].temp))
      hwId.push(data.hourly[i].weather[0].id)
      hwWindSpeed.push(Math.round(data.hourly[i].wind_speed))
      hwWindDeg.push(data.hourly[i].wind_deg)
      if (data.hourly[i].rain) {
        hwRain.push(data.hourly[i].rain['1h'])
      } else {
        hwRain.push(0);
      }
      //Daily Weather Forecast
      dwMaxTemp.push(Math.round(data.daily[i].temp.max))
      dwMinTemp.push(Math.round(data.daily[i].temp.min))
      dwId.push(data.daily[i].weather[0].id)
      dwWindSpeed.push(Math.round(data.daily[i].wind_speed))
      dwWindDeg.push(data.daily[i].wind_deg)
      dwRain.push(data.daily[i].pop * 100)
    }

    this.setState({
      // Current Weather Data
      temperature: Math.round(data.current.temp),
      id: data.current.weather[0].id,
      feelsLike: Math.round(data.current.feels_like),
      maxTemp: Math.round(data.daily[0].temp.max),
      minTemp: Math.round(data.daily[0].temp.min),
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_speed),
      windDeg: data.current.wind_deg,
      // Hourly Weather Forecast
      hwTemp: hwTemp,
      hwId: hwId,
      hwWindSpeed: hwWindSpeed,
      hwWindDeg: hwWindDeg,
      hwRain: hwRain,
      // Daily Weather Forecast
      dwMaxTemp: dwMaxTemp,
      dwMinTemp: dwMinTemp,
      dwId: dwId,
      dwWindSpeed: dwWindSpeed,
      dwWindDeg: dwWindDeg,
      dwRain: dwRain,
    })
  }

  componentDidMount() {
    // Get weather data based on coords
    this.getWeather(this.state.latitude, this.state.longitude)

    // Run every 10 minutes
    this.timerID = setInterval(
      () => this.getWeather(this.state.latitude, this.state.longitude),
      600000
    );
  }

 componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.latitude !== this.state.latitude) {
      // Update state
      console.log("STATE HAS CHANGED")
      this.setState({
        city: prevProps.location.city,
        latitude: prevProps.location.latitude,
        longitude: prevProps.location.longitude
        // Fetch new data based on new coords (Callback function)
      }, () => this.getWeather(this.state.latitude, this.state.longitude))
    }
  }

  render() {

    const {city, temperature, id, feelsLike, maxTemp, minTemp, humidity, windSpeed, windDeg, hwTemp, hwId, hwWindSpeed, hwWindDeg, hwRain, dwMaxTemp, dwMinTemp, dwId, dwWindSpeed, dwWindDeg, dwRain} = this.state;

    const CurrentWeatherData = {
      city,
      temperature, 
      id,
    };

    const CurrentWeatherStats = {
      feelsLike,
      maxTemp,
      minTemp,
      humidity,
      windSpeed,
      windDeg,
    };

    const HourlyWeatherData = {
      hwTemp,
      hwId,
      hwWindSpeed,
      hwWindDeg,
      hwRain,
    };

    const DailyWeatherData = {
      dwMaxTemp,
      dwMinTemp,
      dwId,
      dwWindSpeed,
      dwWindDeg,
      dwRain,
    };

    return(
      <>
        <div className="weather-item">
          <CurrentWeather 
            data={CurrentWeatherData}
          />
        </div>
        <div className="weather-item">
          <WeatherStats 
            stats={CurrentWeatherStats}
          />
        </div>
        <div className="weather-item">
          <HourlyWeather 
            data={HourlyWeatherData}
          />
        </div>
        <div className="weather-item">
          <DailyWeather 
            data={DailyWeatherData}
          />
        </div>
      </>
    )
  }
}

export default WeatherAPI;