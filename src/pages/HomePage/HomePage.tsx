import React from 'react';
import './HomePage.css';
import { debounce } from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Loader from '../../component/Loader/Loader';
import Cards from '../../component/Card/Cards';
import { getCities, getCurrentLocation, getWeather } from '../../api/weatherapi';
import { getErrorMessage } from '../../utils/GeoLocationHelper';

interface IHomeProps extends RouteComponentProps<{ title: string }> {

}

enum DataState {
  LOADING,
  ERROR,
  NORMAL
}

interface IHomeState {
  cityData: [],
  weatherData: [],
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
      cityData: [],
      weatherData: [],
      cacheData: [],
      errorMessage: '',
      dataState: DataState.LOADING,
    };
    this.handleSearchDebounce = debounce(this.handleSearchPress, 300);
  }

  componentDidMount() {
    const { geolocation } = navigator;
    if (geolocation) {
      geolocation.getCurrentPosition(
        this.getCityWeather,
        (error) => this.setErrorMessage(getErrorMessage(error)),
      );
    } else {
      this.setErrorMessage('GEO Location API not available');
    }
  }

  setErrorMessage = (message: string): void => {
    this.setState({ dataState: DataState.ERROR, errorMessage: message });
  }

  setLoading = (): void => {
    this.setState({ dataState: DataState.LOADING });
  }

  handleSearchPress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { cacheData } = this.state;
      const q = e.target.value.toLowerCase();
      let response;
      if (cacheData[q]) {
        response = cacheData[q];
      } else {
        response = await getCities(q);
        cacheData[q] = response;
      }
      this.setState({ dataState: DataState.NORMAL, cityData: response.data.data, cacheData });
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
        dataState: DataState.NORMAL,
        cityData: response.data.data[0],
        weatherData: response.data.data,
      });
    } catch {
      this.setErrorMessage('Server Error');
    }
  }

  getContent(state: DataState) {
    const { weatherData, errorMessage } = this.state;
    switch (state) {
      case DataState.ERROR:
        return <p className="error">{errorMessage}</p>;
      case DataState.NORMAL:
        return <Cards data={weatherData} />;
      case DataState.LOADING:
        return <div className="loading--fixed"><Loader /></div>;
      default:
        return null;
    }
  }

  selectCountry = async (cityID: number) => {
    this.setLoading();
    try {
      const result = await getWeather(cityID);
      this.setState({ dataState: DataState.NORMAL, weatherData: result.data.data });
    } catch {
      this.setErrorMessage('Server Error');
    }
  }

  render() {
    const { cityData, dataState } = this.state;

    return (
      <div className="weather">
        <Header
          searchPressCallback={this.handleSearchDebounce}
          selectCountry={this.selectCountry}
          data={cityData}
        />
        {this.getContent(dataState)}
      </div>
    );
  }
}

export default HomePage;
