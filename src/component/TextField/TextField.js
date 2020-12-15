import React, {Component} from 'react';
// eslint-disable-next-line react/prefer-stateless-function
class TextField extends Component {

  render() {
    const { name, value, onChange,placeholder, classes} = this.props;
    return (
      <>
        <div className="input__container">
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={classes}
            autoComplete="off"
          />
        </div>
      </>
    )
  }
}

export default TextField;
