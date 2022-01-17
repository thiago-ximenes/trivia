export const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';

const INITIAL_STATE = [];

export default function gameSettings(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_GAME_SETTINGS:
    return {
      responseCode: payload.response_code,
      results: payload.results,
    };
  default:
    return state;
  }
}
