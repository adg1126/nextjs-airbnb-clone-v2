import {} from './locationActionTypes';

const INITIAL_STATE = {
  isFetched: false,
  errMsg: ''
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default locationReducer;
