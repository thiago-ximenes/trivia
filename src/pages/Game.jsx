import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import { getQuestion } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const localToken = JSON.parse(localStorage.getItem('token'));
    const { setGamesSettings } = this.props;
    setGamesSettings(localToken);
  }

  // redirect para tela de login se []

  render() {
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
