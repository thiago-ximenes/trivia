import React, { Component } from 'react';

const result = 5;
const average = 3;

class Feedback extends Component {
  // precisamos pegar do localStorage o numero de acertos
  feedbackMessage = () => {
    if (result < average) {
      return (
        <div>
          Could be better...
        </div>);
    } return (
      <div>
        Well Done!
      </div>);
  };

  render() {
    return (
      <div>
        <div data-testid="feedback-text">
          { this.feedbackMessage() }
        </div>
      </div>
    );
  }
}

export default Feedback;
