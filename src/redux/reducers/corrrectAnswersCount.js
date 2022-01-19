import { SET_COUNT } from '../actions';

const INITIAL_STATE = 0;

const correctAnswersCount = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_COUNT:
    return action.value.count;
  default:
    return state;
  }
};

export default correctAnswersCount;
