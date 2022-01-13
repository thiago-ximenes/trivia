import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/game/Header';
import { userToken } from '../redux/actions/index';

class Game extends Component {
  componentDidMount() {
    const { getToken } = this.props;
    getToken();
    userToken();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Game.propTypes = {
  getToken: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    getToken: () => dispatch(userToken()),
  };
}

export default connect(null, mapDispatchToProps)(Game);
