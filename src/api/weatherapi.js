import axios from "axios";
import apis from '../config/apis';

export const getWeather = (city) =>
  axios.get(`${apis.API_URL + apis.VERSION}/weathers?id=${city}`);

export const getCities = (city) =>
  axios.get(`${apis.API_URL + apis.VERSION}/cities?city=${city}`);
