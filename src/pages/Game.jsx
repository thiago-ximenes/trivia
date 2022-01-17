import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import { getQuestion } from '../redux/actions';
import getApi from '../services/index';

class Game extends Component {
  componentDidMount() {
    const localToken = JSON.parse(localStorage.getItem('token'));
    const { setGamesSettings } = this.props;
    setGamesSettings(localToken);
  }

  resetToken = async () => {
    const response = await getApi();
    const { token } = response;
    const { setGamesSettings } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    setGamesSettings(token);
  }

  render() {
    const { gameSettings } = this.props;
    const THREE = 3;
    if (gameSettings.responseCode === THREE) this.resetToken();
    return (
      <div>
        <Header />
        <button
          type="button"
          onClick={ () => this.setState((prevState) => ({ id: prevState.id + 1 })) }
        >
          aperta aqui irmão
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  setGamesSettings: PropTypes.func.isRequired,
  gameSettings: PropTypes.shape({
    responseCode: PropTypes.number,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    setGamesSettings: (token) => dispatch(getQuestion(token)),
  };
}

function mapStateToProps(state) {
  return {
    token: state.token,
    gameSettings: state.gameSettings,
    setGamesSettings: state.setGamesSettings,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  // token: PropTypes.string.isRequired,
  setGamesSettings: PropTypes.func.isRequired,
  // gameSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
};
