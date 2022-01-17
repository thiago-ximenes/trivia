import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import { getQuestion } from '../redux/actions';
import { Redirect } from 'react-router-dom';

class Game extends Component {
  componentDidMount() {
    const localToken = JSON.parse(localStorage.getItem('token'));
    // const localToken = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';
    const { setGamesSettings, gameSettings, history } = this.props;
    setGamesSettings(localToken);
  }

  // redirect para tela de login se []

  render() {
    const { gameSettings } = this.props;
    const THREE = 3;
    return (
      <div>
        { gameSettings.responseCode === THREE && <Redirect to="/" /> }
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

// Game.propTypes = {
//   token: PropTypes.string.isRequired,
// };

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
