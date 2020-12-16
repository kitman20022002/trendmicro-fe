import React from "react";
import ForecastItem from "./ForecastItem";

import "./Forecast.css"

const Forecast = (props) => {
  const {data} = props;

  return (
    <section className="card__forecasts__container flex space-between flex-warp">
      {data.consolidated_weather.map((item) =>
        <ForecastItem key={item.id} data={item} />
      )}
    </section>
  );
};

export default Forecast;
