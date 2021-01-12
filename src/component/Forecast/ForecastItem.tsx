import React from 'react';
import moment from 'moment';

const weatherMapping : any = {
  lr: 'https://www.metaweather.com/static/img/weather/lr.svg',
  sn: 'https://www.metaweather.com/static/img/weather/sn.svg',
  h: 'https://www.metaweather.com/static/img/weather/h.svg',
  t: 'https://www.metaweather.com/static/img/weather/t.svg',
  hr: 'https://www.metaweather.com/static/img/weather/hr.svg',
  hc: 'https://www.metaweather.com/static/img/weather/hc.svg',
  s: 'https://www.metaweather.com/static/img/weather/s.svg',
  c: 'https://www.metaweather.com/static/img/weather/c.svg',
  lc: 'https://www.metaweather.com/static/img/weather/lc.svg',
};

const dayMapping: any = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

interface IForeCastItem {
  data: {
    id: string,
    applicable_date: string,
    weather_state_abbr: string,
    min_temp: string,
    max_temp: string,
    weather_state_name: string,
    wind_direction_compass: number,
    wind_speed: string
  }
}

const ForecastItem = (props: IForeCastItem) => {
  const { data } = props;
  return (
    <div className="forecast-item__container align--center" data-testid={data.id}>
      <h2 className="day__text">
        {dayMapping[moment(data.applicable_date).day()]}
      </h2>
      <div className="flex info__container">
        <div className="img__container">
          <img src={weatherMapping[data.weather_state_abbr]} alt={data.weather_state_name} />
        </div>
        <div className="temperature__container">
          <p className="temperature__text color--bold">
            {`${parseInt(data.max_temp, 10)}°/ ${parseInt(data.min_temp, 10)}°`}
          </p>
        </div>
        <div className="description__container">
          <p className="color--bold">
            {data.weather_state_name}
          </p>
        </div>
        <div className="wind__container">
          <p className="color--low title">
            Wind
          </p>
          <p className="color--bold">
            {`${data.wind_direction_compass} ${parseInt(data.wind_speed, 10)} mph`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForecastItem;
