import React, { Component } from 'react';
import WeatherAPI from './WeatherAPI';
import PollenStats from './PollenStats';
import Geocode from 'react-geocode';

class UserLocation extends Component {

  state = {
    city: undefined,
    latitude: undefined,
    longitude: undefined,
  };

  // Google Maps Geocoding API Settings
  geocodeSettings = () => {
    // Set API Key
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
    // Set region
    Geocode.setRegion("dk");
    // Set language
    Geocode.setLanguage("da");
  }

  // GPS location
  handlePermission = () => {
    // Default location
    const capital = {
      city: 'København',
      latitude: 55.6713442,
      longitude: 12.5237846
    }

    // GPS Options
    const options = {
      enableHighAccuracy: true,
      timeout: 10000
    }

    // Error function
    const error = () => {
      this.setState({
        city: capital.city,
        latitude: capital.latitude,
        longitude: capital.longitude
      })
    }

    // Success function
    const success = (pos) => {
      Geocode.fromLatLng(String(pos.coords.latitude), String(pos.coords.longitude))
      .then(response => {
        this.setState({
          city: response.results[0].address_components[2].long_name,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      })
    }

    // Check if permission is granted
    navigator.permissions.query({name:'geolocation'})
    .then((result) => {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(success,error,options)
      } else if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(success,error,options)
        error()
      } else if (result.state === 'denied') {
        error()
      }
  
      result.onchange = () => {
        this.handlePermission();
      }
    });
  }  

  componentDidMount() {
    this.geocodeSettings();
    if (!this.state.search) {
      this.handlePermission()
    }
  }

  render() {
 
    const coordsHTML = [];

    if (this.state.latitude && this.state.longitude) {
      coordsHTML.push(
        <>
          <WeatherAPI 
            location={{city: this.state.city,
                      latitude: this.state.latitude,
                      longitude: this.state.longitude}}
          />
        </>
      )
    }

    return(
      <>
        <div>
          {coordsHTML}
        </div>
        <div>
          <PollenStats/>
        </div>
      </>
  )
  }
}

export default UserLocation;