import React from 'react';
import './HomePage.css'
import Header from "../../component/Header/Header";
import Loader from "../../component/Loader/Loader";
import Cards from "../../Card/Cards";

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
  handleSearchPress = async () => {

  };

  async componentDidMount() {
    // GEO Location Logic here
  }

  selectCountry = async () => {

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
