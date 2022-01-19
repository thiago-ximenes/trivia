import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Quiz.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCount } from '../../redux/actions';

const four = 4;

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      isChecked: false,
      isDisableAnswer: false,
      isDisableButton: true,
      redirect: false,
      count: 0,
      remainingTime: 30,

    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(preProps, prevState) {
    const { id } = this.state;
    if (prevState.id !== id) {
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer = () => {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      const { remainingTime } = this.state;
      if (remainingTime > 0) {
        this.setState((prevState) => ({
          remainingTime: prevState.remainingTime - 1,
        }));
      } else {
        this.disableGame();
      }
    }, ONE_SECOND);
  }

  resetTimer = () => {
    this.setState({ remainingTime: 30 });
  };

  QuizInform = () => {
    const { id, isChecked, isDisableAnswer } = this.state;
    const { gameSettingsResults } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = gameSettingsResults[id];
    const allAnswers = [...incorrectAnswer, correctAnswer];
    const shuffle = allAnswers.sort(() => (Math.random(1) - Math.random()));
    return (
      <div>
        <p data-testid="question-category">
          { gameSettingsResults[id].category }
        </p>
        <p data-testid="question-text">
          { gameSettingsResults[id].question }
        </p>
        <div data-testid="answer-options">
          { shuffle.map((answer, index) => (
            answer === correctAnswer ? (
              <button
                key={ answer }
                type="button"

                onClick={ () => this.onCorrectClick() }
                disabled={ isDisableAnswer }
                data-testid="correct-answer"
                className={ isChecked ? 'correct' : undefined }
              >
                { answer }
              </button>
            )
              : (
                <button
                  key={ answer }
                  type="button"
                  onClick={ () => this.disableGame() }
                  disabled={ isDisableAnswer }
                  data-testid={ `wrong-answer${index}` }
                  className={ isChecked ? 'wrong' : undefined }
                >
                  { answer }
                </button>
              )
          )) }
        </div>
      </div>
    );
  }

  disableGame = () => {
    this.setState({
      isChecked: true,
      isDisableAnswer: true,
      isDisableButton: false,
    });
  }

  setCount = () => {
    const { count } = this.state;
    const { countCorrectAnswers } = this.props;
    this.setState({
      count: count + 1,
    }, () => countCorrectAnswers(this.state));
  }

  onCorrectClick = () => {
    this.disableGame()
    this.setCount();
  }

  feedbackRedirect = () => {
    const { id } = this.state;
    if (id < four) {
      this.setState((prevState) => ({
        id: prevState.id + 1,
        isChecked: false,
        isDisableAnswer: false,
        isDisableButton: true,
      }));
    } else {
      this.setState({ redirect: true });
    }
  }

  getNextQuestion = () => {
    const { isDisableButton, redirect } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.feedbackRedirect() }
          disabled={ isDisableButton }
          className={ isDisableButton && 'btn-off' }
        >
          Próxima pergunta
        </button>
        { redirect && <Redirect to="/feedback" /> }
      </div>
    );
  };

  render() {
    const { gameSettingsResults } = this.props;
    const { remainingTime } = this.state;
    return (
      <>
        <div>
          { gameSettingsResults && this.QuizInform() }
        </div>
        <div>
          { this.getNextQuestion() }
          <span>{ remainingTime }</span>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  countCorrectAnswers: (state) => dispatch(setCount(state)),
});

export default connect(null, mapDispatchToProps)(Quiz);

Quiz.propTypes = {
  gameSettingsResults: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  countCorrectAnswers: PropTypes.func.isRequired,
};
