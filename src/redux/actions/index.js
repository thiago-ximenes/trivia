export const SET_USER_PLAYER = 'SET_USER_PLAYER';
export const GET_TOKEN = 'GET_TOKEN';

export const setUserPlayer = (payload) => ({
  type: SET_USER_PLAYER,
  payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});
