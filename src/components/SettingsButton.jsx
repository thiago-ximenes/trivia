import React from 'react';
import { Redirect } from 'react-router-dom';

class SettingsButton extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  };

  render() {
    const { state: { redirect }, handleClick } = this;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ handleClick }
        >
          Configurações
        </button>
        { redirect && <Redirect to="/settings" /> }
      </div>
    );
  }
}

export default SettingsButton;
