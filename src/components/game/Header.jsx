import React, { Component } from 'react';
import md5 from 'crypto-js/md5'
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
  const { email } = this.props;

  const hash = md5(email).toString();
  console.log(hash);
  fetch(`https://www.gravatar.com/avatar/${hash}`)
   .then((img) => {
     console.log(img);
     this.setState({ img: img.url, loading: false });
    });
}
  render() {
    const { name } = this.props;
    const { img, loading } = this.state; 
    return (
      loading ? null :
      <header>
        <img
          alt="imagemJogador"
          src={ img }
          width="100px"
          height="100px"
          data-testid="header-profile-picture"
        />
        <h2
          data-testid="header-player-name"
        >
          { name }
        </h2>
        <p
          data-testid="header-score"
        >
          0
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
