import { SET_USER_PLAYER, SET_TOKEN } from '../actions';

const INITIAL_STATE = {
  player: { name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  ranking: [{
    name: '',
    score: 0,
    picture: '',
  }],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_PLAYER:
    return state;
  case SET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default player;
