import { all, call } from '@redux-saga/core/effects';
import { locationSagas } from './location/locationsSagas';

export default function* rootSaga() {
  yield all([call(locationSagas)]);
}
