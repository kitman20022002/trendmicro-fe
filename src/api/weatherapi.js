import axios from 'axios';
import apis from '../config/apis';

export const getWeather = (city) => axios.get(`${apis.API_URL + apis.VERSION}/weathers?id=${city}`);

export const getCities = (city) => axios.get(`${apis.API_URL + apis.VERSION}/cities?city=${city}`);

export const getCurrentLocation = (position) =>
  // eslint-disable-next-line max-len,implicit-arrow-linebreak
  axios.get(`${apis.API_URL + apis.VERSION}/get-currently-city?latt=${position.coords.latitude}&long=${position.coords.longitude}`);
