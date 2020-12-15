import React from 'react';
import './Header.css'
import SearchInput from "../SearchInput/SearchInput";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {searchPressCallback, content, disabled, errors,data,selectCountry} = this.props;

    return (
      <header className="align--center fade-down">
        <div className="flex-1 search-container">
          <div className="search-box-container">
            <SearchInput
              onChange={searchPressCallback}
              content={content}
              disabled={disabled}
              error={errors}
              data={data}
              selectCountry={selectCountry}
              data-testid="search-cities"
              placeholder="Sydney"
              label="search"
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
