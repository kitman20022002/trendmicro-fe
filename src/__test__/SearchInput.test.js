import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import HomePage from "../pages/HomePage/HomePage";

jest.mock('axios');

afterEach(cleanup);

const observe = jest.fn();
window.IntersectionObserver = jest.fn(function () {
  this.observe = observe;
});

test('after input should see sydney', async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve({
    data: {
      data: [
        {
          "title": "Sydney",
          "location_type": "City",
          "woeid": 1105779,
          "latt_long": "-33.869629, 151.206955"
        }
      ]
    },
  }));

  const {getByTestId, findByText} = render(<HomePage />);
  const city = getByTestId('city');
  fireEvent.change(city, {target: {value: 'Sydney'}});
  const itemSydney = await findByText('Sydney');
  expect(itemSydney).toBeInTheDocument();
});




