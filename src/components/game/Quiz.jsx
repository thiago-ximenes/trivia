import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserScore } from '../../redux/actions';
import './Quiz.css';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      isChecked: false,
      isDisableAnswer: false,
      isDisableButton: true,
      remainingTime: 30,
      score: 0,
      shuffledQuestions: [],
    };
  }

  componentDidMount() {
    this.startTimer();
    this.randomQuestion();
  }

  componentDidUpdate(preProps, prevState) {
    const { id, score } = this.state;
    if (prevState.score !== score) {
      const { setScore, playerData } = this.props;
      setScore(score);
      playerData.score = score;
      // if (localStorage.getItem('ranking')) {
    //   const ranking = JSON.parse(localStorage.getItem('ranking'));
    // }
    }
    // const scoreToLocalStore = localStorage.setItem('ranking', JSON.stringify(score));
    // localStorage.setItem('score', score);
    if (prevState.id !== id) {
      this.resetTimer();
      this.randomQuestion();
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

  randomQuestion = () => {
    const { id } = this.state;
    const { gameSettingsResults } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = gameSettingsResults[id];
    const allAnswers = [...incorrectAnswer, correctAnswer];
    const shuffle = allAnswers.sort(() => (Math.random(1) - Math.random()));
    this.setState({ shuffledQuestions: shuffle });
  };

  QuizInform = () => {
    const { id, isChecked, isDisableAnswer, shuffledQuestions } = this.state;
    console.log(shuffledQuestions);
    const { gameSettingsResults } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = gameSettingsResults[id];
    // const allAnswers = [...incorrectAnswer, correctAnswer];
    // const shuffle = allAnswers.sort(() => (Math.random(1) - Math.random()));
    return (
      <div>
        <p data-testid="question-category">
          { gameSettingsResults[id].category }
        </p>
        <p data-testid="question-text">
          { gameSettingsResults[id].question }
        </p>
        <div data-testid="answer-options">
          { shuffledQuestions.map((answer, index) => (
            answer === correctAnswer ? (
              <button
                key={ answer }
                type="button"
                onClick={ () => {
                  this.disableGame();
                  this.countScore();
                } }
                disabled={ isDisableAnswer }
                data-testid="correct-answer"
                // className={ isChecked ? 'correct' : undefined }
                className="correct"
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

  countScore = () => {
    const { remainingTime, id } = this.state;
    const { gameSettingsResults } = this.props;
    const { difficulty } = gameSettingsResults[id];
    const difficultyValues = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const TEN = 10;
    const count = TEN + (remainingTime * difficultyValues[difficulty]);
    this.setState((prevState) => ({ score: prevState.score + count }));
  }

  getNextQuestion = () => {
    const { isDisableButton } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.setState((prevState) => ({
            id: prevState.id + 1,
            isChecked: false,
            isDisableAnswer: false,
            isDisableButton: true,
          })) }
          disabled={ isDisableButton }
          className={ isDisableButton && 'btn-off' }
        >
          Próxima pergunta
        </button>
      </div>
    );
  };

  render() {
    const { gameSettingsResults } = this.props;
    const { remainingTime, score } = this.state;
    return (
      <>
        <div>
          { gameSettingsResults && this.QuizInform() }
        </div>
        <div>
          { this.getNextQuestion() }
          <span>{ remainingTime }</span>
          <p>{score}</p>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    playerData: state.player,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setScore: (state) => dispatch(setUserScore(state)),
  };
}

Quiz.propTypes = {
  gameSettingsResults: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
