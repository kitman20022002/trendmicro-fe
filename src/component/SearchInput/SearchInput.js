import React from 'react';
import './SearchInput.css';
import {IoIosSearch} from "react-icons/all";
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

  toggleShow = () => {
    const {show} = this.state;
    this.setState({'show': !show});
  };

  render() {
    const {error, value} = this.props;
    return (
      <div className="search">
        <TextField
          name="state"
          placeholder="Search State or territory"
          label="State"
          onChange={this.filterList}
          error={error}
          value={value}
          onBlur={this.toggleShow}
          onFocus={this.toggleShow}
          data-testid="state"
          classes="search-bar"
        />
        <IoIosSearch className="icon-search" />
      </div>
    );
  }
};
