import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SettingsButton from '../components/SettingsButton';
import getApi from '../services';
import { getToken, setUserPlayer } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      name: '',
      email: '',
      redirect: false,
    };
  }

  handleClick = async (event) => {
    event.preventDefault();
    const response = await getApi();
    const otherResponse = await response;
    const { token } = otherResponse;
    const { getTokenByProps, getUserPlayer } = this.props;
    getTokenByProps(token);
    getUserPlayer(this.state);
    localStorage.setItem('token', JSON.stringify(token));
    this.setState({ redirect: true });
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
    const { name, email, isDisabled, redirect } = this.state;
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
          onClick={ this.handleClick }
        >
          Play
        </button>
        { redirect && <Redirect to="/game" /> }
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTokenByProps: (token) => dispatch(getToken(token)),
  getUserPlayer: (state) => dispatch(setUserPlayer(state)),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

Login.propTypes = {
  getTokenByProps: PropTypes.func.isRequired,
  getUserPlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
