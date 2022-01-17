import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import Quiz from '../components/game/Quiz';
import { getQuestion } from '../redux/actions';
import getApi from '../services/index';

class Game extends Component {
  // constructor(){
  //   super();
  //   this.state={ verify: false, }
  // };

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
    // gameSettings.results.length > 0 && this.setState{ ( verify: true )};
    return (
      <div>
        <Header />
        { gameSettings.results
        && <Quiz gameSettingsResults={ gameSettings.results } /> }
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
  setGamesSettings: PropTypes.func.isRequired,
  gameSettings: PropTypes.shape({
    responseCode: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
