import React from 'react';
import './SearchInput.css';
import {IoIosSearch} from "react-icons/io";
import TextField from "../TextField/TextField";

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  filterList = (e) => {
    const {onChange} = this.props;
    this.setState({show: true});
    onChange(e);
  };

  selectCountry = (value) => {
    const {selectCountry} = this.props;
    this.setState({'show': false});
    selectCountry(value);
  };

  toggleShow = () => {
    const {show} = this.state;
    this.setState({'show': !show});
  };

  render() {
    const {error, value, data} = this.props;
    const {show} = this.state
    return (
      <div className="search">
        <TextField
          name="state"
          placeholder="Search City"
          label="State"
          onChange={this.filterList}
          error={error}
          value={value}
          onBlur={this.toggleShow}
          onFocus={this.toggleShow}
          dataTestID="city"
          classes="search-bar"
        />
        {data && show && (
          <div className="search-list-container">
            {data.map((item) => (
              <button
                type="button"
                key={item}
                onMouseDown={() => this.selectCountry(item.woeid)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
        <IoIosSearch className="icon-search" />
      </div>
    );
  }
};
