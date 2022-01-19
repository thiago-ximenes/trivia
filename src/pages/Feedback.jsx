import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const average = 3;

class Feedback extends Component {
  // precisamos pegar do localStorage o numero de acertos
  feedbackMessage = () => {
    const { result } = this.props;
    console.log(result);
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

const mapStateToProps = (state) => ({
  result: state.correctAnswersCount,
});

Feedback.propTypes = {
  result: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
