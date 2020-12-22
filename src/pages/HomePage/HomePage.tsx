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

enum DataState {
  LOADING,
  ERROR,
  NORMAL
}

interface IHomeState {
  isLoaded: boolean,
  cityData: [],
  weatherData: [],
  error: boolean,
  cacheData: any,
  errorMessage: string,
  dataState: DataState
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
      errorMessage: '',
      dataState: DataState.LOADING
    };
    this.handleSearchDebounce = debounce(this.handleSearchPress, 300);
  }

  componentDidMount() {
    this.getLocation()
  }

  setErrorMessage = (message: string): void => {
    this.setState({error: true, isLoaded: true, errorMessage: message});
  }

  setLoading = (): void => {
    this.setState({error: false, isLoaded: false, errorMessage: ''});
  }

  handleSearchPress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setLoading();
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
      this.setState({cityData: response.data.data, cacheData});
    } catch {
      this.setErrorMessage('Server Error');
    }
  };

  // eslint-disable-next-line no-undef
  getCityWeather = async (position: GeolocationPosition) => {
    try {
      const result = await getCurrentLocation(position);
      const response = await getWeather(result.data.data[0].woeid);
      this.setState({
          cityData: response.data.data[0],
          dataState: DataState.NORMAL,
          weatherData: response.data.data,
          isLoaded: true
        }
      );
    } catch {
      this.setErrorMessage('Server Error');
    }
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
        messsage = "Sever Error"
        break;
    }
    this.setErrorMessage(messsage);
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCityWeather, this.getCityError);
    } else {
      this.setErrorMessage("GEO Location API not available");
    }
  }

  selectCountry = async (cityID: number) => {
    this.setLoading();
    try {
      const result = await getWeather(cityID);
      this.setState({weatherData: result.data.data, isLoaded: true})
    } catch {
      this.setErrorMessage('Server Error');
    }
  }

  render() {
    const {cityData, weatherData, isLoaded, error, errorMessage} = this.state;
    const showCard = error ? <p className="error">{errorMessage}</p> : (
      <Cards data={weatherData} />
    );

    const s = {
      0: <Cards data={weatherData} />,
      1: <p className="error">{errorMessage}</p>,
      2: <div className="loading--fixed"><Loader /></div>,
    };

    return (
      <div className="weather">
        <Header
          searchPressCallback={this.handleSearchDebounce}
          selectCountry={this.selectCountry}
          data={cityData}
        />
        {!isLoaded ? <div className="loading--fixed"><Loader/></div> : showCard}
      </div>
    );
  }
}

export default HomePage;
