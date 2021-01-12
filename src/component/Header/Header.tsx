import React from 'react';
import './Header.css';
import SearchInput from '../SearchInput/SearchInput';

interface IHeaderProps {
  searchPressCallback: any,
  data: [],
  selectCountry: (cityID: number) => Promise<void>,
}

class Header extends React.Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { searchPressCallback, data, selectCountry } = this.props;

    return (
      <header className="align--center fade-down">
        <div className="flex-1 search-container">
          <div className="search-box-container">
            <SearchInput
              onChange={searchPressCallback}
              data={data}
              selectCountry={selectCountry}
              data-testid="search-cities"
              placeholder="Search City"
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
