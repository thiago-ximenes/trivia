import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      isChecked: false,
      isDisableAnswer: false,
      isDisableButton: true,
    };
  }

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
                onClick={ this.setColorAnswers() }
                disabled={ isDisableAnswer }
                data-testid="correct-answer"
                className={ isChecked ? 'correct' : 'grey' }
              >
                { answer }
              </button>
            )
              : (
                <button
                  key={ answer }
                  type="button"
                  onClick={ this.setColorAnswers() }
                  disabled={ isDisableAnswer }
                  data-testid={ `wrong-answer${ index }` }
                  className={ isChecked ? 'wrong' : 'grey' }
                >
                  { answer }
                </button>
              )
          )) }
        </div>
      </div>
    );
  }

  setColorAnswers = () => {
    this.setState = ({
      isChecked: true,
      isDisableAnswer: true,
      isDisableButton: false,
    });
  }

  getNextQuestion = () => {
    const { isDisableButton } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.setState((prevState) => ({ id: prevState.id + 1 })) }
          disabled={ isDisableButton }
        >
          Próxima pergunta
        </button>
      </div>
    );
  };

  render() {
    const { gameSettingsResults } = this.props;
    // const FIVE = 5;
    return (
      <>
        <div>
          { gameSettingsResults && this.QuizInform() }
        </div>
        <div>
          { this.getNextQuestion() }
        </div>
      </>
    );
  }
}

export default Quiz;

Quiz.propTypes = {
  gameSettingsResults: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
