import React from 'react';
import './HomePage.css'
import {debounce} from "lodash";
import {RouteComponentProps} from 'react-router-dom'
import Header from "../../component/Header/Header";
import Loader from "../../component/Loader/Loader";
import Cards from "../../component/Card/Cards";
import {getCities, getCurrentLocation, getWeather} from "../../api/weatherapi";

interface IHomeProps extends RouteComponentProps<{ title: string }> {

}

interface IHomeState {
  isLoaded: boolean,
  cityData: [],
  weatherData: [],
  error: boolean,
  cacheData: any,
  errorMessage: string
}

class HomePage extends React.Component<IHomeProps, IHomeState> {
  // trying to make private but having eslint error
  handleSearchDebounce: Function;

  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      isLoaded: false,
      cityData: [],
      weatherData: [],
      error: false,
      cacheData: [],
      errorMessage: ''
    };
    this.handleSearchDebounce = debounce(this.handleSearchPress, 300);
  }

  // eslint-disable-next-line react/sort-comp
  handleSearchPress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const {cacheData} = this.state;
      const q = e.target.value.toLowerCase();
      let response;
      if (cacheData[q]) {
        response = cacheData[q]
      } else {
        response = await getCities(q);
        cacheData[q] = response;
      }
      this.setState({cityData: response.data.data, error: false, cacheData});
    } catch {
      this.setState({error: true, isLoaded: true, errorMessage: 'Server Error'});
    }
  };

  // eslint-disable-next-line no-undef
  getCityWeather = async (position: GeolocationPosition) => {
    const result = await getCurrentLocation(position);
    const response = await getWeather(result.data.data[0].woeid);
    this.setState({
        cityData: response.data.data[0],
        error: false,
        weatherData: response.data.data,
        isLoaded: true
      }
    );
  }

  // eslint-disable-next-line no-undef
  getCityError = async (error: GeolocationPositionError) => {

    let messsage: string = '';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        messsage = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        messsage = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        messsage = "The request to get user location timed out."
        break;
      default:
        messsage = "An unknown error occurred."
        break;
    }

    this.setState({error: true, isLoaded: true, errorMessage: messsage});
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCityWeather, this.getCityError);
    }
  }

  async componentDidMount() {
    this.getLocation()
  }

  selectCountry = async (cityID: number) => {
    this.setState({isLoaded: false})
    let result;
    try {
      result = await getWeather(cityID);
      this.setState({weatherData: result.data.data, isLoaded: true})
    } catch {
      this.setState({error: true, isLoaded: true, errorMessage: 'Server Error'});
    }
  }

  render() {
    const {cityData, weatherData, isLoaded, error, errorMessage} = this.state;
    const showCard = error ? <p className="error">{errorMessage}</p> : (
      <Cards data={weatherData} />
    );

    return (
      <div className="weather">
        <Header
          searchPressCallback={this.handleSearchDebounce}
          selectCountry={this.selectCountry}
          data={cityData}
        />
        {!isLoaded ? <div className="loading--fixed"><Loader /></div> : showCard}
      </div>
    );

  }
}

export default HomePage;
