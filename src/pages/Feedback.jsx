import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RankingButton from '../components/game/RankingButton';
import RePlayButton from '../components/RePlayButton';
import Header from '../components/game/Header';

const average = 3;

class Feedback extends Component {
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
        <Header />
        <div data-testid="feedback-text">
          { this.feedbackMessage() }
        </div>
        <RankingButton />
        <RePlayButton />
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
