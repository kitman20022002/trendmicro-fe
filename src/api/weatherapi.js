import axios from "axios";

export const getWeather = (city) => axios.get(`http://localhost:8000/api/v1/weathers?id=${city}`);
export const getCities = (city) => axios.get(`http://localhost:8000/api/v1/cities?city=${city}`);
