// eslint-disable-next-line no-undef,import/prefer-default-export
export const getErrorMessage = (error : GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'User denied the request for Geolocation.';
    case error.POSITION_UNAVAILABLE:
      return 'Location information is unavailable.';
    case error.TIMEOUT:
      return 'The request to get user location timed out.';
    default:
      return 'Sever Error';
  }
};
