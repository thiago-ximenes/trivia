import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/game/Header';
import { userToken } from '../redux/actions/index';
import getQuestion from '../services/getQuestion';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameSettings: [],
    };
  }

  componentDidMount() {
    const { getToken } = this.props;
    const { setGamesSettings } = this;
    getToken();
    setGamesSettings();
  }

  setGamesSettings = () => {
    const { token } = this.props;
    console.log(token);
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
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    getToken: () => dispatch(userToken()),
  };
}

function mapStateToProps(state) {
  return {
    token: state.player.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
