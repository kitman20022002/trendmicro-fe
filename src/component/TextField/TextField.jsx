import React, {Component} from 'react';
// eslint-disable-next-line react/prefer-stateless-function
class TextField extends Component {

  render() {
    const { name, value, onChange,placeholder, classes,dataTestID} = this.props;
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
            data-testid={dataTestID}
          />
        </div>
      </>
    )
  }
}

export default TextField;
