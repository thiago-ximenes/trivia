import React from 'react';
import SettingsButton from '../components/SettingsButton';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.disableButton();
    });
  }

  disableButton() {
    const { state: { name, email } } = this;
    if (email.length > 0 && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form>
        <SettingsButton />
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            type="text"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
