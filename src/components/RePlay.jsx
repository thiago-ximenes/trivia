import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class RePlay extends Component {
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
          data-testid="btn-play-again"
          onClick={ () => this.redirectFunction() }
        >
          Play Again
        </button>
        { redirectStatus && <Redirect to="/" />}
      </div>
    );
  }
}

export default RePlay;
