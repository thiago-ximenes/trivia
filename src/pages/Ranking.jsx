import React, { Component } from 'react';
import RedirectLoginButton from '../components/ReturnLoginButton';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      playersList: [],
    };
  }

  componentDidMount() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    this.setStatePlayersList(players);
  }

  setStatePlayersList = (players) => {
    // https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a
    players.sort((a, b) => b.score - a.score);
    this.setState({ playersList: players });
  };

  render() {
    const { playersList } = this.state;
    console.log(playersList);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {playersList.map((player, index) => (
          <div key={ index }>
            <img src={ player.img } alt={ player.name } />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
        <RedirectLoginButton />
      </div>
    );
  }
}

export default Ranking;
