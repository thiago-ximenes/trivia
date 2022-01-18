import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
    };
  }

  QuizInform = () => {
    const { id } = this.state;
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
            <button
              key={ answer }
              type="button"
              data-testid={
                correctAnswer === answer ? 'correct-answer' : `wrong-answer${index}`
              }
            >
              { answer }
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { gameSettingsResults } = this.props;
    // const FIVE = 5;
    const { QuizInform } = this;
    console.log();
    return (
      <div>
        { gameSettingsResults && QuizInform() }
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.setState((prevState) => ({ id: prevState.id + 1 })) }
        >
          Próxima pergunta
        </button>
      </div>
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
