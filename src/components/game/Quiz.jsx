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
    } = gameSettingsResults;
    console.log(gameSettingsResults);
    const allAnswers = [...incorrectAnswer, correctAnswer];
    return (
      <div>
        <p data-testid="question-category">
          { gameSettingsResults[id].category }
        </p>
        <p data-testid="question-text">
          { gameSettingsResults[id].question }
        </p>
        <div>
          { allAnswers }

        </div>
      </div>
    );
  }

  render() {
    const { gameSettingsResults } = this.props;
    const FIVE = 5;
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
