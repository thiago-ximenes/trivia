import { SET_USER_PLAYER } from '../actions';

const INITIAL_STATE = [
  { name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
];

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_PLAYER:
    return {
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
};

export default player;
