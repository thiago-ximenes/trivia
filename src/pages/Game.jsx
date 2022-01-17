import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import { getQuestion } from '../redux/actions';
import getApi from '../services/index';

class Game extends Component {
  componentDidMount() {
    const localToken = JSON.parse(localStorage.getItem('token'));
    // const localToken = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';
    const { setGamesSettings } = this.props;
    setGamesSettings(localToken);
    const { gameSettings } = this.props;
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
          // onClick={ () => this.setState((prevState) => ({ id: prevState.id + 1 })) }
        >
          aperta aqui irmão
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  responseCode: PropTypes.number.isRequired,
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

Header.propTypes = {
  gameSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGamesSettings: PropTypes.func.isRequired,
};
