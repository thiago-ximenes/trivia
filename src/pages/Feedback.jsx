import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RankingButton from '../components/game/RankingButton';
import RePlayButton from '../components/RePlayButton';

const average = 3;

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      img: 'https//',
    };
  }

  componentDidMount() {
    this.getImage();
  }

  getImage = () => {
    const { gravatarEmail } = this.props;

    const hash = md5(gravatarEmail);
    fetch(`https://www.gravatar.com/avatar/${hash}`).then(() => {
      this.setState({ img: `https://www.gravatar.com/avatar/${hash}` });
    });
  };

  feedbackMessage = () => {
    const { assertion } = this.props;
    console.log(assertion);
    if (assertion < average) {
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
    const { score, name, assertion } = this.props;
    const { img } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ img }
          alt="imagemJogador"
          width="100px"
          height="100px"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <div data-testid="feedback-text">
          {this.feedbackMessage()}
        </div>
        <span className="btn-off" data-testid="header-score">
          {score}
        </span>
        <h1 data-testid="feedback-total-score">{score}</h1>
        <h1 data-testid="feedback-total-question">{assertion }</h1>
        <RankingButton />
        <RePlayButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertion: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Feedback.propTypes = {
  assertion: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
