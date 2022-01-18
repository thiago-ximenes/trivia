import { SET_GAME_SETTINGS } from '../reducers/gameSettings';

export const SET_USER_PLAYER = 'SET_USER_PLAYER';
export const GET_TOKEN = 'GET_TOKEN';
export const SET_USER_RANKING_POSITION = 'SET_USER_RANKING_POSITION';
export const SET_USER_SCORE = 'SET_USER_SCORE';

export const setUserScore = (payload) => ({
  type: SET_USER_SCORE,
  payload,
});

export const setUserPlayer = (payload) => ({
  type: SET_USER_PLAYER,
  payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const setUserRankingPosition = (gameInfo) => ({
  type: SET_USER_RANKING_POSITION,
  gameInfo,
});

export function setGameSettings(payload) {
  return {
    type: SET_GAME_SETTINGS,
    payload,
  };
}

export function getQuestion(token) {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch(setGameSettings(data)));
}
