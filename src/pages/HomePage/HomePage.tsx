import React from 'react';
import './HomePage.css'
import {debounce} from "lodash";
import {RouteComponentProps} from 'react-router-dom'
import Header from "../../component/Header/Header";
import Loader from "../../component/Loader/Loader";
import Cards from "../../component/Card/Cards";
import {getCities, getWeather} from "../../api/weatherapi";

interface IHomeProps extends RouteComponentProps<{ title: string }> {

}


interface IWeatherData {
  data: [],
}

interface IHomeState {
  isLoaded: boolean,
  cityData: [],
  weatherData: IWeatherData[],
  error: boolean,
  cacheData: any,
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
      this.setState({error: true, isLoaded: true});
    }
  };

  async componentDidMount() {
    // GEO Location Logic here
  }

  selectCountry = async (cityID: number) => {
    this.setState({isLoaded: false})
    let result;
    try {
      result = await getWeather(cityID);
      this.setState({weatherData: result.data.data, isLoaded: true})
    } catch {
      this.setState({error: true, isLoaded: true});
    }
  }

  render() {
    const {cityData, weatherData, isLoaded, error} = this.state;
    const showCard = error ? <p className="error">SERVER ERROR</p> : (
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
