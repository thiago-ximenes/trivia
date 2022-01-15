import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/game/Header';
import { getQuestion } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      allAnswer: [],
    };
  }

  componentDidMount() {
    const localToken = JSON.parse(localStorage.getItem('token'));
    const { setGamesSettings } = this.props;
    setGamesSettings(localToken);
  }

  // redirect para tela de login se []

  getAllAnswer = () => {
    const { gameSettings } = this.props;
    const { id, allAnswer } = this.state;

    if (gameSettings.length > 0) {
      return this.setState({
        allAnswer: '',
      });
    }
  }

  render() {
    const { gameSettings } = this.props;
    const { id, allAnswer } = this.state;

    // const answers = [...gameSettings[id].incorrect_answers,
    //   gameSettings[id].correct_answer];

    console.log(allAnswer);

    return (
      <div>
        <Header />
        { gameSettings.length > 0 && (
          <>
            <div data-testid="question-category">
              { gameSettings[id].category }
            </div>
            <div data-testid="question-text">
              { gameSettings[id].question }
            </div>
            <div>



              {/* <button type="button" data-testid="correct-answer">
                { gameSettings[id].correct_answer }
              </button>
              { gameSettings[id].incorrect_answer.map((item, index) => {
                key = { item };
                <button
                  data-testid={ `wrong-answer-${index}` }
                >
                  { gameSettings[id].incorrect_answer }
                </button>
              }) } */}

            </div>
          </>
        ) }

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
