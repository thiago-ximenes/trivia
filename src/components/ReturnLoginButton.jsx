import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class returnLoginButton extends Component {
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
          data-testid="btn-go-home"
          onClick={ () => this.redirectFunction() }
        >
          Go Home
        </button>
        { redirectStatus && <Redirect to="/" />}
      </div>
    );
  }
}

export default returnLoginButton;
