import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import Cards from '../component/Card/Cards';

jest.mock('axios');

afterEach(cleanup);

const observe = jest.fn();
window.IntersectionObserver = jest.fn(function () {
  this.observe = observe;
});

test('test card show success', async () => {
  const data = {
    consolidated_weather: [
      {
        id: 6749863933902848,
        weather_state_name: 'Heavy Rain',
        weather_state_abbr: 'hr',
        wind_direction_compass: 'NE',
        created: '2020-12-15T21:21:12.964197Z',
        applicable_date: '2020-12-16',
        min_temp: 20.92,
        max_temp: 26.55,
        the_temp: 24.229999999999997,
        wind_speed: 7.5328338825949785,
        wind_direction: 53.23609061435676,
        air_pressure: 1011.5,
        humidity: 84,
        visibility: 7.208527201145311,
        predictability: 77,
      },
      {
        id: 4655518359486464,
        weather_state_name: 'Heavy Rain',
        weather_state_abbr: 'hr',
        wind_direction_compass: 'NNE',
        created: '2020-12-15T21:21:15.889110Z',
        applicable_date: '2020-12-17',
        min_temp: 20.225,
        max_temp: 29.865000000000002,
        the_temp: 27.63,
        wind_speed: 6.50230137316737,
        wind_direction: 25.597888620008714,
        air_pressure: 1008.5,
        humidity: 72,
        visibility: 9.584650640260875,
        predictability: 77,
      },
      {
        id: 5697556345520128,
        weather_state_name: 'Heavy Rain',
        weather_state_abbr: 'hr',
        wind_direction_compass: 'S',
        created: '2020-12-15T21:21:18.999959Z',
        applicable_date: '2020-12-18',
        min_temp: 18.9,
        max_temp: 26.055,
        the_temp: 24.64,
        wind_speed: 6.117128503205282,
        wind_direction: 181.99999999999997,
        air_pressure: 1011,
        humidity: 72,
        visibility: 13.011512765449773,
        predictability: 77,
      },
      {
        id: 4652010780491776,
        weather_state_name: 'Light Rain',
        weather_state_abbr: 'lr',
        wind_direction_compass: 'S',
        created: '2020-12-15T21:21:21.979031Z',
        applicable_date: '2020-12-19',
        min_temp: 18.01,
        max_temp: 21.495,
        the_temp: 25.89,
        wind_speed: 7.362787543900951,
        wind_direction: 182.74740164317026,
        air_pressure: 1010.5,
        humidity: 74,
        visibility: 11.385073669768552,
        predictability: 75,
      },
      {
        id: 5915484865167360,
        weather_state_name: 'Showers',
        weather_state_abbr: 's',
        wind_direction_compass: 'ESE',
        created: '2020-12-15T21:21:24.896022Z',
        applicable_date: '2020-12-20',
        min_temp: 18.630000000000003,
        max_temp: 22.82,
        the_temp: 21.5,
        wind_speed: 7.100125313494526,
        wind_direction: 113.37513328055525,
        air_pressure: 1016.5,
        humidity: 76,
        visibility: 10.421016265012327,
        predictability: 73,
      },
      {
        id: 4942286212300800,
        weather_state_name: 'Heavy Rain',
        weather_state_abbr: 'hr',
        wind_direction_compass: 'NE',
        created: '2020-12-15T21:21:28.070516Z',
        applicable_date: '2020-12-21',
        min_temp: 19.665,
        max_temp: 26.16,
        the_temp: 26.17,
        wind_speed: 3.2758307484291738,
        wind_direction: 47.5,
        air_pressure: 1011,
        humidity: 82,
        visibility: 9.999726596675416,
        predictability: 77,
      },
    ],
    time: '2020-12-16T11:09:52.590317+11:00',
    sun_rise: '2020-12-16T05:39:10.926145+11:00',
    sun_set: '2020-12-16T20:02:51.733803+11:00',
    timezone_name: 'LMT',
    parent: {
      title: 'Australia',
      location_type: 'Country',
      woeid: 23424748,
      latt_long: '-24.912100,133.397552',
    },
    sources: [
      {
        title: 'BBC',
        slug: 'bbc',
        url: 'http://www.bbc.co.uk/weather/',
        crawl_rate: 360,
      },
      {
        title: 'Forecast.io',
        slug: 'forecast-io',
        url: 'http://forecast.io/',
        crawl_rate: 480,
      },
      {
        title: 'HAMweather',
        slug: 'hamweather',
        url: 'http://www.hamweather.com/',
        crawl_rate: 360,
      },
      {
        title: 'Met Office',
        slug: 'met-office',
        url: 'http://www.metoffice.gov.uk/',
        crawl_rate: 180,
      },
      {
        title: 'OpenWeatherMap',
        slug: 'openweathermap',
        url: 'http://openweathermap.org/',
        crawl_rate: 360,
      },
      {
        title: 'Weather Underground',
        slug: 'wunderground',
        url: 'https://www.wunderground.com/?apiref=fc30dc3cd224e19b',
        crawl_rate: 720,
      },
      {
        title: 'World Weather Online',
        slug: 'world-weather-online',
        url: 'http://www.worldweatheronline.com/',
        crawl_rate: 360,
      },
    ],
    title: 'Sydney',
    location_type: 'City',
    woeid: 1105779,
    latt_long: '-33.869629, 151.206955',
    timezone: 'Australia/Sydney',
  };
  const { getByTestId } = render(<Cards data={data} />);
  const itemHeavyRain = getByTestId('6749863933902848');
  expect(itemHeavyRain).toBeInTheDocument();
});

test('test card show error', async () => {
  const { getByTestId } = render(<Cards />);
  const errorMessage = getByTestId('error-message');
  expect(errorMessage).toBeInTheDocument();
});
