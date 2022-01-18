import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      img: 'https//',
      loading: true,
    };
  }

  componentDidMount() {
    this.getImage();
  }

  getImage = () => {
    const { gravatarEmail } = this.props;

    const hash = md5(gravatarEmail);
    fetch(`https://www.gravatar.com/avatar/${hash}`).then(() => {
      this.setState({ img: `https://www.gravatar.com/avatar/${hash}`, loading: false });
    });
  };

  headerRender = () => {
    const { name, gravatarEmail } = this.props;
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
        <p>{ gravatarEmail }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return loading ? null : this.headerRender();
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
