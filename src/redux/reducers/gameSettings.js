export const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';

const INITIAL_STATE = [];

export default function gameSettings(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_GAME_SETTINGS:
    return action.payload;
  default:
    return state;
  }
}
