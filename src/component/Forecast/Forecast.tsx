import React from "react";
import ForecastItem from "./ForecastItem";

import "./Forecast.css"


interface IForecastProps {
  data: {
    consolidated_weather: []
  }
}

const Forecast = (props: IForecastProps) => {
  const {data} = props;

  return (
    <section className="card__forecasts__container flex space-between flex-warp">
      {data.consolidated_weather.map((item: any) =>
        <ForecastItem key={item.id} data={item} />
      )}
    </section>
  );
};

export default Forecast;
