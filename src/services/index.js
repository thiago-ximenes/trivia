const url = 'https://opentdb.com/api_token.php?command=request';

const getApi = () => fetch(url)
  .then((response) => response.json())
  .catch((err) => err);

export default getApi;
