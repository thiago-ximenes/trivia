import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
// import { getToken } from '../redux/actions/index';
import { getQuestion } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
    };
  }

  componentDidMount() {
    const localToken = JSON.parse(localStorage.getItem('token'));
    const { setGamesSettings } = this.props;
    setGamesSettings(localToken);
  }

  // setGamesSettings = (token) => {
  //   this.setState({ isLoading: true });
  //   getQuestion(token)
  //     .then((data) => {
  //       this.setState({
  //         gameSettings: data,
  //       });
  //     });
  //   this.setState({ isLoading: false });
  // }

  render() {
    const { gameSettings } = this.props;
    const { id } = this.state;
    return (
      <div>
        <Header />
        { gameSettings.length > 0 && (
          <div>{gameSettings[id].category}</div>
        )}
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
