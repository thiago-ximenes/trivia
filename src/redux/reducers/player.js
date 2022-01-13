import { SET_USER_PLAYER } from '../actions';

const INITIAL_STATE = {
  player: { name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
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

  default:
    return state;
  }
};

export default player;
