import { SET_USER_PLAYER, SET_USER_SCORE, SET_COUNT } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SET_USER_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case SET_COUNT:
    return {
      ...state,
      assertions: action.value.count,
    };
  default:
    return state;
  }
};

export default player;
