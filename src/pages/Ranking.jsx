import React, { Component } from 'react';
import RedirectLoginButton from '../components/ReturnLoginButton';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <RedirectLoginButton />
      </div>
    );
  }
}

export default Ranking;
