import { SET_USER_RANKING_POSITION } from '../actions';

const INITIAL_STATE = [
  {
    name: '',
    score: 0,
    picture: '',
  },
];

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_RANKING_POSITION:
    return state;
  default:
    return state;
  }
};

export default player;
