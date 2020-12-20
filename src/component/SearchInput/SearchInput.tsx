import React from 'react';
import './SearchInput.css';
import {IoIosSearch} from "react-icons/io";
import TextField from "../TextField/TextField";


interface ISearchInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value?: string ,
  placeholder: string,
  data: [],
  selectCountry: any
}


interface ISearchInputState {
  show: boolean
}

export default class SearchInput extends React.Component<ISearchInputProps, ISearchInputState> {
  constructor(props: ISearchInputProps) {
    super(props);
    this.state = {
      show: false
    };
  }

  filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {onChange} = this.props;
    this.setState({show: true});
    onChange(e);
  };

  selectCountry = (value: string) => {
    const {selectCountry} = this.props;
    this.setState({'show': false});
    selectCountry(value);
  };

  toggleShow = () => {
    const {show} = this.state;
    this.setState({'show': !show});
  };

  render() {
    const {value, data, placeholder} = this.props;
    const {show} = this.state
    return (
      <div className="search">
        <TextField
          name="state"
          placeholder={placeholder}
          onChange={this.filterList}
          value={value}
          dataTestID="city"
          classes="search-bar"
        />
        {data && show && (
          <div className="search-list-container">
            {data.map((item: any) => (
              <button
                type="button"
                key={item.woeid}
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
