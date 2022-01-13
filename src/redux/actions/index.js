export const SET_USER_PLAYER = 'SET_USER_PLAYER';
export const SET_TOKEN = 'SET_TOKEN';

export const setUserPlayer = (payload) => ({
  type: SET_USER_PLAYER,
  payload,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export function userToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  return async function fetchToken(dispatch) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setToken(data.token));
    } catch (error) {
      console.log(error);
    }
  };
}
