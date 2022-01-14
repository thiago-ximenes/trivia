import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import { getToken } from '../redux/actions/index';
import getQuestion from '../services/getQuestion';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameSettings: [],
    };
  }

  componentDidMount() {
    const { token } = this.props;
    const { setGamesSettings } = this;
    setGamesSettings(token);
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
    return (
      <div>
        <Header />
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
