import React from 'react';
import './HomePage.css'
import {throttle} from "lodash";
import Header from "../../component/Header/Header";
import Loader from "../../component/Loader/Loader";
import Cards from "../../component/Card/Cards";
import {getCities, getWeather} from "../../api/weatherapi";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      cityData: [],
      weatherData: [],
      error: false,
      searchKey: 'sydney',
      cacheData: []
    };
    this.handleSearchDebounce = throttle(this.handleSearchPress, 1000);
  }

  // eslint-disable-next-line react/sort-comp
  handleSearchPress = async (e) => {
    try {
      const {cacheData} = this.state;
      const q = e.target.value.toLowerCase();
      let response;
      if (cacheData[q]) {
        response = cacheData[q];
      } else {
        response = await getCities(q);
      }

      this.setState({cityData: response.data.data, error: false, searchKey: q});
    } catch {
      this.setState({error: true, isLoaded: true});
    }
  };

  async componentDidMount() {
    // GEO Location Logic here
  }

  selectCountry = async (cityID) => {
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
    const {cityData, weatherData, isLoaded, searchKey, error} = this.state;
    const showCard = error ? <p className="error">SERVER ERROR</p> : (
      <Cards
        data={weatherData}
        isLoaded={isLoaded}
        searchKey={searchKey}
      />
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
