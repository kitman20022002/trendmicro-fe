import React from 'react';


interface ITextFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  classes?: string ,
  value?: string ,
  placeholder: string,
  dataTestID: string,
}

const TextField = (props :ITextFieldProps) => {
  const {name, value, onChange, placeholder, classes, dataTestID} = props;
  return (
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
  )
};

export default TextField;
