import React from 'react';
import './HomePage.css'
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
      searchKey: 'sydney'
    };
  }

  // eslint-disable-next-line react/sort-comp
  handleSearchPress = async (e) => {
    const q = e.target.value.toLowerCase();
    const response = await getCities(q).catch(() => {
      this.setState({error: true});
    });
    this.setState({cityData: response.data.data, error: false, searchKey: q});
  };

  async componentDidMount() {
    // GEO Location Logic here
  }

  selectCountry = async (cityID) => {
    this.setState({isLoaded: false})
    const result = await getWeather(cityID);
    this.setState({weatherData: result.data.data, isLoaded: true})
  }

  render() {
    const {cityData, weatherData, isLoaded, searchKey, error} = this.state;
    const showCard = error ? <p className="error">ERROR NOT CITY</p> : (
      <Cards
        data={weatherData}
        isLoaded={isLoaded}
        searchKey={searchKey}
      />
    );

    return (
      <div className="weather">
        <Header
          searchPressCallback={this.handleSearchPress}
          selectCountry={this.selectCountry}
          data={cityData}
        />
        {!isLoaded ? <div className="loading--fixed"><Loader /></div> : showCard}
      </div>
    );

  }
}

export default HomePage;
