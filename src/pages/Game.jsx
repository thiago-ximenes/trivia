import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import Quiz from '../components/game/Quiz';

// import { getToken } from '../redux/actions/index';
import getQuestion from '../services/getQuestion';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameSettings: [],
      id: 0,
    };
    console.log('constructor');
  }

  componentDidMount() {
    const { token } = this.props;
    const { setGamesSettings } = this;
    setGamesSettings(token);
    console.log('componentDidMount');
  }

  setGamesSettings = (token) => {
    getQuestion(token)
      .then((data) => {
        this.setState({
          gameSettings: data,
        });
      });
  }

  render() {
    console.log(this.state.gameSettings);
    const { gameSettings, id } = this.state;
    console.log(gameSettings[id]);
    return (
      <div>
        <div>
          <Header />
          <div>
            <p>{ gameSettings[id].category }</p>
            <button
              type="button"
              onClick={ () => this.setState((prevState) => ({ id: prevState.id + 1 })) }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(mapStateToProps)(Game);
