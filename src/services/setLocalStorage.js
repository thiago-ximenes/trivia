const setLocalStorage = (score) => {
  const { playerData } = this.props;
  playerData.score = score;
  if (localStorage.getItem('ranking')) {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.push(playerData);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  } else {
    const ranking = [];
    ranking.push(playerData);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }
};

export default setLocalStorage;
