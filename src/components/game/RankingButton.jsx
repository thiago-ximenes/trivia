import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class RankingButton extends Component {
  constructor() {
    super();
    this.state = {
      redirectStatus: false,
    };
  }

  redirectFunction = () => this.setState({ redirectStatus: true });

  render() {
    const { redirectStatus } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.redirectFunction() }
        >
          Ranking
        </button>
        { redirectStatus && <Redirect to="/ranking" />}
      </div>
    );
  }
}

export default RankingButton;
