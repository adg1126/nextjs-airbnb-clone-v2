import { createSelector } from 'reselect';
import _ from 'lodash';

const selectLocation = state => state.location;

export const selectCountry = createSelector(
  [selectLocation],
  location => location.country
);

export const constSelectOriginCoords = createSelector(
  [selectCountry],
  country =>
    !_.isEmpty(country)
      ? { originLat: country.lat, originLon: country.lon }
      : {}
);
