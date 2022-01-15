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
          // onClick={ () => this.setState((prevState) => ({ id: prevState.id + 1 })) }
        >
          aperta aqui irmão
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Header.propTypes = {
  gameSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGamesSettings: PropTypes.func.isRequired,
};
