import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img
          src="https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555322954/shape/mentalfloss/trollhed.jpg?itok=UfrZLaEZ"
          alt="troll"
          data-testid="header-profile-picture"
        />
        <h2
          data-testid="header-player-name"
        >
          Troll
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

export default Header;
